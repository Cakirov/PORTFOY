import { cn } from "@/lib/utils";

interface GridBackdropProps {
  className?: string;
}

/**
 * Full-bleed technical grid + a single static accent glow — the same even,
 * unmasked 40px grid used across the Blueprint mockups (`.grid-bg`), not
 * faded or scaled. Pure CSS, no canvas/WebGL.
 */
export function GridBackdrop({ className }: GridBackdropProps) {
  return (
    <div
      className={cn("grid-bg pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    >
      <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-mesh)" }} />
    </div>
  );
}
