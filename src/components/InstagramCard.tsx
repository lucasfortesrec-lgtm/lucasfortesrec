import { useState } from "react";
import { Play } from "lucide-react";

interface InstagramCardProps {
  id: string;
  ratio: number;
  index: number;
}

export function InstagramCard({ id, ratio, index }: InstagramCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{ aspectRatio: ratio }}
      className={`relative w-full rounded-[16px] border border-border bg-background overflow-hidden break-inside-avoid ${
        index % 5 === 1 ? "sm:mt-8" : index % 5 === 3 ? "sm:mt-12" : ""
      }`}
    >
      {!loaded ? (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group absolute inset-0 w-full h-full cursor-pointer"
          aria-label={`Reproduzir publicação ${id} do Instagram`}
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
      ) : (
        <iframe
          src={`https://www.instagram.com/p/${id}/embed`}
          title={`Publicação ${id} no Instagram de Lucas Fortes`}
          loading="lazy"
          scrolling="no"
          style={{ height: "calc(100% + 56px)", marginTop: "-54px" }}
          className="w-full h-full block border-0"
        />
      )}
    </div>
  );
}
