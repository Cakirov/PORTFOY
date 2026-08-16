"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionTokens } from "@/lib/motion";

interface MagneticWrapperProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Wraps a CTA/button with a subtle pointer-follow offset, capped and spring-
 * returned to origin. Disabled on touch devices and under reduced motion.
 */
export function MagneticWrapper({ children, strength = 0.3, className }: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Cached on enter rather than re-measured on every pointermove — the
  // element's box doesn't move while the pointer is inside it.
  const rectRef = useRef<DOMRect | null>(null);
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, motionTokens.spring.soft);
  const springY = useSpring(y, motionTokens.spring.soft);

  const enabled = canHover && !prefersReducedMotion;

  function handlePointerEnter() {
    if (!enabled || !ref.current) return;
    rectRef.current = ref.current.getBoundingClientRect();
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!enabled || !rectRef.current) return;
    const rect = rectRef.current;
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    const maxOffset = 14;

    x.set(Math.max(-maxOffset, Math.min(maxOffset, offsetX * strength)));
    y.set(Math.max(-maxOffset, Math.min(maxOffset, offsetY * strength)));
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={enabled ? { x: springX, y: springY } : undefined}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.div>
  );
}
