import type { ProjectLayoutSize } from "@/types/project";

/**
 * Editorial grid rhythm: a project's visual weight is driven entirely by
 * this lookup, keyed off its `layoutSize`. Adding/reordering projects never
 * requires touching the grid component — only `data/projects.ts`.
 */
export const PROJECT_LAYOUT_SPAN_MAP: Record<ProjectLayoutSize, string> = {
  featured: "col-span-12 md:col-span-8 md:row-span-2",
  wide: "col-span-12 md:col-span-8 md:row-span-1",
  tall: "col-span-12 md:col-span-4 md:row-span-2",
  standard: "col-span-12 md:col-span-6 md:row-span-1",
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
