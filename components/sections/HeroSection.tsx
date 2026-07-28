"use client";

import { motion } from "framer-motion";
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

  return (
    <section
      id={SECTION_IDS.hero}
      aria-label={hero.headline}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-(--nav-height)"
    >
      <div className="container-max relative flex w-full flex-1 flex-col px-(--section-px)">
        {/* Background layer — slowest-moving: the technical grid texture
            plus two soft ambient glows, all barely-perceptible drift. */}
        <GridBackdrop
          parallax
          className="border-x border-(--grid-line) [mask-image:linear-gradient(to_bottom,black,black_88%,transparent)]"
        />
        <ParallaxLayer layer="background" className="pointer-events-none absolute -top-20 -left-32">
          <div aria-hidden="true" className="h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl" />
        </ParallaxLayer>
        <ParallaxLayer layer="background" className="pointer-events-none absolute right-0 bottom-0">
          <div aria-hidden="true" className="h-[380px] w-[380px] rounded-full bg-secondary/10 blur-3xl" />
        </ParallaxLayer>

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
              className="crosshair-zone relative aspect-square"
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
      </div>
    </section>
  );
}
