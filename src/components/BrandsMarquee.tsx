import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export type Brand = { name: string; src: string; scale?: string };

export default function BrandsMarquee({ brands }: { brands: Brand[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const userPausedRef = useRef(false);
  const directionRef = useRef(1);
  const velocityRef = useRef(0);
  const motionAllowedRef = useRef(false);
  const dragRef = useRef<{ active: boolean; pointerId: number; lastX: number; lastTime: number }>({
    active: false,
    pointerId: -1,
    lastX: 0,
    lastTime: 0,
  });

  useEffect(() => {
    const el = scrollerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    let raf = 0;
    let last = performance.now();
    let position = el.scrollLeft;
    const speed = 28; // px per second
    let visible = false;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateAllowed = () => { motionAllowedRef.current = visible && !document.hidden && !query.matches; };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      updateAllowed();
    });
    visibilityObserver.observe(el);
    query.addEventListener("change", updateAllowed);
    document.addEventListener("visibilitychange", updateAllowed);

    const centerOnMiddleCopy = () => {
      const width = track.offsetWidth;
      if (width > 0) el.scrollLeft = width;
    };

    centerOnMiddleCopy();
    const resizeObserver = new ResizeObserver(centerOnMiddleCopy);
    resizeObserver.observe(track);

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const width = track.offsetWidth;

      // Keep the viewport inside the middle copy. The neighboring copies are
      // identical, so this coordinate correction is visually imperceptible.
      if (width > 0) {
        while (el.scrollLeft >= width * 2) el.scrollLeft -= width;
        while (el.scrollLeft < width) el.scrollLeft += width;
      }

      if (!userPausedRef.current && !dragRef.current.active && motionAllowedRef.current) {
        // Retain subpixel travel: scrollLeft rounds small per-frame increments.
        if (Math.abs(el.scrollLeft - position) > 1) position = el.scrollLeft;
        position += (speed * directionRef.current + velocityRef.current) * dt;
        el.scrollLeft = position;
        velocityRef.current *= Math.exp(-6 * dt);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      query.removeEventListener("change", updateAllowed);
      document.removeEventListener("visibilitychange", updateAllowed);
    };
  }, []);

  const normalizeScrollPosition = (el: HTMLDivElement) => {
    const width = trackRef.current?.offsetWidth ?? 0;
    if (width <= 0) return;
    while (el.scrollLeft >= width * 2) el.scrollLeft -= width;
    while (el.scrollLeft < width) el.scrollLeft += width;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el) return;
    velocityRef.current = 0;
    dragRef.current = { active: true, pointerId: e.pointerId, lastX: e.clientX, lastTime: performance.now() };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el || !dragRef.current.active || dragRef.current.pointerId !== e.pointerId) return;
    const delta = e.clientX - dragRef.current.lastX;
    const now = performance.now();
    if (Math.abs(delta) > 1) {
      directionRef.current = delta > 0 ? -1 : 1;
      velocityRef.current = Math.max(-1400, Math.min(1400, -delta / Math.max(0.008, (now - dragRef.current.lastTime) / 1000)));
    }
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastTime = now;
    el.scrollLeft -= delta;
    normalizeScrollPosition(el);
  };

  const endDrag = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (dragRef.current.pointerId !== e.pointerId) return;
    dragRef.current = { active: false, pointerId: -1, lastX: 0, lastTime: 0 };
    if (el) normalizeScrollPosition(el);
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
        className="flex max-w-full overflow-x-hidden overscroll-x-none touch-pan-y cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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

      <div className="mt-6 hidden justify-center md:flex">
        <Button variant="outline"
          type="button"
          onClick={() => {
            const next = !userPausedRef.current;
            userPausedRef.current = next;
            setUserPaused(next);
          }}
          aria-pressed={userPaused}
          className="rounded-full border border-border px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-bone/60 transition duration-300 hover:text-bone hover:border-bone/40"
        >
          {userPaused ? "Retomar" : "Pausar"}
        </Button>
      </div>
    </div>
  );
}
