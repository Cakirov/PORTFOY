"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFigure } from "@/components/ui/SectionFigure";
import { Masthead } from "@/components/ui/Masthead";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { focusAreas } from "@/data/focusAreas";
import { siteContent } from "@/data/siteContent";
import { fadeInUp } from "@/lib/motion";
import { SECTION_IDS } from "@/lib/constants";

export function IntroSection() {
  const { intro } = siteContent;

  return (
    <section id={SECTION_IDS.intro} aria-labelledby="intro-heading" className="relative border-t border-border">
      {/* Full-bleed section backdrop, same container-max split HeroSection uses. */}
      <GridBackdrop
        parallax
        className="opacity-[0.18] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
      />
      <ParallaxLayer layer="foreground" className="pointer-events-none absolute inset-0">
        <SectionFigure figure="02" />
      </ParallaxLayer>

      <div className="container-max relative px-(--section-px) py-(--section-py)">
        <ScrollReveal>
          <Masthead fig="02" name="APPROACH" view="DETAIL" sheet="2 / 8" />
        </ScrollReveal>
        <SectionHeading
          id="intro-heading"
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          body={intro.body}
          className="mb-[clamp(2rem,4vw,3rem)]"
        />

        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((area, i) => (
            <motion.div
              key={area.title}
              variants={fadeInUp}
              className="flex flex-col gap-3 border border-border bg-bg-elevated/50 p-6"
            >
              <span className="flex items-center gap-2 font-mono-ui text-label text-accent">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                COMP.{String(i + 1).padStart(2, "0")}
              </span>
              <h3 lang="en" className="text-h3 font-display font-bold text-text-primary">
                {area.title}
              </h3>
              <p className="text-body text-text-secondary">{area.description}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
