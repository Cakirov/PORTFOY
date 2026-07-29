"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Masthead } from "@/components/ui/Masthead";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { IconBadge } from "@/components/ui/IconBadge";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { processSteps } from "@/data/process";
import { siteContent } from "@/data/siteContent";
import { SECTION_IDS } from "@/lib/constants";
import { fadeInUp } from "@/lib/motion";

export function ProcessSection() {
  const { process } = siteContent;

  return (
    <section
      id={SECTION_IDS.process}
      aria-labelledby="process-heading"
      className="relative border-t border-border bg-bg-elevated"
    >
      {/* Full-bleed section backdrop (see AboutSection.tsx for the same split). */}
      <GridBackdrop
        parallax
        className="opacity-[0.23] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
      />

      <div className="container-max relative px-(--section-px) py-(--section-py)">
        <ScrollReveal>
          <Masthead fig="06" name="PIPELINE" view="SECTION A-A" sheet="6 / 8" />
        </ScrollReveal>
        <SectionHeading
          id="process-heading"
          eyebrow={process.eyebrow}
          heading={process.heading}
          body={process.body}
          className="mb-[clamp(2rem,4vw,3rem)]"
        />

        {/* No `sm:` intermediate step here — this is a left-to-right pipeline
            with `→` connectors between adjacent stages (see the `lg:block`
            connector below); a 2-column wrap would break that metaphor
            (stage 2 beside stage 1 with no connector, 3/4 wrapping oddly). */}
        <StaggerGroup as="ol" className="grid grid-cols-1 border border-border-strong lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <motion.li
              key={step.index}
              variants={fadeInUp}
              className="group relative border-b border-border-strong py-7 pr-7 pl-9 transition-shadow duration-(--motion-normal) last:border-b-0 hover:shadow-[0_16px_32px_-16px_rgba(0,0,0,0.45)] lg:border-r lg:border-b-0 lg:last:border-r-0"
            >
              <span
                aria-hidden="true"
                className="absolute top-6 bottom-6 left-4 w-px bg-[repeating-linear-gradient(to_bottom,var(--border-strong)_0_3px,transparent_3px_8px)] opacity-70"
              />
              <IconBadge
                icon={step.icon}
                size="md"
                className="mb-4 transition-colors duration-(--motion-fast) group-hover:border-accent"
              />
              <span className="mb-4 block font-mono-ui text-label text-accent">Stage {String(step.index).padStart(2, "0")}</span>
              <h3 className="text-h3 font-display font-bold text-text-primary">{step.title}</h3>
              <p className="text-body mt-2 max-w-[42rem] text-text-secondary lg:max-w-none">{step.description}</p>
              {i < processSteps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute top-7 right-0 hidden translate-x-1/2 bg-bg-elevated font-mono-ui text-accent lg:block"
                >
                  →
                </span>
              ) : null}
            </motion.li>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
