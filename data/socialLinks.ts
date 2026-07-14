import { Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import type { SocialLink } from "@/types/social";

export const socialLinks: SocialLink[] = [
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/omerrcakiroglu/",
    icon: LinkedinIcon,
  },
  {
    platform: "github",
    label: "GitHub",
    href: "https://github.com/Cakirov",
    icon: GithubIcon,
  },
  {
    platform: "email",
    label: "E-posta",
    href: "mailto:omerrcakirogluu@gmail.com",
    icon: Mail,
  },
  {
    platform: "cv",
    label: "CV",
    href: "#", // NOTE: gerçek CV dosyası eklenene kadar yer tutucu
    icon: FileText,
  },
];
