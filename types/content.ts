import type { IconComponent } from "@/types/icon";

export interface FocusArea {
  title: string;
  description: string;
  icon: IconComponent;
}

export interface ProcessStep {
  index: number;
  title: string;
  description: string;
  icon: IconComponent;
}

export type ExplorationStatus = "active" | "prototype" | "archived";

export interface Exploration {
  id: string;
  title: string;
  description: string;
  tag: string;
  icon: IconComponent;
  status: ExplorationStatus;
  updatedAt: string;
}

export interface AboutSpec {
  label: string;
  value: string;
}

export interface SiteContent {
  hero: {
    eyebrow: string;
    headline: string;
    subtext: string;
    primaryCta: string;
    secondaryCta: string;
  };
  intro: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    body: string[];
    specs: AboutSpec[];
  };
  skills: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  process: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  explorations: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  projects: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  footer: {
    name: string;
    tagline: string;
  };
}
