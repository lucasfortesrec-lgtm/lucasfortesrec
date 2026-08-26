import { useEffect, useRef, useState } from "react";

export type Brand = { name: string; src: string; scale?: string };

export default function BrandsMarquee({ brands }: { brands: Brand[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [userPaused, setUserPaused] = useState(false);
  const userPausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const dragRef = useRef<{ active: boolean; startX: number; startScroll: number }>({
    active: false,
    startX: 0,
    startScroll: 0,
  });

  useEffect(() => {
    const el = scrollerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    let raf = 0;
    let last = performance.now();
    const speed = 28; // px per second

    const centerOnMiddleCopy = () => {
      const width = track.offsetWidth;
      if (width > 0) el.scrollLeft = width;
    };

    centerOnMiddleCopy();
    const resizeObserver = new ResizeObserver(centerOnMiddleCopy);
    resizeObserver.observe(track);

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const width = track.offsetWidth;

      // Keep the viewport inside the middle copy. The neighboring copies are
      // identical, so this coordinate correction is visually imperceptible.
      if (width > 0) {
        while (el.scrollLeft >= width * 2) el.scrollLeft -= width;
        while (el.scrollLeft < width) el.scrollLeft += width;
      }

      if (!pausedRef.current && !dragRef.current.active) {
        el.scrollLeft += speed * dt;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const pauseForTouchMomentum = () => {
    pausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 220);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    // Touch/pen use native momentum scrolling — only mouse gets manual drag
    if (!el || e.pointerType !== "mouse") return;
    dragRef.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el || !dragRef.current.active || e.pointerType !== "mouse") return;
    el.scrollLeft = dragRef.current.startScroll - (e.clientX - dragRef.current.startX);
  };

  const endDrag = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    dragRef.current.active = false;
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  return (
    <div className="relative mt-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32 bg-gradient-to-l from-background to-transparent" />
      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onTouchStart={pauseForTouchMomentum}
        onTouchMove={pauseForTouchMomentum}
        onTouchEnd={pauseForTouchMomentum}
        className="flex overflow-x-auto overscroll-x-contain touch-pan-x cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {[0, 1, 2].map((dup) => (
          <div
            key={dup}
            ref={dup === 0 ? trackRef : undefined}
            className="flex shrink-0"
            aria-hidden={dup !== 1}
          >
            {brands.map((brand) => (
              <div
                key={`${dup}-${brand.name}`}
                className="mx-3 flex h-24 w-44 md:h-28 md:w-56 shrink-0 items-center justify-center rounded-[16px] border border-border bg-bone/[0.04] px-6"
              >
                <img
                  src={brand.src}
                  alt={`Logo ${brand.name}`}
                  loading="lazy"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className={`${brand.scale ?? "max-h-10 md:max-h-12 max-w-[70%]"} w-auto object-contain opacity-70 transition duration-300 hover:opacity-100`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
