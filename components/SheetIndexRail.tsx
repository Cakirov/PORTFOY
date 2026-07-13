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
      className="fixed top-1/2 left-6 z-50 hidden -translate-y-1/2 font-mono-ui min-[1720px]:block"
    >
      <div className="relative flex flex-col gap-5 pl-1">
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
              className="group relative flex items-center leading-none text-text-tertiary"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "relative z-10 h-[7px] w-[7px] flex-shrink-0 rounded-full border transition-transform duration-200",
                  isActive
                    ? "animate-rail-pulse border-accent bg-accent"
                    : "border-text-tertiary bg-bg group-hover:scale-[1.3] group-hover:border-accent",
                )}
              />
              <span
                className={cn(
                  "absolute left-full ml-2.5 translate-x-1 border border-border-strong bg-bg-elevated px-2.5 py-0.5 text-[0.62rem] tracking-wide whitespace-nowrap text-text-primary opacity-0 transition-all duration-200",
                  isActive && "translate-x-0 border-accent opacity-100",
                  "group-hover:translate-x-0 group-hover:opacity-100",
                )}
              >
                <span className="mr-1 text-accent">{sheet.num}</span>
                {sheet.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
