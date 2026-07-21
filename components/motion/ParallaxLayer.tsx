"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionTokens } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ParallaxLayerName = "background" | "content" | "foreground";

interface ParallaxLayerProps {
  children: ReactNode;
  /** Which of the three motion-token ranges to use — background drifts
      slowest (barely perceptible), foreground fastest (for depth), content
      in between. Ignored if `range` is passed explicitly. */
  layer?: ParallaxLayerName;
  /** Explicit [low, high] percent override instead of the layer default. */
  range?: [number, number];
  className?: string;
  /** Range is scaled down (not removed) below 768px — same "reduce, don't
      delete" rule the brief asked for. */
  mobileScale?: number;
}

/**
 * Scroll-linked vertical drift wrapper — the shared mechanics behind every
 * background/content/foreground layer on the site. Raw `useScroll`/
 * `useTransform` values bypass MotionConfig's automatic reduced-motion
 * downgrade, so this gates itself manually via `useReducedMotion()` (same
 * pattern GridBackdrop's own parallax already used, which now delegates to
 * this component internally instead of duplicating the logic).
 */
export function ParallaxLayer({ children, layer = "content", range, className, mobileScale = 0.4 }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");

  const [lo, hi] = range ?? motionTokens.parallax[layer];
  const scale = isMobile ? mobileScale : 1;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${lo * scale}%`, `${hi * scale}%`]);

  return (
    <motion.div ref={ref} className={cn(className)} style={prefersReducedMotion ? undefined : { y }}>
      {children}
    </motion.div>
  );
}
