"use client";

import { motion } from "framer-motion";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * Bespoke, per-project schematics — one hand-composed diagram per real
 * project instead of a shared template with swapped-in labels, so each
 * card's visual is actually shaped around what that project is (a
 * correlation engine, a lock, a search glyph, ...), not just re-labelled.
 *
 * Every composition follows the same two rules so the set still reads as
 * one family despite each being conceptually distinct:
 *  - exactly one "hero" element/group uses the current color (via
 *    `-current` fill/stroke classes, so it still tracks each project's own
 *    primary/secondary accent) — everything else stays in the site's
 *    neutral structural tones (border-strong / text-tertiary / bg-elevated).
 *  - entrance motion reuses the same draw-in / pop-in / pulse vocabulary as
 *    the rest of the site instead of inventing bespoke easing per diagram.
 */

function drawIn(index = 0, duration = 0.9) {
  return {
    initial: { pathLength: 0 } as const,
    whileInView: { pathLength: 1 } as const,
    viewport: { once: true, amount: 0.5 } as const,
    transition: { duration, ease: EASE_STANDARD, delay: 0.1 + index * 0.12 },
  };
}

function popIn(index = 0) {
  return {
    initial: { opacity: 0, scale: 0.8 } as const,
    whileInView: { opacity: 1, scale: 1 } as const,
    viewport: { once: true, amount: 0.5 } as const,
    transition: { duration: 0.45, ease: EASE_STANDARD, delay: 0.25 + index * 0.1 },
  };
}

function fadeIn(delay = 0.1, duration = 1) {
  return {
    initial: { opacity: 0 } as const,
    whileInView: { opacity: 1 } as const,
    viewport: { once: true, amount: 0.5 } as const,
    transition: { duration, ease: EASE_STANDARD, delay },
  };
}

/** Slow "radar ping" ring — expands and fades, repeating, around a hero element. */
function PingRing({ cx, cy, r, delay = 1.2 }: { cx: number; cy: number; r: number; delay?: number }) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      className="stroke-current"
      strokeWidth={1.5}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
      initial={{ scale: 1, opacity: 0.65 }}
      animate={{ scale: 2.2, opacity: 0 }}
      transition={{ duration: 2.2, ease: "easeOut", repeat: Infinity, delay }}
    />
  );
}

// 01 — Project Nova: scattered telemetry signals correlating into one incident.
function NovaDiagram() {
  const traceY = [64, 152, 240, 328];
  const hub = { x: 326, y: 196 };
  const converge = [
    { x: 150, y: 64 },
    { x: 230, y: 152 },
    { x: 110, y: 240 },
    { x: 190, y: 328 },
  ];
  const blips = [
    { x: 70, y: 64, active: false },
    { x: 150, y: 64, active: true },
    { x: 260, y: 64, active: false },
    { x: 110, y: 152, active: false },
    { x: 230, y: 152, active: true },
    { x: 320, y: 152, active: false },
    { x: 60, y: 240, active: false },
    { x: 110, y: 240, active: true },
    { x: 300, y: 240, active: false },
    { x: 190, y: 328, active: true },
    { x: 270, y: 328, active: false },
  ];

  return (
    <>
      <g strokeWidth={1} className="stroke-border-strong">
        {traceY.map((y, i) => (
          <motion.line key={y} x1={24} y1={y} x2={376} y2={y} {...drawIn(i, 0.7)} />
        ))}
      </g>
      <g strokeWidth={1.25} className="stroke-current">
        {converge.map((p, i) => (
          <motion.line key={i} x1={p.x} y1={p.y} x2={hub.x} y2={hub.y} {...drawIn(i + 4, 0.6)} />
        ))}
      </g>
      {blips.map((b, i) => (
        <motion.circle
          key={i}
          cx={b.x}
          cy={b.y}
          r={b.active ? 3.4 : 2.2}
          className={b.active ? "fill-current" : "fill-none stroke-text-tertiary"}
          strokeWidth={1}
          {...popIn(i)}
        />
      ))}
      <motion.circle cx={hub.x} cy={hub.y} r={7} className="fill-current" {...popIn(8)} />
      <PingRing cx={hub.x} cy={hub.y} r={7} />
      <motion.text
        x={hub.x - 78}
        y={hub.y - 20}
        fontSize={10}
        fontFamily="var(--font-mono)"
        className="fill-current"
        {...fadeIn(1)}
      >
        INCIDENT
      </motion.text>
    </>
  );
}

// 02 — Atlas Commerce: independent modules feeding a single order/cart flow.
function AtlasDiagram() {
  const modules = [
    { label: "CATALOG", y: 56 },
    { label: "PAYMENT", y: 182 },
    { label: "INVENTORY", y: 308 },
  ];
  const busX = 168;
  const cartX = 260;

  return (
    <>
      {modules.map((m, i) => (
        <motion.g key={m.label} {...popIn(i)}>
          <rect x={20} y={m.y} width={110} height={36} className="fill-bg-elevated stroke-text-tertiary" strokeWidth={1} />
          <text x={32} y={m.y + 23} fontSize={10} fontFamily="var(--font-mono)" className="fill-text-tertiary">
            {m.label}
          </text>
        </motion.g>
      ))}
      <g className="stroke-border-strong" strokeWidth={1}>
        {modules.map((m, i) => (
          <motion.path key={m.label} d={`M130,${m.y + 18} H${busX}`} {...drawIn(i, 0.5)} />
        ))}
        <motion.line x1={busX} y1={74} x2={busX} y2={326} {...drawIn(3, 0.7)} />
      </g>
      <g className="stroke-current" strokeWidth={1.25}>
        <motion.path d={`M${busX},200 H${cartX + 20}`} {...drawIn(4, 0.6)} />
      </g>
      <motion.g {...popIn(4)} className="stroke-current" strokeWidth={1.5} fill="none">
        <path d={`M${cartX + 20},164 L${cartX + 100},164 L${cartX + 88},204 L${cartX + 36},204 Z`} />
        <circle cx={cartX + 50} cy={218} r={7} />
        <circle cx={cartX + 78} cy={218} r={7} />
      </motion.g>
    </>
  );
}

// 03 — Neural Workspace: source documents grounding a single cited answer.
function NeuralDiagram() {
  const docs = [
    { x: 30, y: 50 },
    { x: 30, y: 160 },
    { x: 30, y: 270 },
  ];
  const bubble = { x: 220, y: 140, w: 150, h: 90 };

  return (
    <>
      {docs.map((d, i) => (
        <motion.g key={i} {...popIn(i)} className="stroke-text-tertiary" strokeWidth={1} fill="none">
          <path d={`M${d.x},${d.y} H${d.x + 55} L${d.x + 70},${d.y + 15} V${d.y + 80} H${d.x} Z`} />
          <path d={`M${d.x + 55},${d.y} V${d.y + 15} H${d.x + 70}`} />
          {[18, 34, 50].map((dy) => (
            <line key={dy} x1={d.x + 10} y1={d.y + dy} x2={d.x + 60} y2={d.y + dy} />
          ))}
        </motion.g>
      ))}
      <g className="stroke-border-strong" strokeWidth={1} strokeDasharray="4 3">
        {docs.map((d, i) => (
          <motion.path key={i} d={`M${d.x + 70},${d.y + 40} H${bubble.x}`} {...drawIn(i, 0.6)} />
        ))}
      </g>
      <motion.g {...popIn(3)} className="stroke-current" strokeWidth={1.25}>
        <rect x={bubble.x} y={bubble.y} width={bubble.w} height={bubble.h} rx={14} className="fill-bg-elevated" />
        <path d={`M${bubble.x + 24},${bubble.y + bubble.h} l-16,18 l0,-18 Z`} className="fill-bg-elevated" />
        {[0, 1].map((row) => (
          <line
            key={row}
            x1={bubble.x + 20}
            y1={bubble.y + 34 + row * 20}
            x2={bubble.x + (row === 0 ? 120 : 90)}
            y2={bubble.y + 34 + row * 20}
          />
        ))}
      </motion.g>
    </>
  );
}

// 04 — Fleetwatch: vehicles tracked live along a route.
function FleetwatchDiagram() {
  const route = "M30,340 H110 V260 H200 V180 H300 V100 H370";
  const vehicles = [
    { x: 110, y: 300, active: false },
    { x: 200, y: 220, active: true },
    { x: 300, y: 140, active: false },
  ];
  const bars = [6, 11, 16];

  return (
    <>
      <motion.path d={route} fill="none" className="stroke-border-strong" strokeWidth={1.25} strokeDasharray="6 5" {...drawIn(0, 1)} />
      {vehicles.map((v, i) => (
        <motion.rect
          key={i}
          x={v.x - 6}
          y={v.y - 6}
          width={12}
          height={12}
          transform={`rotate(45 ${v.x} ${v.y})`}
          className={v.active ? "fill-current" : "fill-bg-elevated stroke-text-tertiary"}
          strokeWidth={1}
          {...popIn(i + 1)}
        />
      ))}
      <motion.g {...popIn(4)} className="stroke-current" strokeWidth={1.5}>
        {bars.map((h, i) => (
          <line key={i} x1={330 + i * 12} y1={330} x2={330 + i * 12} y2={330 - h * 4} />
        ))}
      </motion.g>
      <motion.text x={318} y={350} fontSize={9} fontFamily="var(--font-mono)" className="fill-text-tertiary" {...fadeIn(0.9)}>
        LIVE
      </motion.text>
    </>
  );
}

// 05 — Horizon Platform: a unified project timeline with a "now" marker.
function HorizonDiagram() {
  const bars = [
    { y: 50, w: 140, active: true },
    { y: 110, w: 220, active: false },
    { y: 170, w: 90, active: true },
    { y: 230, w: 260, active: false },
    { y: 290, w: 170, active: true },
  ];
  const axisX = 50;

  return (
    <>
      <motion.line x1={axisX} y1={30} x2={axisX} y2={350} className="stroke-border-strong" strokeWidth={1} {...drawIn(0, 0.8)} />
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={i} x1={axisX - 5} y1={40 + i * 60} x2={axisX + 5} y2={40 + i * 60} className="stroke-border-strong" strokeWidth={1} />
      ))}
      {bars.map((b, i) => (
        <motion.rect
          key={i}
          x={axisX}
          y={b.y}
          width={b.w}
          height={22}
          rx={4}
          fillOpacity={b.active ? 0.14 : 1}
          className={b.active ? "fill-current stroke-current" : "fill-bg-elevated stroke-text-tertiary"}
          strokeWidth={1}
          {...popIn(i + 1)}
        />
      ))}
      <motion.line
        x1={230}
        y1={30}
        x2={230}
        y2={350}
        className="stroke-current"
        strokeWidth={1.25}
        strokeDasharray="5 4"
        {...drawIn(1, 0.9)}
      />
      <motion.text x={236} y={44} fontSize={9} fontFamily="var(--font-mono)" className="fill-current" {...fadeIn(1)}>
        NOW
      </motion.text>
    </>
  );
}

// 06 — Compose: a small catalog grid of interchangeable UI components.
function ComposeDiagram() {
  return (
    <>
      <g className="stroke-border-strong" strokeWidth={1}>
        <motion.line x1={200} y1={30} x2={200} y2={370} {...drawIn(0, 0.6)} />
        <motion.line x1={30} y1={200} x2={370} y2={200} {...drawIn(1, 0.6)} />
        <rect x={30} y={30} width={340} height={340} fill="none" />
      </g>

      <motion.g {...popIn(0)} className="stroke-current" strokeWidth={1.25} fill="none">
        <rect x={65} y={100} width={100} height={34} rx={6} />
      </motion.g>

      <motion.g {...popIn(1)} className="stroke-current" strokeWidth={1.25} fill="none">
        <rect x={245} y={100} width={80} height={30} rx={15} />
        <circle cx={305} cy={115} r={10} className="fill-current" stroke="none" />
      </motion.g>

      <motion.g {...popIn(2)} className="stroke-text-tertiary" strokeWidth={1.25} fill="none">
        <rect x={65} y={260} width={120} height={32} />
        <line x1={78} y1={276} x2={150} y2={276} strokeWidth={1} />
      </motion.g>

      <motion.g {...popIn(3)} className="stroke-current" strokeWidth={1.25}>
        <rect x={245} y={260} width={26} height={26} fill="none" />
        <path d="M250,273 L260,282 L272,262" fill="none" strokeWidth={1.5} />
        <line x1={282} y1={273} x2={340} y2={273} className="stroke-text-tertiary" strokeWidth={1} />
      </motion.g>
    </>
  );
}

// 07 — AuthCore: a protected core with a few controlled access points.
function AuthCoreDiagram() {
  const body = { x: 160, y: 150, w: 80, h: 70 };
  const satellites = [
    { x: 90, y: 190, label: "SESSION" },
    { x: 310, y: 120, label: "MFA" },
    { x: 310, y: 260, label: "OAUTH" },
  ];
  const bodyCx = body.x + body.w / 2;
  const bodyCy = body.y + body.h / 2;

  return (
    <>
      <g className="stroke-border-strong" strokeWidth={1}>
        {satellites.map((s, i) => (
          <motion.line key={s.label} x1={s.x} y1={s.y} x2={bodyCx} y2={bodyCy} {...drawIn(i, 0.6)} />
        ))}
      </g>

      {satellites.map((s, i) => (
        <motion.circle key={s.label} cx={s.x} cy={s.y} r={5} className="fill-none stroke-text-tertiary" strokeWidth={1.25} {...popIn(i)} />
      ))}

      <motion.g {...popIn(3)} className="stroke-current">
        <path d={`M${body.x + 10},${body.y} A30,30 0 0 1 ${body.x + body.w - 10},${body.y}`} fill="none" strokeWidth={1.5} />
        <rect x={body.x} y={body.y} width={body.w} height={body.h} rx={8} className="fill-bg-elevated" strokeWidth={1.5} />
        <circle cx={bodyCx} cy={body.y + 28} r={6} className="fill-current" stroke="none" />
        <rect x={bodyCx - 4} y={body.y + 32} width={8} height={14} className="fill-current" stroke="none" />
      </motion.g>

      <PingRing cx={bodyCx} cy={bodyCy} r={body.w / 2} delay={1.1} />
    </>
  );
}

// 08 — Echo Notes: a spoken recording turning into checked-off action items.
function EchoNotesDiagram() {
  const bars = [18, 34, 52, 30, 46, 60, 28, 40, 20];
  const rows = [
    { y: 130, checked: true },
    { y: 190, checked: true },
    { y: 250, checked: false },
  ];

  return (
    <>
      <g className="stroke-current" strokeWidth={2.5} strokeLinecap="round">
        {bars.map((h, i) => (
          <motion.line key={i} x1={30 + i * 16} y1={200 - h / 2} x2={30 + i * 16} y2={200 + h / 2} {...drawIn(i, 0.4)} />
        ))}
      </g>

      <motion.path
        d="M185,200 H225 M215,192 L225,200 L215,208"
        fill="none"
        className="stroke-text-tertiary"
        strokeWidth={1.25}
        {...drawIn(9, 0.5)}
      />

      {rows.map((row, i) => (
        <motion.g key={i} {...popIn(i + 1)}>
          {row.checked ? (
            <path d={`M244,${row.y} L250,${row.y + 6} L262,${row.y - 8}`} fill="none" className="stroke-current" strokeWidth={1.75} />
          ) : (
            <rect x={242} y={row.y - 8} width={16} height={16} fill="none" className="stroke-text-tertiary" strokeWidth={1.25} />
          )}
          <line
            x1={272}
            y1={row.y}
            x2={row.checked ? 366 : 340}
            y2={row.y}
            className={row.checked ? "stroke-text-primary" : "stroke-text-tertiary"}
            strokeWidth={1}
          />
        </motion.g>
      ))}
    </>
  );
}

// 09 — Living Systems Lab: a fluctuating load curve with an adaptive band —
// deliberately drawn with organic curves instead of the rectilinear jogs used
// everywhere else, since this project is literally about adaptive systems.
function LivingSystemsDiagram() {
  const curvePath = "M30,200 Q80,110 130,190 Q180,270 230,170 Q280,70 330,220 Q350,240 370,150";
  const bandPath =
    "M30,200 Q80,110 130,190 Q180,270 230,170 Q280,70 330,220 Q350,240 370,150 " +
    "L370,210 Q350,300 330,280 Q280,130 230,230 Q180,330 130,250 Q80,170 30,260 Z";
  const markers = [
    { x: 130, y: 190 },
    { x: 230, y: 170 },
    { x: 330, y: 220 },
  ];

  return (
    <>
      <motion.path d={bandPath} className="fill-current" stroke="none" fillOpacity={0.12} {...fadeIn(0.1, 1)} />
      <motion.path d={curvePath} fill="none" className="stroke-current" strokeWidth={1.5} {...drawIn(0, 1.2)} />
      {markers.map((m, i) => (
        <motion.circle key={i} cx={m.x} cy={m.y} r={4} className="fill-current" {...popIn(i + 1)} />
      ))}
      <PingRing cx={markers[1].x} cy={markers[1].y} r={4} delay={1.4} />
    </>
  );
}

// 10 — Wayfinder: one semantic search glyph pulling together scattered sources.
function WayfinderDiagram() {
  const glass = { cx: 190, cy: 190, r: 55 };
  const sources = [
    { x: 60, y: 70 },
    { x: 320, y: 80 },
    { x: 210, y: 330 },
  ];

  return (
    <>
      <g className="stroke-border-strong" strokeWidth={1} strokeDasharray="4 4">
        {sources.map((s, i) => (
          <motion.line key={i} x1={s.x} y1={s.y} x2={glass.cx} y2={glass.cy} {...drawIn(i, 0.7)} />
        ))}
      </g>

      <motion.g {...popIn(0)} className="stroke-text-tertiary" strokeWidth={1} fill="none">
        <path
          d={`M${sources[0].x - 25},${sources[0].y - 30} H${sources[0].x + 15} L${sources[0].x + 25},${sources[0].y - 20} V${sources[0].y + 20} H${sources[0].x - 25} Z`}
        />
      </motion.g>

      <motion.g {...popIn(1)} className="stroke-text-tertiary" strokeWidth={1.5} fill="none">
        <path d={`M${sources[1].x - 15},${sources[1].y - 20} L${sources[1].x - 28},${sources[1].y} L${sources[1].x - 15},${sources[1].y + 20}`} />
        <path d={`M${sources[1].x + 15},${sources[1].y - 20} L${sources[1].x + 28},${sources[1].y} L${sources[1].x + 15},${sources[1].y + 20}`} />
      </motion.g>

      <motion.g {...popIn(2)} className="stroke-text-tertiary" strokeWidth={1} fill="none">
        <rect x={sources[2].x - 30} y={sources[2].y - 18} width={60} height={36} rx={8} />
      </motion.g>

      <motion.g {...popIn(3)} className="stroke-current" strokeWidth={1.75} fill="none">
        <circle cx={glass.cx} cy={glass.cy} r={glass.r} />
        <line x1={glass.cx + 39} y1={glass.cy + 39} x2={glass.cx + 68} y2={glass.cy + 68} strokeLinecap="round" />
      </motion.g>
    </>
  );
}

/** slug → bespoke diagram, keyed to today's placeholder project set (see data/projects.ts). */
export const PROJECT_DIAGRAMS: Record<string, () => React.JSX.Element> = {
  "project-nova": NovaDiagram,
  "atlas-commerce": AtlasDiagram,
  "neural-workspace": NeuralDiagram,
  fleetwatch: FleetwatchDiagram,
  "horizon-platform": HorizonDiagram,
  "compose-design-system": ComposeDiagram,
  authcore: AuthCoreDiagram,
  "echo-notes": EchoNotesDiagram,
  "living-systems-lab": LivingSystemsDiagram,
  wayfinder: WayfinderDiagram,
};
