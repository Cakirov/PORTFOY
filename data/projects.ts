import type { Project } from "@/types/project";

/**
 * NOTE: Aşağıdaki tüm projeler yer tutucu (placeholder) örnek verilerdir.
 * Gerçek proje bilgileri eklenene kadar tasarım ve UX'i sergilemek için kullanılır.
 * Gerçek içerik eklerken yalnızca bu dosya güncellenir — component/layout kodu değişmez.
 *
 * Sıralama kasıtlı: en güçlü (en keskin problem/çözüm eşleşmesi, en özgün
 * mekanizma) en üstte. İlk `HOME_PROJECT_COUNT` (bkz. lib/constants.ts) tanesi
 * ana sayfada görünür, geri kalanı yalnızca `/projects` sayfasında.
 */
export const projects: Project[] = [
  {
    id: "config-drift-detective",
    slug: "config-drift-detective",
    title: "Config Drift Detective",
    category: "Developer Tool",
    shortDescription:
      "Ortamlar arasındaki gerçek altyapı farkını, ham bir diff değil nedensel bir açıklama olarak sunan bir DevOps aracı.",
    longDescription:
      "Config Drift Detective, staging ve production gibi ortamların IaC kaynağında 'aynı' göründüğü ama gerçekte farklı davrandığı durumları yakalamak için kuruldu. Araç, Terraform tanımlarını değil, bulut sağlayıcı API'lerinden çektiği gerçek çalışan altyapı durumunu karşılaştırır ve aradaki farkı düz dille, nedensel bir cümleye çevirir.",
    purpose:
      "Bir mühendisin 'staging'de çalışıyordu, prod'da neden farklı davranıyor?' sorusuna dakikalar içinde, nedensel bir cevap verebilmesini sağlamak.",
    role: "DevOps & Backend Mühendisi",
    technologies: ["Go", "Terraform", "AWS SDK", "PostgreSQL", "gRPC", "Docker"],
    year: 2025,
    featured: true,
    visual: { accent: "secondary" },
    challenge:
      "Ekipler ortamlar arası farkları yalnızca Terraform/IaC kaynağını karşılaştırarak denetliyordu; kaynak aynı göründüğünde bile gerçek çalışan sistemde elle değiştirilmiş bir parametre sessizce kalıyordu — örneğin bir API gateway'in rate limit değeri Terraform'da 1000 req/s yazsa da, bir olay sırasında elle 400'e düşürülüp asla geri alınmamış olabiliyordu ve bunu kimse fark etmiyordu.",
    solution:
      "Bulut sağlayıcı API'lerinden her ortamın gerçek çalışan yapılandırmasını 15 dakikada bir çeken bir tarayıcı kurduk; ham diff'i doğrudan göstermek yerine ~40 bilinen parametre kalıbına (rate limit, timeout, ölçekleme eşiği, feature flag) eşleyip her biri için 'X alanı Y'den Z'ye değişti, olası etkisi şu' diyen bir açıklama cümlesine çeviren bir katman ekledik; tanınmayan bir alan farkı için de en azından ham ama okunur bir cümle üretiliyor.",
    outcome:
      "'Neden staging'de çalışıyor da prod'da çalışmıyor' tipi sorulara harcanan debug süresi kısaldı — daha önce günler süren bu tür bir araştırma, tarayıcının bir sonraki turunda (en geç 15 dakika içinde) ilgili parametreyi işaretlemesiyle dakikalara indi; sessiz kalmış elle yapılan değişiklikler artık devreye girmeden önce yakalanıyor.",
    learnings:
      "Gerçek altyapı durumu, IaC kaynağından bağımsız kendi 'gerçekliğine' sahip — sadece kaynağı okumak yeterli değil, çalışan sistemin kendisini sorgulamak gerekiyor. Ham bir diff yerine nedensel bir açıklama üretmek, aracın ekipler tarafından gerçekten güvenilip kullanılmasını sağlayan asıl fark oldu.",
  },
  {
    id: "project-nova",
    slug: "project-nova",
    title: "Project Nova",
    category: "Systems",
    shortDescription:
      "Dağıtık ekipler için gerçek zamanlı sistem izleme ve olay yönetimi platformu.",
    longDescription:
      "Project Nova, dağıtık sistemlerde art arda gelen onlarca ilişkili uyarıyı tek bir olay altında toplayan bir izleme prototipidir. Kendi kurduğum, birbirine bağımlı servislerden oluşan bir test ortamında, servisler arası çağrı bağımlılık grafiğini ve uyarıların geldiği zaman penceresini birlikte kullanan bir ilişkilendirme motoru üzerine inşa edildi. Amaç, bir kök-nedenin tetiklediği düzinelerce aşağı akış uyarısını tek tek değil, tek bir kök-neden olayı olarak göstermekti.",
    purpose:
      "Nöbetçi mühendislerin, birbirine bağımlı mikroservislerden gelen gürültülü uyarılar arasında asıl kök nedeni saniyeler içinde bulabilmesini sağlamak.",
    role: "Kurucu Mühendis / Full-stack",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets", "Docker", "Redis"],
    year: 2025,
    featured: true,
    visual: { accent: "primary" },
    challenge:
      "Bağımlı servisler zincirleme uyarı ürettiğinde — örneğin bir veritabanı bağlantı havuzu tükendiğinde ona bağımlı 5-6 servisin hepsi aynı anda hata vermeye başlıyordu — her uyarı ayrı bir olay olarak listeleniyordu. Kendi test ortamımda tek bir kök-neden arızası genellikle 25-35 ayrı uyarı satırına dönüşüyordu ve nöbetçi mühendis bu listeyi tek tek eleyerek okumak zorunda kalıyordu.",
    solution:
      "Servisler arasındaki gerçek çağrı ilişkisini bir bağımlılık grafiğinde tuttum; bir uyarı geldiğinde, aynı 90 saniyelik pencere içinde ona bağımlı servislerden gelen diğer uyarıları otomatik olarak aynı 'olay' kümesine topluyor, kümenin kökü olarak bağımlılık zincirinde en yukarıdaki servisi işaretliyorum. Canlı akış için polling yerine WebSocket kullandım — 5-10 saniyelik polling gecikmesi, olay hâlâ oluşurken kümenin yanlış büyümesine yol açıyordu.",
    outcome:
      "Kendi test senaryomda (kasıtlı tetiklenen bir veritabanı-havuzu tükenmesi), 32 ayrı uyarı tek bir olay kümesinde toplandı ve kök neden servis doğru işaretlendi; motor bu kümelemeyi ortalama 4 saniyede tamamladı. Bu bir prototip/test ortamı sonucu — henüz gerçek bir prod ortamında, gerçek bir nöbetçi ekiple doğrulanmadı.",
    learnings:
      "Gerçek zamanlı sistemlerde kullanıcıya güven vermek, doğruluktan çok tutarlılık ve şeffaflıkla ilgili — sistemin neden o kararı verdiğini göstermek kritik. İlişkilendirme mantığını kara kutu olarak bırakmak yerine her adımı izlenebilir kılmak, benimsenmeyi hızlandırdı.",
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
    purpose: "Saha filosundaki bir arızayı, belirtiler ağırlaşmadan önce, tek bir ekrandan fark edilebilir hale getirmek.",
    role: "IoT & Backend Mühendisi",
    technologies: ["Go", "PostgreSQL", "MQTT", "React", "Docker"],
    year: 2023,
    featured: true,
    visual: { accent: "secondary" },
    challenge:
      "Operasyon ekibi, araç durumu bilgisini üç farklı tedarikçi sisteminden (yakıt sensörü sağlayıcısı, ayrı bir GPS izleme servisi, aracın kendi motor kontrol ünitesi) manuel olarak birleştiriyordu; üçünün veri formatı ve gönderim sıklığı farklı olduğu için bir arızayı fark etmek genellikle saatler alıyordu.",
    solution:
      "Tüm cihazlardan gelen MQTT tabanlı telemetriyi (ortalama 30 saniyede bir örnekleme) tek bir şemaya normalize eden bir alım hattı kurduk; anomali tespitini sabit bir eşik yerine her aracın kendi son 14 günlük ortalamasına göre yaptık, çünkü filo yaş/model açısından karışıktı ve tek bir eşik değeri eski araçlar için çok hassas ya da yeni araçlar için çok gevşek kalıyordu.",
    outcome:
      "Operasyon ekibi, olası arızaları belirtiler ağırlaşmadan — motor arızası kodu düşmeden genellikle bir-iki gün önce — fark etmeye başladı; ayda birkaç plansız duruşun önüne bu erken uyarıyla geçildi.",
    learnings:
      "IoT verisinde asıl zorluk toplama değil, cihazdan cihaza tutarsız formatları güvenilir şekilde normalize etmek — bu katmana erken yatırım yapmak sonraki her şeyi kolaylaştırdı.",
  },
  {
    id: "argument-cartographer",
    slug: "argument-cartographer",
    title: "Argument Cartographer",
    category: "AI",
    shortDescription:
      "Uzun bir metnin mantıksal iskeletini — iddia, destek, varsayım — görsel bir grafiğe döken, zayıf noktaları işaretleyen bir yazma aracı.",
    longDescription:
      "Argument Cartographer, uzun bir deneme, öneri ya da rapor metnini okuyup altındaki mantıksal yapıyı çıkaran bir yazma aracıdır. Her iddiayı, onu destekleyen kanıtı ve metnin hiç söylemeden varsaydığı öncülleri ayrıştırıp tek bir görsel grafikte birbirine bağlar. Amaç, yazarın kendi akıl yürütmesine çok yakın olduğu için fark edemediği zayıf halkaları — desteksiz kalmış bir iddiayı ya da hiç sorgulanmamış bir varsayımı — yayınlanmadan önce görünür kılmak.",
    purpose:
      "Bir yazarın, kendi argümanındaki desteksiz iddiaları ve söylenmemiş varsayımları, okuyucu fark etmeden önce kendisinin görebilmesini sağlamak.",
    role: "Full-stack & AI Mühendisi",
    technologies: ["TypeScript", "Next.js", "LLM API", "D3.js", "PostgreSQL"],
    year: 2025,
    featured: true,
    visual: { accent: "secondary" },
    challenge:
      "Yazarlar kendi argümanlarına çok yakın oldukları için mantıksal boşlukları göremiyordu; bir iddiayı destekleyen tek 'kanıt', çoğu zaman iddianın kendisinin başka kelimelerle tekrarından ibaretti ama yazar bunu son okumada bile fark etmiyordu. Bu tür boşluklar genelde ancak hakem eleştirisinde ortaya çıkıyor, bu da geç ve maliyetli bir geri bildirim döngüsü yaratıyordu.",
    solution:
      "Metni cümle cümle bir LLM ile sınıflandırıp her cümleyi 'iddia', 'destek' ya da 'varsayım' etiketiyle işaretleyen, aralarındaki referans ilişkisini çıkaran bir işlem hattı kurduk; sonucu düzyazı olarak değil, düğümleri ve kenarları olan bir grafik (D3.js) olarak gösterdik. Bir iddia düğümüne giren destek kenarı yoksa ya da bir varsayım hiçbir iddiaya bağlanmıyorsa, düğüm otomatik olarak işaretleniyor.",
    outcome:
      "Erken kullanıcılar, 3-4 bin kelimelik taslaklarda ortalama 4-6 desteksiz iddia ya da işaretlenmemiş varsayım buldu — bunların çoğu, yazarın kendisinin daha önce hiç fark etmediği noktalardı. Özellikle çok iddialı, uzun metinlerde son-okuma turlarının sayısı azaldı.",
    learnings:
      "Bir metnin 'iyi yazılmış' olması ile 'mantıksal olarak sağlam' olması aynı şey değil — dil bilgisi ve akış kusursuz olsa bile altındaki iddia zinciri kırık olabiliyor. Yapıyı görselleştirmek, metni tekrar tekrar okumaktan çok daha hızlı bir şekilde bu farkı ortaya çıkarıyor.",
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
    purpose:
      "Geliştiricilerin kimlik doğrulamayı sıfırdan ve güvensiz şekilde yazmak yerine, güvenli varsayımlarla hızla entegre edebilmesini sağlamak.",
    role: "Kütüphane Yazarı",
    technologies: ["TypeScript", "Node.js", "JWT", "OAuth2"],
    year: 2024,
    featured: true,
    visual: { accent: "secondary" },
    challenge:
      "Küçük ekipler kimlik doğrulamayı her projede yeniden yazıyordu; en sık tekrar eden iki hata token'ı localStorage'da düz metin olarak saklamak ve refresh-token rotasyonunu hiç uygulamamaktı — ikisi de görünürde 'çalışıyor' ama oturumun çalınmasına açık kalıyordu.",
    solution:
      "Token'ı yalnızca httpOnly cookie'de saklayan, refresh-token'ı her kullanımda otomatik rotate eden ve eski bir refresh-token tekrar kullanılmaya çalışılırsa tüm oturumu iptal eden bir varsayılan akış tasarladım — bunu kapatmak ekstra kod yazmayı gerektiriyor, güvensiz kullanım varsayılan olarak neredeyse mümkün değil. Kütüphane framework'e özel bağımlılık taşımıyor, sadece Node.js çekirdek modülleri ve `jsonwebtoken` üzerine kurulu.",
    outcome:
      "Kütüphaneyi kullandığım 3 iç projede kimlik doğrulama entegrasyonu, sıfırdan yazmaya kıyasla günler yerine saatler sürdü; bağımsız bir güvenlik incelemesinde önceki elle yazılmış çözümlerde bulunan orta-riskli bulgulardan hiçbiri AuthCore'da çıkmadı.",
    learnings:
      "Güvenlik odaklı bir kütüphanede en değerli özellik esneklik değil, 'yanlış kullanmayı zorlaştırmak' — varsayılan davranışın güvenli olması, dokümantasyondan çok daha etkili bir koruma.",
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
    purpose:
      "Ekiplerin kendi verileriyle, her yanıtın kaynağını şeffafça gösteren güvenilir bir yapay zekâ asistanı kurabilmesini sağlamak.",
    role: "AI Entegrasyonu / Frontend",
    technologies: ["Python", "Next.js", "Vector DB", "LLM API", "TypeScript"],
    year: 2025,
    featured: true,
    visual: { accent: "secondary" },
    challenge:
      "Genel amaçlı asistanlar ekip içi özel doküman ve kararlara erişemediği için yüzeysel cevaplar veriyordu. Kullanıcılar bir yanıtın hangi belgeden geldiğini doğrulayamadığı için, özellikle 'yanlışsa maliyetli' konularda (politika, prosedür) sonuçlara güvenmekte tereddüt ediyordu.",
    solution:
      "Dokümanları ~500 token'lık parçalara bölüp vektör veritabanında indeksleyen bir alım (retrieval) katmanı kurduk; yanıt üretilirken kullanılan her pasaj, yanıtın yanında satır içi alıntı olarak ve kaynağa tıklanabilir bağlantıyla gösteriliyor. Bir soru indekslenmiş hiçbir pasajla yeterince örtüşmüyorsa asistan uydurma bir cevap vermek yerine bunu açıkça belirtiyor.",
    outcome:
      "Kullanıcı görüşmelerinde, kaynağı gösterilmeyen bir yanıta güvenmeden önce genelde belgeyi kendileri de açıp kontrol ettiklerini, kaynak satır içi gösterildiğindeyse bu ekstra kontrol adımını çoğu zaman atladıklarını gözlemledik. Erken benimseyen ekipler, iç dokümantasyonda arama yapmak yerine doğrudan asistana sormaya yöneldi.",
    learnings:
      "Bir yapay zekâ ürününde 'doğru cevap' tek başına yetmiyor — kullanıcının cevaba neden güvenmesi gerektiğini göstermek, benimseme için doğruluğun kendisi kadar önemli.",
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
    purpose:
      "Mühendislik ekiplerinin, dağınık dokümantasyon kaynakları arasında kaybolan bilgiyi tek aramadan bulabilmesini sağlamak.",
    role: "Arama & Backend Mühendisi",
    technologies: ["TypeScript", "Vector DB", "Next.js", "PostgreSQL"],
    year: 2024,
    featured: false,
    visual: { accent: "secondary" },
    challenge:
      "Yeni katılan mühendisler, aynı sorunun cevabının hangi araçta (Confluence'ta eski bir sayfa mı, kapatılmış bir GitHub issue'su mu, altı ay önceki bir Slack konuşması mı) olduğunu bilmediği için aynı soruları defalarca soruyordu; cevap genelde üçünden birinde vardı ama hangisinde olduğunu tahmin etmek gerekiyordu.",
    solution:
      "Üç kaynağı da düzenli aralıklarla (Confluence ve GitHub günlük, Slack saatlik) tarayıp tek bir vektör indekste birleştiren, anahtar kelime yerine anlam benzerliğine göre sıralayan bir arama uçbirimi kurduk; her sonuç kaynağıyla ve orijinal belgeye giden doğrudan bağlantıyla birlikte gösteriliyor.",
    outcome:
      "Yeni katılan bir mühendisin ilk haftalarında sorduğu tekrarlayan sorulardan çoğu, artık bir kıdemliye ulaşmadan önce arama çubuğunda cevap buluyordu; kıdemli mühendisler de dağınık geçmiş kararları yeniden bulmak için Slack'te insan aramak yerine doğrudan araca yöneldi.",
    learnings:
      "Arama kalitesini artırmak çoğu zaman daha iyi bir model değil, daha iyi kaynak seçimi ve güncel tutma disiplini gerektiriyor — indeks ne kadar akıllı olursa olsun güncel olmayan bir kaynaktan doğru cevap çıkmıyor.",
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
    purpose:
      "Farklı ürün ekiplerinin, erişilebilirlik standardından ödün vermeden aynı bileşenleri yeniden kullanabilmesini sağlamak.",
    role: "Tasarım Sistemi Mühendisi",
    technologies: ["TypeScript", "React", "Storybook", "Radix UI", "Style Dictionary"],
    year: 2024,
    featured: false,
    visual: { accent: "primary" },
    challenge:
      "Her ürün ekibi kendi buton, form ve modal bileşenlerini yeniden yazıyordu; en sık tekrar eden hata aynıydı — bir modal açıldığında odağın (focus) modalin içine taşınmaması, bu yüzden ekran okuyucu kullanan bir kullanıcının arka plandaki sayfada kaybolması. Bu hata birbirinden habersiz en az üç ayrı üründe üç kez düzeltiliyordu.",
    solution:
      "Odak yönetimini (focus trap, ESC ile kapama, açılışta ilk etkileşilebilir öğeye odaklanma) her bileşenin kendisine gömdüğümüz, tasarım tokenlarını (renk, boşluk, tipografi) Figma'dan tek bir JSON kaynağına (Style Dictionary) bağlayan paylaşılan bir kütüphane kurduk; bir bileşen bu davranışlar test edilmeden Storybook'a ya da yayına alınamıyor.",
    outcome:
      "Yeni bir ekranın arayüzü, sıfırdan bileşen yazmak yerine var olan Compose bileşenlerinden kurulur hale geldi; aynı odak-yönetimi hatası artık tek bir yerde — kütüphanenin kendisinde — düzeltiliyor, üç ayrı ürün ekibi tarafından üç kez yeniden yazılmıyor.",
    learnings:
      "Paylaşılan bir kütüphanenin en büyük riski benimsenmemesi — erken aşamada gerçek ekiplerin gerçek ekranlarını kütüphaneyle birlikte inşa etmek, sonradan 'kullanın' demekten çok daha etkili oldu.",
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
    purpose:
      "Sahada veya toplantıda kaydedilen sesli notların, hiç dinlenmeden eyleme dönüştürülebilir hale gelmesini sağlamak.",
    role: "Ürün Mühendisi",
    technologies: ["React Native", "Next.js", "Whisper API", "PostgreSQL"],
    year: 2023,
    featured: false,
    visual: { accent: "primary" },
    challenge:
      "Saha ve toplantı notları çoğunlukla telefonla sesli kaydediliyordu, ama kayıt genelde 40-50 dakikayı buluyor ve kimse geri dönüp dinlemiyordu — not, aylar sonra 'bunu bir yerde konuşmuştuk' diye hatırlanıp bir daha bulunamayan bir ses dosyası olarak kalıyordu.",
    solution:
      "Kayıt biter bitmez Whisper API ile yazıya döken, ardından metni eyleme dönüştürülebilir maddelere ayıklayan bir işlem hattı kurduk; her madde önerisi kullanıcıya düzenlenebilir bir taslak olarak gösteriliyor, kullanıcı onaylamadan hiçbir şey doğrudan panoya gönderilmiyor.",
    outcome:
      "Kullanıcılar, 45 dakikalık bir kaydı hiç dinlemeden, çıkan taslağı gözden geçirip birkaç dakika içinde panoya aktarabilir hale geldi; haftalarca dinlenmeyi bekleyen kayıt yığını neredeyse ortadan kalktı.",
    learnings:
      "Otomatik özetleme tek başına yeterli değil — kullanıcıya düzenleme ve onaylama adımı bırakmak, yapay zekânın hatalı çıkardığı bir maddeyi sessizce panoya göndermekten çok daha güvenli.",
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
    purpose:
      "Büyüyen perakendecilerin, hazır platformların esneklik sınırına takılmadan kendi hızlarında özelleştirebilecekleri bir e-ticaret temeli sunmak.",
    role: "Backend & Sistem Mimarisi",
    technologies: ["Node.js", "Next.js", "PostgreSQL", "Redis", "Stripe API", "Docker"],
    year: 2024,
    featured: false,
    visual: { accent: "primary" },
    challenge:
      "Müşteri büyüdükçe hazır platformun özelleştirme kısıtlarına takılıyordu — yeni bir pazar yeri entegrasyonu bile platformun kendi eklenti API'sinden geçmek zorunda olduğu için haftalarca sürüyordu. Kampanya dönemlerinde envanter senkronizasyonu birkaç dakika gecikince, aslında tükenmiş bir üründen sipariş alınabiliyor, bu da iptal ve iade olarak geri dönüyordu.",
    solution:
      "Katalog, sipariş ve ödeme akışlarını bağımsız modüllere ayırıp her birinin kendi hızında geliştirilebildiği bir mimari kurduk. Envanteri, siparişten hemen sonra tetiklenen olay tabanlı (event-driven) bir senkronizasyon katmanı üzerinden saniyeler içinde güncelledik — önceki toplu (batch) senkronizasyonun dakikalar süren gecikme penceresini ortadan kaldırdı.",
    outcome:
      "Yeni bir satış kanalı entegrasyonu haftalar yerine günler içinde tamamlanır oldu; olay tabanlı senkronizasyon sayesinde yoğun kampanya dönemlerinde de stok tutarsızlığından kaynaklanan sipariş iptalleri nadir bir istisna haline geldi.",
    learnings:
      "Modülerlik, doğru sınırları çizmeden sadece ek karmaşıklık getirir. Servisler arası sözleşmeyi (contract) en başta net tanımlamak, sonradan yeniden bölmekten çok daha ucuza geliyor.",
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
    purpose:
      "Küçük ekiplerin görev, zaman ve kaynak takibini üç ayrı araç arasında geçmeden tek yerden yönetebilmesini sağlamak.",
    role: "Full-stack Geliştirici",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    year: 2023,
    featured: false,
    visual: { accent: "primary" },
    challenge:
      "Ekipler; görev takibi için bir araç, zaman çizelgesi için başka bir araç, kaynak planlaması için üçüncü bir tabloyu ayrı ayrı güncelliyordu. Bu üç kaynak elle senkronize edildiği için, bir yöneticinin baktığı kaynak planı genelde en az birkaç gün eskiydi.",
    solution:
      "Görev, zaman ve kişi verisini aynı ilişkisel modelde tuttuk — tek bir `task` nesnesi hem zaman çizelgesini hem kaynak planını besleyecek şekilde tasarlandı. Bir görevin süresi ya da atanan kişisi değiştiğinde, hem zaman çizelgesi hem kaynak görünümü aynı anda güncelleniyor, ayrı bir senkronizasyon adımına gerek kalmıyor.",
    outcome:
      "Ekipler üç ayrı araç arasında geçiş yapmayı bıraktı; bir yöneticinin kaynak çakışmasını fark etmesi artık haftalık rapor beklemek yerine ekranı açtığı anda oluyor.",
    learnings:
      "Bir arayüzü birleştirmek yetmiyor; asıl kazanım, altta yatan veri modelini de birleştirmekten geliyor — aksi halde 'tek panel' sadece görsel bir katman olarak kalıyor.",
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
    purpose:
      "Altyapının, yük değişimine insan müdahalesi olmadan önceden uyum sağlayabildiği bir kontrol modelini araştırmak.",
    role: "Araştırma & Prototipleme",
    technologies: ["Python", "Kubernetes", "Go", "Prometheus"],
    year: 2025,
    featured: false,
    visual: { accent: "primary" },
    challenge:
      "Geleneksel otomatik ölçeklendirme (CPU kullanımı %70'i geçince yeni pod ekle gibi kurallar), ani ve düzensiz yük değişimlerinde gecikmeli kalıyordu — bir pod'un ayağa kalkması 60-90 saniye sürdüğü için, sistem tepki verdiğinde yük zirvesi genellikle çoktan geçmiş oluyordu.",
    solution:
      "Geçmiş 7 günlük yük örüntüsünden kısa vadeli (5 dakika ilerisi) tahmin üreten, eşik aşılmadan önce ölçekleyen deneysel bir kontrol katmanı prototipledim; klasik eşik kuralı hâlâ bir yedek olarak duruyor, tahmin ile gerçekleşen yük arasındaki fark belli bir payı aşınca devreye giriyor.",
    outcome:
      "Kayıtlı geçmiş trafiği tekrar oynattığım simülasyonlarda, tahmine dayalı ölçekleme eşik-tabanlı yaklaşıma kıyasla yük zirvesine daha erken tepki verdi ve gereksiz fazla-provizyon süresini kısalttı; bu hâlâ devam eden bir araştırmadır ve gerçek bir üretim ortamında henüz doğrulanmadı.",
    learnings:
      "Biyolojik sistemlerden ilham almak, mühendislik problemlerine taze bir çerçeve sunuyor — ama araştırma niteliğindeki bir fikri üretime taşımadan önce sınırlarını açıkça belirtmek, güveni korumak için en az çözümün kendisi kadar önemli.",
  },
];
