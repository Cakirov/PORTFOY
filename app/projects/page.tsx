import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Masthead } from "@/components/ui/Masthead";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { projects } from "@/data/projects";
import { HOME_PROJECT_COUNT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tüm Projeler",
  description: "Ana sayfada öne çıkan çalışmaların yanında, geri kalan tüm projelerin tam listesi.",
};

export default function ProjectsIndexPage() {
  const restProjects = projects.slice(HOME_PROJECT_COUNT);

  return (
    <section className="relative overflow-hidden border-t border-border pt-(--nav-height)">
      {/* Same faint echo as the homepage grid — this page is a direct
          continuation of it, not a separate visual identity. */}
      <GridBackdrop
        parallax
        className="opacity-[0.12] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
      />
      <div className="container-max relative px-(--section-px) py-(--section-py)">
        <Masthead fig="—" name="ALL PROJECTS" view="INDEX" sheet="— / 8" />

        <SectionHeading
          id="all-projects-heading"
          eyebrow="Tüm Projeler"
          heading="Ana sayfadaki seçkinin devamı."
          body={`Ana sayfada öne çıkan ${HOME_PROJECT_COUNT} çalışmanın yanında, burada anlatmaya değer bulduğum geri kalan ${restProjects.length} proje yer alıyor.`}
          className="mb-[clamp(2rem,4vw,3rem)]"
        />

        <ProjectGrid projects={restProjects} startIndex={HOME_PROJECT_COUNT} />

        <Link
          href="/#projects"
          className="group mt-10 inline-flex items-center gap-2 font-mono-ui text-small uppercase tracking-wide text-text-secondary transition-colors duration-(--motion-fast) hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-(--motion-fast) group-hover:-translate-x-0.5" />
          Ana Sayfaya Dön
        </Link>
      </div>
    </section>
  );
}
