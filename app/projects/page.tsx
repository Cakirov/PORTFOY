import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Masthead } from "@/components/ui/Masthead";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { ProjectsPlainGrid } from "@/components/sections/ProjectsPlainGrid";
import { projects } from "@/data/projects";
import { HOME_PROJECT_COUNT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tüm Projeler",
  description: "Ana sayfada öne çıkan çalışmaların yanında, geri kalan tüm projelerin tam listesi.",
};

export default function ProjectsIndexPage() {
  const restProjects = projects.slice(HOME_PROJECT_COUNT);

  return (
    <section className="relative overflow-hidden border-t border-border">
      {/* Same faint echo as the homepage grid — this page is a direct
          continuation of it, not a separate visual identity. */}
      <GridBackdrop
        parallax
        className="opacity-[0.12] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
      />

      <div className="container-max relative px-(--section-px) py-(--section-py)">
        <Link
          href="/#projects"
          className="group mb-6 inline-flex items-center gap-2 font-mono-ui text-small uppercase tracking-wide text-text-secondary transition-colors duration-(--motion-fast) hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-(--motion-fast) group-hover:-translate-x-0.5" />
          Ana Sayfaya Dön
        </Link>

        <ScrollReveal>
          <Masthead fig="—" name="ALL PROJECTS" view="INDEX" sheet="— / 8" />
        </ScrollReveal>
        <SectionHeading
          id="all-projects-heading"
          eyebrow="Tüm Projeler"
          heading="Ana sayfadaki seçkinin devamı."
          className="mb-[clamp(2rem,4vw,3rem)]"
        />

        <ProjectsPlainGrid projects={restProjects} startIndex={HOME_PROJECT_COUNT} />
      </div>
    </section>
  );
}
