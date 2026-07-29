"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_STANDARD } from "@/lib/motion";

const SESSION_KEY = "intro-played";
const TICK_COUNT = 20;

type Phase = "pending" | "playing" | "exiting" | "done";

const BRACKETS = [
  "-top-3 -left-3 border-t border-l",
  "-top-3 -right-3 border-t border-r",
  "-bottom-3 -left-3 border-b border-l",
  "-bottom-3 -right-3 border-b border-r",
] as const;

/**
 * One-time "signal lock" boot sequence shown before the Hero on a visitor's
 * first page load this browser tab session (gated by `sessionStorage`, and
 * skipped entirely for `prefers-reduced-motion`). Purely decorative —
 * `aria-hidden`, with a single `role="status"` line for screen readers —
 * and never blocks longer than its own fixed timeline (~2s) even if a
 * visitor's device is slow to report the reduced-motion preference.
 */
export function IntroLoader() {
  const [phase, setPhase] = useState<Phase>("pending");
  const [count, setCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const rafRef = useRef<number | undefined>(undefined);

  useLockBodyScroll(phase === "playing" || phase === "exiting");

  useLayoutEffect(() => {
    // `sessionStorage`/the real reduced-motion preference only exist client-side,
    // so this can't be computed in a lazy `useState` initializer without
    // mismatching the server's markup-less render — this one-time transition
    // out of "pending" (before the browser paints, via `useLayoutEffect`) is
    // the deliberate exception.
    const alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === "true";
    if (alreadyPlayed || prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("done");
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "true");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase("playing");
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once per mount; re-running on a later reduced-motion flip is handled by the alreadyPlayed check above
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;
    const duration = 1100;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      setCount(Math.round(progress * 100));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase("exiting");
      }
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const timeout = setTimeout(() => setPhase("done"), 650);
    return () => clearTimeout(timeout);
  }, [phase]);

  if (phase === "pending" || phase === "done") return null;

  const isExiting = phase === "exiting";
  const filledTicks = Math.round((count / 100) * TICK_COUNT);

  return (
    <div className="fixed inset-0 z-[100]">
      <div role="status" className="sr-only">
        Yükleniyor
      </div>

      {/* The two "doors" are the only opaque surface — everything else is
          decorative content painted on top of them. Sliding them apart on
          exit is what actually reveals the page underneath. */}
      <motion.div
        aria-hidden="true"
        className="bg-bg absolute inset-x-0 top-0 h-1/2 overflow-hidden"
        animate={{ y: isExiting ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: isExiting ? 0.1 : 0 }}
      >
        <GridBackdrop className="opacity-40" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="bg-bg absolute inset-x-0 bottom-0 h-1/2 overflow-hidden"
        animate={{ y: isExiting ? "100%" : "0%" }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: isExiting ? 0.1 : 0 }}
      >
        <GridBackdrop className="opacity-40" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-10"
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.25, ease: EASE_STANDARD }}
      >
        <div className="relative flex h-24 w-24 items-center justify-center">
          {BRACKETS.map((pos, i) => (
            <motion.span
              key={pos}
              className={`absolute h-3 w-3 border-accent ${pos}`}
              initial={{ opacity: 0, scale: 2.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE_STANDARD, delay: 0.05 * i }}
            />
          ))}

          <motion.div
            className="flex h-16 w-16 items-center justify-center border border-accent bg-bg-elevated font-mono-ui text-[0.9rem] font-bold tracking-wide text-accent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE_STANDARD, delay: 0.35 }}
          >
            CKR<span className="text-accent">.</span>
          </motion.div>

          <motion.div
            className="absolute inset-x-1 h-[2px] bg-accent shadow-[0_0_12px_2px_var(--accent)]"
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.85, ease: EASE_STANDARD, delay: 0.55 }}
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-label-sm tracking-[0.15em] text-text-tertiary uppercase">
            <span>Initializing</span>
            <span className="text-accent tabular-nums">{String(count).padStart(2, "0")}%</span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: TICK_COUNT }).map((_, i) => (
              <span
                key={i}
                className={`h-2 w-[3px] transition-colors duration-150 ${i < filledTicks ? "bg-accent" : "bg-border-strong"}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
