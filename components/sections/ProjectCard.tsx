"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types/project";
import { NodeGraphic } from "@/components/ui/NodeGraphic";
import { Tag } from "@/components/ui/Tag";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import {
  PROJECT_LAYOUT_SPAN_MAP,
  PROJECT_CAROUSEL_ITEM_CLASSES,
  PROJECT_LARGE_IMAGE_LAYOUT_SIZES,
} from "@/lib/constants";

interface ProjectCardProps {
  project: Project;
  sheetNumber: number;
  onOpen: (slug: string) => void;
  triggerRef: (el: HTMLButtonElement | null) => void;
}

export function ProjectCard({ project, sheetNumber, onOpen, triggerRef }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const canTilt = useMediaQuery("(hover: hover) and (pointer: fine)");

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 350, damping: 28 });
  const springRotateY = useSpring(rotateY, { stiffness: 350, damping: 28 });
  const imageY = useTransform(springRotateX, [-11, 11], [7, -7]);
  const imageX = useTransform(springRotateY, [-11, 11], [-7, 7]);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!canTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 11);
    rotateX.set(-py * 11);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const hasLargeImage = PROJECT_LARGE_IMAGE_LAYOUT_SIZES.includes(project.layoutSize);

  return (
    <motion.div
      layoutId={`project-card-${project.slug}`}
      className={cn(
        "relative hover:z-10",
        PROJECT_CAROUSEL_ITEM_CLASSES,
        PROJECT_LAYOUT_SPAN_MAP[project.layoutSize],
      )}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -6, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d" }}
        className="crosshair-zone group relative flex h-full flex-col overflow-hidden border border-border-strong bg-bg-elevated transition-[border-color,box-shadow] duration-200 hover:border-accent hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.55)]"
      >
        <div className="flex items-center justify-between border-b border-border-strong px-5 py-2 font-mono-ui text-[0.65rem] tracking-wide text-text-tertiary uppercase md:py-3">
          <span>Sheet {String(sheetNumber).padStart(2, "0")}</span>
          <strong className="text-accent">{project.category}</strong>
          <span>{project.year}</span>
        </div>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => onOpen(project.slug)}
          aria-expanded={false}
          aria-controls={`project-panel-${project.slug}`}
          className="flex w-full flex-1 flex-col text-left"
        >
          <motion.div
            layoutId={`project-image-${project.slug}`}
            style={{ x: imageX, y: imageY }}
            className={cn(
              "relative w-full overflow-hidden border-b border-border-strong bg-panel-2",
              hasLargeImage ? "h-[150px] md:h-[260px]" : "h-[130px] md:h-[200px]",
            )}
          >
            <div className="absolute inset-0 p-5 opacity-90 transition-transform duration-500 group-hover:scale-[1.06]">
              <NodeGraphic variant={project.visual.variant} accent={project.visual.accent ?? "primary"} />
            </div>
          </motion.div>

          <div className="flex flex-1 flex-col gap-2 p-4 md:gap-3 md:p-6">
            <Tag variant="accent">{project.category}</Tag>
            <h3 className="text-h3 font-display font-bold text-text-primary">{project.title}</h3>
            <p className="text-body line-clamp-2 text-text-secondary md:line-clamp-none">{project.shortDescription}</p>

            <div className="mt-auto flex flex-wrap gap-1.5">
              {project.technologies.map((tech, i) => (
                <Tag key={tech} className={cn(i >= 3 && "hidden md:inline-flex")}>
                  {tech}
                </Tag>
              ))}
              {project.technologies.length > 3 ? (
                <Tag className="md:hidden">+{project.technologies.length - 3}</Tag>
              ) : null}
            </div>

            <span className="text-small inline-flex items-center gap-1.5 font-medium text-accent">
              Detayları Gör
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </button>
      </motion.div>
    </motion.div>
  );
}
