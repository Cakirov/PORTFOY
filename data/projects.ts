import type { Project } from "@/types/project";

/**
 * NOTE: Aşağıdaki tüm projeler yer tutucu (placeholder) örnek verilerdir.
 * Gerçek proje bilgileri eklenene kadar tasarım ve UX'i sergilemek için kullanılır.
 * Gerçek içerik eklerken yalnızca bu dosya güncellenir — component/layout kodu değişmez.
 */
export const projects: Project[] = [
  {
    id: "project-nova",
    slug: "project-nova",
    title: "Project Nova",
    category: "Systems",
    shortDescription:
      "Dağıtık ekipler için gerçek zamanlı sistem izleme ve olay yönetimi platformu.",
    longDescription:
      "Project Nova, büyük ölçekli dağıtık sistemlerde meydana gelen olayları gerçek zamanlı olarak toplayan, ilişkilendiren ve ekiplere anlamlı öncelik sırasıyla sunan bir izleme platformudur. Amaç, gürültüyü azaltıp gerçekten kritik olan sinyale odaklanmaktı.",
    role: "Kurucu Mühendis / Full-stack",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets", "Docker"],
    year: 2025,
    featured: true,
    layoutSize: "featured",
    visual: { variant: "nodes", accent: "primary" },
    challenge:
      "Ekipler, yüzlerce mikroservisten gelen uyarılar arasında asıl kök nedeni bulmakta zorlanıyor, önemli olaylar gürültüye karışıyordu.",
    solution:
      "Olaylar arasında zaman ve bağımlılık temelli ilişkilendirme yapan bir motor kurduk; bu motor birbiriyle ilişkili uyarıları tek bir 'olay' altında topluyor ve olası kök nedeni öne çıkarıyor.",
    outcome:
      "Erken kullanıcı testlerinde ortalama müdahale süresinin belirgin şekilde kısaldığı, uyarı yorgunluğunun azaldığı gözlemlendi.",
    learnings:
      "Gerçek zamanlı sistemlerde kullanıcıya güven vermek, doğruluktan çok tutarlılık ve şeffaflıkla ilgili — sistemin neden o kararı verdiğini göstermek kritik.",
    links: [
      { label: "Canlı Demo", url: "#", external: false },
      { label: "Vaka Analizi", url: "#", external: false },
    ],
  },
  {
    id: "atlas-commerce",
    slug: "atlas-commerce",
    title: "Atlas Commerce",
    category: "E-Commerce",
    shortDescription:
      "Orta ölçekli perakendeciler için modüler, hızlı ve özelleştirilebilir e-ticaret altyapısı.",
    longDescription:
      "Atlas Commerce, hazır e-ticaret platformlarının esneklik sınırlarına takılan işletmeler için tasarlanmış modüler bir altyapıdır. Katalog, ödeme ve envanter yönetimi bağımsız servisler olarak çalışır.",
    role: "Backend & Sistem Mimarisi",
    technologies: ["Node.js", "Next.js", "PostgreSQL", "Redis", "Stripe API"],
    year: 2024,
    featured: true,
    layoutSize: "wide",
    visual: { variant: "grid", accent: "primary" },
    challenge:
      "Müşteri, büyüdükçe hazır platformun özelleştirme kısıtlarına takılıyor ve her yeni entegrasyon haftalar sürüyordu.",
    solution:
      "Katalog, sipariş ve ödeme akışlarını bağımsız modüllere ayırarak her birinin kendi hızında geliştirilebildiği bir mimari kurduk.",
    outcome:
      "Yeni satış kanalı entegrasyonları haftalar yerine günler içinde tamamlanır hale geldi.",
    learnings: "Modülerlik, doğru sınırları çizmeden sadece ek karmaşıklık getirir.",
    links: [{ label: "Vaka Analizi", url: "#", external: false }],
  },
  {
    id: "neural-workspace",
    slug: "neural-workspace",
    title: "Neural Workspace",
    category: "AI",
    shortDescription:
      "Ekiplerin kendi verileriyle özel yapay zekâ asistanları oluşturabildiği bir çalışma alanı.",
    longDescription:
      "Neural Workspace, ekiplerin kendi doküman ve verilerini bağlayarak konuya özel yapay zekâ asistanları oluşturmasına olanak tanıyan bir araçtır. Odak noktası, doğruluk ve kaynak şeffaflığıdır.",
    role: "AI Entegrasyonu / Frontend",
    technologies: ["Python", "Next.js", "Vector DB", "LLM API", "TypeScript"],
    year: 2025,
    featured: true,
    layoutSize: "tall",
    visual: { variant: "flow", accent: "secondary" },
    challenge:
      "Genel amaçlı asistanlar, ekip içi özel bilgiye erişemediği için yüzeysel cevaplar veriyordu.",
    solution:
      "Doküman tabanlı bir alım (retrieval) katmanı kurarak yanıtların hangi kaynaktan geldiğini şeffaf biçimde gösteren bir arayüz tasarladık.",
    outcome:
      "Kullanıcılar, yanıtlara kaynak gösterildiğinde belirgin biçimde daha fazla güven duyduklarını belirtti.",
    links: [{ label: "Ürün Sayfası", url: "#", external: false }],
  },
  {
    id: "horizon-platform",
    slug: "horizon-platform",
    title: "Horizon Platform",
    category: "Web Platform",
    shortDescription:
      "Küçük ekiplerin proje, zaman ve kaynak yönetimini tek yerden yapabildiği çalışma platformu.",
    longDescription:
      "Horizon Platform, dağınık araçlar arasında geçiş yapmak zorunda kalan küçük ekipler için proje takibi, zaman çizelgesi ve kaynak planlamasını birleştiren tek bir çalışma alanı sunar.",
    role: "Full-stack Geliştirici",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    year: 2023,
    featured: false,
    layoutSize: "standard",
    visual: { variant: "grid", accent: "primary" },
    challenge:
      "Ekipler; görev takibi, zaman çizelgesi ve kaynak planlaması için üç ayrı araç kullanmak zorunda kalıyordu.",
    solution:
      "Üç ihtiyacı da aynı veri modeli üzerinde birleştiren, tek bir görünümden yönetilebilen bir arayüz geliştirdik.",
    outcome: "Ekipler araçlar arası geçiş yapmayı bırakarak günlük planlama süresinden tasarruf etti.",
    links: [{ label: "Vaka Analizi", url: "#", external: false }],
  },
  {
    id: "authcore",
    slug: "authcore",
    title: "AuthCore",
    category: "Developer Tool",
    shortDescription:
      "Geliştiricilerin birkaç satır kodla güvenli kimlik doğrulama ekleyebildiği açık kaynaklı kütüphane.",
    longDescription:
      "AuthCore, kimlik doğrulama akışlarını sıfırdan yazmak yerine güvenli, denetlenmiş ve genişletilebilir bir temel sunan hafif bir kütüphanedir.",
    role: "Kütüphane Yazarı",
    technologies: ["TypeScript", "Node.js", "JWT", "OAuth2"],
    year: 2024,
    featured: false,
    layoutSize: "standard",
    visual: { variant: "mesh", accent: "secondary" },
    challenge:
      "Küçük ekipler, kimlik doğrulamayı her projede yeniden ve genellikle güvenlik açıklarıyla yazıyordu.",
    solution:
      "Yaygın güvenlik hatalarını varsayılan olarak engelleyen, buna karşın tamamen özelleştirilebilir bir API tasarladık.",
    outcome: "Kütüphane, birden fazla iç projede kimlik doğrulama geliştirme süresini kısalttı.",
    links: [
      { label: "Kaynak Kod", url: "#", external: true },
      { label: "Dokümantasyon", url: "#", external: false },
    ],
  },
  {
    id: "living-systems-lab",
    slug: "living-systems-lab",
    title: "Living Systems Lab",
    category: "Systems",
    shortDescription:
      "Kendi kendini iyileştiren ve yük altında ölçeklenen deneysel bir altyapı araştırma projesi.",
    longDescription:
      "Living Systems Lab, canlı sistemlerdeki adaptasyon ilkelerinden ilham alarak, yük ve hata koşullarına otomatik uyum sağlayan altyapı bileşenleri üzerine bir araştırma çalışmasıdır.",
    role: "Araştırma & Prototipleme",
    technologies: ["Python", "Kubernetes", "Go", "Prometheus"],
    year: 2025,
    featured: false,
    layoutSize: "wide",
    visual: { variant: "flow", accent: "primary" },
    challenge:
      "Geleneksel otomatik ölçeklendirme, ani ve düzensiz yük değişimlerinde gecikmeli ve verimsiz kalıyordu.",
    solution:
      "Geçmiş yük örüntülerinden öğrenen ve önceden ölçeklenen deneysel bir kontrol katmanı prototipledik.",
    outcome:
      "Simüle edilmiş senaryolarda kaynak israfı azalırken tepki süresi iyileşti; çalışma devam eden bir araştırmadır.",
    learnings: "Biyolojik sistemlerden ilham almak, mühendislik problemlerine taze bir çerçeve sunuyor.",
    links: [{ label: "Araştırma Notları", url: "#", external: false }],
  },
];
