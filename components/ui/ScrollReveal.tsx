"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeInUp, transitionBase } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  amount?: number;
}

/**
 * Generic scroll-triggered reveal wrapper built on Framer's `whileInView`.
 * Used across sections instead of bespoke IntersectionObservers per component.
 */
export function ScrollReveal({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
  amount = 0.3,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ ...transitionBase, delay }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
