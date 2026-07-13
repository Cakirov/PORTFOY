export type SkillGroupKey =
  | "frontend"
  | "backend"
  | "databases"
  | "ai"
  | "devops"
  | "product";

export interface SkillItem {
  name: string;
}

export interface SkillGroup {
  key: SkillGroupKey;
  label: string;
  items: SkillItem[];
}
