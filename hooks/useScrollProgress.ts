"use client";

import { useScroll, useSpring } from "framer-motion";

/** Page-level scroll progress (0 → 1), smoothed with a spring. */
export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  return useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 40,
    mass: 0.2,
  });
}
