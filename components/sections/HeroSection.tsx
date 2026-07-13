"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { RevealText } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { NodeGraphic } from "@/components/ui/NodeGraphic";
import { Masthead } from "@/components/ui/Masthead";
import { ScaleBar } from "@/components/ui/ScaleBar";
import { LegendBox } from "@/components/ui/LegendBox";
import { siteContent } from "@/data/siteContent";
import { fadeIn, heroEntrance } from "@/lib/motion";
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

      <div className="relative mx-auto flex w-full max-w-(--container-max) flex-1 flex-col px-6 lg:px-10">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Masthead fig="01" name="HERO" view="ISOMETRIC" sheet="1 / 8" />
        </motion.div>

        <div className="grid flex-1 grid-cols-1 items-center gap-16 py-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <Eyebrow className="mb-6">{hero.eyebrow}</Eyebrow>
            </motion.div>

            <RevealText
              as="h1"
              text={hero.headline}
              className="text-display font-display font-semibold text-text-primary"
              amount={0}
            />

            <motion.p
              initial="hidden"
              animate="visible"
              variants={heroEntrance}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-body mt-8 max-w-lg border-l-2 border-accent-soft pl-4 text-text-secondary"
            >
              {hero.subtext}
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={heroEntrance}
              transition={{ delay: 0.55, duration: 0.8 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button href={`#${SECTION_IDS.projects}`} variant="primary" magnetic showArrow>
                {hero.primaryCta}
              </Button>
              <Button href={`#${SECTION_IDS.contact}`} variant="secondary" magnetic>
                {hero.secondaryCta}
              </Button>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={heroEntrance}
              transition={{ delay: 0.68, duration: 0.8 }}
            >
              <ScaleBar className="mt-10" />
            </motion.div>
          </div>

          <motion.div
            className="crosshair-zone relative hidden aspect-square lg:col-span-5 lg:block"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <NodeGraphic variant="nodes" accent="primary" className="h-full w-full" />
            <LegendBox />
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border py-4 font-mono-ui text-[0.68rem] tracking-wide text-text-tertiary uppercase"
        >
          <span className="flex items-center gap-4 sm:gap-12">
            <span>Drawn — Sys.Nova</span>
            <span className="hidden sm:inline">Chk&rsquo;d — OK</span>
          </span>
          <span className="flex items-center gap-2" aria-hidden="true">
            Kaydır
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
