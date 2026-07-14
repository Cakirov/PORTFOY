"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section id is currently most visible in the viewport, used
 * for navbar scrollspy highlighting.
 */
export function useActiveSection(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  // Callers typically pass a freshly-mapped array literal (new reference
  // every render); keying the effect off the joined *content* instead of
  // the array reference keeps the observer from tearing down and
  // rebuilding on every render, only doing so when the ids actually change.
  const key = sectionIds.join(",");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally keyed off `key` (content), not the `sectionIds` reference
  }, [key]);

  return activeId;
}
