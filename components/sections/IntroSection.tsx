import { SectionHeading } from "@/components/ui/SectionHeading";
import { Masthead } from "@/components/ui/Masthead";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { focusAreas } from "@/data/focusAreas";
import { siteContent } from "@/data/siteContent";
import { SECTION_IDS } from "@/lib/constants";

export function IntroSection() {
  const { intro } = siteContent;

  return (
    <section
      id={SECTION_IDS.intro}
      aria-labelledby="intro-heading"
      className="relative mx-auto max-w-(--container-max) border-t border-border px-(--section-px) py-(--section-py)"
    >
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {focusAreas.map((area, i) => (
          <ScrollReveal
            key={area.title}
            delay={i * 0.08}
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
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
