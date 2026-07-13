"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Thin wrapper around Framer Motion's own reduced-motion detection, for the
 * few places that need to branch behavior entirely (e.g. skip an ambient
 * background animation) rather than rely on MotionConfig's automatic
 * transform/opacity downgrade.
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
