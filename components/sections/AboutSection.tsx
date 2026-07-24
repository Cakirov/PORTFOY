"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFigure } from "@/components/ui/SectionFigure";
import { Masthead } from "@/components/ui/Masthead";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { siteContent } from "@/data/siteContent";
import { SECTION_IDS } from "@/lib/constants";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function AboutSection() {
  const { about } = siteContent;

  return (
    <section
      id={SECTION_IDS.about}
      aria-labelledby="about-heading"
      className="relative border-t border-border bg-bg-elevated"
    >
      {/* Full-bleed section backdrop (a shade lighter than the surrounding
          `--bg` sections) with a `container-max`-capped inner column — same
          split HeroSection uses, so the tinted background reads edge-to-edge
          on wide screens instead of boxing at 1240px. */}
      <GridBackdrop
        parallax
        className="opacity-[0.18] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
      />
      <ParallaxLayer layer="foreground" className="pointer-events-none absolute inset-0">
        <SectionFigure figure="04" />
      </ParallaxLayer>

      <div className="container-max relative px-(--section-px) py-(--section-py)">
        <ScrollReveal>
          <Masthead fig="04" name="PROFILE" view="ELEVATION" sheet="4 / 8" />
        </ScrollReveal>
        {/* No `sm:` intermediate step here (unlike Intro/Skills/Explorations'
            repeating-card grids) — this is an asymmetric 4/7 sidebar+body
            split, not a repeating card grid, so there's no meaningful "2-up"
            state between stacked and the full split. */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="about-heading" eyebrow={about.eyebrow} heading={about.heading} />

            <StaggerGroup as="dl" className="mt-10 border border-border-strong">
              {about.specs.map((spec) => (
                <motion.div
                  key={spec.label}
                  variants={fadeInUp}
                  className="grid grid-cols-[6rem_1fr] border-b border-dashed border-border px-4 py-2.5 last:border-b-0"
                >
                  <dt className="font-mono-ui text-label text-text-tertiary">{spec.label}</dt>
                  <dd className={cn("text-small", spec.highlight ? "text-accent" : "text-text-primary")}>
                    {spec.value}
                  </dd>
                </motion.div>
              ))}
            </StaggerGroup>
          </div>

          <StaggerGroup className="flex flex-col gap-6 lg:col-span-7 lg:col-start-6">
            {about.body.map((paragraph, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex gap-4 text-body text-text-secondary">
                <span className="font-mono-ui text-label text-accent">§{String(i + 1).padStart(2, "0")}</span>
                <p>{paragraph}</p>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
