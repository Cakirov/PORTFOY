"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types/project";
import { NodeGraphic } from "@/components/ui/NodeGraphic";
import { Tag } from "@/components/ui/Tag";
import { PROJECT_CATEGORY_CODE } from "@/lib/constants";

interface ProjectGridCardProps {
  project: Project;
  sheetNumber: number;
  onOpen: (slug: string) => void;
  triggerRef: (el: HTMLButtonElement | null) => void;
}

/**
 * Plain grid tile for the `/projects` index page — every remaining project
 * visible at once, page scrolls normally. Deliberately simpler than the
 * homepage's single-card stack (`ProjectCard`/`ProjectGrid`: no 3D tilt, no
 * pinned scroll-through-cards): this index is a "see everything" list, not
 * the flagship presentation, so it doesn't need that treatment.
 *
 * Still shares `layoutId`s with `ProjectDetailPanel` so opening a tile
 * still gets the same card→full-screen FLIP morph as the homepage.
 */
export function ProjectGridCard({ project, sheetNumber, onOpen, triggerRef }: ProjectGridCardProps) {
  return (
    <motion.div layoutId={`project-card-${project.slug}`} className="h-full">
      <div className="group crosshair-zone relative flex h-full w-full flex-col overflow-hidden border border-border-strong bg-bg-elevated transition-colors duration-(--motion-normal) hover:border-accent">
        <div className="relative flex items-center justify-between border-b border-border-strong px-4 py-2 font-mono-ui text-[0.65rem] tracking-wide text-text-tertiary uppercase">
          <span>Sheet {String(sheetNumber).padStart(2, "0")}</span>
          <span>{project.year}</span>
        </div>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => onOpen(project.slug)}
          aria-controls={`project-panel-${project.slug}`}
          className="relative flex w-full flex-1 flex-col text-left sm:flex-row"
        >
          <motion.div
            layoutId={`project-image-${project.slug}`}
            className="relative aspect-square w-full shrink-0 overflow-hidden border-b border-border-strong bg-panel-2 sm:aspect-auto sm:h-auto sm:w-[40%] sm:border-r sm:border-b-0"
          >
            <div className="absolute inset-0 p-5 opacity-90 transition-transform duration-(--motion-normal) group-hover:scale-[1.06] sm:p-8">
              <NodeGraphic
                slug={project.slug}
                techLabels={project.technologies}
                hubLabel={PROJECT_CATEGORY_CODE[project.category]}
                accent={project.visual.accent ?? "primary"}
                animateOnScroll={false}
              />
            </div>
          </motion.div>

          <div className="flex flex-1 flex-col gap-2 p-5 sm:gap-3 sm:p-8">
            <Tag variant="accent">{project.category}</Tag>
            <h3 className="text-h3 font-display font-bold text-text-primary">{project.title}</h3>
            <p className="text-body line-clamp-2 text-text-secondary sm:line-clamp-3">{project.shortDescription}</p>

            <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {project.technologies.map((tech, i) => (
                <Tag key={tech} className={i >= 3 ? "hidden sm:inline-flex" : undefined}>
                  {tech}
                </Tag>
              ))}
              {project.technologies.length > 3 ? <Tag className="sm:hidden">+{project.technologies.length - 3}</Tag> : null}
            </div>

            <span className="text-small mt-1 inline-flex items-center gap-1.5 font-medium text-accent">
              Detayları Gör
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-(--motion-fast) group-hover:translate-x-1" />
            </span>
          </div>
        </button>
      </div>
    </motion.div>
  );
}
