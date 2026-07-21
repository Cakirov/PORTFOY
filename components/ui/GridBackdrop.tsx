import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { cn } from "@/lib/utils";

interface GridBackdropProps {
  className?: string;
  /** Adds the "background" layer's scroll-linked drift to the pattern —
      texture only, never content. `ParallaxLayer` owns the reduced-motion
      gating and mobile scaling; this component only owns the visual texture. */
  parallax?: boolean;
}

/**
 * Full-bleed technical grid over the page's flat base color — the same
 * even, unmasked 40px grid used across the Blueprint mockups (`.grid-bg`),
 * not faded or scaled. Pure CSS, no canvas/WebGL.
 */
export function GridBackdrop({ className, parallax = false }: GridBackdropProps) {
  const grid = <div className={cn("grid-bg pointer-events-none absolute inset-0", className)} aria-hidden="true" />;

  if (!parallax) return grid;

  return (
    <ParallaxLayer layer="background" className="pointer-events-none absolute inset-0">
      {grid}
    </ParallaxLayer>
  );
}
