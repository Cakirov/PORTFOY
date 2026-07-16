import type { IconComponent } from "@/types/icon";

export type SocialPlatform = "linkedin" | "github" | "email";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
  icon: IconComponent;
}
