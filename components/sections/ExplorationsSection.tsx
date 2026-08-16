"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Masthead } from "@/components/ui/Masthead";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { IconBadge } from "@/components/ui/IconBadge";
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
        className="opacity-[0.13] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
      />

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
                className="group relative flex flex-col gap-4 border border-border bg-bg-elevated/50 py-7 pr-7 pl-9 transition-[border-color,box-shadow] duration-300 hover:border-secondary hover:shadow-[0_16px_32px_-16px_rgba(0,0,0,0.45)]"
              >
                <span aria-hidden="true" className="absolute top-6 bottom-6 left-4 w-px">
                  <span className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,var(--border-strong)_0_3px,transparent_3px_8px)] opacity-70" />
                  {/* Traveling signal echoing NodeGraphic's drifting
                      data-packet dots — same motif as Process's ledger rule,
                      tinted secondary to match this section's own accent. */}
                  <motion.span
                    className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary shadow-[0_0_6px_1px_var(--secondary)]"
                    animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: i * 0.5, times: [0, 0.12, 0.88, 1] }}
                  />
                </span>

                <IconBadge icon={item.icon} size="sm" />

                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-label-sm tracking-wide text-text-tertiary uppercase">
                  <span>Log.{String(i + 1).padStart(2, "0")}</span>
                  <span className="border border-secondary px-2.5 py-0.5 text-secondary">{item.tag}</span>
                </div>

                <div className="flex items-center gap-2 text-label-sm tracking-wide uppercase">
                  <span aria-hidden="true" className={cn("h-2 w-2 rounded-full", status.dotClass)} />
                  <span className={status.colorClass}>{status.label}</span>
                </div>

                <h3 className="text-h3 font-display font-bold text-text-primary">{item.title}</h3>
                <p className="text-body text-text-secondary">{item.description}</p>

                <span
                  className={cn(
                    "text-label-sm tracking-wide text-text-tertiary uppercase",
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
