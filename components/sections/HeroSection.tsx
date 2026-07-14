"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { NodeGraphic } from "@/components/ui/NodeGraphic";
import { Masthead } from "@/components/ui/Masthead";
import { ScaleBar } from "@/components/ui/ScaleBar";
import { LegendBox } from "@/components/ui/LegendBox";
import { siteContent } from "@/data/siteContent";
import { heroEntrance, heroTransition } from "@/lib/motion";
import { SECTION_IDS } from "@/lib/constants";

export function HeroSection() {
  const { hero } = siteContent;

  return (
    <section
      id={SECTION_IDS.hero}
      aria-label={hero.headline}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-(--nav-height)"
    >
      <GridBackdrop />

      <div className="relative mx-auto flex w-full max-w-(--container-max) flex-1 flex-col px-(--section-px)">
        <motion.div initial="hidden" animate="visible" variants={heroEntrance} transition={heroTransition(0.05)}>
          <Masthead fig="01" name="HERO" view="ISOMETRIC" sheet="1 / 8" />
        </motion.div>

        <div className="grid flex-1 grid-cols-1 items-center gap-16 py-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <motion.div initial="hidden" animate="visible" variants={heroEntrance} transition={heroTransition(0.16)}>
              <Eyebrow className="mb-[1.1rem]">{hero.eyebrow}</Eyebrow>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={heroEntrance}
              transition={heroTransition(0.28)}
              className="text-display max-w-[18ch] font-display font-bold text-text-primary"
            >
              {hero.headline}
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={heroEntrance}
              transition={heroTransition(0.28)}
              className="text-body mb-[2.25rem] max-w-lg border-l-2 border-accent-soft pl-4 text-text-secondary"
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

            <motion.div
              initial="hidden"
              animate="visible"
              variants={heroEntrance}
              transition={heroTransition(0.4)}
            >
              <ScaleBar />
            </motion.div>
          </div>

          <motion.div
            className="crosshair-zone relative hidden aspect-square lg:col-span-6 lg:block"
            initial="hidden"
            animate="visible"
            variants={heroEntrance}
            transition={heroTransition(0.28)}
          >
            <NodeGraphic variant="nodes" accent="primary" className="h-full w-full" />
            <LegendBox />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
