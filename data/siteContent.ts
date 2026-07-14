import type { SiteContent } from "@/types/content";
import { PERSON_NAME } from "@/lib/constants";

// NOTE: Tüm metinler geçici/örnek içeriktir; gerçek lansmandan önce güncellenmelidir.
export const siteContent: SiteContent = {
  hero: {
    eyebrow: "Full Stack Developer - IoT - DevOps",
    headline: "Fikirleri çalışan dijital sistemlere dönüştürüyorum.",
    subtext:
      "Yazılım, ürün geliştirme ve yeni nesil teknolojiler üzerine çalışan bir yazılım mühendisiyim.",
    primaryCta: "Projeleri İncele",
    secondaryCta: "Benimle İletişime Geç",
  },
  intro: {
    eyebrow: "Yaklaşım",
    heading: "Kod, çözümün yalnızca bir katmanı.",
    body: "Teknik çözümleri yalnızca kod olarak değil; kullanıcı ihtiyacı, iş modeli, ölçeklenebilirlik ve uzun vadeli sistem tasarımıyla birlikte ele alıyorum.",
  },
  projects: {
    eyebrow: "Seçili Çalışmalar",
    heading: "Projeler",
    body: "Farklı ölçek ve alanlarda geliştirdiğim, sistem düşüncesini öne çıkaran seçili çalışmalar.",
  },
  about: {
    eyebrow: "Hakkımda",
    heading: "Nasıl çalıştığım",
    body: [
      "Bir problemi çözmeden önce onu gerçekten anlamaya zaman ayırırım; çoğu zaman en iyi çözüm ilk akla gelen değildir.",
      "Kodu, uzun vadede bakımı yapılabilecek ve büyüyebilecek bir sistemin parçası olarak tasarlarım — hızlı çözüm ile sağlam çözüm arasındaki dengeyi bilinçli kurarım.",
      "Yeni teknolojilere meraklıyım ama araçları amaç değil, doğru problemi çözmek için birer araç olarak görürüm.",
    ],
    specs: [
      { label: "Rol", value: "Yazılım Mühendisi" },
      { label: "Odak", value: "Sistem Tasarımı · AI" },
      { label: "Durum", value: "Yeni Fırsatlara Açık" },
      { label: "Konum", value: "Uzaktan / TR" },
    ],
  },
  skills: {
    eyebrow: "Yetkinlikler",
    heading: "Çalıştığım teknolojiler",
    body: "Ürünü uçtan uca düşünebilmek için farklı katmanlarda rahat çalışıyorum.",
  },
  process: {
    eyebrow: "Süreç",
    heading: "Çalışma yaklaşımım",
    body: "Her proje aynı dört adımdan geçer — bu disiplin, kalite ve hız arasındaki dengeyi korur.",
  },
  explorations: {
    eyebrow: "Explorations",
    heading: "Deneysel alan",
    body: "Zaman zaman üzerinde çalıştığım küçük fikirler, prototipler ve deneyler.",
  },
  contact: {
    eyebrow: "İletişim",
    heading: "Yeni fikirler, projeler ve iş birlikleri üzerine konuşalım.",
    body: "Aklınızda bir proje mi var, yoksa sadece merhaba mı demek istiyorsunuz? Her iki durumda da yazmaktan çekinmeyin.",
  },
  footer: {
    name: PERSON_NAME,
    tagline: "Yazılım mühendisliği, ürün düşüncesi ve sistem tasarımı üzerine.",
  },
};
