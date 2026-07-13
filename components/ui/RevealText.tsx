"use client";

import { motion } from "framer-motion";
import { revealWord, staggerContainer } from "@/lib/motion";
import { splitWords, cn } from "@/lib/utils";

interface RevealTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  id?: string;
  /** Delay before the stagger sequence begins (seconds). */
  delay?: number;
  /** Fraction of the element that must be in view before animating (0-1). */
  amount?: number;
}

const MOTION_TAG = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
} as const;

/**
 * Word-by-word staggered reveal, used by every heading in the site so the
 * "headline reveal" motion language stays identical everywhere.
 */
export function RevealText({
  text,
  as = "h2",
  className,
  id,
  delay = 0,
  amount = 0.6,
}: RevealTextProps) {
  const MotionTag = MOTION_TAG[as];
  const words = splitWords(text);

  return (
    <MotionTag
      id={id}
      className={cn("overflow-hidden", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={staggerContainer(0.06, delay)}
    >
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span className="inline-block" variants={revealWord}>
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </span>
      <span className="sr-only">{text}</span>
    </MotionTag>
  );
}
