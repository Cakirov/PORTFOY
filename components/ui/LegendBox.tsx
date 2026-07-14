import { cn } from "@/lib/utils";

/** Small symbol key explaining the schematic diagrams' visual language. */
export function LegendBox({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute -top-2 right-0 flex -translate-y-full flex-wrap gap-4 border border-border-strong bg-bg-elevated px-4 py-3 font-mono-ui text-[0.66rem] text-text-secondary",
        "max-lg:static max-lg:mb-6 max-lg:translate-y-0",
        className,
      )}
    >
      <span className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-accent" />
        AKTİF PORT
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full border border-text-tertiary" />
        PASİF PORT
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-0 w-4 border-t border-dashed border-border-strong" />
        VERİ AKIŞI
      </span>
    </div>
  );
}
