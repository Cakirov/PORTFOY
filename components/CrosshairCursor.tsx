"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Replaces the default cursor with a small crosshair while hovering any
 * element marked `.crosshair-zone` (diagrams, project cards, portrait
 * visual). Desktop pointer-capable devices only; disabled under reduced
 * motion since it's a constantly pointer-following effect.
 */
export function CrosshairCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const prefersReducedMotion = useReducedMotion();
  const enabled = canHover && !prefersReducedMotion;

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    // rAF-batched: mousemove can fire well over 60/sec on a fast mouse or
    // trackpad, but the cursor only needs to actually move once per
    // painted frame — coalescing to the latest event per frame avoids
    // redundant style writes without adding any perceptible lag.
    let rafId: number | null = null;
    let lastEvent: MouseEvent | null = null;

    function applyLatest() {
      rafId = null;
      const e = lastEvent;
      if (!e || !el) return;
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      const overZone = !!(e.target as Element | null)?.closest?.(".crosshair-zone");
      el.classList.toggle("opacity-100", overZone);
      el.classList.toggle("opacity-0", !overZone);
    }

    function handleMove(e: MouseEvent) {
      lastEvent = e;
      if (rafId === null) rafId = requestAnimationFrame(applyLatest);
    }

    document.addEventListener("mousemove", handleMove);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[70] h-[22px] w-[22px] opacity-0 transition-opacity duration-150"
    >
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-accent" />
      <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-accent" />
    </div>
  );
}
