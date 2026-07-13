import { Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import type { SocialLink } from "@/types/social";

// NOTE: Placeholder değerler — gerçek profil/dosya bağlantıları eklenene kadar yer tutucudur.
export const socialLinks: SocialLink[] = [
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/kullanici-adi",
    icon: LinkedinIcon,
  },
  {
    platform: "github",
    label: "GitHub",
    href: "https://github.com/kullanici-adi",
    icon: GithubIcon,
  },
  {
    platform: "email",
    label: "E-posta",
    href: "mailto:merhaba@example.com",
    icon: Mail,
  },
  {
    platform: "cv",
    label: "CV",
    href: "#", // NOTE: gerçek CV dosyası eklenene kadar yer tutucu
    icon: FileText,
  },
];
