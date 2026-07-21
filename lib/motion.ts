import type { Transition, Variants } from "framer-motion";

/**
 * Central motion-token system — every duration/easing/distance/stagger/
 * spring value in the site traces back to this one object instead of each
 * component inventing its own. The named exports below (`EASE_STANDARD`,
 * `DURATION`, etc.) are aliases *derived from* motionTokens, kept only so
 * the many existing call sites didn't all need touching in one commit —
 * there is exactly one source of truth, not two parallel systems.
 */
export const motionTokens = {
  duration: { fast: 0.2, normal: 0.45, slow: 0.8 },
  easing: {
    // Reserved for the new premium-reveal system (AnimatedHeading, ParallaxLayer).
    smooth: [0.22, 1, 0.36, 1],
    // The site's existing, unchanged micro-interaction curve.
    soft: [0.16, 1, 0.3, 1],
  },
  distance: { small: 12, medium: 28, large: 56 },
  stagger: { line: 0.08, item: 0.06, section: 0.1 },
  // Scroll-linked parallax ranges per layer, in percent — background barely
  // perceptible, foreground slightly faster for depth, content in between.
  parallax: {
    background: [-4, 4] as [number, number],
    content: [3, -3] as [number, number],
    foreground: [8, -8] as [number, number],
  },
  spring: {
    snappy: { stiffness: 280, damping: 32, mass: 0.3 },
    soft: { stiffness: 200, damping: 26, mass: 0.4 },
  },
} as const;

export const EASE_STANDARD: Transition["ease"] = motionTokens.easing.soft as unknown as Transition["ease"];
export const EASE_SMOOTH: Transition["ease"] = motionTokens.easing.smooth as unknown as Transition["ease"];

export const DURATION = {
  fast: motionTokens.duration.fast,
  base: motionTokens.duration.normal,
  slow: motionTokens.duration.slow,
};

export const transitionBase: Transition = {
  duration: DURATION.base,
  ease: EASE_STANDARD,
};

// Note: describes state only (no baked-in `transition`) so a consuming
// component can pass its own `transition` prop — incl. a per-instance delay —
// without it being silently overridden by a variant-level transition.
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: motionTokens.distance.small },
  visible: { opacity: 1, y: 0 },
};

export const heroTransition = (delay = 0): Transition => ({
  duration: motionTokens.duration.normal,
  ease: EASE_SMOOTH,
  delay,
});
