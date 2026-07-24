import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFigure } from "@/components/ui/SectionFigure";
import { Masthead } from "@/components/ui/Masthead";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { projects } from "@/data/projects";
import { siteContent } from "@/data/siteContent";
import { SECTION_IDS } from "@/lib/constants";

export function ProjectsSection() {
  const { projects: content } = siteContent;

  return (
    <section id={SECTION_IDS.projects} aria-labelledby="projects-heading" className="relative border-t border-border">
      {/* Deliberately the faintest echo of all five — the flagship section
          should stay the cleanest, background texture must never compete
          with the grid. */}
      <GridBackdrop
        parallax
        className="opacity-[0.12] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
      />
      <ParallaxLayer layer="foreground" className="pointer-events-none absolute inset-0">
        <SectionFigure figure="03" />
      </ParallaxLayer>

      <div className="container-max relative px-(--section-px) py-(--section-py)">
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
      </div>
    </section>
  );
}
