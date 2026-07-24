"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types/project";
import { NodeGraphic } from "@/components/ui/NodeGraphic";
import { Tag } from "@/components/ui/Tag";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { fadeInUp, motionTokens, transitionBase, EASE_STANDARD } from "@/lib/motion";
import {
  PROJECT_LAYOUT_SPAN_MAP,
  PROJECT_CAROUSEL_ITEM_CLASSES,
  PROJECT_LARGE_IMAGE_LAYOUT_SIZES,
  PROJECT_CATEGORY_CODE,
} from "@/lib/constants";

interface ProjectCardProps {
  project: Project;
  sheetNumber: number;
  onOpen: (slug: string) => void;
  triggerRef: (el: HTMLButtonElement | null) => void;
  /** True once this card has already played its scroll-in entrance —
      it unmounts while its detail panel is open (see ProjectGrid), so
      without this it would replay the fade-in every time a user closes
      the panel. */
  initialRevealed: boolean;
  onRevealed: () => void;
}

export function ProjectCard({
  project,
  sheetNumber,
  onOpen,
  triggerRef,
  initialRevealed,
  onRevealed,
}: ProjectCardProps) {
  const hasLargeImage = PROJECT_LARGE_IMAGE_LAYOUT_SIZES.includes(project.layoutSize);

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

  return (
    <motion.div
      layoutId={`project-card-${project.slug}`}
      className={cn(
        "relative hover:z-10",
        PROJECT_CAROUSEL_ITEM_CLASSES,
        PROJECT_LAYOUT_SPAN_MAP[project.layoutSize],
      )}
      style={canTilt ? { perspective: 1200 } : undefined}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        variants={fadeInUp}
        initial={initialRevealed ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        onViewportEnter={initialRevealed ? undefined : onRevealed}
        whileHover={{ y: -6, transition: { duration: motionTokens.duration.fast, ease: EASE_STANDARD } }}
        transition={{ ...transitionBase, delay: (sheetNumber - 1) * motionTokens.stagger.item }}
        style={canTilt ? { rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d" } : undefined}
        className="crosshair-zone group relative flex h-full flex-col overflow-hidden border border-border-strong bg-bg-elevated transition-[border-color,box-shadow] duration-(--motion-fast) hover:border-accent hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.55)]"
      >
        <div className="relative flex items-center justify-between border-b border-border-strong px-5 py-2 font-mono-ui text-[0.65rem] tracking-wide text-text-tertiary uppercase md:py-3">
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
          className="relative flex w-full flex-1 flex-col text-left"
        >
          <motion.div
            layoutId={`project-image-${project.slug}`}
            style={{ x: imageX, y: imageY }}
            className={cn(
              "relative w-full overflow-hidden border-b border-border-strong bg-panel-2",
              hasLargeImage ? "h-[220px] md:h-[260px]" : "h-[190px] md:h-[200px]",
            )}
          >
            <div className="absolute inset-0 p-4 opacity-90 transition-transform duration-(--motion-normal) group-hover:scale-[1.06] md:p-5">
              <NodeGraphic
                slug={project.slug}
                techLabels={project.technologies}
                hubLabel={PROJECT_CATEGORY_CODE[project.category]}
                accent={project.visual.accent ?? "primary"}
              />
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
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-(--motion-fast) group-hover:translate-x-1" />
            </span>
          </div>
        </button>
      </motion.div>
    </motion.div>
  );
}
