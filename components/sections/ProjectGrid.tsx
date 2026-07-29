"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { LayoutGroup, motion, useMotionValueEvent, useScroll } from "framer-motion";
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

/** Minimum time between committed card changes from scroll — see the note
    on `useMotionValueEvent` below for why this is throttled at all instead
    of committing on every scroll-progress change. */
const COMMIT_INTERVAL_MS = 380;

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
 * transform. Scroll progress through the spacer maps to `activeIndex`;
 * only a ±1 window (previous/current/next) is ever mounted.
 */
export function ProjectGrid({ projects, startIndex = 0, heading }: ProjectGridProps) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const currentTriggerRef = useRef<HTMLButtonElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const latestProgress = useRef(0);
  const lastCommitTime = useRef(0);
  const trailingTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const { scrollYProgress } = useScroll({ target: spacerRef, offset: ["start start", "end end"] });

  const commitFromProgress = useCallback(() => {
    lastCommitTime.current = Date.now();
    setActiveIndex(
      Math.min(projects.length - 1, Math.max(0, Math.round(latestProgress.current * (projects.length - 1)))),
    );
  }, [projects.length]);

  // Committing `activeIndex` the instant scroll progress changes worked
  // fine for mouse-wheel notches — naturally spaced far enough apart for
  // one card's slide to finish before the next notch arrives — but not for
  // a touch flick: its momentum can cross several card boundaries within a
  // couple hundred milliseconds, and each crossing re-triggered a fresh
  // slide before the last one had finished, so several cards visibly moved
  // at once.
  //
  // A *debounce* (wait until scroll goes fully quiet, then commit once)
  // fixed that but broke something worse: this spacer is many screen-
  // heights tall, and an ordinary scroll-down gesture on a phone can carry
  // enough momentum to coast all the way through it in one continuous
  // motion — debounced, nothing would update until that whole coast
  // finished, so the stack seemed to sit frozen on the first card and then
  // suddenly jump straight to whichever one momentum happened to land on.
  //
  // A *throttle* instead: commit immediately on the first change (so the
  // stack starts responding right away), then during continuous scrolling
  // allow at most one commit per `COMMIT_INTERVAL_MS` — close to, but a
  // touch shorter than, the slide's own duration, so consecutive cards
  // still progress past one at a time as a long scroll carries through
  // them, without committing so often that transitions pile up and
  // overlap. A trailing commit after the last change guarantees the final
  // resting position is always reflected exactly, even if it lands
  // mid-interval.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    latestProgress.current = v;
    if (activeSlug !== null) return;
    const elapsed = Date.now() - lastCommitTime.current;
    if (elapsed >= COMMIT_INTERVAL_MS) {
      if (trailingTimer.current) {
        clearTimeout(trailingTimer.current);
        trailingTimer.current = undefined;
      }
      commitFromProgress();
    } else if (!trailingTimer.current) {
      trailingTimer.current = setTimeout(() => {
        trailingTimer.current = undefined;
        commitFromProgress();
      }, COMMIT_INTERVAL_MS - elapsed);
    }
  });

  useEffect(() => {
    return () => {
      if (trailingTimer.current) clearTimeout(trailingTimer.current);
    };
  }, []);

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
  // `spacerHeight` px. That range is then divided into `projects.length - 1`
  // hops (N cards, N-1 gaps between them), matching how `activeIndex` above
  // is derived from `v * (projects.length - 1)`.
  const scrollByStep = useCallback(
    (direction: 1 | -1) => {
      const node = spacerRef.current;
      if (!node) return;
      const scrollableRange = node.getBoundingClientRect().height - window.innerHeight;
      const stepPx = scrollableRange / Math.max(1, projects.length - 1);
      window.scrollBy({ top: direction * stepPx });
    },
    [projects.length],
  );

  // Buttons/keyboard update `activeIndex` immediately, on top of scrolling
  // the page — unlike wheel/touch, a button press is an unambiguous, single
  // step with no risk of several rapid-fire changes to coalesce, so there's
  // no reason to make it wait through both the native smooth-scroll *and*
  // the throttle window above. Resetting `lastCommitTime` keeps the two
  // paths from fighting: without it, the scroll set off by this same click
  // could still be mid-throttle-window and momentarily re-commit a stale
  // in-between value once the button's own update has already landed.
  const goPrev = useCallback(() => {
    if (activeSlug) return;
    lastCommitTime.current = Date.now();
    setActiveIndex((i) => Math.max(0, i - 1));
    scrollByStep(-1);
  }, [activeSlug, scrollByStep]);

  const goNext = useCallback(() => {
    if (activeSlug) return;
    lastCommitTime.current = Date.now();
    setActiveIndex((i) => Math.min(projects.length - 1, i + 1));
    scrollByStep(1);
  }, [activeSlug, scrollByStep, projects.length]);

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
          on a shorter viewport. `py`/`gap` here are deliberately tighter
          than the site's usual `--section-py` (sized for independently-
          scrolling sections, not this height-constrained pinned one) —
          tightened further still so the card itself claims as much of the
          fixed height budget as possible, since the heading/position-bar
          around it don't need to grow with the viewport the way the card
          benefits from. */}
      {/* Wider than the site's usual `.container-max` (1240px): this is the
          flagship, most interactive section, and the fixed viewport height
          here (unlike normal sections) means there's headroom on large
          screens that a fixed 1240px cap left unused. `max-w-[1400px]`
          composes the same `mx-auto`/`container-type` behavior manually
          instead of using the `container-max` utility class, so it isn't
          fighting that class's own hardcoded 1240px over specificity. */}
      <div className="sticky top-(--nav-height) mx-auto flex h-[calc(100svh-var(--nav-height))] w-full max-w-[1400px] flex-col gap-2 px-(--section-px) py-3 [container-type:inline-size] md:py-4">
        <div className="shrink-0">{heading}</div>

        <LayoutGroup>
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Proje kartları"
            onKeyDown={handleKeyDown}
            className="relative mx-auto flex w-full min-h-0 flex-1 flex-col"
          >
            {/* `min-h` is only a worst-case floor for unusually short
                viewports — on anything reasonably tall, `flex-1` alone
                already grows the card to fill whatever room the fixed
                `h-[calc(100svh-var(--nav-height))]` budget leaves after the
                heading/position-bar, which is where the real size increase
                below comes from. Raising this floor doesn't make the card
                any bigger on normal screens; it only raises how much
                vertical space the *worst case* needs, which is the opposite
                of what's wanted — confirmed by testing narrow-but-short
                viewports (1366×650, a plausible laptop window) where a
                taller floor pushed the buttons below the fold. Left at the
                original size. */}
            <div className="relative min-h-[18rem] w-full flex-1 overflow-hidden">
              {/* No `AnimatePresence`/`exit` here on purpose: a departing
                  slot's `opacity` target already flips to 0 the instant it
                  stops being current (the very first step of it leaving),
                  well before it's dropped from the ±1 window — so by the
                  time React actually removes it, it's already invisible and
                  off-screen (`y` pinned at ±100%). An `exit` fade animating
                  "already invisible" to "still invisible" is a pure no-op
                  visually, but it DOES keep the old node mounted for its
                  full fade duration — harmless at wheel-notch speed, but
                  without the commit throttle above it let old slots pile up
                  during a fast flick. Removing `exit` lets React unmount a
                  departed slot the instant it leaves the window. */}
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
            </div>

            {projects.length > 1 ? (
              <div className="mt-2 flex shrink-0 items-center gap-4">
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
                    className="inline-flex h-10 w-10 items-center justify-center border border-border-strong bg-bg/80 text-text-primary backdrop-blur-md transition-colors duration-(--motion-fast) hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!canGoNext || activeSlug !== null}
                    aria-label="Sonraki proje"
                    className="inline-flex h-10 w-10 items-center justify-center border border-border-strong bg-bg/80 text-text-primary backdrop-blur-md transition-colors duration-(--motion-fast) hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
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
