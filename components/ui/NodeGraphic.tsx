import { cn } from "@/lib/utils";

export type NodeGraphicVariant = "nodes" | "mesh" | "flow" | "grid";

interface NodeGraphicProps {
  variant?: NodeGraphicVariant;
  accent?: "primary" | "secondary";
  className?: string;
}

/**
 * Abstract, procedurally-composed technical schematics — port/wire diagrams
 * in the blueprint visual language used throughout the site. Pure inline
 * SVG so there is no external image dependency; coordinates are fixed (not
 * randomized at render) to stay identical between server and client output.
 */
export function NodeGraphic({ variant = "nodes", accent = "primary", className }: NodeGraphicProps) {
  const colorClass = accent === "primary" ? "text-accent" : "text-secondary";

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      className={cn("h-full w-full", colorClass, className)}
      aria-hidden="true"
    >
      {variant === "nodes" && (
        <g>
          <g stroke="var(--border-strong)" strokeWidth={1}>
            <path d="M84,148 H150" />
            <path d="M84,60 H110 V158 H150" />
            <path d="M84,260 H110 V180 H150" />
            <path d="M214,165 H240 V100 H270" />
            <path d="M214,178 H240 V220 H270" />
          </g>
          <rect x="20" y="130" width="64" height="36" fill="var(--bg-elevated)" stroke="currentColor" strokeWidth={1.5} />
          <circle cx="30" cy="140" r="2.5" fill="currentColor" />
          <text x="40" y="152" fontSize="10" fill="currentColor" fontFamily="var(--font-mono)">API</text>

          <rect x="20" y="42" width="64" height="36" fill="var(--bg-elevated)" stroke="var(--text-tertiary)" strokeWidth={1} />
          <circle cx="30" cy="52" r="2.5" fill="none" stroke="var(--text-tertiary)" />
          <text x="34" y="64" fontSize="10" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">AUTH</text>

          <rect x="20" y="242" width="64" height="36" fill="var(--bg-elevated)" stroke="var(--text-tertiary)" strokeWidth={1} />
          <circle cx="30" cy="252" r="2.5" fill="none" stroke="var(--text-tertiary)" />
          <text x="30" y="264" fontSize="10" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">QUEUE</text>

          <rect x="150" y="130" width="64" height="40" fill="var(--bg-elevated)" stroke="currentColor" strokeWidth={1.5} />
          <text x="164" y="154" fontSize="10" fill="currentColor" fontFamily="var(--font-mono)">CORE</text>

          <rect x="270" y="82" width="64" height="36" fill="var(--bg-elevated)" stroke="currentColor" strokeWidth={1.5} />
          <circle cx="324" cy="92" r="2.5" fill="currentColor" />
          <text x="282" y="104" fontSize="10" fill="currentColor" fontFamily="var(--font-mono)">EDGE</text>

          <rect x="270" y="202" width="64" height="36" fill="var(--bg-elevated)" stroke="var(--text-tertiary)" strokeWidth={1} />
          <circle cx="324" cy="212" r="2.5" fill="none" stroke="var(--text-tertiary)" />
          <text x="278" y="224" fontSize="10" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">STORE</text>
        </g>
      )}

      {variant === "grid" && (
        <g>
          <g stroke="var(--border)" strokeWidth={1}>
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 60} y1={0} x2={i * 60} y2={400} />
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={`h${i}`} x1={0} y1={i * 60} x2={400} y2={i * 60} />
            ))}
          </g>
          <rect x="150" y="150" width="60" height="60" fill="none" stroke="currentColor" strokeWidth={1.5} />
          <circle cx="150" cy="150" r={4} fill="currentColor" />
          <circle cx="300" cy="120" r={3.5} fill="none" stroke="var(--text-tertiary)" />
          <circle cx="120" cy="300" r={3.5} fill="none" stroke="var(--text-tertiary)" />
        </g>
      )}

      {variant === "mesh" && (
        <g>
          <rect x="60" y="60" width="280" height="280" fill="none" stroke="var(--border-strong)" strokeWidth={1} />
          <line x1="60" y1="200" x2="340" y2="200" stroke="var(--border-strong)" strokeWidth={1} />
          <circle cx="60" cy="60" r={4} fill="currentColor" />
          <circle cx="340" cy="340" r={3.5} fill="none" stroke="var(--text-tertiary)" />
          <text x="72" y="82" fontSize="10" fill="currentColor" fontFamily="var(--font-mono)">IN</text>
          <text x="300" y="330" fontSize="10" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">OUT</text>
        </g>
      )}

      {variant === "flow" && (
        <g>
          <path
            d="M40,200 H140 V100 H240 V300 H360"
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth={1.25}
          />
          <circle cx="40" cy="200" r={5} fill="currentColor" />
          <circle cx="240" cy="100" r={3.5} fill="none" stroke="var(--text-tertiary)" />
          <circle cx="360" cy="300" r={5} fill="currentColor" fillOpacity={0.85} />
          <text x="20" y="222" fontSize="10" fill="currentColor" fontFamily="var(--font-mono)">A</text>
          <text x="352" y="322" fontSize="10" fill="currentColor" fontFamily="var(--font-mono)">B</text>
        </g>
      )}
    </svg>
  );
}
