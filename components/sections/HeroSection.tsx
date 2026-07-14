"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { NodeGraphic } from "@/components/ui/NodeGraphic";
import { Masthead } from "@/components/ui/Masthead";
import { LegendBox } from "@/components/ui/LegendBox";
import { siteContent } from "@/data/siteContent";
import { heroEntrance, heroTransition } from "@/lib/motion";
import { PERSON_NAME, SECTION_IDS } from "@/lib/constants";

export function HeroSection() {
  const { hero } = siteContent;

  return (
    <section
      id={SECTION_IDS.hero}
      aria-label={hero.headline}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-(--nav-height)"
    >
      {/* Capped to exactly one viewport tall — the section itself can grow
          taller than 100svh on shorter/wider screens (aspect-square diagram
          + content), but the grid pattern shouldn't stretch past the first
          screen with it. */}
      <GridBackdrop className="inset-x-0 top-0 bottom-auto h-[100svh]" />

      <div className="container-max relative flex w-full flex-1 flex-col px-(--section-px)">
        <motion.div
          className="mt-16"
          initial="hidden"
          animate="visible"
          variants={heroEntrance}
          transition={heroTransition(0.05)}
        >
          <Masthead fig="01" name="HERO" view="ISOMETRIC" sheet="1 / 8" />
        </motion.div>

        <div className="grid flex-1 grid-cols-1 items-center gap-16 py-10 lg:grid-cols-12 lg:gap-4">
          <div className="lg:col-span-6 lg:-mt-28">
            <motion.div initial="hidden" animate="visible" variants={heroEntrance} transition={heroTransition(0.1)}>
              <p className="text-h3 mb-1 font-display font-bold tracking-tight text-text-primary">
                {PERSON_NAME}
                <span className="text-accent">.</span>
              </p>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={heroEntrance} transition={heroTransition(0.16)}>
              <Eyebrow className="mb-[1.1rem]">
                <span lang="en" style={{ fontSize: "0.9rem" }}>
                  {hero.eyebrow}
                </span>
              </Eyebrow>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={heroEntrance}
              transition={heroTransition(0.28)}
              className="text-display max-w-[20ch] font-display font-bold text-text-primary"
              style={{ fontSize: "clamp(2.6rem, 5.6cqw, 4.8rem)" }}
            >
              {hero.headline}
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={heroEntrance}
              transition={heroTransition(0.28)}
              className="text-body mb-[2.25rem] max-w-[34rem] border-l-2 border-accent-soft pl-4 text-text-secondary"
              style={{ fontSize: "1.15rem" }}
            >
              {hero.subtext}
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={heroEntrance}
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
          </div>

          <motion.div
            className="crosshair-zone relative hidden aspect-square lg:col-span-6 lg:block"
            initial="hidden"
            animate="visible"
            variants={heroEntrance}
            transition={heroTransition(0.28)}
          >
            <LegendBox />
            <NodeGraphic variant="nodes" accent="primary" className="h-full w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
