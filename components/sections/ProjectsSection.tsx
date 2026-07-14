import { SectionHeading } from "@/components/ui/SectionHeading";
import { Masthead } from "@/components/ui/Masthead";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { projects } from "@/data/projects";
import { siteContent } from "@/data/siteContent";
import { SECTION_IDS } from "@/lib/constants";

export function ProjectsSection() {
  const { projects: content } = siteContent;

  return (
    <section
      id={SECTION_IDS.projects}
      aria-labelledby="projects-heading"
      className="container-max relative border-t border-border px-(--section-px) py-(--section-py)"
    >
      <ScrollReveal>
        <Masthead fig="03" name="PROJECTS" view="PLAN" sheet="3 / 8" />
      </ScrollReveal>
      <SectionHeading
        id="projects-heading"
        eyebrow={content.eyebrow}
        heading={content.heading}
        body={content.body}
        className="mb-[clamp(2rem,4vw,3rem)]"
      />
      <ProjectGrid projects={projects} />
    </section>
  );
}
