"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Masthead } from "@/components/ui/Masthead";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { processSteps } from "@/data/process";
import { siteContent } from "@/data/siteContent";
import { SECTION_IDS } from "@/lib/constants";
import { EASE_STANDARD } from "@/lib/motion";

export function ProcessSection() {
  const { process } = siteContent;

  return (
    <section
      id={SECTION_IDS.process}
      aria-labelledby="process-heading"
      className="container-max relative border-t border-border px-(--section-px) py-(--section-py)"
    >
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
      <ol className="grid grid-cols-1 border border-border-strong lg:grid-cols-4">
        {processSteps.map((step, i) => (
          <motion.li
            key={step.index}
            className="relative border-b border-border-strong p-7 last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: EASE_STANDARD }}
          >
            <span className="mb-4 block font-mono-ui text-label text-accent">Stage {String(step.index).padStart(2, "0")}</span>
            <h3 className="text-h3 font-display font-bold text-text-primary">{step.title}</h3>
            <p className="text-body mt-2 text-text-secondary">{step.description}</p>
            {i < processSteps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute top-7 right-0 hidden translate-x-1/2 bg-bg font-mono-ui text-accent lg:block"
              >
                →
              </span>
            ) : null}
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
