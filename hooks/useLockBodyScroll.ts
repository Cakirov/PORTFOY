"use client";

import { useEffect } from "react";

/**
 * Locks body scroll while `locked` is true, restoring the prior scroll
 * position on unlock. Plain `overflow: hidden` doesn't stop iOS Safari's
 * rubber-band scroll from dragging the page behind a fixed-position overlay
 * (the mobile nav menu, the mobile project detail panel), so the body is
 * additionally pinned in place with `position: fixed` and the lost scroll
 * offset is restored via `window.scrollTo` on unlock.
 *
 * `restoreY`: pass this when the caller can't safely self-capture
 * `window.scrollY` at lock time — e.g. `ProjectsPlainGrid` removes the
 * clicked tile from its CSS grid the moment this locks (to avoid a
 * duplicate interactive element behind the full-screen panel), which
 * shrinks the grid and lets the browser clamp `scrollY` to a smaller value
 * *before* this effect ever runs, corrupting the self-captured position.
 * Capturing it in the click handler, before that reflow happens, and
 * passing it through avoids that. Omit it (the default) when nothing the
 * lock triggers can change the page's scrollable height, in which case
 * self-capturing here is simplest and exactly as accurate.
 */
export function useLockBodyScroll(locked: boolean, restoreY?: number) {
  useEffect(() => {
    if (!locked) return;

    const scrollY = restoreY ?? window.scrollY;
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
  }, [locked, restoreY]);
}
