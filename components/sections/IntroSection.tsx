import { SectionHeading } from "@/components/ui/SectionHeading";
import { Masthead } from "@/components/ui/Masthead";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { IconBadge } from "@/components/ui/IconBadge";
import { focusAreas } from "@/data/focusAreas";
import { siteContent } from "@/data/siteContent";
import { SECTION_IDS } from "@/lib/constants";

export function IntroSection() {
  const { intro } = siteContent;

  return (
    <section
      id={SECTION_IDS.intro}
      aria-labelledby="intro-heading"
      className="relative mx-auto max-w-(--container-max) border-t border-border px-6 py-28 lg:px-10 lg:py-36"
    >
      <Masthead fig="02" name="APPROACH" view="DETAIL" sheet="2 / 8" />
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="intro-heading" eyebrow={intro.eyebrow} heading={intro.heading} body={intro.body} />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
          {focusAreas.map((area, i) => (
            <ScrollReveal
              key={area.title}
              delay={i * 0.08}
              className="flex flex-col gap-4 border border-border bg-bg-elevated/50 p-6"
            >
              <IconBadge icon={area.icon} />
              <h3 className="text-h3 font-display font-semibold text-text-primary">{area.title}</h3>
              <p className="text-body text-text-secondary">{area.description}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
