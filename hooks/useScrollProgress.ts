"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

/**
 * Page-level scroll progress (0 → 1), smoothed with a spring.
 *
 * Deliberately not built on Framer's target-less `useScroll()`: that hook
 * measures against `document.documentElement`'s current scrollable range,
 * which briefly collapses to ~0 while `IntroLoader`'s iOS-safe body-scroll
 * lock has `body` pinned to `position: fixed` (removing its content from
 * normal flow). A scrollY/range division against that collapsed range
 * reports a meaningless, maxed-out ratio — the bar renders fully filled the
 * instant the page loads, then visibly drops back down once the lock lifts
 * and the next real scroll/resize event recomputes against the page's true
 * height. This recomputes the ratio itself and simply ignores updates while
 * the range looks degenerate, so the displayed value holds at its last real
 * reading (0, at first mount) instead of spiking and correcting.
 */
export function useScrollProgress() {
  const progress = useMotionValue(0);

  useEffect(() => {
    function update() {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      if (range < 50) return;
      progress.set(Math.min(1, Math.max(0, window.scrollY / range)));
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progress]);

  return useSpring(progress, {
    stiffness: 280,
    damping: 40,
    mass: 0.2,
  });
}
