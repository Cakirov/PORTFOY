"use client";

import { useEffect } from "react";

/**
 * Locks body scroll while `locked` is true, restoring the prior scroll
 * position on unlock. Plain `overflow: hidden` doesn't stop iOS Safari's
 * rubber-band scroll from dragging the page behind a fixed-position overlay
 * (the mobile nav menu, the mobile project detail panel), so the body is
 * additionally pinned in place with `position: fixed` and the lost scroll
 * offset is restored via `window.scrollTo` on unlock.
 */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;
    const { overflow, position, top, width } = document.body.style;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.position = position;
      document.body.style.top = top;
      document.body.style.width = width;
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}
