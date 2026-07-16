export type ProjectCategory =
  | "Web Platform"
  | "AI"
  | "E-Commerce"
  | "Developer Tool"
  | "Systems"
  | "Product";

/** Editorial grid rhythm — drives grid span, not visual one-offs. */
export type ProjectLayoutSize = "featured" | "wide" | "tall" | "standard";

export interface ProjectLink {
  label: string;
  url: string;
  external?: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  longDescription: string;
  role: string;
  technologies: string[];
  year: number;
  featured: boolean;
  layoutSize: ProjectLayoutSize;
  visual: {
    accent?: "primary" | "secondary";
  };
  challenge: string;
  solution: string;
  outcome: string;
  learnings?: string;
  links: ProjectLink[];
}
