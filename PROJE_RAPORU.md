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

### 2.4. Dağıtım ve DevOps (CI/CD): **GitHub Pages & Actions**
Projenin sürekli entegrasyonu ve dağıtımı (CI/CD) için **GitHub Actions** altyapısı kurulmuştur.
*   **Otomasyon:** Ana koda (main branch) yapılan her güncelleme (`push`), otomatik olarak bir derleme (build) süreci başlatır.
*   **Hosting:** Derlenen statik dosyalar, **GitHub Pages** üzerinde ücretsiz ve güvenli (HTTPS) bir şekilde barındırılarak son kullanıcının erişimine sunulur. Bu yapı, sunucu maliyetini ortadan kaldırır ve yüksek erişilebilirlik sağlar.

---

## 3. Konum Tabanlı Servisler (Location Based Services)

### 3.1. Coğrafi Konumlandırma Protokolü: **HTML5 Geolocation API**
Kullanıcının anlık konumunun tespiti için W3C standardı olan **HTML5 Geolocation API** kullanılmıştır.
*   **Metodoloji:** IP tabanlı konumlandırmanın aksine; GPS, Wi-Fi ve baz istasyonu verilerini hibrit işleyen `navigator.geolocation` arayüzü tercih edilmiştir.

### 3.2. Geofencing ve Bildirim Yönetimi
Kullanıcının belirli bir coğrafi alana (mağaza çevresi) girmesi durumunda tetiklenen bildirim mekanizmasıdır.
*   **Uygulama:** Her 5 saniyede bir kullanıcının konumu ile hedef noktalar arasındaki mesafe "Haversine Formülü" ile hesaplanır. Mesafe belirlenen yarıçapın (örn. 500m) altına düştüğünde kullanıcıya görsel bildirim (`NotificationOverlay`) gösterilir.

---

## 4. Yazılım Mimarisi ve Veri Yönetimi

### 4.1. Durum Yönetimi Stratejisi (State Management): **Context API**
Uygulamanın veri akışı, React'in yerleşik **Context API** mekanizması üzerine kurgulanmıştır.
*   **UserContext:** Kullanıcı profil ve tercihlerin yönetimi.
*   **LocationContext:** GPS verileri, izin durumları ve geofence tetikleyicilerinin merkezi yönetimi.

### 4.2. Servis Yönelimli Katman
İş mantığı (Business Logic) ile sunum katmanı (Presentation Layer) birbirinden izole edilmiştir. `src/services/api.js` üzerinden sağlanan veri akışı, ileride yapılacak veritabanı entegrasyonu için bir soyutlama katmanı görevi görür.

---

## 5. Proje Klasör Yapısı (Folder Structure)

Projenin kaynak kodları, sürdürülebilirlik ilkeleri gözetilerek modüler bir yapıda (Screens, Components, Contexts, Services) düzenlenmiştir.

---

## 6. Gelecek Güncellemeler ve Veri Entegrasyon Stratejisi

Projenin bir sonraki fazında, veri yönetimi için "Statik Veri, Dinamik Etkileşim" (Static Data, Dynamic Interaction) mimarisi benimsenmiştir. Bu yapı, hem yüksek performans hem de çevrimdışı çalışma yeteneği sunmaktadır.

### 6.1. Veri Kaynağı ve Aktarım Döngüsü (MS SQL to App)
Verilerin ana kaynağı (Single Source of Truth) olarak **Microsoft SQL Server** kullanılmaya devam edilecektir.
*   **Veri Yönetimi:** Mağaza koordinatları, kampanya metinleri ve geofence yarıçapları SQL sunucusu üzerinde merkezi olarak yönetilir.
*   **Entegrasyon Yöntemi (Build-Time Integration):** Uygulama dağıtıma çıkılmadan önce, SQL veritabanındaki güncel veriler bir "Export Script" aracılığıyla **JSON** formatına dönüştürülür ve proje kaynak kodlarına (`src/data/stores.json`) dahil edilir. Bu sayede veritabanı güvenliği riske atılmadan veriler güvenli bir şekilde uygulamaya taşınır.

### 6.2. İstemci Taraflı Konum İşleme (Client-Side Geofencing)
Sunucu tabanlı (Server-Side) sorgulamaların getirdiği ağ gecikmesini (latency) ortadan kaldırmak için coğrafi hesaplamalar kullanıcının cihazında yapılır.
*   **Algoritma:** Uygulama açılışta güncel kampanya/mağaza listesini (JSON) belleğe yükler. Kullanıcı hareket ettikçe, cihazın işlemcisi (CPU) kullanılarak anlık konum ile mağazalar arasındaki mesafe sürekli hesaplanır (Haversine Formülü).
*   **Çevrimdışı Yetenek:** Veriler cihazda yerel olarak saklandığı için, kullanıcı internet kapsama alanı dışında olsa dahi ( metro, bodrum kat vb.) mağazaya yaklaştığında bildirim alabilir.

### 6.3. Hibrit Mimari Avantajları
Bu mimari yaklaşım ile:
1.  **Sıfır Sunucu Maliyeti:** Canlı bir API sunucusu barındırma ve bakım maliyeti ortadan kalkar.
2.  **Yüksek Performans:** Ağ isteği (Network Request) olmadığı için bildirimler gecikmesiz çalışır.
3.  **Güvenlik:** Veritabanı internete açık olmadığı için siber saldırı yüzeyi minimize edilir.

---
**Rapor Tarihi:** 18 Aralık 2025
**Geliştirici:** Antigravity AI Takımı
