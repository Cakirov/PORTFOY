"use client";

import { useEffect, useRef, useState } from "react";

/** Fixed bottom-right scroll-position readout — a themed alternative to a plain progress bar. */
export function CoordinateReadout() {
  const xRef = useRef<HTMLSpanElement>(null);
  const yRef = useRef<HTMLSpanElement>(null);
  const tickingRef = useRef(false);
  // Hidden until the user actually scrolls — a "Y: 0000" readout at rest
  // isn't meaningful, and it also keeps this corner free of the hero's
  // own bottom-edge content on first paint.
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    function update() {
      tickingRef.current = false;
      const y = Math.round(window.scrollY);
      const x = Math.round(window.innerWidth / 2);
      if (xRef.current) xRef.current.textContent = String(x).padStart(4, "0");
      if (yRef.current) yRef.current.textContent = String(y).padStart(4, "0");
      if (y > 80) setHasScrolled(true);
    }

    function onScroll() {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed right-5 bottom-5 z-50 hidden border border-border-strong bg-bg/85 px-2.5 py-1.5 font-mono-ui text-[0.68rem] tracking-wide text-text-tertiary backdrop-blur-md transition-opacity duration-300 sm:block ${
        hasScrolled ? "opacity-100" : "opacity-0"
      }`}
    >
      X: <strong ref={xRef} className="text-accent">0000</strong> · Y:{" "}
      <strong ref={yRef} className="text-accent">0000</strong>
    </div>
  );
}
