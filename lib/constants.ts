import type { ProjectCategory } from "@/types/project";
import type { ExplorationStatus } from "@/types/content";

/**
 * The vertical project-card stack (`ProjectGrid`) pins in place (via a tall
 * scroll spacer + `position: sticky`, set up by its caller — see
 * `ProjectsSection`/`app/projects/page.tsx`) while the page's own scroll —
 * mouse wheel, trackpad, or a touch swipe, no custom gesture handling needed
 * for any of them — steps through its cards; only once the last one has
 * been reached does scrolling continue on to whatever comes next. This is
 * how many "flip through the work" sections on portfolio/agency sites
 * behave, instead of a normal in-flow grid the page just scrolls past.
 * This constant is how much extra scroll distance (in `vh`) one step (one
 * card) accounts for — the spacer's total height is `cardCount * this`.
 */
export const PROJECT_STACK_STEP_VH = 70;

/** Single source of truth for the site owner's name — used in the navbar, footer, and page metadata. */
export const PERSON_NAME = "Ömer Çakıroğlu";

/** How many of `data/projects.ts` (front of the array, its strongest-first
    order) show on the homepage grid — the rest live on the `/projects`
    index page, reachable via the "Tüm Projeleri Gör" banner below the grid. */
export const HOME_PROJECT_COUNT = 6;

/** Short code shown in each project card's diagram hub (NodeGraphic) — ties
    the schematic back to that project's own category instead of a generic
    "CORE" label, keyed off the same category already shown in its Tag. */
export const PROJECT_CATEGORY_CODE: Record<ProjectCategory, string> = {
  "Web Platform": "WEB",
  AI: "AI",
  "E-Commerce": "SHOP",
  "Developer Tool": "DEV",
  Systems: "SYS",
  Product: "APP",
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

/** Single source of truth for the section list used by the nav rail. */
export const SHEET_INDEX = [
  { id: SECTION_IDS.hero, label: "Hero" },
  { id: SECTION_IDS.intro, label: "Approach" },
  { id: SECTION_IDS.projects, label: "Projects" },
  { id: SECTION_IDS.about, label: "Profile" },
  { id: SECTION_IDS.skills, label: "Schedule" },
  { id: SECTION_IDS.process, label: "Pipeline" },
  { id: SECTION_IDS.explorations, label: "R&D Log" },
  { id: SECTION_IDS.contact, label: "Contact" },
] as const;
