import { Sparkles, LayoutPanelTop, Bot, Rocket, FlaskConical } from "lucide-react";
import type { Exploration } from "@/types/content";

// NOTE: Örnek deneysel içerik — gerçek prototip/deney kayıtlarıyla değiştirilecektir.
export const explorations: Exploration[] = [
  {
    id: "ai-copilot-sketch",
    title: "AI Destekli Kod Taslağı",
    description: "LLM tabanlı bir asistanın, mevcut bir kod tabanının desenlerini öğrenip taslak öneriler üretmesi üzerine küçük bir deney.",
    tag: "AI Deneyi",
    icon: Bot,
  },
  {
    id: "spatial-nav-concept",
    title: "Mekânsal Navigasyon Fikri",
    description: "Geleneksel scroll yerine, içerikler arasında uzamsal geçişlerle gezinen bir arayüz konsepti.",
    tag: "UI Prototipi",
    icon: LayoutPanelTop,
  },
  {
    id: "self-healing-pipeline",
    title: "Kendi Kendini Onaran Pipeline",
    description: "Hata durumunda otomatik olarak eski sürüme dönen ve ekibi bilgilendiren küçük bir otomasyon sistemi denemesi.",
    tag: "Otomasyon",
    icon: Sparkles,
  },
  {
    id: "edge-inference",
    title: "Uç Cihazda Çıkarım",
    description: "Küçük bir modeli tarayıcı içinde çalıştırarak sunucu maliyetini ortadan kaldıran bir yaklaşımın denenmesi.",
    tag: "Gelecek Teknolojisi",
    icon: Rocket,
  },
  {
    id: "generative-layout",
    title: "Üretici Sistem ile Sayfa Düzeni",
    description: "İçerik yoğunluğuna göre kendini yeniden dengeleyen deneysel bir grid sistemi prototipi.",
    tag: "Prototip",
    icon: FlaskConical,
  },
];
