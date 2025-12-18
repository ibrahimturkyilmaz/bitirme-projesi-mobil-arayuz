# Bitirme Projesi Teknik Raporu

## 1. Giriş
Bu çalışma, perakende sektörü için geliştirilmiş, konum tabanlı servisler (LBS) ile entegre, modern bir mobil web uygulamasının (PWA) tasarımını ve uygulamasını konu almaktadır. Çalışmanın temel amacı, kullanıcının coğrafi konum verilerini işleyerek (Geofencing), mağaza içi ve mağaza yakını senaryoları için özelleştirilmiş, gerçek zamanlı etkileşimler sunmaktır.

---

## 2. Materyal ve Yöntem

### 2.1. Ön Yüz Mimarisi (Frontend Architecture): **React.js**
Uygulamanın kullanıcı arayüzü katmanında, bileşen tabanlı (component-based) yapısı ve Sanal DOM (Virtual DOM) mimarisi nedeniyle **React.js** kütüphanesi tercih edilmiştir.
*   **Gerekçe:** Modern web uygulamalarında modülerlik ve yeniden kullanılabilirlik (reusability) esastır. React, deklaratif programlama paradigması ile karmaşık kullanıcı arayüzlerinin yönetimini ve durum (state) değişimlerinin optimizasyonunu sağlamaktadır.
*   **Literatürdeki Alternatifleri:** Vue.js ve Angular. React'in tercih edilme sebebi, geniş ekosistemi ve React Native aracılığıyla mobil platformlara (Cross-Platform) dönüştürülebilirliğinin yüksek olmasıdır.

### 2.2. Derleme ve Geliştirme Altyapısı: **Vite**
Geleneksel paketleyicilerin (Webpack) getirdiği performans maliyetlerini minimize etmek amacıyla, Native ES Modülleri (ESM) tabanlı **Vite** derleme aracı kullanılmıştır.
*   **Avantajları:** Anlık Modül Değişimi (HMR) özelliği sayesinde geliştirme sürecindeki geri bildirim döngüsü milisaniyeler seviyesine indirilmiştir.

### 2.3. Kullanıcı Arayüzü ve Deneyimi (UI/UX): **Tailwind CSS & Framer Motion**
Tasarım dili olarak, "Utility-First" yaklaşımını benimseyen **Tailwind CSS** kullanılmıştır. Bu yaklaşım, CSS dosya boyutunu (bundle size) minimize ederken, tutarlı bir tasarım sistemi oluşturulmasına olanak tanır.
*   **Etkileşim:** Mobil uygulama hissiyatını (Native Feel) artırmak amacıyla, fizik tabanlı animasyon kütüphanesi olan **Framer Motion** entegre edilmiştir.

---

## 3. Konum Tabanlı Servisler (Location Based Services)

### 3.1. Coğrafi Konumlandırma Protokolü: **HTML5 Geolocation API**
Kullanıcının anlık konumunun tespiti için W3C standardı olan **HTML5 Geolocation API** kullanılmıştır.
*   **Metodoloji:** IP tabanlı konumlandırmanın (yüksek hata payı nedeniyle) aksine, GPS, Wi-Fi ve baz istasyonu verilerini hibrit işleyen `navigator.geolocation` arayüzü tercih edilmiştir. Bu yöntem, perakende senaryoları için kritik olan metre bazlı hassasiyeti (High Accuracy) sağlamaktadır.

### 3.2. Tersine Coğrafi Kodlama (Reverse Geocoding): **OpenStreetMap (Nominatim)**
Elde edilen ham enlem/boylam verilerinin, kullanıcı tarafından anlamlandırılabilir adres metinlerine (İlçe, İl) dönüştürülmesi işlemidir.
*   **Yöntem:** Açık kaynaklı ve topluluk destekli **OpenStreetMap Nominatim API** servisi asenkron mimari ile entegre edilmiştir.

---

## 4. Yazılım Mimarisi ve Veri Yönetimi

### 4.1. Durum Yönetimi Stratejisi (State Management): **Context API**
Uygulamanın veri akışı, React'in yerleşik **Context API** mekanizması üzerine kurgulanmıştır.
*   **UserContext:** Kullanıcı profil ve oturum verilerinin yönetimi.
*   **LocationContext:** GPS verilerinin ve izin durumlarının merkezi yönetimi.
*   **Mimari Karar:** Redux gibi harici kütüphanelerin getirdiği kod karmaşıklığı (boilerplate) ve işlem maliyeti, projenin ölçeği göz önüne alındığında gereksiz bulunmuş; Context API ile daha hafif (lightweight) bir yapı kurulmuştur.

### 4.2. Servis Yönelimli Katman (Service Layer Pattern)
İş mantığı (Business Logic) ile sunum katmanı (Presentation Layer) birbirinden izole edilmiştir. `src/services/api.js` ve özel kancalar (hooks), veriye erişimi soyutlayarak kodun test edilebilirliğini ve bakımını kolaylaştırmaktadır.

---

## 5. Proje Klasör Yapısı (Folder Structure)

Projenin kaynak kodları, sürdürülebilirlik ve modülerlik ilkeleri gözetilerek aşağıdaki hiyerarşide düzenlenmiştir:

```
src/
├── components/          # Kullanıcı arayüzü bileşenleri
│   ├── layout/          # Sayfa düzeni (örn: BottomNav)
│   ├── screens/         # Ana ekranlar (Home, Profile, Shop)
│   └── ui/              # Atomik bileşenler (StatusBar, Notification)
├── context/             # Global durum yönetimi (UserContext, LocationContext)
├── hooks/               # Özel fonksiyonlar (useGeofencing)
├── services/            # Dış servisler ve API bağlantıları
├── utils/               # Yardımcı araçlar (Geocoding, Mesafe Hesaplama)
├── data/                # Simülasyon verileri (mockData)
├── App.jsx              # Ana uygulama kapsayıcısı
└── main.jsx             # React giriş noktası
```

Bu yapı, "Separation of Concerns" (İlgi Alanlarının Ayrımı) prensibine uygun olarak; Görüntü (View), Mantık (Logic) ve Veri (Data) katmanlarını fiziksel klasörlerde de birbirinden ayırmaktadır.

---

## 6. Sonuç ve Gelecek Çalışmalar İçin Öneriler

Mevcut prototip, temel konum tabanlı işlevleri başarıyla yerine getirmektedir. Ancak uygulamanın endüstriyel standartlarda bir ürüne (Production Ready) dönüştürülmesi için aşağıdaki geliştirmeler önerilmektedir:

### 6.1. Sunucu Tarafı ve Veri Kalıcılığı (Backend Integration)
Mevcut sistemde kullanılan simüle edilmiş verilerin (Mock Data), ölçeklenebilir bir veritabanı mimarisine (PostgreSQL veya NoSQL tabanlı Firebase/MongoDB) taşınması gerekmektedir. Bu, çoklu kullanıcı desteği ve dinamik stok yönetimi için elzemdir.

### 6.2. Çevrimdışı Çalışma Yeteneği (Offline-First Architecture)
Progressive Web App (PWA) standartlarının tam uygulanması önerilir. `Service Worker` stratejileri geliştirilerek, internet bağlantısının koptuğu durumlarda (Caching) uygulamanın temel fonksiyonlarının çalışmaya devam etmesi sağlanmalıdır.

### 6.3. Performans ve Güvenlik
*   **Görsel Optimizasyonu:** WebP formatı ve CDN (Content Delivery Network) kullanımı ile yükleme süreleri optimize edilmelidir.
*   **Hata Toleransı:** Harita servislerinin yanıt vermediği durumlar için "Circuit Breaker" desenleri uygulanmalıdır.

---
**Rapor Tarihi:** 17 Aralık 2025
**Geliştirici:** Antigravity AI Takımı
