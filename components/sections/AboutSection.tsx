import { SectionHeading } from "@/components/ui/SectionHeading";
import { Masthead } from "@/components/ui/Masthead";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteContent } from "@/data/siteContent";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function AboutSection() {
  const { about } = siteContent;

  return (
    <section
      id={SECTION_IDS.about}
      aria-labelledby="about-heading"
      className="container-max relative border-t border-border px-(--section-px) py-(--section-py)"
    >
      <ScrollReveal>
        <Masthead fig="04" name="PROFILE" view="ELEVATION" sheet="4 / 8" />
      </ScrollReveal>
      {/* No `sm:` intermediate step here (unlike Intro/Skills/Explorations'
          repeating-card grids) — this is an asymmetric 4/7 sidebar+body
          split, not a repeating card grid, so there's no meaningful "2-up"
          state between stacked and the full split. */}
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="about-heading" eyebrow={about.eyebrow} heading={about.heading} />

          <ScrollReveal delay={0.1} className="mt-10 border border-border-strong">
            <dl>
              {about.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="grid grid-cols-[6rem_1fr] border-b border-dashed border-border px-4 py-2.5 last:border-b-0"
                >
                  <dt className="font-mono-ui text-label text-text-tertiary">{spec.label}</dt>
                  <dd className={cn("text-small", spec.highlight ? "text-accent" : "text-text-primary")}>
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-7 lg:col-start-6">
          {about.body.map((paragraph, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="flex gap-4 text-body text-text-secondary">
              <span className="font-mono-ui text-label text-accent">§{String(i + 1).padStart(2, "0")}</span>
              <p>{paragraph}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
