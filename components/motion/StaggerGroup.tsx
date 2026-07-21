"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { cn } from "@/lib/utils";

const STAGGER_TAGS = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  dl: motion.dl,
} satisfies Record<string, unknown>;

type StaggerTag = keyof typeof STAGGER_TAGS;

interface StaggerGroupProps {
  /** Direct children should carry `variants={fadeInUp}` and nothing else
      (no own `initial`/`whileInView`/`transition`) — they inherit timing
      purely from this container, which is the point: one trigger driving
      the whole group instead of N independent ones per item. */
  children: ReactNode;
  as?: StaggerTag;
  stagger?: number;
  delayChildren?: number;
  /** "viewport" (default): plays the first time it scrolls into view — for
      sections. "mount": plays every time this component mounts — for
      transient UI like a mobile menu, which has no "viewport" to speak of
      (it's `fixed inset-0` already covering the screen when rendered). */
  trigger?: "viewport" | "mount";
  once?: boolean;
  amount?: number;
  className?: string;
}

export function StaggerGroup({
  children,
  as = "div",
  stagger = motionTokens.stagger.item,
  delayChildren = 0,
  trigger = "viewport",
  once = true,
  amount = 0.15,
  className,
}: StaggerGroupProps) {
  const Container = STAGGER_TAGS[as];
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  };
  const triggerProps =
    trigger === "mount"
      ? { initial: "hidden", animate: "visible" }
      : { initial: "hidden", whileInView: "visible", viewport: { once, amount } };

  return (
    <Container className={cn(className)} variants={containerVariants} {...triggerProps}>
      {children}
    </Container>
  );
}
