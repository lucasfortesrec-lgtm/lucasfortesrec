import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { claimPlayback, registerPlayback } from "@/lib/playback-coordinator";

type VimeoPlayerInstance = {
  ready(): Promise<void>;
  on(event: string, callback: (data?: unknown) => void): void;
  play(): Promise<void>;
  pause(): Promise<void>;
  getPaused(): Promise<boolean>;
  getVolume(): Promise<number>;
  setVolume(volume: number): Promise<number>;
  getMuted(): Promise<boolean>;
  setMuted(muted: boolean): Promise<boolean>;
  setQuality(quality: string): Promise<string>;
  unload(): Promise<void>;
  destroy(): Promise<void>;
};

type VimeoConstructor = new (
  element: HTMLIFrameElement,
  options: Record<string, unknown>
) => VimeoPlayerInstance;

declare global {
  interface Window {
    Vimeo?: { Player: VimeoConstructor };
  }
}

interface VimeoPlayerProps {
  videoUrl: string;
  title?: string;
  className?: string;
}

export function VimeoPlayer({ videoUrl, title, className = "" }: VimeoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<VimeoPlayerInstance | undefined>(undefined);
  const [isPaused, setIsPaused] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const requestRef = useRef<ReturnType<typeof claimPlayback> | null>(null);

  const videoId = videoUrl.replace("https://player.vimeo.com/video/", "").split("?")[0];
  const src = `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&controls=0&quality=auto&transparent=0&playsinline=1&autopause=0&muted=1`;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || playerRef.current) return;

    let disposed = false;
    let unregister: (() => void) | undefined;
    const init = () => {
      const Vimeo = window.Vimeo;
      if (!Vimeo || disposed || playerRef.current) return;
      const player = new Vimeo.Player(iframe, {
        quality: "auto",
        autopause: false,
        muted: true,
        volume: 1,
      });
      playerRef.current = player;

      void player.ready().then(() => {
        if (disposed) return;
        // An unready iframe cannot play and must not block other films on SDK requests.
        unregister = registerPlayback(`vimeo-${videoId}`, {
          stop: () => {
            requestRef.current = null;
            setIsPaused(true);
            return Promise.all([player.setMuted(true).catch(() => {}), player.pause().catch(() => {})]);
          },
        });
        setIsReady(true);
        player.setQuality("auto").catch(() => {});
      }).catch(() => {});

      // Mobile browsers can force a muted start; unmute as soon as playback begins
      const forceAudio = () => {
        const request = requestRef.current;
        if (!request?.current() || disposed) {
          player.setMuted(true).catch(() => {});
          player.pause().catch(() => {});
          return;
        }
        void request.settled.then(async () => {
          if (!request.current() || disposed) return;
          await player.setMuted(false).catch(() => {});
          // A newer request may supersede this one during the SDK round trip.
          if (!request.current() || disposed) {
            await player.setMuted(true).catch(() => {});
            await player.pause().catch(() => {});
            return;
          }
          player.setVolume(1).catch(() => {});
        });
      };

      player.on("play", () => {
        setIsPaused(false);
        forceAudio();
      });
      player.on("playing", forceAudio);
      player.on("pause", () => { setIsPaused(true); });
      player.on("ended", () => setIsPaused(true));
    };

    if (window.Vimeo) {
      init();
    } else {
      void import('@vimeo/player').then(({ default: Player }) => {
        if (disposed) return;
        window.Vimeo = { Player: Player as unknown as VimeoConstructor };
        init();
      });
    }

    return () => {
      disposed = true;
      requestRef.current = null;
      unregister?.();
      playerRef.current?.setMuted(true).catch(() => {});
      playerRef.current?.pause().catch(() => {});
      // unload preserves React's iframe during StrictMode's effect cleanup/replay.
      playerRef.current?.unload().catch(() => {});
      playerRef.current = undefined;
    };
  }, [videoId]);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player || !isReady) return;

    if (isPaused) {
      const request = claimPlayback(`vimeo-${videoId}`);
      requestRef.current = request;
      setIsPaused(false);
      player
        .play()
        .then(() => {
          if (!request.current()) {
            player.setMuted(true).catch(() => {});
            player.pause().catch(() => {});
          }
        })
        .catch(() => setIsPaused(true));
    } else {
      requestRef.current = null;
      setIsPaused(true);
      player.setMuted(true).catch(() => {});
      player.pause().catch(() => {});
    }
  };

  return (
    <div className={`relative group ${className}`} onContextMenu={(e) => e.preventDefault()}>
      <iframe
        ref={iframeRef}
        src={src}
        title={title || "Vimeo video player"}
        className="h-full w-full pointer-events-none"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />

      {/* Full-surface tap/click target: toggles play/pause anywhere on the video */}
      <Button
        variant="ghost"
        disabled={!isReady}
        type="button"
        onClick={togglePlay}
        className="absolute inset-0 h-full w-full z-10 grid place-items-center touch-manipulation hover:bg-transparent"
        aria-label={isPaused ? "Reproduzir vídeo" : "Pausar vídeo"}
      >
        <span
          className={`grid place-items-center size-16 rounded-full bg-bone/90 text-background backdrop-blur-sm transition-opacity duration-300 ${
            isPaused ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          {isPaused ? (
            <Play className="size-5 fill-current ml-0.5" />
          ) : (
            <Pause className="size-5 fill-current" />
          )}
        </span>
      </Button>

      {/* Minimal play/pause control */}
      <Button
        variant="ghost"
        disabled={!isReady}
        type="button"
        onClick={togglePlay}
        className="absolute bottom-4 right-4 z-20 grid place-items-center size-9 rounded-full bg-background/80 backdrop-blur-md border border-border text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
        aria-label={isPaused ? "Reproduzir" : "Pausar"}
      >
        {isPaused ? (
          <Play className="size-3.5 fill-current ml-0.5" />
        ) : (
          <Pause className="size-3.5 fill-current" />
        )}
      </Button>
    </div>
  );
}

