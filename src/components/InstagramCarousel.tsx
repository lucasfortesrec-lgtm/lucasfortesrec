import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstagramCard } from "@/components/InstagramCard";

interface InstagramCarouselProps {
  posts: { id: string; ratio: number }[];
}

export function InstagramCarousel({ posts }: InstagramCarouselProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [visible, setVisible] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [navigating, setNavigating] = useState(false);
  const [moving, setMoving] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const autoScroll = useRef(AutoScroll({
    speed: 0.65, playOnInit: false, stopOnInteraction: true,
    stopOnMouseEnter: false, stopOnFocusIn: false, startDelay: 0,
  }));
  const [viewportRef, api] = useEmblaCarousel({
    loop: true, align: "start", dragFree: true, duration: 20,
    watchDrag: (_api, event) => !(event.target instanceof Element && event.target.closest("video, [data-media-close]")),
  }, [autoScroll.current]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(query.matches);
    const updateVisibility = () => setDocumentVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    query.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? false), { threshold: 0.15 });
    if (regionRef.current) observer.observe(regionRef.current);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  const deferResume = useCallback(() => {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setNavigating(false), 1400);
  }, []);

  useEffect(() => {
    if (!api) return;
    const down = () => {
      clearTimeout(resumeTimer.current);
      autoScroll.current.stop();
      setNavigating(true);
    };
    const playing = () => setMoving(true);
    const stopped = () => setMoving(false);
    api.on("pointerDown", down).on("pointerUp", deferResume)
      .on("autoScroll:play", playing).on("autoScroll:stop", stopped);
    return () => {
      clearTimeout(resumeTimer.current);
      api.off("pointerDown", down).off("pointerUp", deferResume)
        .off("autoScroll:play", playing).off("autoScroll:stop", stopped);
    };
  }, [api, deferResume]);

  useEffect(() => {
    if (!api) return;
    const syncMotion = () => {
      if (!selectedId && !userPaused && !reducedMotion && visible && documentVisible && !navigating) {
        autoScroll.current.play(0);
      } else {
        autoScroll.current.stop();
      }
    };
    syncMotion();
    api.on("reInit", syncMotion);
    return () => { api.off("reInit", syncMotion); };
  }, [api, selectedId, userPaused, reducedMotion, visible, documentVisible, navigating]);

  const navigate = (direction: number) => {
    if (!api) return;
    autoScroll.current.stop();
    setNavigating(true);
    if (direction < 0) api.scrollPrev(reducedMotion);
    else api.scrollNext(reducedMotion);
    deferResume();
  };

  const selectMedia = useCallback((id: string, selected: boolean) => {
    if (selected) autoScroll.current.stop();
    setSelectedId(current => selected ? id : current === id ? null : current);
  }, []);

  return (
    <div ref={regionRef} role="region" aria-roledescription="carrossel" aria-label="Publicações do Instagram" data-moving={moving} className="min-w-0">
      <div className="mb-4 flex justify-end gap-2">
        <Button variant="outline" size="icon" className="rounded-full text-muted-foreground hover:text-foreground" onClick={() => navigate(-1)} aria-label="Cards anteriores" title="Cards anteriores">
          <ChevronLeft />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full text-muted-foreground hover:text-foreground" onClick={() => setUserPaused(value => !value)} aria-label={userPaused ? "Retomar carrossel" : "Pausar carrossel"} title={userPaused ? "Retomar carrossel" : "Pausar carrossel"} aria-pressed={userPaused}>
          {userPaused ? <Play /> : <Pause />}
        </Button>
        <Button variant="outline" size="icon" className="rounded-full text-muted-foreground hover:text-foreground" onClick={() => navigate(1)} aria-label="Próximos cards" title="Próximos cards">
          <ChevronRight />
        </Button>
      </div>
      <div ref={viewportRef} className="instagram-carousel-viewport overflow-hidden cursor-grab active:cursor-grabbing">
        <div className="instagram-carousel-track flex items-stretch gap-2 md:gap-3">
          {posts.map(({ id, ratio }, index) => (
            <div key={id} data-instagram-id={id} role="group" aria-roledescription="slide" aria-label={`${index + 1} de ${posts.length}`} style={{ "--media-ratio": ratio } as CSSProperties} className="instagram-carousel-slide relative min-w-0 shrink-0">
              <InstagramCard id={id} ratio={ratio} index={index} selected={selectedId === id} onSelectionChange={selectMedia} horizontal />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}