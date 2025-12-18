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

## 6. Gelecek Güncellemeler ve Veritabanı Entegrasyonu

Projenin bir sonraki aşamasında, mevcut "statik veri" yapısından dinamik ve ölçeklenebilir bir "veritabanı destekli" mimariye geçiş hedeflenmektedir. Bu dönüşümün temel yapı taşları şunlardır:

### 6.1. Veritabanı Mimarisi (MS SQL Server)
Projenin backend altyapısında **Microsoft SQL Server** konumlandırılacaktır. İlişkisel veritabanı yapısı sayesinde veri tutarlılığı ve karmaşık sorgulama yetenekleri kazanılacaktır.
*   **Veri Modeli:**
    *   `Stores` (Mağazalar): Mağaza adı, benzersiz ID ve görsel verileri.
    *   `Locations` (Konumlar): Her mağazanın coğrafi koordinatları (`Latitude`, `Longitude`) ve kapsama alanı yarıçapı (`Radius`).
    *   `Campaigns` (Kampanyalar): Belirli bir konuma veya mağazaya bağlı promosyon mesajları ve geçerlilik süreleri.

### 6.2. Dinamik Konum Verisi Yönetimi
Mevcut sistemde kod içine gömülü (hardcoded) olan koordinat verileri, dinamik olarak veritabanından çekilecektir.
*   **Akış:**
    1.  Uygulama açıldığında veya kullanıcı hareket ettiğinde, backend servisine kullanıcının o anki konumu gönderilecektir.
    2.  Veritabanında **Spatial Query** (Mekansal Sorgu) çalıştırılarak, kullanıcıya örneğin 1km yakınlıktaki aktif kampanyalar filtrelenecektir.
    3.  Sunucudan dönen JSON formatındaki veri (`{id, lat, lng, message, discount_rate}`), uygulamanın `Context` yapısına beslenerek arayüzün anlık güncellenmesi sağlanacaktır.

### 6.3. Backend API Geliştirmesi
Frontend ile MS SQL veritabanı arasında köprü görevi görecek bir RESTful API geliştirilecektir. Bu API, güvenli veri transferini sağlayacak ve GitHub Pages üzerinde çalışan arayüzün, sunucudaki canlı verilere erişmesine olanak tanıyacaktır.

---
**Rapor Tarihi:** 18 Aralık 2025
**Geliştirici:** Antigravity AI Takımı
