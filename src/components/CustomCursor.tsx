import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const mousePos = useRef({ x: typeof window !== "undefined" ? window.innerWidth / 2 : 0, y: typeof window !== "undefined" ? window.innerHeight / 2 : 0 });
  const cursorPos = useRef({ x: mousePos.current.x, y: mousePos.current.y });
  const ringPos = useRef({ x: mousePos.current.x, y: mousePos.current.y });
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Small delay to ensure DOM is fully painted and avoid hydration flicker
    const readyTimer = setTimeout(() => setIsReady(true), 50);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);
    const onMouseDown = () => {
      if (cursorRef.current) cursorRef.current.classList.add("cursor-press");
      if (ringRef.current) ringRef.current.classList.add("cursor-press");
    };
    const onMouseUp = () => {
      if (cursorRef.current) cursorRef.current.classList.remove("cursor-press");
      if (ringRef.current) ringRef.current.classList.remove("cursor-press");
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    const animate = () => {
      const easeCursor = 0.22;
      const easeRing = 0.12;

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
      clearTimeout(readyTimer);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor fixed top-0 left-0 z-[9999] pointer-events-none rounded-full transition-opacity duration-300 ${
          isReady && isVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring fixed top-0 left-0 z-[9998] pointer-events-none rounded-full transition-opacity duration-300 ${
          isReady && isVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
    </>
  );
}
