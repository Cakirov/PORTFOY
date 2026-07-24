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
          className="relative mt-16"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={heroTransition(0.05)}
        >
          <Masthead fig="01" name="HERO" view="ISOMETRIC" sheet="1 / 8" />
        </motion.div>

        <div className="relative grid flex-1 grid-cols-1 items-start gap-16 py-10 md:grid-cols-12 md:items-center md:gap-6 lg:gap-4">
          {/* Content layer — the whole text column drifts together as one composition. */}
          <ParallaxLayer layer="content" className="md:col-span-7 md:-mt-16 lg:col-span-6 lg:-mt-28">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={heroTransition(0.1)}>
              <p className="text-h3 mb-1 font-display font-bold tracking-tight text-text-primary">
                {PERSON_NAME}
                <span className="text-accent">.</span>
              </p>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={heroTransition(0.16)}>
              <Eyebrow size="lg" className="mb-[1.1rem]">
                <span lang="en">{hero.eyebrow}</span>
              </Eyebrow>
            </motion.div>

            <AnimatedHeading
              as="h1"
              trigger="mount"
              delay={0.28}
              lines={hero.headline.split("\n")}
              className="text-display max-w-[20ch] font-display font-bold text-text-primary [font-size:clamp(2.6rem,5.6cqw,4.8rem)]"
            />

            <motion.div
              aria-hidden="true"
              className="mt-5 mb-6 h-[3px] w-20 bg-accent"
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
              className="text-body mb-[2.25rem] max-w-[34rem] border-l-2 border-accent-soft pl-4 text-text-secondary"
              style={{ fontSize: "1.15rem" }}
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
              depth; isolated in its own column so it can never overlap the
              readable text. */}
          <ParallaxLayer layer="foreground" className="hidden md:col-span-5 md:block lg:col-span-6">
            <motion.div
              className="crosshair-zone relative aspect-square"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={heroTransition(0.28)}
            >
              <NodeGraphic accent="primary" className="h-full w-full" />
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
          <span className="h-8 w-px bg-border-strong" />
        </motion.div>
      </div>
    </section>
  );
}
