"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface GridBackdropProps {
  className?: string;
  /** Adds a very small vertical scroll-linked drift (±20px) to the pattern —
      background texture only, never content. Disabled under
      prefers-reduced-motion: raw scroll-linked transforms bypass
      MotionConfig's automatic reduced-motion downgrade, so this is gated
      by hand (same pattern as MagneticWrapper). */
  parallax?: boolean;
}

/**
 * Full-bleed technical grid over the page's flat base color — the same
 * even, unmasked 40px grid used across the Blueprint mockups (`.grid-bg`),
 * not faded or scaled. Pure CSS, no canvas/WebGL.
 */
export function GridBackdrop({ className, parallax = false }: GridBackdropProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const enableParallax = parallax && !prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20px", "20px"]);

  return (
    <motion.div
      ref={ref}
      className={cn("grid-bg pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
      style={enableParallax ? { y } : undefined}
    />
  );
}
