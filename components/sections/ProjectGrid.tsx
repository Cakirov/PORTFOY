"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/types/project";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ProjectDetailPanel } from "@/components/sections/ProjectDetailPanel";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement | null>());
  const scrollRef = useRef<HTMLDivElement>(null);
  // Ratio of visible-to-total scroll width, i.e. how big the custom scroll
  // thumb should be — mobile browsers hide/auto-fade native scrollbars on
  // touch, so without this the horizontal strip doesn't read as scrollable.
  const [thumbRatio, setThumbRatio] = useState(1);
  const { scrollXProgress } = useScroll({ container: scrollRef });
  const thumbLeft = useTransform(scrollXProgress, [0, 1], ["0%", `${(1 - thumbRatio) * 100}%`]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    function measure() {
      if (!el || el.scrollWidth === 0) return;
      setThumbRatio(Math.min(1, el.clientWidth / el.scrollWidth));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [projects.length]);

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
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-12 md:overflow-visible md:pb-0"
        style={{ gridAutoFlow: "row dense" }}
      >
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

      {thumbRatio < 1 ? (
        <div aria-hidden="true" className="relative mt-3 h-[3px] rounded-full bg-border md:hidden">
          <motion.div
            className="absolute inset-y-0 rounded-full bg-accent"
            style={{ width: `${thumbRatio * 100}%`, left: thumbLeft }}
          />
        </div>
      ) : null}
    </LayoutGroup>
  );
}
