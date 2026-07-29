"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Masthead } from "@/components/ui/Masthead";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { skillGroups } from "@/data/skills";
import { siteContent } from "@/data/siteContent";
import { fadeInUp } from "@/lib/motion";
import { SECTION_IDS } from "@/lib/constants";

export function SkillsSection() {
  const { skills } = siteContent;

  return (
    <section id={SECTION_IDS.skills} aria-labelledby="skills-heading" className="relative border-t border-border">
      <GridBackdrop
        parallax
        className="opacity-[0.19] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
      />

      <div className="container-max relative px-(--section-px) py-(--section-py)">
        <ScrollReveal>
          <Masthead fig="05" name="COMPONENT SCHEDULE" view="SCHEDULE" sheet="5 / 8" />
        </ScrollReveal>
        <SectionHeading
          id="skills-heading"
          eyebrow={skills.eyebrow}
          heading={skills.heading}
          body={skills.body}
          align="center"
          className="mx-auto mb-[clamp(2rem,4vw,3rem)]"
        />

        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <motion.div
              key={group.key}
              variants={fadeInUp}
              className="border border-border-strong bg-bg-elevated/50 transition-[border-color,box-shadow] duration-(--motion-normal) hover:border-accent hover:shadow-[0_16px_32px_-16px_rgba(0,0,0,0.45)]"
            >
              <h3 lang="en" className="flex items-center gap-2 border-b border-border-strong px-4 py-3 font-mono-ui text-label text-accent">
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
                {group.label}
              </h3>
              <ul>
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="group flex items-center justify-between border-b border-dashed border-border px-4 py-2.5 text-small text-text-primary transition-colors duration-(--motion-fast) last:border-b-0 hover:text-accent"
                  >
                    {item.name}
                    <span
                      aria-hidden="true"
                      className="text-[0.5rem] text-text-tertiary transition-colors duration-(--motion-fast) group-hover:text-accent"
                    >
                      ●
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
