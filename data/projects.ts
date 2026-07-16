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
      "Project Nova, büyük ölçekli dağıtık sistemlerde meydana gelen olayları gerçek zamanlı olarak toplayan, ilişkilendiren ve ekiplere anlamlı öncelik sırasıyla sunan bir izleme platformudur. Amaç, gürültüyü azaltıp gerçekten kritik olan sinyale odaklanmaktı. Platform, yüzlerce servisten akan telemetriyi tek bir olay zaman çizelgesinde birleştirir ve nöbetçi mühendislerin kök nedene dakikalar içinde ulaşmasını hedefler.",
    role: "Kurucu Mühendis / Full-stack",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets", "Docker", "Redis"],
    year: 2025,
    featured: true,
    layoutSize: "featured",
    visual: { accent: "primary" },
    challenge:
      "Ekipler, yüzlerce mikroservisten gelen uyarılar arasında asıl kök nedeni bulmakta zorlanıyor, önemli olaylar gürültüye karışıyordu. Nöbetçi mühendisler genellikle birbirine bağlı onlarca uyarıyı tek tek inceleyerek zaman kaybediyordu.",
    solution:
      "Olaylar arasında zaman ve bağımlılık temelli ilişkilendirme yapan bir motor kurduk; bu motor birbiriyle ilişkili uyarıları tek bir 'olay' altında topluyor ve olası kök nedeni öne çıkarıyor. WebSocket tabanlı canlı akış sayesinde ekip aynı olay zaman çizelgesini eş zamanlı izleyebiliyor.",
    outcome:
      "Erken kullanıcı testlerinde ortalama müdahale süresinin belirgin şekilde kısaldığı, uyarı yorgunluğunun azaldığı gözlemlendi. Nöbetçi ekipler, artık ilgisiz uyarıları elemek yerine doğrudan ilişkilendirilmiş olaya odaklanabiliyor.",
    learnings:
      "Gerçek zamanlı sistemlerde kullanıcıya güven vermek, doğruluktan çok tutarlılık ve şeffaflıkla ilgili — sistemin neden o kararı verdiğini göstermek kritik. İlişkilendirme mantığını kara kutu olarak bırakmak yerine her adımı izlenebilir kılmak, benimsenmeyi hızlandırdı.",
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
      "Atlas Commerce, hazır e-ticaret platformlarının esneklik sınırlarına takılan işletmeler için tasarlanmış modüler bir altyapıdır. Katalog, ödeme ve envanter yönetimi bağımsız servisler olarak çalışır ve her biri kendi veri modeliyle, kendi hızında yayına alınabilir. Çok kanallı satış (web, mobil, pazar yeri) tek bir sipariş çekirdeği üzerinden yönetilir.",
    role: "Backend & Sistem Mimarisi",
    technologies: ["Node.js", "Next.js", "PostgreSQL", "Redis", "Stripe API", "Docker"],
    year: 2024,
    featured: true,
    layoutSize: "wide",
    visual: { accent: "primary" },
    challenge:
      "Müşteri, büyüdükçe hazır platformun özelleştirme kısıtlarına takılıyor ve her yeni entegrasyon haftalar sürüyordu. Kampanya dönemlerinde envanter senkronizasyonu sık sık gecikiyor, stok tutarsızlıkları satış kaybına yol açıyordu.",
    solution:
      "Katalog, sipariş ve ödeme akışlarını bağımsız modüllere ayırarak her birinin kendi hızında geliştirilebildiği bir mimari kurduk. Envanteri olay tabanlı bir senkronizasyon katmanı üzerinden gerçek zamanlı güncelleyen bir tasarım benimsedik.",
    outcome:
      "Yeni satış kanalı entegrasyonları haftalar yerine günler içinde tamamlanır hale geldi. Yoğun kampanya dönemlerinde stok tutarsızlığı kaynaklı iptaller belirgin şekilde azaldı.",
    learnings:
      "Modülerlik, doğru sınırları çizmeden sadece ek karmaşıklık getirir. Servisler arası sözleşmeyi (contract) en başta net tanımlamak, sonradan yeniden bölmekten çok daha ucuza geliyor.",
    links: [
      { label: "Vaka Analizi", url: "#", external: false },
      { label: "Mimari Notları", url: "#", external: false },
    ],
  },
  {
    id: "neural-workspace",
    slug: "neural-workspace",
    title: "Neural Workspace",
    category: "AI",
    shortDescription:
      "Ekiplerin kendi verileriyle özel yapay zekâ asistanları oluşturabildiği bir çalışma alanı.",
    longDescription:
      "Neural Workspace, ekiplerin kendi doküman ve verilerini bağlayarak konuya özel yapay zekâ asistanları oluşturmasına olanak tanıyan bir araçtır. Odak noktası, doğruluk ve kaynak şeffaflığıdır — her yanıt, hangi belgeden türetildiği gösterilmeden sunulmaz. Ekipler, kod tabanına dokunmadan yeni bir bilgi kaynağını dakikalar içinde asistana bağlayabilir.",
    role: "AI Entegrasyonu / Frontend",
    technologies: ["Python", "Next.js", "Vector DB", "LLM API", "TypeScript"],
    year: 2025,
    featured: true,
    layoutSize: "tall",
    visual: { accent: "secondary" },
    challenge:
      "Genel amaçlı asistanlar, ekip içi özel bilgiye erişemediği için yüzeysel cevaplar veriyordu. Kullanıcılar, bir yanıtın nereden geldiğini doğrulayamadıkları için sonuçlara güvenmekte tereddüt ediyordu.",
    solution:
      "Doküman tabanlı bir alım (retrieval) katmanı kurarak yanıtların hangi kaynaktan geldiğini şeffaf biçimde gösteren bir arayüz tasarladık. Kaynak pasajları yanıtın yanında satır içi olarak vurgulanıyor.",
    outcome:
      "Kullanıcılar, yanıtlara kaynak gösterildiğinde belirgin biçimde daha fazla güven duyduklarını belirtti. Erken benimseyen ekipler, iç dokümantasyonu arama yerine doğrudan asistana soru sorarak zaman kazandı.",
    learnings:
      "Bir yapay zekâ ürününde 'doğru cevap' tek başına yetmiyor — kullanıcının cevaba neden güvenmesi gerektiğini göstermek, benimseme için doğruluğun kendisi kadar önemli.",
    links: [{ label: "Ürün Sayfası", url: "#", external: false }],
  },
  {
    id: "fleetwatch",
    slug: "fleetwatch",
    title: "Fleetwatch",
    category: "Systems",
    shortDescription:
      "Lojistik filoları için canlı konum, yakıt ve bakım durumunu tek ekranda birleştiren izleme sistemi.",
    longDescription:
      "Fleetwatch, saha araçlarından gelen telemetri verisini (konum, yakıt, motor durumu) tek bir operasyon panelinde birleştiren bir filo izleme sistemidir. Sürücü, araç ve rota verisini ilişkilendirerek operasyon ekiplerine anomalileri fark ettikleri anda bildirir.",
    role: "IoT & Backend Mühendisi",
    technologies: ["Go", "PostgreSQL", "MQTT", "React", "Docker"],
    year: 2023,
    featured: false,
    layoutSize: "tall",
    visual: { accent: "secondary" },
    challenge:
      "Operasyon ekibi, araç durumu bilgisini üç farklı tedarikçi sisteminden manuel olarak birleştiriyor; bir arızayı fark etmek genellikle saatler alıyordu.",
    solution:
      "Tüm cihazlardan gelen MQTT tabanlı telemetriyi tek bir şemaya normalize eden bir alım hattı kurduk; anomali tespiti basit eşik kurallarıyla değil, aracın kendi geçmişiyle karşılaştırılarak yapılıyor.",
    outcome:
      "Saha ekipleri, olası arızaları belirtiler ağırlaşmadan önce fark etmeye başladı; plansız duruşlarda gözle görülür bir azalma yaşandı.",
    learnings:
      "IoT verisinde asıl zorluk toplama değil, cihazdan cihaza tutarsız formatları güvenilir şekilde normalize etmek — bu katmana erken yatırım yapmak sonraki her şeyi kolaylaştırdı.",
    links: [{ label: "Vaka Analizi", url: "#", external: false }],
  },
  {
    id: "horizon-platform",
    slug: "horizon-platform",
    title: "Horizon Platform",
    category: "Web Platform",
    shortDescription:
      "Küçük ekiplerin proje, zaman ve kaynak yönetimini tek yerden yapabildiği çalışma platformu.",
    longDescription:
      "Horizon Platform, dağınık araçlar arasında geçiş yapmak zorunda kalan küçük ekipler için proje takibi, zaman çizelgesi ve kaynak planlamasını birleştiren tek bir çalışma alanı sunar. Görev, zaman ve kişi verisi aynı model üzerinde yaşadığı için raporlar ek entegrasyon gerektirmeden otomatik oluşur.",
    role: "Full-stack Geliştirici",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    year: 2023,
    featured: false,
    layoutSize: "standard",
    visual: { accent: "primary" },
    challenge:
      "Ekipler; görev takibi, zaman çizelgesi ve kaynak planlaması için üç ayrı araç kullanmak zorunda kalıyordu. Bu araçlar arasında veri elle taşındığı için raporlar sık sık güncel değildi.",
    solution:
      "Üç ihtiyacı da aynı veri modeli üzerinde birleştiren, tek bir görünümden yönetilebilen bir arayüz geliştirdik. Zaman çizelgesi ve kaynak planlaması aynı görev nesnesinden türetildiği için ayrı senkronizasyona gerek kalmadı.",
    outcome:
      "Ekipler araçlar arası geçiş yapmayı bırakarak günlük planlama süresinden tasarruf etti; yöneticiler kaynak çakışmalarını rapor beklemeden anlık olarak görebildi.",
    learnings:
      "Bir arayüzü birleştirmek yetmiyor; asıl kazanım, altta yatan veri modelini de birleştirmekten geliyor — aksi halde 'tek panel' sadece görsel bir katman olarak kalıyor.",
    links: [{ label: "Vaka Analizi", url: "#", external: false }],
  },
  {
    id: "compose-design-system",
    slug: "compose-design-system",
    title: "Compose",
    category: "Developer Tool",
    shortDescription:
      "Birden fazla ürün ekibinin ortak kullandığı, erişilebilirlik odaklı paylaşılan tasarım sistemi.",
    longDescription:
      "Compose, farklı ürün ekiplerinin tutarsız ve tekrar eden arayüz bileşenleri yazmasını önlemek için kurulan paylaşılan bir tasarım sistemi ve bileşen kütüphanesidir. Her bileşen, klavye erişilebilirliği ve odak yönetimi test edilmeden yayına alınmaz. Kütüphane, tasarım tokenlarını tek kaynaktan besleyerek Figma ile kod arasındaki sürüm farkını ortadan kaldırır.",
    role: "Tasarım Sistemi Mühendisi",
    technologies: ["TypeScript", "React", "Storybook", "Radix UI", "Style Dictionary"],
    year: 2024,
    featured: false,
    layoutSize: "standard",
    visual: { accent: "primary" },
    challenge:
      "Her ürün ekibi kendi buton, form ve modal bileşenlerini yeniden yazıyordu; aynı hata (odak kaybı, kontrast yetersizliği) birden fazla üründe tekrar ediyordu.",
    solution:
      "Erişilebilirlik testlerini bileşen düzeyinde zorunlu kılan, tasarım tokenlarını tek kaynaktan üreten ve her bileşeni Storybook üzerinden belgeleyen paylaşılan bir kütüphane kurduk.",
    outcome:
      "Yeni bir ekranın arayüzü, sıfırdan bileşen yazmak yerine var olan bileşenlerden kurulur hale geldi; erişilebilirlik denetimlerinde tekrar eden hatalar büyük ölçüde ortadan kalktı.",
    learnings:
      "Paylaşılan bir kütüphanenin en büyük riski benimsenmemesi — erken aşamada gerçek ekiplerin gerçek ekranlarını kütüphaneyle birlikte inşa etmek, sonradan 'kullanın' demekten çok daha etkili oldu.",
    links: [
      { label: "Kaynak Kod", url: "#", external: true },
      { label: "Dokümantasyon", url: "#", external: false },
    ],
  },
  {
    id: "authcore",
    slug: "authcore",
    title: "AuthCore",
    category: "Developer Tool",
    shortDescription:
      "Geliştiricilerin birkaç satır kodla güvenli kimlik doğrulama ekleyebildiği açık kaynaklı kütüphane.",
    longDescription:
      "AuthCore, kimlik doğrulama akışlarını sıfırdan yazmak yerine güvenli, denetlenmiş ve genişletilebilir bir temel sunan hafif bir kütüphanedir. Oturum yönetimi, çok faktörlü doğrulama ve OAuth2 sağlayıcı entegrasyonlarını varsayılan olarak güvenli şekilde uygular. Kütüphane, framework'e özel bağımlılık taşımaz.",
    role: "Kütüphane Yazarı",
    technologies: ["TypeScript", "Node.js", "JWT", "OAuth2"],
    year: 2024,
    featured: false,
    layoutSize: "standard",
    visual: { accent: "secondary" },
    challenge:
      "Küçük ekipler, kimlik doğrulamayı her projede yeniden ve genellikle güvenlik açıklarıyla yazıyordu; oturum yönetimi ve token yenileme mantığı her seferinde farklı şekilde hatalıydı.",
    solution:
      "Yaygın güvenlik hatalarını (zayıf token saklama, eksik süre sonu kontrolü) varsayılan olarak engelleyen, buna karşın tamamen özelleştirilebilir bir API tasarladık. Güvenlik varsayımlarını dokümantasyonda açıkça gerekçelendirdik.",
    outcome:
      "Kütüphane, birden fazla iç projede kimlik doğrulama geliştirme süresini kısalttı; bağımsız güvenlik incelemesinde önceki elle yazılmış çözümlere kıyasla belirgin şekilde daha az bulgu çıktı.",
    learnings:
      "Güvenlik odaklı bir kütüphanede en değerli özellik esneklik değil, 'yanlış kullanmayı zorlaştırmak' — varsayılan davranışın güvenli olması, dokümantasyondan çok daha etkili bir koruma.",
    links: [
      { label: "Kaynak Kod", url: "#", external: true },
      { label: "Dokümantasyon", url: "#", external: false },
    ],
  },
  {
    id: "echo-notes",
    slug: "echo-notes",
    title: "Echo Notes",
    category: "Product",
    shortDescription:
      "Sesli notları otomatik özetleyip ekip panolarına bağlayan iş birliğine dayalı not alma uygulaması.",
    longDescription:
      "Echo Notes, toplantı ve saha notlarının sesli olarak kaydedilip otomatik yazıya döküldüğü, ardından yapay zekâ ile eyleme dönüştürülebilir maddelere ayrıldığı bir not alma ürünüdür. Çıkan görevler, tek tıkla ekibin kullandığı proje panosuna aktarılır.",
    role: "Ürün Mühendisi",
    technologies: ["React Native", "Next.js", "Whisper API", "PostgreSQL"],
    year: 2023,
    featured: false,
    layoutSize: "standard",
    visual: { accent: "primary" },
    challenge:
      "Saha ve toplantı notları çoğunlukla sesli kaydediliyor ama sonrasında dinlenip elle özetlenmediği için aylar sonra hiç kullanılmadan unutuluyordu.",
    solution:
      "Kaydı bittiği anda otomatik yazıya döken, ardından eyleme dönüştürülebilir maddeleri ayıklayan bir işlem hattı kurduk; kullanıcı özeti onaylayıp doğrudan panosuna gönderebiliyor.",
    outcome:
      "Kullanıcılar, kayıtlarını dinlemeden dakikalar içinde eyleme geçirebilir hale geldi; unutulan sesli notların oranı belirgin şekilde azaldı.",
    learnings:
      "Otomatik özetleme tek başına yeterli değil — kullanıcıya düzenleme ve onaylama adımı bırakmak, yapay zekânın hatalı çıkardığı bir maddeyi sessizce panoya göndermekten çok daha güvenli.",
    links: [{ label: "Ürün Sayfası", url: "#", external: false }],
  },
  {
    id: "living-systems-lab",
    slug: "living-systems-lab",
    title: "Living Systems Lab",
    category: "Systems",
    shortDescription:
      "Kendi kendini iyileştiren ve yük altında ölçeklenen deneysel bir altyapı araştırma projesi.",
    longDescription:
      "Living Systems Lab, canlı sistemlerdeki adaptasyon ilkelerinden ilham alarak, yük ve hata koşullarına otomatik uyum sağlayan altyapı bileşenleri üzerine bir araştırma çalışmasıdır. Kontrol katmanı, geçmiş yük örüntülerinden öğrenerek kaynak tahsisini önceden ayarlamaya çalışır — bu hâlâ devam eden, açık uçlu bir araştırmadır.",
    role: "Araştırma & Prototipleme",
    technologies: ["Python", "Kubernetes", "Go", "Prometheus"],
    year: 2025,
    featured: false,
    layoutSize: "wide",
    visual: { accent: "primary" },
    challenge:
      "Geleneksel otomatik ölçeklendirme, ani ve düzensiz yük değişimlerinde gecikmeli ve verimsiz kalıyordu; sistem tepki verdiğinde yük zirvesi genellikle çoktan geçmiş oluyordu.",
    solution:
      "Geçmiş yük örüntülerinden öğrenen ve önceden ölçeklenen deneysel bir kontrol katmanı prototipledik; bu katman klasik eşik tabanlı kurallar yerine kısa vadeli tahmine dayanıyor.",
    outcome:
      "Simüle edilmiş senaryolarda kaynak israfı azalırken tepki süresi iyileşti; çalışma devam eden bir araştırmadır ve henüz üretim ortamında doğrulanmadı.",
    learnings:
      "Biyolojik sistemlerden ilham almak, mühendislik problemlerine taze bir çerçeve sunuyor — ama araştırma niteliğindeki bir fikri üretime taşımadan önce sınırlarını açıkça belirtmek, güveni korumak için en az çözümün kendisi kadar önemli.",
    links: [{ label: "Araştırma Notları", url: "#", external: false }],
  },
  {
    id: "wayfinder",
    slug: "wayfinder",
    title: "Wayfinder",
    category: "Product",
    shortDescription:
      "Ekiplerin Confluence, GitHub ve Slack'e dağılmış teknik bilgisini tek aramadan bulabildiği bir arama aracı.",
    longDescription:
      "Wayfinder, mühendislik ekiplerinin dağınık dokümantasyon kaynakları arasında kaybolan bilgiyi tek bir semantik aramadan bulmasını sağlayan bir araçtır. Anahtar kelime eşleşmesi yerine anlam benzerliğine dayanır, böylece sonuç dokümanda geçen kelimelerle birebir aynı olmasa da doğru cevabı bulabilir.",
    role: "Arama & Backend Mühendisi",
    technologies: ["TypeScript", "Vector DB", "Next.js", "PostgreSQL"],
    year: 2024,
    featured: false,
    layoutSize: "tall",
    visual: { accent: "secondary" },
    challenge:
      "Yeni katılan mühendisler, aynı sorunun cevabının hangi araçta (Confluence, eski bir GitHub issue'su, Slack konuşması) olduğunu bilmediği için aynı soruları tekrar tekrar soruyordu.",
    solution:
      "Üç kaynağı da düzenli olarak tarayıp semantik bir indekste birleştiren, sonuçları kaynağıyla birlikte gösteren tek bir arama çubuğu kurduk; sonuçlar orijinal belgeye doğrudan bağlanıyor.",
    outcome:
      "Yeni ekip üyelerinin ilk haftalardaki tekrarlayan sorularında belirgin bir azalma gözlendi; mevcut mühendisler de dağınık geçmiş kararları yeniden bulmak için araca yöneldi.",
    learnings:
      "Arama kalitesini artırmak çoğu zaman daha iyi bir model değil, daha iyi kaynak seçimi ve güncel tutma disiplini gerektiriyor — indeks ne kadar akıllı olursa olsun güncel olmayan bir kaynaktan doğru cevap çıkmıyor.",
    links: [{ label: "Ürün Sayfası", url: "#", external: false }],
  },
];
