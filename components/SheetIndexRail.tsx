"use client";

import { motion } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { SHEET_INDEX } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * In-page section navigator styled as a blueprint scale bar (the same tick
 * ruler language as ScaleBar.tsx): a vertical rule fills top-down with
 * overall page scroll progress, each section gets a tick + name label
 * (jump-to-section anchor), and the active tick carries a small pulsing dot.
 */
export function SheetIndexRail() {
  const activeId = useActiveSection(SHEET_INDEX.map((s) => s.id));
  const activeIndex = SHEET_INDEX.findIndex((s) => s.id === activeId);
  const progress = useScrollProgress();

  return (
    <nav
      aria-label="Sayfa içi hızlı erişim"
      className="fixed top-1/2 left-6 z-[55] hidden -translate-y-1/2 font-mono-ui lg:block"
    >
      <div className="relative flex flex-col gap-[1.35rem] pl-[0.3rem]">
        {/* Base (unfilled) rule, full height. */}
        <div aria-hidden="true" className="absolute top-[-6px] bottom-[-6px] left-[3px] w-px bg-border-strong" />
        {/* Fills top-down as the page scrolls — the "ruler" reads progress. */}
        <motion.div
          aria-hidden="true"
          className="absolute top-[-6px] left-[3px] h-[calc(100%+12px)] w-px origin-top bg-accent"
          style={{ scaleY: progress }}
        />

        {SHEET_INDEX.map((sheet, i) => {
          const isActive = activeId === sheet.id;
          const isPassed = activeIndex >= 0 && i <= activeIndex;
          return (
            <a
              key={sheet.id}
              href={`#${sheet.id}`}
              className="group relative flex items-center leading-none text-text-tertiary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "relative z-10 h-px w-3 flex-shrink-0 transition-colors duration-[250ms]",
                  isPassed ? "bg-accent" : "bg-text-tertiary group-hover:bg-accent",
                )}
              />
              {isActive ? (
                <span
                  aria-hidden="true"
                  className="animate-rail-pulse absolute top-1/2 left-0 z-10 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent bg-accent"
                />
              ) : null}
              <span
                className={cn(
                  "absolute top-1/2 left-full ml-[0.6rem] translate-x-1 -translate-y-1/2 border border-border-strong bg-bg-elevated px-[0.55rem] py-[0.2rem] text-[0.62rem] tracking-wide whitespace-nowrap text-text-primary opacity-0 transition-[opacity,transform] duration-200",
                  isActive && "translate-x-0 border-accent text-accent opacity-100",
                  "group-hover:translate-x-0 group-hover:opacity-100",
                )}
              >
                {sheet.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
