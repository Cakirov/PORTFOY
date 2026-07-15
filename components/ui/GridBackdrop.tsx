import { cn } from "@/lib/utils";

interface GridBackdropProps {
  className?: string;
}

/**
 * Full-bleed technical grid over the page's flat base color — the same
 * even, unmasked 40px grid used across the Blueprint mockups (`.grid-bg`),
 * not faded or scaled. Pure CSS, no canvas/WebGL.
 */
export function GridBackdrop({ className }: GridBackdropProps) {
  return (
    <div
      className={cn("grid-bg pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    />
  );
}
