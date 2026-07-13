import { cn } from "@/lib/utils";

interface GridBackdropProps {
  className?: string;
}

/**
 * Ambient full-bleed background: a faint grid texture plus a slow-drifting
 * gradient mesh. Pure CSS — no canvas/WebGL, cheap to render, respects
 * prefers-reduced-motion via the .animate-slow-drift rule in globals.css.
 */
export function GridBackdrop({ className }: GridBackdropProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />
      <div
        className="animate-slow-drift absolute -inset-1/4"
        style={{ backgroundImage: "var(--gradient-mesh)" }}
      />
    </div>
  );
}
