import type { ProjectCategory, ProjectLayoutSize } from "@/types/project";
import type { ExplorationStatus } from "@/types/content";

/**
 * Editorial grid rhythm: a project's visual weight is driven entirely by
 * this lookup, keyed off its `layoutSize` — applies at `md:` and up only.
 * Below `md:` the projects grid becomes a horizontal snap-scroll strip
 * (see `PROJECT_CAROUSEL_ITEM_CLASSES`) where layoutSize's visual-weight
 * distinction isn't a meaningful concept. Cards always stack head-bar →
 * visual → body vertically; only the column span and (for featured/tall)
 * a minimum height vary at `md:` — there is no row-spanning grid track.
 */
export const PROJECT_LAYOUT_SPAN_MAP: Record<ProjectLayoutSize, string> = {
  featured: "md:col-span-8 md:min-h-[420px]",
  wide: "md:col-span-8",
  tall: "md:col-span-4 md:min-h-[420px]",
  standard: "md:col-span-6",
};

/** layoutSizes that reserve extra vertical room (`md:min-h-[420px]` above) —
    these should render the taller card image so the diagram doesn't look
    disproportionately small inside the extra height. `wide` gets more width,
    not height, so it's excluded. */
export const PROJECT_LARGE_IMAGE_LAYOUT_SIZES: ProjectLayoutSize[] = ["featured", "tall"];

/**
 * Shared mobile-carousel sizing for both `ProjectCard` and the open
 * `ProjectDetailPanel` — every item (open or closed) needs the same fixed
 * width/shrink/snap behavior in the horizontal strip, regardless of its
 * desktop layoutSize.
 */
export const PROJECT_CAROUSEL_ITEM_CLASSES =
  "w-[85vw] shrink-0 snap-start sm:w-[380px] md:w-auto md:shrink md:snap-align-none";

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
