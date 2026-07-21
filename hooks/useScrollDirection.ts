"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollDirectionState {
  direction: "up" | "down";
  isAtTop: boolean;
}

/**
 * Tracks scroll direction and whether the page is near the top — drives the
 * navbar's hide-on-scroll-down / reveal-on-scroll-up behavior. Same
 * rAF-throttled, ticking-ref pattern already proven by CoordinateReadout.tsx:
 * one passive scroll listener, and state only updates when direction
 * actually flips or the top-threshold is crossed, not on every scroll tick
 * (avoids re-rendering the consumer on every pixel of scroll).
 */
export function useScrollDirection(minDelta = 8, topThreshold = 24): ScrollDirectionState {
  const [state, setState] = useState<ScrollDirectionState>({ direction: "up", isAtTop: true });
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);
  const directionRef = useRef<"up" | "down">("up");
  const isAtTopRef = useRef(true);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    function update() {
      tickingRef.current = false;
      const y = window.scrollY;
      const delta = y - lastYRef.current;
      const nowAtTop = y <= topThreshold;
      let changed = false;

      if (nowAtTop !== isAtTopRef.current) {
        isAtTopRef.current = nowAtTop;
        changed = true;
      }

      if (Math.abs(delta) >= minDelta) {
        const nextDirection = delta > 0 ? "down" : "up";
        if (nextDirection !== directionRef.current) {
          directionRef.current = nextDirection;
          changed = true;
        }
        lastYRef.current = y;
      }

      if (changed) {
        setState({ direction: directionRef.current, isAtTop: isAtTopRef.current });
      }
    }

    function onScroll() {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [minDelta, topThreshold]);

  return state;
}
