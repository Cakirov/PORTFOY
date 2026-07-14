import { cn } from "@/lib/utils";

/** Decorative ruler-style scale indicator, echoing a blueprint's scale bar. */
export function ScaleBar({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("mt-5 flex items-end gap-0", className)}>
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 w-6 border-b border-l border-text-tertiary",
            i === 5 && "border-r",
            i % 2 === 1 && "border-b-transparent",
          )}
        />
      ))}
      <span className="ml-[0.6rem] font-mono-ui text-[0.62rem] tracking-[0.06em] text-text-tertiary">
        0 — 50 — 100 SCALE
      </span>
    </div>
  );
}
