"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { NodeGraphic } from "@/components/ui/NodeGraphic";
import { Masthead } from "@/components/ui/Masthead";
import { ScaleBar } from "@/components/ui/ScaleBar";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { siteContent } from "@/data/siteContent";
import { EASE_STANDARD, fadeInUp, heroTransition, motionTokens } from "@/lib/motion";
import { PERSON_NAME, SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Max rotation in degrees. Far gentler than the project cards' 9° on
// purpose: this tilts the *entire* framed sheet — headline included — not
// a small self-contained card, so a couple of degrees is already plenty to
// read as "the whole panel leans toward you" without ever blurring text.
const HERO_MAX_TILT_DEG = 3;

/** Echoes `IntroLoader`'s corner-bracket motif — a literal nod to the
    "technical drawing sheet" identity (registration/crop marks at the
    edges of the page), independent JSX, not a shared import. */
const CORNER_MARKS = [
  "top-0 left-0 border-t border-l",
  "top-0 right-0 border-t border-r",
  "bottom-0 left-0 border-b border-l",
  "bottom-0 right-0 border-b border-r",
] as const;

export function HeroSection() {
  const { hero } = siteContent;

  const sectionRef = useRef<HTMLElement>(null);
  // Cached on enter rather than re-measured on every mousemove — the
  // section's box doesn't move while the pointer is inside it, so a fresh
  // getBoundingClientRect() per raw mousemove event (which can fire well
  // over 60/sec) is a synchronous layout read this effect doesn't need.
  const rectRef = useRef<DOMRect | null>(null);
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const prefersReducedMotion = useReducedMotion();
  const canTilt = canHover && !prefersReducedMotion;

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, motionTokens.spring.soft);
  const springRotateY = useSpring(rotateY, motionTokens.spring.soft);

  // Raw (unsprung) cursor position, 0–100 — feeds the glare's gradient
  // position directly. Springing this too would make the highlight visibly
  // lag the pointer, which reads as sluggish rather than glassy.
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,146,87,0.14), transparent 60%)`;

  function handleHeroMouseEnter() {
    if (!canTilt || !sectionRef.current) return;
    rectRef.current = sectionRef.current.getBoundingClientRect();
  }

  function handleHeroMouseMove(event: MouseEvent<HTMLElement>) {
    if (!canTilt || !rectRef.current) return;
    const rect = rectRef.current;
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * HERO_MAX_TILT_DEG);
    rotateX.set(-(py - 0.5) * HERO_MAX_TILT_DEG);
    glareX.set(px * 100);
    glareY.set(py * 100);
  }

  function handleHeroMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  }

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.hero}
      aria-label={hero.headline}
      onMouseEnter={handleHeroMouseEnter}
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className="crosshair-zone relative flex min-h-[100svh] flex-col overflow-hidden pt-(--nav-height)"
      style={canTilt ? { perspective: 1600 } : undefined}
    >
      {/* The whole framed sheet — grid texture, corner registration marks,
          headline and diagram alike — tilts together as one rigid plane
          toward the cursor, rather than any single element inside it. Same
          "one rotation, not a stack of independent ones" lesson the project
          cards already learned, just applied to the frame instead of a
          card. */}
      <motion.div
        className="container-max relative flex w-full flex-1 flex-col px-(--section-px)"
        style={canTilt ? { rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d" } : undefined}
      >
        {/* Background layer — slowest-moving: the technical grid texture,
            barely-perceptible drift. */}
        <GridBackdrop
          parallax
          className="border-x border-(--grid-line) [mask-image:linear-gradient(to_bottom,black,black_88%,transparent)]"
        />

        <motion.div
          className="relative mt-6 md:mt-16"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={heroTransition(0.05)}
        >
          <Masthead fig="01" name="HERO" view="ISOMETRIC" sheet="1 / 8" />
        </motion.div>

        {/* Below `md:` the vertical stack (headline + subtext + CTAs) needs
            to fit inside one mobile viewport without scrolling — the CTAs
            are the page's primary calls to action and shouldn't require a
            scroll to discover. Tighter gaps/padding + a smaller headline
            floor below `md:` claw back ~180px versus the desktop spacing. */}
        <div className="relative grid flex-1 grid-cols-1 items-start gap-10 py-6 md:grid-cols-12 md:items-center md:gap-6 md:py-10 lg:gap-4">
          {/* Content layer — the whole text column drifts together as one composition. */}
          <ParallaxLayer layer="content" className="md:col-span-7 md:-mt-16 lg:col-span-6 lg:-mt-28">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={heroTransition(0.1)}>
              <p className="text-h3 mb-1 font-display font-bold tracking-tight text-text-primary">
                {PERSON_NAME}
                <span className="text-accent">.</span>
              </p>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={heroTransition(0.16)}>
              <Eyebrow size="lg" className="mb-2 md:mb-[1.1rem]">
                <span lang="en">{hero.eyebrow}</span>
              </Eyebrow>
            </motion.div>

            <AnimatedHeading
              as="h1"
              trigger="mount"
              delay={0.28}
              lines={hero.headline.split("\n")}
              className="text-display max-w-[20ch] font-display font-bold text-text-primary [font-size:clamp(1.9rem,7cqw,4.8rem)] md:[font-size:clamp(2.6rem,5.6cqw,4.8rem)]"
            />

            <motion.div
              aria-hidden="true"
              className="mt-3 mb-4 h-[3px] w-20 bg-accent md:mt-5 md:mb-6"
              style={{ transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: motionTokens.duration.slow, ease: EASE_STANDARD, delay: 1 }}
            />

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={heroTransition(0.34)}
              className="text-body mb-5 max-w-[34rem] border-l-2 border-accent-soft pl-4 text-text-secondary [font-size:1rem] md:mb-[2.25rem] md:[font-size:1.15rem]"
            >
              {hero.subtext}
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={heroTransition(0.4)}
              className="flex flex-wrap items-center gap-3"
            >
              <Button href={`#${SECTION_IDS.projects}`} variant="primary" showArrow>
                {hero.primaryCta}
              </Button>
              <Button href={`#${SECTION_IDS.contact}`} variant="secondary">
                {hero.secondaryCta}
              </Button>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={heroTransition(0.48)}>
              <ScaleBar />
            </motion.div>
          </ParallaxLayer>

          {/* Foreground layer — drifts slightly faster than content, for
              depth. Below `md:` the grid has one column, so this simply
              falls to its own full-width row underneath the content (after
              the CTAs/ScaleBar) instead of sharing a row with it — same
              isolation guarantee (never overlaps the readable text), just
              stacked instead of side-by-side. */}
          <ParallaxLayer layer="foreground" className="md:col-span-5 lg:col-span-6">
            <motion.div
              className="relative aspect-square"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={heroTransition(0.28)}
            >
              {/* animateOnScroll={false}: the port boxes/labels inside
                  otherwise wait on a `whileInView` viewport check per SVG
                  element, which — on mobile especially — doesn't reliably
                  fire (same root cause fixed for the mobile project-card
                  diagrams earlier). Wires drew in fine on their own; port
                  rects/text just never appeared. Rendering everything
                  immediately on mount sidesteps that entirely. */}
              <NodeGraphic accent="primary" className="h-full w-full" animateOnScroll={false} />
            </motion.div>
          </ParallaxLayer>
        </div>

        <motion.div
          aria-hidden="true"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={heroTransition(0.6)}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-text-tertiary lg:flex"
        >
          <span className="font-mono-ui text-label">SCROLL</span>
          <span className="relative h-8 w-px overflow-hidden bg-border-strong">
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-2 bg-accent"
              animate={{ y: [-8, 40] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
            />
          </span>
        </motion.div>

        {/* Corner registration marks — a literal echo of a technical
            drawing sheet's crop/registration marks, framing the whole
            Hero composition. Purely decorative, zero layout impact. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {CORNER_MARKS.map((pos, i) => (
            <motion.span
              key={pos}
              className={cn("absolute h-5 w-5 border-accent/35", pos)}
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={heroTransition(motionTokens.stagger.item * i)}
            />
          ))}
        </div>

        {/* Glass-sheen glare riding the same cursor position as the tilt —
            reinforces the "framed panel" read (light catching a tilted
            glass sheet) rather than reading as a page merely rotating. */}
        {canTilt ? (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: glareBackground }}
          />
        ) : null}
      </motion.div>
    </section>
  );
}
