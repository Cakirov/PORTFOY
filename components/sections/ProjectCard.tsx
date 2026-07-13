"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types/project";
import { NodeGraphic } from "@/components/ui/NodeGraphic";
import { Tag } from "@/components/ui/Tag";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { PROJECT_LAYOUT_SPAN_MAP } from "@/lib/constants";

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
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });
  const imageY = useTransform(springRotateX, [-6, 6], [4, -4]);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!canTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 8);
    rotateX.set(-py * 8);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const isTall = project.layoutSize === "tall";
  const isCompact = project.layoutSize === "standard";

  return (
    <motion.div
      layoutId={`project-card-${project.slug}`}
      className={PROJECT_LAYOUT_SPAN_MAP[project.layoutSize]}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d" }}
        className="crosshair-zone group relative flex h-full flex-col overflow-hidden border border-border-strong bg-bg-elevated transition-colors duration-300 hover:border-accent"
      >
        <div className="flex items-center justify-between border-b border-border-strong px-5 py-3 font-mono-ui text-[0.65rem] tracking-wide text-text-tertiary uppercase">
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
          className={cn(
            "flex w-full flex-1 flex-col text-left",
            isTall ? "flex-col-reverse" : isCompact ? "flex-col" : "sm:flex-row",
          )}
        >
          <motion.div
            layoutId={`project-image-${project.slug}`}
            style={{ y: imageY }}
            className={cn(
              "relative overflow-hidden border-b border-border-strong bg-panel-2 sm:border-b-0",
              isTall ? "aspect-[4/5] w-full" : isCompact ? "aspect-[16/10] w-full" : "aspect-[16/10] sm:aspect-auto sm:w-1/2 sm:border-r",
            )}
          >
            <div className="absolute inset-0 p-8 opacity-90 transition-transform duration-500 group-hover:scale-[1.03]">
              <NodeGraphic variant={project.visual.variant} accent={project.visual.accent ?? "primary"} />
            </div>
          </motion.div>

          <div className={cn("flex flex-1 flex-col justify-between gap-6 p-6 sm:p-8", !isCompact && !isTall && "sm:w-1/2")}>
            <div className="flex flex-col gap-3">
              <Tag variant="accent">{project.category}</Tag>
              <h3 className="text-h3 font-display font-semibold text-text-primary">{project.title}</h3>
              <p className="text-body text-text-secondary">{project.shortDescription}</p>
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
