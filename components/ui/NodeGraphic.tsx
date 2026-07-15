"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_STANDARD } from "@/lib/motion";

export type NodeGraphicVariant = "nodes" | "mesh" | "flow" | "grid";

/** Shared "draw the wire in" treatment for connector paths across every variant. */
function wireDrawProps(index = 0) {
  return {
    initial: { pathLength: 0 } as const,
    whileInView: { pathLength: 1 } as const,
    viewport: { once: true, amount: 0.5 } as const,
    transition: { duration: 0.9, ease: EASE_STANDARD, delay: 0.15 + index * 0.08 },
  };
}

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
interface PortConfig {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  dot?: { cx: number; cy: number };
  label: string;
  labelX: number;
  labelY: number;
  active: boolean;
}

const NODE_PORTS: PortConfig[] = [
  { id: "api", x: 20, y: 130, w: 76, h: 42, dot: { cx: 30, cy: 140 }, label: "API", labelX: 42, labelY: 156, active: true },
  { id: "auth", x: 20, y: 42, w: 76, h: 42, dot: { cx: 30, cy: 52 }, label: "AUTH", labelX: 42, labelY: 68, active: false },
  { id: "queue", x: 20, y: 242, w: 76, h: 42, dot: { cx: 30, cy: 252 }, label: "QUEUE", labelX: 42, labelY: 268, active: false },
  { id: "core", x: 150, y: 130, w: 76, h: 46, label: "CORE", labelX: 168, labelY: 158, active: true },
  { id: "edge", x: 270, y: 82, w: 76, h: 42, dot: { cx: 336, cy: 92 }, label: "EDGE", labelX: 284, labelY: 108, active: true },
  { id: "store", x: 270, y: 202, w: 76, h: 42, dot: { cx: 336, cy: 212 }, label: "STORE", labelX: 284, labelY: 228, active: false },
];

/** Wire segments in the "nodes" diagram, each naming the two ports it connects. */
interface WireConfig {
  id: string;
  d: string;
  connects: [string, string];
}

const NODE_WIRES: WireConfig[] = [
  { id: "api-core", d: "M96,151 H150", connects: ["api", "core"] },
  { id: "auth-core", d: "M96,63 H122 V140 H150", connects: ["auth", "core"] },
  { id: "queue-core", d: "M96,263 H122 V166 H150", connects: ["queue", "core"] },
  { id: "core-edge", d: "M226,140 H252 V103 H270", connects: ["core", "edge"] },
  { id: "core-store", d: "M226,165 H252 V223 H270", connects: ["core", "store"] },
];

export function NodeGraphic({ variant = "nodes", accent = "primary", className }: NodeGraphicProps) {
  const colorClass = accent === "primary" ? "text-accent" : "text-secondary";
  const [hoveredPort, setHoveredPort] = useState<string | null>(null);

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      className={cn("h-full w-full", colorClass, className)}
      aria-hidden="true"
    >
      {variant === "nodes" && (
        <g>
          <g fill="none" strokeWidth={1}>
            {NODE_WIRES.map((wire, i) => (
              <motion.path
                key={wire.id}
                d={wire.d}
                className={cn(
                  "transition-[stroke] duration-500 ease-out",
                  hoveredPort && wire.connects.includes(hoveredPort)
                    ? "stroke-accent"
                    : "stroke-border-strong",
                )}
                {...wireDrawProps(i)}
              />
            ))}
          </g>
          {/* Small glowing "data packets" that keep drifting along the wires
              once the diagram has finished drawing itself in — a continuous
              ambient sign of life rather than a one-shot entrance. Plain SMIL
              (no React state) so it never fights the port hover/entrance
              animations layered on top. */}
          <g>
            {NODE_WIRES.map((wire, i) => {
              const beginAt = `${1.3 + i * 0.4}s`;
              return (
                <circle
                  key={`packet-${wire.id}`}
                  r={2.4}
                  fill="currentColor"
                  opacity={0}
                  style={{ filter: "drop-shadow(0 0 3px currentColor)" }}
                >
                  {/* Pop-in exactly when the motion starts, instead of sitting
                      visible at the SVG's own 0,0 origin until `begin` hits. */}
                  <animate
                    attributeName="opacity"
                    from="0"
                    to="0.9"
                    dur="0.01s"
                    begin={beginAt}
                    fill="freeze"
                  />
                  <animateMotion
                    dur={`${2.6 + (i % 3) * 0.6}s`}
                    begin={beginAt}
                    repeatCount="indefinite"
                    path={wire.d}
                  />
                </circle>
              );
            })}
          </g>
          {/* Each port is an independent sibling <g>, so the plain (unnamed)
              group/group-hover pair below never crosses between ports. Ports
              pop in one by one just behind the wires drawing in, and active
              ports keep a slow "alive" pulse afterward. */}
          {NODE_PORTS.map((port, i) => {
            const entranceDelay = 0.25 + i * 0.08;
            return (
              <motion.g
                key={port.id}
                className="group"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease: EASE_STANDARD, delay: entranceDelay }}
                onMouseEnter={() => setHoveredPort(port.id)}
                onMouseLeave={() => setHoveredPort((current) => (current === port.id ? null : current))}
              >
                <rect
                  x={port.x}
                  y={port.y}
                  width={port.w}
                  height={port.h}
                  className={cn(
                    "fill-bg-elevated transition-[fill,stroke] duration-500 ease-out group-hover:fill-accent-soft group-hover:stroke-accent",
                    port.active ? "stroke-accent" : "stroke-text-tertiary",
                  )}
                  strokeWidth={port.active ? 1.5 : 1}
                />
                {port.dot ? (
                  <motion.circle
                    cx={port.dot.cx}
                    cy={port.dot.cy}
                    r="3"
                    className={cn(
                      "transition-[fill,stroke] duration-500 ease-out group-hover:fill-accent group-hover:stroke-accent",
                      port.active ? "fill-accent" : "fill-none stroke-text-tertiary",
                    )}
                    {...(port.active
                      ? {
                          animate: { opacity: [1, 0.45, 1] },
                          transition: {
                            duration: 2.4,
                            ease: "easeInOut",
                            repeat: Infinity,
                            delay: entranceDelay + 0.6,
                          },
                        }
                      : {})}
                  />
                ) : null}
                <text
                  x={port.labelX}
                  y={port.labelY}
                  fontSize="12"
                  fontFamily="var(--font-mono)"
                  className={cn(
                    "transition-[fill] duration-500 ease-out group-hover:fill-accent",
                    port.active ? "fill-accent" : "fill-text-tertiary",
                  )}
                >
                  {port.label}
                </text>
              </motion.g>
            );
          })}
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
          <motion.path
            d="M40,200 H140 V100 H240 V300 H360"
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth={1.25}
            {...wireDrawProps()}
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
