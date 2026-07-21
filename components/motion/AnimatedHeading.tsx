"use client";

import { motion, type Variants } from "framer-motion";
import { motionTokens, EASE_SMOOTH } from "@/lib/motion";
import { cn } from "@/lib/utils";

type HeadingTag = "h1" | "h2" | "h3" | "span";

const CONTAINER_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  span: motion.span,
} satisfies Record<HeadingTag, unknown>;

interface AnimatedHeadingProps {
  /** One entry per masked line. A plain string with no line breaks renders
      as a single line — this component works identically to a plain
      heading in that case, multi-line is opt-in via `heading.split("\n")`. */
  lines: string[];
  as?: HeadingTag;
  delay?: number;
  stagger?: number;
  /** "mount": plays once on mount (above-the-fold headings like Hero's).
      "viewport": plays the first time it scrolls into view (default, used
      by every other section). */
  trigger?: "mount" | "viewport";
  once?: boolean;
  className?: string;
  lineClassName?: string;
  id?: string;
}

const lineVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: motionTokens.duration.slow, ease: EASE_SMOOTH },
  },
};

/**
 * Premium masked heading reveal: each line sits in its own overflow-hidden
 * mask and rises up through it, instead of a plain fade-in. A single
 * `initial`/`animate` (or `whileInView`) on the container drives every line
 * via variant stagger — one trigger for the whole heading, not one per line.
 * Line offset is percentage-based (not px) so it fully clears the mask
 * regardless of the heading's own clamp()-driven responsive font size.
 */
export function AnimatedHeading({
  lines,
  as = "h2",
  delay = 0,
  stagger = motionTokens.stagger.line,
  trigger = "viewport",
  once = true,
  className,
  lineClassName,
  id,
}: AnimatedHeadingProps) {
  const Container = CONTAINER_TAGS[as];
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const triggerProps =
    trigger === "mount"
      ? { initial: "hidden", animate: "visible" }
      : { initial: "hidden", whileInView: "visible", viewport: { once, amount: 0.4 } };

  return (
    <Container id={id} className={className} variants={containerVariants} {...triggerProps}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span className={cn("block", lineClassName)} variants={lineVariants}>
            {line}
          </motion.span>
        </span>
      ))}
    </Container>
  );
}
