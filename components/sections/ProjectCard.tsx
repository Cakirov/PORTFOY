"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types/project";
import { NodeGraphic } from "@/components/ui/NodeGraphic";
import { Tag } from "@/components/ui/Tag";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { PROJECT_CATEGORY_CODE } from "@/lib/constants";

interface ProjectCardProps {
  project: Project;
  sheetNumber: number;
  onOpen: (slug: string) => void;
  triggerRef: (el: HTMLButtonElement | null) => void;
  /** True only for the card currently on top of the stack. The parked
      neighbor (see ProjectGrid) is rendered too but sits behind an `inert`
      wrapper — this just keeps its own trigger out of the tab order and
      skips the tilt/depth treatment meant for the one interactive card. */
  isCurrent: boolean;
}

// Max rotation in degrees.
const MAX_TILT_DEG = 9;

/**
 * A previous version combined this tilt with `whileHover={{ y: -6 }}` — at
 * this card's size (most of a viewport, not a small grid tile), that lift
 * could push the pointer past the card's own edge, firing `mouseleave`,
 * un-lifting it, and letting the pointer re-enter — a flicker loop right at
 * the border. The lift is gone for good; the tilt alone doesn't reproduce it.
 *
 * The card is one single rigid rotating plane — no separate transform on
 * the image (an earlier version parallax-shifted it a few px opposite the
 * tilt for a fake-depth cue). Layering a second, independently-computed
 * transform on a child already inside a `perspective`/`preserve-3d`
 * rotating parent — one that ALSO carries its own `layoutId` for the
 * shared-transition into the detail panel — is exactly the kind of nested
 * transform stack that renders inconsistently at steep angles (borders and
 * the image appearing to separate from the rest of the card right at the
 * edges). One rotation, applied once, is what actually holds together at
 * any angle.
 */
export function ProjectCard({ project, sheetNumber, onOpen, triggerRef, isCurrent }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  // Cached on enter rather than re-measured on every mousemove — the card's
  // box doesn't move while the pointer is inside it, so a fresh
  // getBoundingClientRect() per raw mousemove event is an unnecessary
  // synchronous layout read.
  const rectRef = useRef<DOMRect | null>(null);
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const canTilt = isCurrent && canHover;

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  function handleMouseEnter() {
    if (!canTilt || !cardRef.current) return;
    rectRef.current = cardRef.current.getBoundingClientRect();
  }

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!canTilt || !rectRef.current) return;
    const rect = rectRef.current;
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * MAX_TILT_DEG);
    rotateX.set(-py * MAX_TILT_DEG);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      layoutId={`project-card-${project.slug}`}
      className="relative h-full w-full"
      style={canTilt ? { perspective: 1000 } : undefined}
    >
      <motion.div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={canTilt ? { rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d" } : undefined}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden border border-border-strong bg-bg-elevated transition-[border-color,box-shadow] duration-(--motion-normal) hover:border-accent",
          isCurrent && "shadow-[0_24px_48px_-20px_rgba(0,0,0,0.55)]",
        )}
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
          tabIndex={isCurrent ? 0 : -1}
          className="relative flex w-full flex-1 flex-col text-left md:flex-row"
        >
          <motion.div
            layoutId={`project-image-${project.slug}`}
            className="relative aspect-square w-full shrink-0 overflow-hidden border-b border-border-strong bg-panel-2 md:aspect-auto md:h-full md:w-[40%] md:border-r md:border-b-0"
          >
            <div className="absolute inset-0 p-6 opacity-90 transition-transform duration-(--motion-normal) group-hover:scale-[1.06] md:p-8">
              <NodeGraphic
                slug={project.slug}
                techLabels={project.technologies}
                hubLabel={PROJECT_CATEGORY_CODE[project.category]}
                accent={project.visual.accent ?? "primary"}
                animateOnScroll={false}
              />
            </div>
          </motion.div>

          <div className="flex flex-1 flex-col gap-3 overflow-hidden p-5 md:gap-4 md:p-10">
            <h3 className="text-h2 font-display font-bold text-text-primary">{project.title}</h3>
            <p className="text-body line-clamp-2 text-text-secondary md:line-clamp-3">{project.shortDescription}</p>

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
