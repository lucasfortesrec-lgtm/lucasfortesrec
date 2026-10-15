import { useRef, useState } from "react";
import { Play, X, Images, Instagram, ChevronLeft, ChevronRight } from "lucide-react";

interface InstagramCardProps {
  id: string;
  ratio: number;
  index: number;
}

/** Posts whose video is hosted locally — these play inline, nothing else on the card. */
const LOCAL_VIDEOS = new Set([
  "DeRjT-4RDkO",
  "DdolGMGRkZm",
  "Dde6cY7xOm8",
  "DczktCENS1A",
  "DbVuBimRBFY",
  "DbO1tXPxxTV",
  "DZzywvax8qD",
  "DYTWBuzNIxx",
  "DYTQVZ2jSsA",
  "DbvTSCuRvho",
  "DayhVSiRCbR",
]);

/** Carrosséis com fotos hospedadas localmente — navegáveis dentro do site. */
const LOCAL_CAROUSELS: Record<string, number> = {
  Da_T_j9kRE7: 18,
  DalZ9tIEWOH: 11,
  DbgyZJJkWfX: 2,
};

/** Posts we know are Instagram carousels — shown as a photo set without white footer. */
const CAROUSELS = new Set([
  "DbgyZJJkWfX",
  "Da_T_j9kRE7",
  "DbKEQRotrcx",
  "DYTOutBtDXL",
  "DYTOZb-NBe2",
  "DYTMmXZNZVI",
  "DYTMkB_tMRC",
  "DYTMhg1tWxP",
  "DalZ9tIEWOH",
]);

export function InstagramCard({ id, ratio, index }: InstagramCardProps) {
  const [started, setStarted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasLocal = LOCAL_VIDEOS.has(id);
  const isCarousel = CAROUSELS.has(id);
  const localCount = LOCAL_CAROUSELS[id] ?? 0;
  const slides = localCount
    ? Array.from({ length: localCount }, (_, i) => `/instagram-carousels/${id}_${i}.jpg`)
    : [`/instagram-covers/${id}.jpg`];
  const [slide, setSlide] = useState(0);
  const go = (d: number) =>
    setSlide((s) => (s + d + slides.length) % slides.length);

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

  const openPhoto = () => {
    if (hasLocal) {
      start();
    } else {
      setSlide(0);
      setModalOpen(true);
    }
  };

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div
        style={{ aspectRatio: ratio }}
        className="relative w-full rounded-[12px] border border-border bg-background overflow-hidden break-inside-avoid mb-1 sm:mb-1.5 lg:mb-2"
      >

        {hasLocal && started ? (
          <video
            ref={videoRef}
            src={`/instagram-videos/${id}.mp4`}
            poster={`/instagram-covers/${id}.jpg`}
            controls
            controlsList="nodownload"
            disablePictureInPicture
            disableRemotePlayback
            playsInline
            preload="auto"
            onContextMenu={(e) => e.preventDefault()}
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
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
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
          <button
            type="button"
            onClick={openPhoto}
            className="group absolute inset-0 w-full h-full cursor-pointer"
            aria-label={`Ver publicação ${id} no Instagram`}
          >
            <img
              src={`/instagram-covers/${id}.jpg`}
              alt=""
              loading="lazy"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />
            {isCarousel && (
              <div className="absolute top-3 right-3 grid place-items-center size-8 rounded-full bg-black/60 text-white backdrop-blur-sm">
                <Images className="size-4" />
              </div>
            )}
          </button>
        )}
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={`Publicação ${id}`}
        >
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-4 right-4 grid place-items-center size-11 rounded-full bg-background/10 text-white hover:bg-background/20 transition-colors"
            aria-label="Fechar"
          >
            <X className="size-5" />
          </button>

          <div
            className="relative flex flex-col items-center gap-4 max-w-3xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full overflow-hidden rounded-[16px] bg-black shadow-2xl max-h-[75vh]">
              <img
                src={slides[slide]}
                alt=""
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-full object-contain max-h-[75vh]"
              />
              {slides.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center size-10 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Próxima"
                    className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center size-10 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs text-white backdrop-blur-sm">
                    {slide + 1} / {slides.length}
                  </div>
                </>
              )}
              {isCarousel && slides.length === 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-black/70 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
                  <Images className="size-4" />
                  <span>Carrossel</span>
                </div>
              )}
            </div>
            <a
              href={`https://www.instagram.com/p/${id}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm text-white hover:bg-white/20 transition-colors shrink-0"
            >
              <Instagram className="size-4" />
              {isCarousel ? "Ver carrossel completo" : "Ver no Instagram"}
            </a>
          </div>


        </div>
      )}
    </>
  );
}






