"use client";

import { useEffect } from "react";

/** Locks body scroll while `locked` is true, restoring the prior overflow on unmount/unlock. */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [locked]);
}
