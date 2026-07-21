"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeInUp, transitionBase } from "@/lib/motion";
import { cn } from "@/lib/utils";

const REVEAL_TAGS = {
  div: motion.div,
  p: motion.p,
  span: motion.span,
  li: motion.li,
} satisfies Record<string, unknown>;

type RevealTag = keyof typeof REVEAL_TAGS;

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  amount?: number;
  /** Vertical travel distance in px for the default fade+rise — ignored if
      `variants` is passed explicitly. Lets body text use a smaller distance
      (~12–20px) than the default fadeInUp without a bespoke variants object. */
  distance?: number;
  /** Rendered element — defaults to "div"; use "p"/"span"/"li" so a reveal
      never has to wrap plain text/list-item content in an extra div. */
  as?: RevealTag;
}

/**
 * Generic scroll-triggered reveal wrapper built on Framer's `whileInView`.
 * Used across sections instead of bespoke IntersectionObservers per component.
 */
export function ScrollReveal({
  children,
  className,
  variants,
  delay = 0,
  amount = 0.15,
  distance,
  as = "div",
}: ScrollRevealProps) {
  const Component = REVEAL_TAGS[as];
  const effectiveVariants: Variants =
    variants ?? (distance !== undefined ? { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0 } } : fadeInUp);

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ ...transitionBase, delay }}
      variants={effectiveVariants}
    >
      {children}
    </Component>
  );
}
