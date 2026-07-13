"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Masthead } from "@/components/ui/Masthead";
import { processSteps } from "@/data/process";
import { siteContent } from "@/data/siteContent";
import { SECTION_IDS } from "@/lib/constants";

export function ProcessSection() {
  const { process } = siteContent;

  return (
    <section
      id={SECTION_IDS.process}
      aria-labelledby="process-heading"
      className="relative mx-auto max-w-(--container-max) border-t border-border px-6 py-28 lg:px-10 lg:py-36"
    >
      <Masthead fig="06" name="PIPELINE" view="SECTION A-A" sheet="6 / 8" />
      <SectionHeading
        id="process-heading"
        eyebrow={process.eyebrow}
        heading={process.heading}
        body={process.body}
        className="mb-20"
      />

      <ol className="grid grid-cols-1 border border-border-strong lg:grid-cols-4">
        {processSteps.map((step, i) => (
          <motion.li
            key={step.index}
            className="relative border-b border-border-strong p-7 last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
          >
            <span className="mb-4 block font-mono-ui text-label text-accent">Stage {String(step.index).padStart(2, "0")}</span>
            <h3 className="text-h3 font-display font-semibold text-text-primary">{step.title}</h3>
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
