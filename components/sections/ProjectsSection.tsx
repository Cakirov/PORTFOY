import { SectionHeading } from "@/components/ui/SectionHeading";
import { Masthead } from "@/components/ui/Masthead";
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
      className="relative mx-auto max-w-(--container-max) border-t border-border px-6 py-28 lg:px-10 lg:py-36"
    >
      <Masthead fig="03" name="PROJECTS" view="PLAN" sheet="3 / 8" />
      <SectionHeading
        id="projects-heading"
        eyebrow={content.eyebrow}
        heading={content.heading}
        body={content.body}
        className="mb-16"
      />
      <ProjectGrid projects={projects} />
    </section>
  );
}
