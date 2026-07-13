"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { EASE_STANDARD, DURATION } from "@/lib/motion";

/**
 * Global animation context: `reducedMotion="user"` is the central
 * prefers-reduced-motion switch — every Framer Motion animation in the app
 * is automatically downgraded when the OS setting is on, so individual
 * components don't need to re-check it themselves.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: DURATION.base, ease: EASE_STANDARD }}>
      {children}
    </MotionConfig>
  );
}
