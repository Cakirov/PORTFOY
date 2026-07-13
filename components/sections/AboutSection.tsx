import { SectionHeading } from "@/components/ui/SectionHeading";
import { Masthead } from "@/components/ui/Masthead";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { NodeGraphic } from "@/components/ui/NodeGraphic";
import { siteContent } from "@/data/siteContent";
import { SECTION_IDS } from "@/lib/constants";

export function AboutSection() {
  const { about } = siteContent;

  return (
    <section
      id={SECTION_IDS.about}
      aria-labelledby="about-heading"
      className="relative mx-auto max-w-(--container-max) border-t border-border px-6 py-28 lg:px-10 lg:py-36"
    >
      <Masthead fig="04" name="PROFILE" view="ELEVATION" sheet="4 / 8" />
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="about-heading" eyebrow={about.eyebrow} heading={about.heading} />

          <ScrollReveal
            delay={0.15}
            className="crosshair-zone relative mt-10 hidden aspect-[4/5] overflow-hidden border border-border bg-bg-elevated lg:block"
          >
            <div className="absolute inset-0 p-10 opacity-70">
              <NodeGraphic variant="mesh" accent="secondary" />
            </div>
          </ScrollReveal>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-7 lg:col-start-6">
          {about.body.map((paragraph, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="text-body text-text-secondary">
              <p>{paragraph}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
