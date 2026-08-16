import { useEffect, useState } from "react";

let reduced = false;
if (typeof window !== "undefined") {
  reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useParallax(speed = 0.2) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let raf = null;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setOffset(window.scrollY * speed);
        raf = null;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return offset;
}

export function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}
