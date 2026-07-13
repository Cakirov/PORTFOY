"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import type { Project } from "@/types/project";
import { NodeGraphic } from "@/components/ui/NodeGraphic";
import { Tag } from "@/components/ui/Tag";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { PROJECT_LAYOUT_SPAN_MAP } from "@/lib/constants";

interface ProjectDetailPanelProps {
  project: Project;
  sheetNumber: number;
  onClose: () => void;
}

const DETAIL_BLOCKS: Array<{ key: keyof Project; label: string }> = [
  { key: "challenge", label: "Not 1 — Problem" },
  { key: "solution", label: "Not 2 — Yaklaşım" },
  { key: "outcome", label: "Not 3 — Sonuç" },
];

export function ProjectDetailPanel({ project, sheetNumber, onClose }: ProjectDetailPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");

  useFocusTrap(panelRef, true);
  useLockBodyScroll(isMobile);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      layoutId={`project-card-${project.slug}`}
      id={`project-panel-${project.slug}`}
      role="region"
      aria-label={`${project.title} detayları`}
      ref={panelRef}
      className={`${PROJECT_LAYOUT_SPAN_MAP.featured} overflow-hidden border border-border-strong bg-bg-elevated md:col-span-12 md:row-span-1`}
    >
      <div className="flex items-center justify-between border-b border-border-strong px-5 py-3 font-mono-ui text-[0.68rem] tracking-wide text-text-tertiary uppercase">
        <span>
          Sheet {String(sheetNumber).padStart(2, "0")} <span className="text-accent">Detail</span>
        </span>
        <span>Rev. 2026.07.13</span>
      </div>

      <div className="relative">
        <motion.div layoutId={`project-image-${project.slug}`} className="relative aspect-[21/9] w-full overflow-hidden bg-panel-2">
          <div className="absolute inset-0 p-12 opacity-90">
            <NodeGraphic variant={project.visual.variant} accent={project.visual.accent ?? "primary"} />
          </div>
        </motion.div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Detayı kapat"
          className="absolute top-5 right-5 inline-flex h-9 w-9 items-center justify-center border border-border-strong bg-bg/80 text-text-primary backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="grid grid-cols-1 gap-10 p-8 sm:p-12 lg:grid-cols-12"
      >
        <div className="lg:col-span-7">
          <div className="mb-4 flex items-center gap-3">
            <Tag variant="accent">{project.category}</Tag>
            <span className="text-small font-mono-ui text-text-tertiary">
              {project.year} · {project.role}
            </span>
          </div>

          <h3 ref={headingRef} tabIndex={-1} className="text-h1 font-display font-semibold text-text-primary outline-none">
            {project.title}
          </h3>

          <p className="text-body mt-5 text-text-secondary">{project.longDescription}</p>

          <div className="mt-10 flex flex-col gap-8">
            {DETAIL_BLOCKS.map(({ key, label }) => (
              <div key={key}>
                <h4 className="mb-2 font-mono-ui text-label text-accent">{label}</h4>
                <p className="text-body text-text-secondary">{project[key] as string}</p>
              </div>
            ))}

            {project.learnings ? (
              <div>
                <h4 className="mb-2 font-mono-ui text-label text-accent">Not 4 — Öğrenilenler</h4>
                <p className="text-body text-text-secondary">{project.learnings}</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-5">
          <div className="border border-border-strong">
            <div className="grid grid-cols-[2.5rem_1fr] border-b border-border-strong px-3 py-2 font-mono-ui text-[0.62rem] tracking-wide text-text-tertiary uppercase">
              <span>No</span>
              <span>Parça / Teknoloji</span>
            </div>
            <ul>
              {project.technologies.map((tech, i) => (
                <li
                  key={tech}
                  className="grid grid-cols-[2.5rem_1fr] border-b border-dashed border-border px-3 py-2 text-small text-text-primary last:border-b-0"
                >
                  <span className="font-mono-ui text-text-tertiary">{String(i + 1).padStart(2, "0")}</span>
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.links.length > 0 ? (
            <div>
              <h4 className="mb-3 font-mono-ui text-label text-text-tertiary">Referans Dokümanlar</h4>
              <div className="flex flex-col gap-2">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-body inline-flex items-center gap-1.5 text-accent transition-colors hover:text-accent-strong"
                  >
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}
