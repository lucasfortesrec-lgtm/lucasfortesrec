import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

declare global {
  interface Window {
    Vimeo?: {
      Player: new (
        element: HTMLIFrameElement,
        options: Record<string, unknown>
      ) => {
        on(event: string, callback: (data?: unknown) => void): void;
        play(): Promise<void>;
        pause(): Promise<void>;
        getPaused(): Promise<boolean>;
        setQuality(quality: string): Promise<string>;
        unload(): Promise<void>;
      };
    };
  }
}

interface VimeoPlayerProps {
  videoUrl: string;
  title?: string;
  className?: string;
}

export function VimeoPlayer({ videoUrl, title, className = "" }: VimeoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<ReturnType<Window["Vimeo"]["Player"]>>();
  const [isPaused, setIsPaused] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const videoId = videoUrl.replace("https://player.vimeo.com/video/", "");
  const src = `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&controls=0&quality=auto&transparent=0&playsinline=1&autopause=0`;

  useEffect(() => {
    if (!iframeRef.current || playerRef.current) return;

    const init = () => {
      if (!window.Vimeo || !iframeRef.current) return;
      const player = new window.Vimeo.Player(iframeRef.current, {
        quality: "auto",
        autopause: false,
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
    if (!playerRef.current) return;
    try {
      const paused = await playerRef.current.getPaused();
      if (paused) {
        await playerRef.current.play();
      } else {
        await playerRef.current.pause();
      }
    } catch {
      // Fallback: click on iframe may trigger native play/pause
      iframeRef.current?.click();
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <iframe
        ref={iframeRef}
        src={src}
        title={title || "Vimeo video player"}
        className="h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />

      {/* Initial play overlay */}
      {!isReady || isPaused ? (
        <button
          onClick={togglePlay}
          className="absolute inset-0 grid place-items-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Reproduzir vídeo"
        >
          <span className="grid place-items-center size-16 rounded-full bg-bone/90 text-background backdrop-blur-sm">
            <Play className="size-5 fill-current ml-0.5" />
          </span>
        </button>
      ) : null}

      {/* Minimal play/pause control */}
      <button
        onClick={togglePlay}
        className="absolute bottom-4 right-4 z-10 grid place-items-center size-9 rounded-full bg-background/80 backdrop-blur-md border border-border text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
        aria-label={isPaused ? "Reproduzir" : "Pausar"}
      >
        {isPaused ? <Play className="size-3.5 fill-current ml-0.5" /> : <Pause className="size-3.5 fill-current" />}
      </button>
    </div>
  );
}
