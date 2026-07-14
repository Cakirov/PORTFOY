"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import type { Project } from "@/types/project";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ProjectDetailPanel } from "@/components/sections/ProjectDetailPanel";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement | null>());

  const handleOpen = useCallback((slug: string) => setActiveSlug(slug), []);

  const handleClose = useCallback(() => {
    const slug = activeSlug;
    setActiveSlug(null);
    if (slug) {
      requestAnimationFrame(() => triggerRefs.current.get(slug)?.focus());
    }
  }, [activeSlug]);

  return (
    <LayoutGroup>
      <div className="grid grid-cols-12 gap-5" style={{ gridAutoFlow: "row dense" }}>
        {projects.map((project, index) => (
          <div key={project.id} className="contents">
            {activeSlug === project.slug ? null : (
              <ProjectCard
                project={project}
                sheetNumber={index + 1}
                onOpen={handleOpen}
                triggerRef={(el) => triggerRefs.current.set(project.slug, el)}
              />
            )}
            <AnimatePresence mode="popLayout">
              {activeSlug === project.slug && (
                <ProjectDetailPanel
                  key={project.slug}
                  project={project}
                  sheetNumber={index + 1}
                  onClose={handleClose}
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </LayoutGroup>
  );
}
