import { cn } from "@/lib/utils";

interface MastheadProps {
  fig: string;
  name: string;
  view: string;
  sheet: string;
  className?: string;
}

/** Recurring per-section header strip: "FIG.0X — NAME · VIEW: X · SHEET X/8". */
export function Masthead({ fig, name, view, sheet, className }: MastheadProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border-strong pb-3.5 font-mono-ui text-[0.68rem] tracking-wide text-text-tertiary uppercase sm:mb-14",
        className,
      )}
    >
      <span>
        FIG. {fig} — <strong className="text-accent">{name}</strong>
      </span>
      <span className="text-text-secondary">VIEW: {view}</span>
      <span>SHEET {sheet}</span>
    </div>
  );
}
