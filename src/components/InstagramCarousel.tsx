import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstagramCard } from "@/components/InstagramCard";
import { stopAllPlayback } from "@/lib/playback-coordinator";

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
  const [explicitMotion, setExplicitMotion] = useState(false);
  const [motionRevision, setMotionRevision] = useState(0);
  const regionRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const directionRef = useRef<"forward" | "backward">("forward");
  const gestureRef = useRef<{ x: number; y: number } | null>(null);
  const autoScroll = useRef(AutoScroll({
    direction: "forward",
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
    resumeTimer.current = setTimeout(() => setNavigating(false), 600);
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
      if (!navigating && autoScroll.current.options.direction !== directionRef.current) {
        // Official plugin options + reInit; restore the fractional drag-free position
        // because Embla normally reInit-snaps to the selected slide.
        const engine = api.internalEngine();
        const position = engine.location.get();
        autoScroll.current.options.direction = directionRef.current;
        api.reInit(undefined, [autoScroll.current]);
        const next = api.internalEngine();
        next.location.set(position);
        next.previousLocation.set(position);
        next.offsetLocation.set(position);
        next.target.set(position);
        next.translate.to(position);
        next.slideLooper.loop();
      }
      if (!selectedId && !userPaused && (!reducedMotion || explicitMotion) && visible && documentVisible && !navigating) {
        autoScroll.current.play(0);
      } else {
        autoScroll.current.stop();
      }
      setMoving(autoScroll.current.isPlaying());
    };
    syncMotion();
    api.on("reInit", syncMotion);
    return () => { api.off("reInit", syncMotion); };
  }, [api, selectedId, userPaused, reducedMotion, explicitMotion, visible, documentVisible, navigating, motionRevision]);

  const resume = useCallback(() => {
    clearTimeout(resumeTimer.current);
    void stopAllPlayback();
    setSelectedId(null);
    setUserPaused(false);
    setNavigating(false);
    setExplicitMotion(true);
    // Reconcile even if a plugin interaction stopped motion without changing React state.
    setMotionRevision(value => value + 1);
  }, []);

  const toggleMotion = () => {
    if (autoScroll.current.isPlaying()) {
      clearTimeout(resumeTimer.current);
      autoScroll.current.stop();
      setUserPaused(true);
      setNavigating(false);
    } else {
      resume();
    }
  };

  const navigate = (direction: number) => {
    if (!api) return;
    autoScroll.current.stop();
    directionRef.current = direction < 0 ? "backward" : "forward";
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
        <Button variant="outline" size="icon" className="rounded-full text-muted-foreground hover:text-foreground" onClick={toggleMotion} aria-label={moving ? "Pausar carrossel" : "Retomar carrossel"} title={moving ? "Pausar carrossel" : "Retomar carrossel"} aria-pressed={moving}>
          {moving ? <Pause /> : <Play />}
        </Button>
        <Button variant="outline" size="icon" className="rounded-full text-muted-foreground hover:text-foreground" onClick={() => navigate(1)} aria-label="Próximos cards" title="Próximos cards">
          <ChevronRight />
        </Button>
      </div>
      <div ref={viewportRef}
        onPointerDownCapture={(event) => {
          if (event.target instanceof Element && event.target.closest("video, [data-media-close]")) return;
          gestureRef.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerMoveCapture={(event) => {
          const previous = gestureRef.current;
          if (!previous) return;
          const dx = event.clientX - previous.x;
          const dy = event.clientY - previous.y;
          if (Math.abs(dx) > 2 && Math.abs(dx) > Math.abs(dy)) {
            directionRef.current = dx > 0 ? "backward" : "forward";
            gestureRef.current = { x: event.clientX, y: event.clientY };
          }
        }}
        onPointerUpCapture={() => { gestureRef.current = null; }}
        onPointerCancelCapture={() => { gestureRef.current = null; }}
        className="instagram-carousel-viewport overflow-hidden cursor-grab active:cursor-grabbing">
        <div className="instagram-carousel-track flex items-stretch gap-2 md:gap-3">
          {posts.map(({ id, ratio }, index) => (
            <div key={id} data-instagram-id={id} role="group" aria-roledescription="slide" aria-label={`${index + 1} de ${posts.length}`} style={{ "--media-ratio": ratio } as CSSProperties} className="instagram-carousel-slide relative min-w-0 shrink-0">
              <InstagramCard id={id} ratio={ratio} index={index} selected={selectedId === id} onSelectionChange={selectMedia} onResumeCarousel={resume} horizontal />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}