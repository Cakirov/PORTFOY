import { Code2, Lightbulb, BrainCircuit, Network } from "lucide-react";
import type { FocusArea } from "@/types/content";

export const focusAreas: FocusArea[] = [
  {
    title: "Software Engineering",
    description: "Sürdürülebilir, test edilebilir ve okunabilir kod üzerine.",
    icon: Code2,
  },
  {
    title: "Product Thinking",
    description: "Teknik kararları kullanıcı ve iş hedefleriyle hizalama.",
    icon: Lightbulb,
  },
  {
    title: "Artificial Intelligence",
    description: "Yeni nesil modelleri gerçek ürün problemlerine uygulama.",
    icon: BrainCircuit,
  },
  {
    title: "Digital Systems",
    description: "Bileşenleri bir bütün olarak tasarlayan sistem düşüncesi.",
    icon: Network,
  },
];
