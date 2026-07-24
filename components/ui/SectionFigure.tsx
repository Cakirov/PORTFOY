import { cn } from "@/lib/utils";

interface SectionFigureProps {
  /** e.g. "03" — reuses the same figure numbering already threaded through each section's <Masthead>. */
  figure: string;
  className?: string;
}

/**
 * Large, low-opacity decorative section numeral — foreground-layer
 * furniture for the inter-section transition zones. Purely presentational
 * and non-interactive. Hidden below `xl` (1280px): below that width
 * `container-max` isn't capping the content column yet, so there's no real
 * outer gutter for a 112–192px numeral to live in without overlapping the
 * Masthead/heading text — better to not show it than to have it collide.
 */
export function SectionFigure({ figure, className }: SectionFigureProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute hidden font-mono-ui font-bold text-accent/[0.06] select-none",
        "text-[7rem] leading-none md:text-[12rem]",
        "top-10 right-[clamp(1rem,4vw,3rem)]",
        "xl:block",
        className,
      )}
    >
      {figure}
    </span>
  );
}
