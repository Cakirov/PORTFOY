import type { ProjectLayoutSize } from "@/types/project";
import type { ExplorationStatus } from "@/types/content";

/**
 * Editorial grid rhythm: a project's visual weight is driven entirely by
 * this lookup, keyed off its `layoutSize`. Adding/reordering projects never
 * requires touching the grid component — only `data/projects.ts`.
 * Cards always stack head-bar → visual → body vertically; only the column
 * span and (for featured/tall) a minimum height vary — there is no
 * row-spanning grid track.
 */
export const PROJECT_LAYOUT_SPAN_MAP: Record<ProjectLayoutSize, string> = {
  featured: "col-span-12 md:col-span-8 md:min-h-[420px]",
  wide: "col-span-12 md:col-span-8",
  tall: "col-span-12 md:col-span-4 md:min-h-[420px]",
  standard: "col-span-12 md:col-span-6",
};

export const SECTION_IDS = {
  hero: "hero",
  intro: "intro",
  projects: "projects",
  about: "about",
  skills: "skills",
  process: "process",
  explorations: "explorations",
  contact: "contact",
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

/**
 * Status → visual mapping for Explorations entries, keyed off `ExplorationStatus`.
 * Only existing design tokens are used (accent/secondary/text-tertiary) — adding
 * or reclassifying an experiment never requires touching the component.
 */
export const EXPLORATION_STATUS_META: Record<
  ExplorationStatus,
  { label: string; colorClass: string; dotClass: string }
> = {
  active: { label: "Aktif", colorClass: "text-accent", dotClass: "bg-accent" },
  prototype: { label: "Prototip", colorClass: "text-secondary", dotClass: "bg-secondary" },
  archived: {
    label: "Arşiv",
    colorClass: "text-text-tertiary",
    dotClass: "border border-text-tertiary",
  },
};

/**
 * Single source of truth for the "revision" stamp shown in the Navbar,
 * project detail panel, and Footer's revision-history table — the last
 * entry is always the current build's revision/date.
 */
export const REVISION_HISTORY = [
  { rev: "01", date: "2026.05.02", note: "İlk taslak — hero ve temel bölümler" },
  { rev: "02", date: "2026.06.18", note: "Proje bölümü ve şematik diyagramlar eklendi" },
  { rev: "03", date: "2026.07.13", note: "Mevcut sürüm — teknik çizim detayları ve proje paneli" },
] as const;

export const CURRENT_REVISION = REVISION_HISTORY[REVISION_HISTORY.length - 1];

/** Single source of truth for the "sheet" numbering used in section mastheads and the nav rail. */
export const SHEET_INDEX = [
  { id: SECTION_IDS.hero, num: "01", label: "Hero" },
  { id: SECTION_IDS.intro, num: "02", label: "Approach" },
  { id: SECTION_IDS.projects, num: "03", label: "Projects" },
  { id: SECTION_IDS.about, num: "04", label: "Profile" },
  { id: SECTION_IDS.skills, num: "05", label: "Schedule" },
  { id: SECTION_IDS.process, num: "06", label: "Pipeline" },
  { id: SECTION_IDS.explorations, num: "07", label: "R&D Log" },
  { id: SECTION_IDS.contact, num: "08", label: "Contact" },
] as const;
