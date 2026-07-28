"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";
import { SHEET_INDEX } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * In-page section navigator styled as a blueprint scale bar (the same tick
 * ruler language as ScaleBar.tsx): a vertical rule fills top-down as you
 * move through the sections, a soft glow rides its leading edge, each
 * section gets a tick + name label (jump-to-section anchor), and a single
 * shared active-indicator (same `layoutId` FLIP technique as the navbar's
 * active-link underline) glides between ticks as the active section
 * changes, instead of independently popping in/out at each one.
 *
 * The fill/glow track *which tick is active* (index-based), not raw
 * page-scroll distance — sections vary wildly in height (Projects alone
 * spans several screen heights because of its pinned card stack), so a
 * scroll-fraction fill visually disagreed with the active-section
 * indicator: the fill would race ahead of, or lag behind, whichever tick
 * was actually pulsing. Anchoring to index position instead guarantees the
 * two always agree, no matter how any one section's height changes.
 */
export function SheetIndexRail() {
  const activeId = useActiveSection(SHEET_INDEX.map((s) => s.id));
  const activeIndex = SHEET_INDEX.findIndex((s) => s.id === activeId);
  const targetFraction = activeIndex >= 0 ? activeIndex / (SHEET_INDEX.length - 1) : 0;

  const fraction = useMotionValue(0);
  const smoothFraction = useSpring(fraction, { stiffness: 260, damping: 32, mass: 0.4 });
  const glowTop = useTransform(smoothFraction, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    fraction.set(targetFraction);
  }, [fraction, targetFraction]);

  return (
    <nav
      aria-label="Sayfa içi hızlı erişim"
      className="fixed top-1/2 left-6 z-[55] hidden -translate-y-1/2 font-mono-ui lg:block"
    >
      <div className="relative flex flex-col gap-[1.35rem] pl-[0.3rem]">
        {/* Base (unfilled) rule, full height. */}
        <div aria-hidden="true" className="absolute top-[-6px] bottom-[-6px] left-[3px] w-px bg-border-strong" />
        {/* Fills top-down as the active section advances — a faint glow
            rides along the rule itself, not just the blob below, so the
            "read" line feels like one continuous glowing edge. */}
        <motion.div
          aria-hidden="true"
          className="absolute top-[-6px] left-[3px] h-[calc(100%+12px)] w-px origin-top bg-accent shadow-[0_0_6px_1px_rgba(255,122,51,0.45)]"
          style={{ scaleY: smoothFraction }}
        />
        {/* A soft glow riding the fill's leading edge — a "current position"
            cue, with a gentle breathing pulse so the rail reads as alive
            even while the page itself is momentarily still. */}
        <motion.div
          aria-hidden="true"
          className="absolute left-[3px] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-70 blur-[5px]"
          style={{ top: glowTop }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {SHEET_INDEX.map((sheet, i) => {
          const isActive = activeId === sheet.id;
          const isPassed = activeIndex >= 0 && i <= activeIndex;
          return (
            <motion.a
              key={sheet.id}
              href={`#${sheet.id}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
              className="group relative flex items-center leading-none text-text-tertiary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "relative z-10 h-px w-3 flex-shrink-0 origin-left transition-[background-color,transform] duration-(--motion-fast)",
                  isPassed ? "bg-accent" : "bg-text-tertiary group-hover:bg-accent",
                  "group-hover:scale-x-150",
                )}
              />
              {isActive ? (
                <motion.span
                  layoutId="rail-active-indicator"
                  aria-hidden="true"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="animate-rail-pulse absolute top-1/2 left-0 z-10 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent bg-accent"
                />
              ) : null}
              <span
                className={cn(
                  "absolute top-1/2 left-full ml-[0.6rem] translate-x-1 -translate-y-1/2 scale-95 border border-border-strong bg-bg-elevated px-[0.55rem] py-[0.2rem] text-[0.62rem] tracking-wide whitespace-nowrap text-text-primary opacity-0 transition-[opacity,transform] duration-(--motion-fast) ease-(--motion-ease-soft)",
                  isActive && "translate-x-0 scale-100 border-accent text-accent opacity-100",
                  "group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100",
                )}
              >
                {sheet.label}
              </span>
            </motion.a>
          );
        })}
      </div>
    </nav>
  );
}
