import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

type VimeoPlayerInstance = {
  on(event: string, callback: (data?: unknown) => void): void;
  play(): Promise<void>;
  pause(): Promise<void>;
  getPaused(): Promise<boolean>;
  getVolume(): Promise<number>;
  setVolume(volume: number): Promise<number>;
  setQuality(quality: string): Promise<string>;
  unload(): Promise<void>;
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

  const videoId = videoUrl.replace("https://player.vimeo.com/video/", "").split("?")[0];
  const src = `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&controls=0&quality=auto&transparent=0&playsinline=1&autopause=0&muted=0`;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || playerRef.current) return;

    const init = () => {
      const Vimeo = window.Vimeo;
      if (!Vimeo || !iframe) return;
      const player = new Vimeo.Player(iframe, {
        quality: "auto",
        autopause: false,
        muted: false,
        volume: 1,
      });
      playerRef.current = player;

      player.on("loaded", () => {
        setIsReady(true);
        player.setQuality("auto").catch(() => {});
      });

      player.on("play", () => setIsPaused(false));
      player.on("pause", () => setIsPaused(true));
      player.on("ended", () => setIsPaused(true));
    };

    if (window.Vimeo) {
      init();
    } else {
      const script = document.createElement("script");
      script.src = "https://player.vimeo.com/api/player.js";
      script.async = true;
      script.onload = init;
      document.body.appendChild(script);
    }

    return () => {
      playerRef.current?.unload().catch(() => {});
      playerRef.current = undefined;
    };
  }, []);

  const togglePlay = async () => {
    const player = playerRef.current;
    if (!player) return;
    try {
      const paused = await player.getPaused();
      if (paused) {
        await player.play();
      } else {
        await player.pause();
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <iframe
        ref={iframeRef}
        src={src}
        title={title || "Vimeo video player"}
        className="h-full w-full pointer-events-none"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />

      {/* Full-surface tap/click target: toggles play/pause anywhere on the video */}
      <button
        type="button"
        onClick={togglePlay}
        className="absolute inset-0 z-10 grid place-items-center touch-manipulation"
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
      </button>

      {/* Minimal play/pause control */}
      <button
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
      </button>
    </div>
  );
}

