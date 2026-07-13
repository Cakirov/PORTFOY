import type { Transition, Variants } from "framer-motion";

/**
 * Shared animation vocabulary. Every section pulls easing/duration/variants
 * from here instead of inventing bespoke values, so the whole site reads
 * as one controlled animation system rather than a different effect per element.
 */
export const EASE_STANDARD: Transition["ease"] = [0.16, 1, 0.3, 1];
export const EASE_ENTRANCE: Transition["ease"] = [0.22, 1, 0.36, 1];

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
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const revealWord: Variants = {
  hidden: { opacity: 0, y: "0.6em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_ENTRANCE },
  },
};

export const heroEntrance: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_ENTRANCE },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};
