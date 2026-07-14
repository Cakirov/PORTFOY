import type { Transition, Variants } from "framer-motion";

/**
 * Shared animation vocabulary. Every section pulls easing/duration/variants
 * from here instead of inventing bespoke values, so the whole site reads
 * as one controlled animation system rather than a different effect per element.
 */
export const EASE_STANDARD: Transition["ease"] = [0.16, 1, 0.3, 1];

export const DURATION = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
};

export const transitionBase: Transition = {
  duration: DURATION.base,
  ease: EASE_STANDARD,
};

// Note: these describe state only (no baked-in `transition`) so a consuming
// component can pass its own `transition` prop — incl. a per-instance delay —
// without it being silently overridden by a variant-level transition.
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const heroEntrance: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export const heroTransition = (delay = 0): Transition => ({
  duration: 0.7,
  ease: EASE_STANDARD,
  delay,
});
