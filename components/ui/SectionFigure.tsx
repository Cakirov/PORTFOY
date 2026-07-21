import { cn } from "@/lib/utils";

interface SectionFigureProps {
  /** e.g. "03" — reuses the same figure numbering already threaded through each section's <Masthead>. */
  figure: string;
  className?: string;
}

/**
 * Large, low-opacity decorative section numeral — foreground-layer
 * furniture for the inter-section transition zones. Purely presentational
 * and non-interactive; wrap in `<ParallaxLayer layer="foreground">` for the
 * slight faster-than-content drift, and position it away from readable
 * text via `className` (the caller owns placement).
 */
export function SectionFigure({ figure, className }: SectionFigureProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute font-mono-ui font-bold text-accent/[0.06] select-none",
        "text-[7rem] leading-none md:text-[12rem]",
        className,
      )}
    >
      {figure}
    </span>
  );
}
