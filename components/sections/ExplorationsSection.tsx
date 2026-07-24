"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFigure } from "@/components/ui/SectionFigure";
import { Masthead } from "@/components/ui/Masthead";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { explorations } from "@/data/explorations";
import { siteContent } from "@/data/siteContent";
import { SECTION_IDS, EXPLORATION_STATUS_META } from "@/lib/constants";
import { fadeInUp } from "@/lib/motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

export function ExplorationsSection() {
  const { explorations: content } = siteContent;
  const canReveal = useMediaQuery("(hover: hover) and (pointer: fine)");

  return (
    <section
      id={SECTION_IDS.explorations}
      aria-labelledby="explorations-heading"
      className="relative border-t border-border"
    >
      <GridBackdrop
        parallax
        className="opacity-[0.18] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
      />
      <ParallaxLayer layer="foreground" className="pointer-events-none absolute inset-0">
        <SectionFigure figure="07" />
      </ParallaxLayer>

      <div className="container-max relative px-(--section-px) py-(--section-py)">
        <ScrollReveal>
          <Masthead fig="07" name="R&D LOG" view="APPENDIX" sheet="7 / 8" />
        </ScrollReveal>
        <SectionHeading
          id="explorations-heading"
          eyebrow={content.eyebrow}
          heading={content.heading}
          body={content.body}
          className="mb-[clamp(2rem,4vw,3rem)]"
        />

        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {explorations.map((item, i) => {
            const status = EXPLORATION_STATUS_META[item.status];
            return (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className="group relative flex flex-col gap-4 border border-border bg-bg-elevated/50 py-7 pr-7 pl-9 transition-colors duration-300 hover:border-secondary"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-6 bottom-6 left-4 w-px bg-[repeating-linear-gradient(to_bottom,var(--border-strong)_0_3px,transparent_3px_8px)] opacity-70"
                />

                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 font-mono-ui text-[0.68rem] tracking-wide text-text-tertiary uppercase">
                  <span>Log.{String(i + 1).padStart(2, "0")}</span>
                  <span className="border border-secondary px-2.5 py-0.5 text-secondary">{item.tag}</span>
                </div>

                <div className="flex items-center gap-2 font-mono-ui text-[0.68rem] tracking-wide uppercase">
                  <span aria-hidden="true" className={cn("h-2 w-2 rounded-full", status.dotClass)} />
                  <span className={status.colorClass}>{status.label}</span>
                </div>

                <h3 className="text-h3 font-display font-bold text-text-primary">{item.title}</h3>
                <p className="text-body text-text-secondary">{item.description}</p>

                <span
                  className={cn(
                    "font-mono-ui text-[0.62rem] tracking-wide text-text-tertiary uppercase",
                    canReveal &&
                      "opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100",
                  )}
                >
                  Güncelleme: {item.updatedAt}
                </span>
              </motion.div>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
