import { Search, Blocks, Code2, TestTube2 } from "lucide-react";
import type { ProcessStep } from "@/types/content";

export const processSteps: ProcessStep[] = [
  {
    index: 1,
    title: "Problemi Anlama",
    description:
      "İhtiyacın kökenine iner, hedefleri, kısıtları ve başarı ölçütlerini netleştiririm.",
    icon: Search,
  },
  {
    index: 2,
    title: "Sistemi Tasarlama",
    description:
      "Ölçeklenebilir bir mimari kurar, veri akışını ve bileşenler arası sınırları tanımlarım.",
    icon: Blocks,
  },
  {
    index: 3,
    title: "Ürünü Geliştirme",
    description:
      "Temiz, sürdürülebilir kodla tasarımı hayata geçirir, ilerlemeyi küçük adımlarla doğrularım.",
    icon: Code2,
  },
  {
    index: 4,
    title: "Test Etme ve İyileştirme",
    description:
      "Gerçek kullanım senaryolarına karşı test eder, geri bildirimle sistemi sürekli iyileştiririm.",
    icon: TestTube2,
  },
];
