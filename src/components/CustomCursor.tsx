import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    const animate = () => {
      const easeCursor = 0.18;
      const easeRing = 0.1;

      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * easeCursor;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * easeCursor;

      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * easeRing;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * easeRing;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (typeof window === "undefined") return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor fixed top-0 left-0 z-[9999] pointer-events-none rounded-full transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring fixed top-0 left-0 z-[9998] pointer-events-none rounded-full transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
    </>
  );
}
