"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import type { Project } from "@/types/project";
import { ProjectGridCard } from "@/components/sections/ProjectGridCard";
import { ProjectDetailPanel } from "@/components/sections/ProjectDetailPanel";

interface ProjectsPlainGridProps {
  projects: Project[];
  startIndex?: number;
}

/**
 * Plain, normally-scrolling grid for the `/projects` index — every project
 * visible at once, no pinned/stepped stack (that's the homepage's
 * `ProjectGrid`, a deliberately different, more elaborate presentation for
 * the flagship "Projeler" section; this index is a simple "see everything"
 * list, so it doesn't get that treatment).
 */
export function ProjectsPlainGrid({ projects, startIndex = 0 }: ProjectsPlainGridProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement | null>());
  // Captured *before* `setActiveSlug` below — opening removes the clicked
  // tile from the grid (see the render below), which reflows the grid and
  // can shrink the page enough that the browser clamps `window.scrollY`
  // before the panel's own scroll-lock would otherwise read it. Reading it
  // here, ahead of that reflow, is what `useLockBodyScroll`'s `restoreY`
  // param is for.
  const [restoreScrollY, setRestoreScrollY] = useState(0);

  const handleOpen = useCallback((slug: string) => {
    setRestoreScrollY(window.scrollY);
    setActiveSlug(slug);
  }, []);

  const handleClose = useCallback(() => {
    const slug = activeSlug;
    setActiveSlug(null);
    if (slug) {
      requestAnimationFrame(() => triggerRefs.current.get(slug)?.focus({ preventScroll: true }));
    }
  }, [activeSlug]);

  const activeIndex = activeSlug ? projects.findIndex((project) => project.slug === activeSlug) : -1;
  const activeProject = activeIndex >= 0 ? projects[activeIndex] : null;

  return (
    <LayoutGroup>
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, index) =>
          project.slug === activeSlug ? null : (
            <ProjectGridCard
              key={project.slug}
              project={project}
              sheetNumber={startIndex + index + 1}
              onOpen={handleOpen}
              triggerRef={(el) => triggerRefs.current.set(project.slug, el)}
            />
          ),
        )}
      </div>

      <AnimatePresence>
        {activeProject ? (
          <ProjectDetailPanel
            key={activeProject.slug}
            project={activeProject}
            sheetNumber={startIndex + activeIndex + 1}
            onClose={handleClose}
            restoreScrollY={restoreScrollY}
          />
        ) : null}
      </AnimatePresence>
    </LayoutGroup>
  );
}
