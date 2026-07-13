import { SectionHeading } from "@/components/ui/SectionHeading";
import { Masthead } from "@/components/ui/Masthead";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { explorations } from "@/data/explorations";
import { siteContent } from "@/data/siteContent";
import { SECTION_IDS } from "@/lib/constants";

export function ExplorationsSection() {
  const { explorations: content } = siteContent;

  return (
    <section
      id={SECTION_IDS.explorations}
      aria-labelledby="explorations-heading"
      className="relative mx-auto max-w-(--container-max) border-t border-border px-6 py-28 lg:px-10 lg:py-36"
    >
      <Masthead fig="07" name="R&D LOG" view="APPENDIX" sheet="7 / 8" />
      <SectionHeading
        id="explorations-heading"
        eyebrow={content.eyebrow}
        heading={content.heading}
        body={content.body}
        className="mb-16"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {explorations.map((item, i) => (
          <ScrollReveal
            key={item.id}
            delay={i * 0.06}
            className="group flex flex-col gap-4 border border-border bg-bg-elevated/50 p-7 transition-colors duration-300 hover:border-secondary"
          >
            <div className="flex items-center justify-between font-mono-ui text-[0.68rem] tracking-wide text-text-tertiary uppercase">
              <span>Log.{String(i + 1).padStart(2, "0")}</span>
              <span className="border border-secondary px-2.5 py-0.5 text-secondary">{item.tag}</span>
            </div>
            <h3 className="text-h3 font-display font-semibold text-text-primary">{item.title}</h3>
            <p className="text-body text-text-secondary">{item.description}</p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
