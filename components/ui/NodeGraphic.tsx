"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_STANDARD } from "@/lib/motion";
import { PROJECT_DIAGRAMS } from "@/components/ui/projectDiagrams";

/** Shared "draw the wire in" treatment for connector paths across every variant. */
function wireDrawProps(index = 0) {
  return {
    initial: { pathLength: 0 } as const,
    whileInView: { pathLength: 1 } as const,
    viewport: { once: true, amount: 0.5 } as const,
    transition: { duration: 0.9, ease: EASE_STANDARD, delay: 0.15 + index * 0.08 },
  };
}

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
  fontSize: number;
  /** Center the label horizontally instead of the default left-aligned start — used by the hub, whose label length varies (category code). */
  centered?: boolean;
  active: boolean;
}

/** Wire segments, each naming the two ports it connects. */
interface WireConfig {
  id: string;
  d: string;
  connects: string[];
}

// Default demo layout — used only when no project tech stack is supplied
// (Hero's standalone diagram). Every project card instead builds its own via
// buildStackLayout() below, so each project gets a distinct, relevant
// diagram instead of every project sharing this same fixed one.
const DEFAULT_PORTS: PortConfig[] = [
  { id: "api", x: 20, y: 130, w: 76, h: 42, dot: { cx: 30, cy: 140 }, label: "API", labelX: 42, labelY: 156, fontSize: 12, active: true },
  { id: "auth", x: 20, y: 42, w: 76, h: 42, dot: { cx: 30, cy: 52 }, label: "AUTH", labelX: 42, labelY: 68, fontSize: 12, active: false },
  { id: "queue", x: 20, y: 242, w: 76, h: 42, dot: { cx: 30, cy: 252 }, label: "QUEUE", labelX: 42, labelY: 268, fontSize: 12, active: false },
  { id: "core", x: 150, y: 130, w: 76, h: 46, label: "CORE", labelX: 168, labelY: 158, fontSize: 12, active: true },
  { id: "edge", x: 270, y: 82, w: 76, h: 42, dot: { cx: 336, cy: 92 }, label: "EDGE", labelX: 284, labelY: 108, fontSize: 12, active: true },
  { id: "store", x: 270, y: 202, w: 76, h: 42, dot: { cx: 336, cy: 212 }, label: "STORE", labelX: 284, labelY: 228, fontSize: 12, active: false },
];

const DEFAULT_WIRES: WireConfig[] = [
  { id: "api-core", d: "M96,151 H150", connects: ["api", "core"] },
  { id: "auth-core", d: "M96,63 H122 V140 H150", connects: ["auth", "core"] },
  { id: "queue-core", d: "M96,263 H122 V166 H150", connects: ["queue", "core"] },
  { id: "core-edge", d: "M226,140 H252 V103 H270", connects: ["core", "edge"] },
  { id: "core-store", d: "M226,165 H252 V223 H270", connects: ["core", "store"] },
];

// Geometry for the data-driven layout (buildStackLayout). Wider boxes than
// the default's let real technology names (e.g. "TYPESCRIPT", "KUBERNETES")
// sit fully spelled out instead of needing heavy truncation.
const PORT_W = 120;
const PORT_H = 40;
const LEFT_X = 12;
const RIGHT_X = 400 - LEFT_X - PORT_W;
const HUB_W = 80;
const HUB_H = 48;
const HUB_X = (400 - HUB_W) / 2;
const HUB_Y = (400 - HUB_H) / 2;
const HUB_CY = HUB_Y + HUB_H / 2;

function columnYs(count: number): number[] {
  if (count === 0) return [];
  const gap = 24;
  const totalH = count * PORT_H + (count - 1) * gap;
  const startY = (400 - totalH) / 2;
  return Array.from({ length: count }, (_, i) => startY + i * (PORT_H + gap));
}

function buildSidePort(id: string, rawLabel: string, x: number, y: number, active: boolean): PortConfig {
  return {
    id,
    x,
    y,
    w: PORT_W,
    h: PORT_H,
    dot: { cx: x + 9, cy: y + PORT_H / 2 },
    label: rawLabel.toUpperCase().slice(0, 18),
    labelX: x + 19,
    labelY: y + PORT_H / 2 + 4,
    fontSize: 10,
    active,
  };
}

/**
 * Turns a project's own tech stack into a port/wire diagram: every project
 * has a different `technologies` list, so every diagram is both unique and
 * actually describes that project instead of picking from a handful of
 * generic canned patterns shared across unrelated projects.
 */
function buildStackLayout(techLabels: string[], hubLabel: string) {
  const items = techLabels.slice(0, 6);
  const leftCount = Math.ceil(items.length / 2);
  const leftLabels = items.slice(0, leftCount);
  const rightLabels = items.slice(leftCount);
  const leftYs = columnYs(leftLabels.length);
  const rightYs = columnYs(rightLabels.length);

  const leftPorts = leftLabels.map((label, i) => buildSidePort(`left-${i}`, label, LEFT_X, leftYs[i], i % 2 === 0));
  const rightPorts = rightLabels.map((label, i) => buildSidePort(`right-${i}`, label, RIGHT_X, rightYs[i], i % 2 === 0));

  const hubPort: PortConfig = {
    id: "hub",
    x: HUB_X,
    y: HUB_Y,
    w: HUB_W,
    h: HUB_H,
    label: hubLabel.toUpperCase().slice(0, 6),
    labelX: HUB_X + HUB_W / 2,
    labelY: HUB_CY + 4,
    fontSize: 13,
    centered: true,
    active: true,
  };

  const leftWires: WireConfig[] = leftLabels.map((_, i) => {
    const portCy = leftYs[i] + PORT_H / 2;
    const midX = LEFT_X + PORT_W + (HUB_X - (LEFT_X + PORT_W)) / 2;
    return {
      id: `left-${i}-hub`,
      d: `M${LEFT_X + PORT_W},${portCy} H${midX} V${HUB_CY} H${HUB_X}`,
      connects: [`left-${i}`, "hub"],
    };
  });

  const rightWires: WireConfig[] = rightLabels.map((_, i) => {
    const portCy = rightYs[i] + PORT_H / 2;
    const midX = HUB_X + HUB_W + (RIGHT_X - (HUB_X + HUB_W)) / 2;
    return {
      id: `right-${i}-hub`,
      d: `M${RIGHT_X},${portCy} H${midX} V${HUB_CY} H${HUB_X + HUB_W}`,
      connects: [`right-${i}`, "hub"],
    };
  });

  return {
    ports: [...leftPorts, hubPort, ...rightPorts],
    wires: [...leftWires, ...rightWires],
  };
}

interface NodeGraphicProps {
  /** A project's slug — when it matches a bespoke composition in
      projectDiagrams.tsx, that hand-designed diagram is used instead of any
      generic layout below, so the card's visual is actually shaped around
      what that specific project is. */
  slug?: string;
  /** A project's own tech stack — used to build a generic (non-bespoke)
      diagram for any slug without a dedicated composition yet, so a future
      project never falls back all the way to Hero's static demo. */
  techLabels?: string[];
  /** Short code shown in the generic layout's center hub (e.g. a category code). */
  hubLabel?: string;
  accent?: "primary" | "secondary";
  className?: string;
}

/**
 * Technical schematics in the blueprint visual language used throughout the
 * site. Pure inline SVG so there is no external image dependency; every
 * coordinate is computed deterministically from props (not randomized at
 * render) to stay identical between server and client output.
 *
 * Three tiers, in priority order: a bespoke per-project composition
 * (projectDiagrams.tsx) when `slug` matches one; otherwise a generic diagram
 * built from that project's own tech stack (`techLabels`); otherwise the
 * fixed default demo layout (Hero, which has no project of its own).
 */
export function NodeGraphic({ slug, techLabels, hubLabel = "CORE", accent = "primary", className }: NodeGraphicProps) {
  const colorClass = accent === "primary" ? "text-accent" : "text-secondary";
  const [hoveredPort, setHoveredPort] = useState<string | null>(null);

  const Bespoke = slug ? PROJECT_DIAGRAMS[slug] : undefined;
  const { ports, wires } =
    !Bespoke && techLabels && techLabels.length > 0
      ? buildStackLayout(techLabels, hubLabel)
      : { ports: DEFAULT_PORTS, wires: DEFAULT_WIRES };

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      className={cn("h-full w-full", colorClass, className)}
      aria-hidden="true"
    >
      {Bespoke ? (
        <Bespoke />
      ) : (
      <g>
        <g fill="none" strokeWidth={1}>
          {wires.map((wire, i) => (
            <motion.path
              key={wire.id}
              d={wire.d}
              className={cn(
                "transition-[stroke] duration-500 ease-out",
                hoveredPort && wire.connects.includes(hoveredPort) ? "stroke-accent" : "stroke-border-strong",
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
          {wires.map((wire, i) => {
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
        {ports.map((port, i) => {
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
                fontSize={port.fontSize}
                textAnchor={port.centered ? "middle" : undefined}
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
    </svg>
  );
}
