"use client";

import { useCallback, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Project } from "@/types/project";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ProjectDetailPanel } from "@/components/sections/ProjectDetailPanel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionTokens, EASE_STANDARD } from "@/lib/motion";
import { PROJECT_STACK_STEP_VH } from "@/lib/constants";

interface ProjectGridProps {
  projects: Project[];
  /** Added to each card's 1-based position to get its "SHEET N" number —
      lets the `/projects` index page continue the homepage's numbering
      instead of restarting at 1 for what's actually project 7, 8, ... */
  startIndex?: number;
  /** This section's Masthead + SectionHeading — rendered inside the same
      pinned sticky block as the card stack (see below), above it, so the
      heading stays in view for the whole time the page steps through
      projects instead of scrolling away before the first card even shows. */
  heading: ReactNode;
}

/**
 * Vertical single-card "stack" — exactly one project fully visible at a
 * time, nothing of its neighbors showing. It pins in place while the page's
 * *own* scroll — wheel, trackpad, or a touch swipe, no custom gesture
 * handling for any of them — steps through projects one at a time; only
 * once the last one has been reached does scrolling continue on to
 * whatever comes after this section. Up/down buttons and ArrowUp/ArrowDown
 * page by exactly one step (via `window.scrollBy`) for keyboard/non-scroll
 * input either way. Same markup and mechanic at every breakpoint — no
 * `md:` fork.
 *
 * The pin is a tall scroll "spacer" (`spacerRef`, `projects.length *
 * PROJECT_STACK_STEP_VH` tall) with a `position: sticky` block inside it —
 * the same self-contained "own ref, own `useScroll`" shape as
 * `ParallaxLayer`, just driving a stepped index instead of a continuous
 * transform. Scroll progress through the spacer maps directly to
 * `activeIndex`; only a ±1 window (previous/current/next) is ever mounted.
 */
export function ProjectGrid({ projects, startIndex = 0, heading }: ProjectGridProps) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const currentTriggerRef = useRef<HTMLButtonElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: spacerRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (activeSlug !== null) return;
    setActiveIndex(Math.min(projects.length - 1, Math.max(0, Math.floor(v * projects.length))));
  });

  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < projects.length - 1;

  // Buttons/keyboard scroll the page by one step's worth of pixels instead
  // of setting `activeIndex` directly — the scroll-progress subscription
  // above is the single source of truth, so this stays consistent with
  // wheel/touch input rather than a second, competing way to change cards.
  //
  // The step size is the spacer's height *minus one viewport height*, not
  // its raw height: `useScroll`'s `["start start", "end end"]` offset hits
  // progress 1 when the spacer's BOTTOM reaches the viewport's bottom, which
  // happens after scrolling `spacerHeight - viewportHeight` px from where
  // progress 0 (spacer's top at the viewport's top) starts — not
  // `spacerHeight` px. Using the raw height overshot every click, and the
  // error compounded across repeated clicks until it skipped a whole card.
  const scrollByStep = useCallback(
    (direction: 1 | -1) => {
      const node = spacerRef.current;
      if (!node) return;
      const scrollableRange = node.getBoundingClientRect().height - window.innerHeight;
      const stepPx = scrollableRange / projects.length;
      window.scrollBy({ top: direction * stepPx });
    },
    [projects.length],
  );

  const goPrev = useCallback(() => {
    if (activeSlug) return;
    scrollByStep(-1);
  }, [activeSlug, scrollByStep]);

  const goNext = useCallback(() => {
    if (activeSlug) return;
    scrollByStep(1);
  }, [activeSlug, scrollByStep]);

  const handleOpen = useCallback((slug: string) => setActiveSlug(slug), []);

  const handleClose = useCallback(() => {
    setActiveSlug(null);
    // `preventScroll` stops the browser's own focus-triggered scroll-into-
    // view from racing (and winning) against `useLockBodyScroll`'s own
    // restore of the pre-open scroll position in ProjectDetailPanel's
    // unmount cleanup — without it, the two fought over the final scrollY.
    requestAnimationFrame(() => currentTriggerRef.current?.focus({ preventScroll: true }));
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (activeSlug !== null) return;
    if (event.key === "ArrowUp") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      goPrev();
    }
  }

  const windowIndices = [activeIndex - 1, activeIndex, activeIndex + 1].filter(
    (i) => i >= 0 && i < projects.length,
  );
  const activeProject = projects[activeIndex];

  // Neither existing easing token suits a slide this large: `EASE_STANDARD`
  // and `EASE_SMOOTH` both front-load almost all visible motion into the
  // first ~15% of their duration (both curves' bezier y-control-points sit
  // at 1) — right for a quick reveal/pop, but on a slide this size it reads
  // as "snap, then an imperceptible creep," the opposite of soft. This is a
  // standard, evenly-paced deceleration curve instead — one that actually
  // spends its whole duration visibly slowing down, so 0.6s reads as
  // genuinely gentle rather than instant.
  const SLIDE_EASE = [0.4, 0, 0.2, 1] as const;
  const positionTransition = prefersReducedMotion
    ? { duration: motionTokens.duration.fast, ease: "linear" as const }
    : { duration: 0.6, ease: SLIDE_EASE };
  const fadeTransition = prefersReducedMotion
    ? { duration: motionTokens.duration.fast, ease: "linear" as const }
    : { duration: motionTokens.duration.normal, ease: EASE_STANDARD };

  return (
    <div ref={spacerRef} className="relative" style={{ height: `${projects.length * PROJECT_STACK_STEP_VH}vh` }}>
      {/* `h-[calc(100svh-var(--nav-height))]`: the pinned block must never be
          taller than the space actually left under the fixed navbar — the
          card area below is `flex-1` (fills whatever's left after the
          heading) rather than a fixed height, specifically so the position
          bar/buttons at the bottom can never end up pushed below the fold
          on a shorter viewport. Compact, fixed `py`/`gap` here on purpose —
          the site's usual `--section-py` token is sized for independently-
          scrolling sections, not a height-constrained pinned one. */}
      <div className="sticky top-(--nav-height) container-max flex h-[calc(100svh-var(--nav-height))] flex-col gap-4 px-(--section-px) py-6 md:py-8">
        <div className="shrink-0">{heading}</div>

        <LayoutGroup>
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Proje kartları"
            onKeyDown={handleKeyDown}
            className="relative mx-auto flex w-full min-h-0 flex-1 flex-col"
          >
            <div className="relative min-h-[18rem] w-full flex-1 overflow-hidden">
              <AnimatePresence initial={false}>
                {windowIndices.map((index) => {
                  const project = projects[index];
                  const offset = index - activeIndex;
                  const isCurrent = offset === 0;
                  const y = offset === 0 ? "0%" : offset === 1 ? "100%" : "-100%";
                  const zIndex = offset === 0 ? 3 : offset === 1 ? 2 : 1;
                  const isPanelOpen = isCurrent && activeSlug === project.slug;

                  return (
                    <motion.div
                      key={project.slug}
                      // `p-6`: the current card tilts in 3D (see ProjectCard) —
                      // a rotated rectangle's rendered corners bulge slightly
                      // beyond its own unrotated box. With zero gap between the
                      // card and this slot's edge (which is also exactly where
                      // the viewport's `overflow-hidden` clips), those corners
                      // got clipped mid-tilt, cutting the border off right where
                      // the effect was most visible. This padding is pure
                      // clipping headroom, invisible at rest (same background
                      // behind it), giving the tilt room to bulge without
                      // hitting the clip edge.
                      className="absolute inset-0 p-6"
                      style={{ zIndex }}
                      initial={false}
                      animate={{ y, opacity: isCurrent ? 1 : 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ y: positionTransition, opacity: fadeTransition }}
                      inert={!isCurrent}
                    >
                      {isPanelOpen ? (
                        <ProjectDetailPanel project={project} sheetNumber={startIndex + index + 1} onClose={handleClose} />
                      ) : (
                        <ProjectCard
                          project={project}
                          sheetNumber={startIndex + index + 1}
                          onOpen={handleOpen}
                          triggerRef={(el) => {
                            if (isCurrent) currentTriggerRef.current = el;
                          }}
                          isCurrent={isCurrent}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {projects.length > 1 ? (
              <div className="mt-4 flex shrink-0 items-center gap-4">
                <div className="relative h-[3px] flex-1 rounded-full bg-border">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-accent"
                    animate={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
                    transition={positionTransition}
                  />
                </div>
                <span className="font-mono-ui text-label shrink-0 text-text-tertiary">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={!canGoPrev || activeSlug !== null}
                    aria-label="Önceki proje"
                    className="inline-flex h-9 w-9 items-center justify-center border border-border-strong bg-bg/80 text-text-primary backdrop-blur-md transition-colors duration-(--motion-fast) hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!canGoNext || activeSlug !== null}
                    aria-label="Sonraki proje"
                    className="inline-flex h-9 w-9 items-center justify-center border border-border-strong bg-bg/80 text-text-primary backdrop-blur-md transition-colors duration-(--motion-fast) hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : null}

            <span className="sr-only" role="status" aria-live="polite">
              {activeProject ? `Proje ${activeIndex + 1} / ${projects.length}: ${activeProject.title}` : null}
            </span>
          </div>
        </LayoutGroup>
      </div>
    </div>
  );
}
