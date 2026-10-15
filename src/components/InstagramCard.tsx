import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Play, X, Images, Instagram, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { claimPlayback, registerPlayback } from "@/lib/playback-coordinator";

interface InstagramCardProps {
  id: string;
  ratio: number;
  index: number;
  horizontal?: boolean;
  selected?: boolean;
  onSelectionChange?: (id: string, selected: boolean) => void;
  onResumeCarousel?: () => void;
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

export function InstagramCard({ id, ratio, horizontal = false, selected = false, onSelectionChange, onResumeCarousel }: InstagramCardProps) {
  const [started, setStarted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const playbackRequest = useRef<ReturnType<typeof claimPlayback> | null>(null);
  const hasLocal = LOCAL_VIDEOS.has(id);
  const isCarousel = CAROUSELS.has(id);
  const localCount = LOCAL_CAROUSELS[id] ?? 0;
  const slides = localCount
    ? Array.from({ length: localCount }, (_, i) => `/instagram-carousels/${id}_${i}.jpg`)
    : [`/instagram-covers/${id}.jpg`];
  const [slide, setSlide] = useState(0);
  const go = (d: number) =>
    setSlide((s) => (s + d + slides.length) % slides.length);

  useEffect(() => registerPlayback(`instagram-${id}`, {
    stop: () => { playbackRequest.current = null; videoRef.current?.pause(); },
  }), [id]);

  useEffect(() => {
    if (!selected) {
      playbackRequest.current = null;
      videoRef.current?.pause();
      setStarted(false);
      setModalOpen(false);
    }
  }, [selected]);

  useEffect(() => {
    if (!started) return;
    const video = videoRef.current;
    if (!video || !playbackRequest.current?.current()) return;
    video.muted = false;
    video.volume = 1;
    void video.play().catch(() => {});
  }, [started]);

  useEffect(() => {
    if (!modalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModalOpen(false);
        onSelectionChange?.(id, false);
      }
      if (event.key === "Tab") {
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>("button, a[href]");
        const first = nodes?.[0];
        const last = nodes?.[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", keydown);
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [modalOpen, id, onSelectionChange]);

  const start = () => {
    onSelectionChange?.(id, true);
    playbackRequest.current = claimPlayback(`instagram-${id}`, videoRef.current ?? undefined);
    setStarted(true);
  };

  const openPhoto = () => {
    if (hasLocal) {
      start();
    } else {
      onSelectionChange?.(id, true);
      setSlide(0);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    onSelectionChange?.(id, false);
  };

  const finishVideo = () => {
    playbackRequest.current = null;
    videoRef.current?.pause();
    setStarted(false);
    onSelectionChange?.(id, false);
  };

  return (
    <>
      <div
        style={horizontal ? undefined : { aspectRatio: ratio }}
        className={`relative w-full rounded-[12px] border border-border bg-background overflow-hidden ${horizontal ? "h-full" : "break-inside-avoid mb-1 sm:mb-1.5 lg:mb-2"}`}
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
            onPlay={() => {
              onSelectionChange?.(id, true);
              playbackRequest.current = claimPlayback(`instagram-${id}`, videoRef.current ?? undefined);
            }}
            onEnded={finishVideo}
            onContextMenu={(e) => e.preventDefault()}
            className="absolute inset-0 w-full h-full object-cover bg-media"
          />
        ) : hasLocal ? (
          <Button
            variant="ghost"
            ref={triggerRef}
            type="button"
            onClick={start}
            className="group absolute inset-0 w-full h-full cursor-pointer p-0 rounded-none"
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
            <div className="absolute inset-0 bg-media/20 group-hover:bg-media/30 transition-colors" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid place-items-center size-12 rounded-full bg-background/90 text-foreground shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
                <Play className="size-4 fill-current ml-0.5" />
              </span>
            </div>
          </Button>
        ) : (
          <Button
            variant="ghost"
            ref={triggerRef}
            type="button"
            onClick={openPhoto}
            className="group absolute inset-0 w-full h-full cursor-pointer p-0 rounded-none"
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
            <div className="absolute inset-0 bg-media/10 group-hover:bg-media/25 transition-colors" />
            {isCarousel && (
              <div className="absolute top-3 right-3 grid place-items-center size-8 rounded-full bg-media/60 text-media-foreground backdrop-blur-sm">
                <Images className="size-4" />
              </div>
            )}
          </Button>
        )}
        {hasLocal && started && (
          <Button data-media-close variant="ghost" size="icon" onClick={finishVideo} aria-label="Fechar vídeo" title="Fechar vídeo" className="absolute right-3 top-3 rounded-full bg-media/60 text-media-foreground hover:bg-media/80">
            <X />
          </Button>
        )}
      </div>

      {modalOpen && createPortal((
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-media/90 backdrop-blur-sm p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={`Publicação ${id}`}
        >
          <Button
            variant="ghost"
            ref={closeRef}
            type="button"
            onClick={closeModal}
            className="absolute top-4 right-4 grid place-items-center size-11 rounded-full bg-background/10 text-media-foreground hover:bg-background/20 transition-colors"
            aria-label="Fechar"
          >
            <X className="size-5" />
          </Button>
          {onResumeCarousel && (
            <Button variant="ghost" size="icon" onClick={onResumeCarousel} aria-label="Retomar carrossel" title="Retomar carrossel" className="absolute top-4 left-4 rounded-full bg-background/10 text-media-foreground hover:bg-background/20">
              <Play />
            </Button>
          )}

          <div
            className="relative flex flex-col items-center gap-4 max-w-3xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full overflow-hidden rounded-[16px] bg-media shadow-2xl max-h-[75vh]">
              <img
                src={slides[slide]}
                alt=""
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-full object-contain max-h-[75vh]"
              />
              {slides.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center size-10 rounded-full bg-media/60 text-media-foreground hover:bg-media/80 transition-colors"
                  >
                    <ChevronLeft className="size-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Próxima"
                    className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center size-10 rounded-full bg-media/60 text-media-foreground hover:bg-media/80 transition-colors"
                  >
                    <ChevronRight className="size-5" />
                  </Button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-media/70 px-3 py-1 text-xs text-media-foreground backdrop-blur-sm">
                    {slide + 1} / {slides.length}
                  </div>
                </>
              )}
              {isCarousel && slides.length === 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-media/70 px-4 py-1.5 text-sm text-media-foreground backdrop-blur-sm">
                  <Images className="size-4" />
                  <span>Carrossel</span>
                </div>
              )}
            </div>
            <a
              href={`https://www.instagram.com/p/${id}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-media-foreground/20 bg-media-foreground/10 px-5 py-2.5 text-sm text-media-foreground hover:bg-media-foreground/20 transition-colors shrink-0"
            >
              <Instagram className="size-4" />
              {isCarousel ? "Ver carrossel completo" : "Ver no Instagram"}
            </a>
          </div>


        </div>
      ), document.body)}
    </>
  );
}






