"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { SHEET_INDEX } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * In-page section navigator styled as a "data flow" instrument: a
 * continuously flowing dashed signal line runs behind a column of port
 * nodes; the active node pulses; labels ride out as a readout tag on
 * per-node hover.
 */
export function SheetIndexRail() {
  const activeId = useActiveSection(SHEET_INDEX.map((s) => s.id));

  return (
    <nav
      aria-label="Sayfa içi hızlı erişim"
      className="fixed top-1/2 left-6 z-[55] hidden -translate-y-1/2 font-mono-ui lg:block"
    >
      <div className="relative flex flex-col gap-[1.35rem] pl-[0.3rem]">
        <div
          aria-hidden="true"
          className="absolute top-[-6px] bottom-[-6px] left-[3px] w-px animate-rail-flow opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, var(--text-tertiary) 0 3px, transparent 3px 9px)",
            backgroundSize: "1px 24px",
          }}
        />
        {SHEET_INDEX.map((sheet) => {
          const isActive = activeId === sheet.id;
          return (
            <a
              key={sheet.id}
              href={`#${sheet.id}`}
              className="group relative flex items-center leading-none text-text-tertiary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "relative z-10 h-[7px] w-[7px] flex-shrink-0 rounded-full border transition-[background-color,border-color,transform] duration-[250ms]",
                  isActive
                    ? "animate-rail-pulse border-accent bg-accent"
                    : "border-text-tertiary bg-bg group-hover:scale-[1.3] group-hover:border-accent",
                )}
              />
              <span
                className={cn(
                  "absolute top-1/2 left-full ml-[0.6rem] translate-x-1 -translate-y-1/2 border border-border-strong bg-bg-elevated px-[0.55rem] py-[0.2rem] text-[0.62rem] tracking-wide whitespace-nowrap text-text-primary opacity-0 transition-[opacity,transform] duration-200",
                  isActive && "translate-x-0 border-accent opacity-100",
                  "group-hover:translate-x-0 group-hover:opacity-100",
                )}
              >
                <span className="mr-[0.15rem] text-accent">{sheet.num}</span>
                {sheet.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
