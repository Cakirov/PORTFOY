import { SectionHeading } from "@/components/ui/SectionHeading";
import { Masthead } from "@/components/ui/Masthead";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { skillGroups } from "@/data/skills";
import { siteContent } from "@/data/siteContent";
import { SECTION_IDS } from "@/lib/constants";

export function SkillsSection() {
  const { skills } = siteContent;

  return (
    <section
      id={SECTION_IDS.skills}
      aria-labelledby="skills-heading"
      className="relative mx-auto max-w-(--container-max) border-t border-border px-6 py-28 lg:px-10 lg:py-36"
    >
      <Masthead fig="05" name="COMPONENT SCHEDULE" view="SCHEDULE" sheet="5 / 8" />
      <SectionHeading
        id="skills-heading"
        eyebrow={skills.eyebrow}
        heading={skills.heading}
        body={skills.body}
        align="center"
        className="mx-auto mb-16 max-w-2xl"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <ScrollReveal key={group.key} delay={i * 0.06} className="border border-border-strong bg-bg-elevated/50">
            <h3 className="flex items-center gap-2 border-b border-border-strong px-4 py-3 font-mono-ui text-label text-accent">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
              {group.label}
            </h3>
            <ul>
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between border-b border-dashed border-border px-4 py-2.5 text-small text-text-primary last:border-b-0"
                >
                  {item.name}
                  <span aria-hidden="true" className="text-text-tertiary">
                    ●
                  </span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
