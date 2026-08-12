import { useRef, useState } from "react";
import { Play } from "lucide-react";

interface InstagramCardProps {
  id: string;
  ratio: number;
  index: number;
  rows?: 1 | 2 | 3;
}

/** Posts whose video is hosted locally — these play inline, nothing else on the card. */
const LOCAL_VIDEOS = new Set([
  "DbVuBimRBFY",
  "DbO1tXPxxTV",
  "DZzywvax8qD",
  "DYTWBuzNIxx",
  "DYTQVZ2jSsA",
]);

export function InstagramCard({ id, ratio, index, rows = 1 }: InstagramCardProps) {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasLocal = LOCAL_VIDEOS.has(id);

  const start = () => {
    setStarted(true);
    requestAnimationFrame(() => {
      const v = videoRef.current;
      if (!v) return;
      v.muted = false;
      v.volume = 1;
      void v.play();
    });
  };

  const rowClass = rows === 3 ? "row-span-3" : rows === 2 ? "row-span-2" : "row-span-1";

  return (
    <div
      style={{ aspectRatio: ratio }}
      className={`relative w-full rounded-[16px] border border-border bg-background overflow-hidden ${rowClass}`}
    >
      {hasLocal && started ? (
        <video
          ref={videoRef}
          src={`/instagram-videos/${id}.mp4`}
          poster={`/instagram-covers/${id}.jpg`}
          controls
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover bg-black"
        />
      ) : hasLocal ? (
        <button
          type="button"
          onClick={start}
          className="group absolute inset-0 w-full h-full cursor-pointer"
          aria-label={`Reproduzir vídeo ${id}`}
        >
          <img
            src={`/instagram-covers/${id}.jpg`}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          <div className="absolute inset-0 grid place-items-center">
            <span className="grid place-items-center size-12 rounded-full bg-background/90 text-foreground shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
              <Play className="size-4 fill-current ml-0.5" />
            </span>
          </div>
        </button>
      ) : started ? (
        <iframe
          src={`https://www.instagram.com/p/${id}/embed/captioned`}
          title={`Publicação ${id} no Instagram de Lucas Fortes`}
          loading="lazy"
          scrolling="no"
          style={{ height: "calc(100% + 240px)", marginTop: "-54px" }}
          className="absolute top-0 left-0 w-full block border-0 bg-black"
        />
      ) : (
        <button
          type="button"
          onClick={() => setStarted(true)}
          className="group absolute inset-0 w-full h-full cursor-pointer"
          aria-label={`Ver publicação ${id} no Instagram`}
        >
          <img
            src={`/instagram-covers/${id}.jpg`}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />
        </button>
      )}

    </div>
  );
}





