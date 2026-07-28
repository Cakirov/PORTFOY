import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Masthead } from "@/components/ui/Masthead";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { projects } from "@/data/projects";
import { siteContent } from "@/data/siteContent";
import { HOME_PROJECT_COUNT, SECTION_IDS } from "@/lib/constants";

export function ProjectsSection() {
  const { projects: content } = siteContent;
  const featuredProjects = projects.slice(0, HOME_PROJECT_COUNT);
  const remainingCount = projects.length - featuredProjects.length;

  return (
    <section id={SECTION_IDS.projects} aria-labelledby="projects-heading" className="relative border-t border-border">
      {/* Deliberately the faintest echo of all five — the flagship section
          should stay the cleanest, background texture must never compete
          with the grid. */}
      <GridBackdrop
        parallax
        className="opacity-[0.12] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
      />

      <ProjectGrid
        projects={featuredProjects}
        heading={
          <>
            <ScrollReveal>
              <Masthead fig="03" name="PROJECTS" view="PLAN" sheet="3 / 8" className="mb-2" />
            </ScrollReveal>
            <SectionHeading
              id="projects-heading"
              eyebrow={content.eyebrow}
              heading={content.heading}
              body={content.body}
              className="mb-0"
            />
          </>
        }
      />

      {remainingCount > 0 ? (
        <div className="container-max relative px-(--section-px) pb-(--section-py)">
          <ScrollReveal>
            <Link
              href="/projects"
              className="group flex items-center justify-between gap-4 border border-border-strong bg-bg-elevated/40 px-6 py-5 font-mono-ui text-small text-text-primary transition-colors duration-(--motion-fast) hover:border-accent hover:text-accent"
            >
              <span className="uppercase tracking-wide">Tüm Projeleri Gör</span>
              <ArrowUpRight className="h-4 w-4 shrink-0 transition-[transform,color] duration-(--motion-fast) group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </ScrollReveal>
        </div>
      ) : null}
    </section>
  );
}
