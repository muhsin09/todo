
# 📝 Product Requirements Document (PRD)

**Proje:** JWT Kimlik Doğrulamalı To-Do Uygulaması
**Teknolojiler:** Next.js + Spring Boot
**Amaç:** Kullanıcıların kimlik doğrulaması ile giriş yaparak kendi To-Do listelerini yönetebilecekleri güvenli ve modern bir uygulama geliştirmek.

---

## 1. 🎯 Amaç & Hedef Kitle

### Amaç

* Kişisel görev takibi için web tabanlı bir To-Do uygulaması geliştirmek
* Kimlik doğrulama (JWT) ile kullanıcıların yalnızca kendi verilerine erişebilmesini sağlamak

### Hedef Kitle

* Günlük görevlerini dijital ortamda yönetmek isteyen bireysel kullanıcılar
* Basit, hızlı ve güvenli bir To-Do uygulaması arayan kullanıcılar

---

## 2. 🔐 Kimlik Doğrulama (Authentication & Authorization)

### 2.1 Kullanıcı Kaydı (Sign-Up)

* E-posta & şifre ile kayıt
* E-posta benzersiz olmalı
* Şifre kuralları:

  * Min. 8 karakter
  * Büyük harf, küçük harf, rakam, özel karakter içermeli
* Başarılı kayıt sonrası otomatik giriş veya login sayfasına yönlendirme

### 2.2 Giriş (Login)

* E-posta + şifre kombinasyonu ile giriş
* JWT üretimi ve client’a iletimi
* Hatalı girişlerde kullanıcıya geri bildirim

### 2.3 Çıkış (Logout)

* JWT istemciden silinir, sunucuda geçersiz kılınır (blacklist opsiyonel)

### 2.4 Yetkilendirme

* Sadece JWT ile doğrulanmış kullanıcılar To-Do API’lerine erişebilir
* Kullanıcılar yalnızca kendi To-Do’larını görebilir/düzenleyebilir/silebilir

### 2.5 (Opsiyonel) Şifre Sıfırlama (V2)

* Şifre sıfırlama bağlantısı e-posta ile gönderilir

---

## 3. ✅ To-Do İşlevleri

### 3.1 Oluşturma

* Başlık (zorunlu)
* Açıklama, teslim tarihi, öncelik (opsiyonel)
* API: `POST /api/todos`

### 3.2 Listeleme

* Kullanıcıya özel To-Do listesi
* Filtreleme: tamamlanma durumu
* Sıralama: tarih, öncelik
* API: `GET /api/todos`

### 3.3 Güncelleme

* Başlık, açıklama, tarih, öncelik, tamamlanma durumu
* API: `PUT /api/todos/{id}`

### 3.4 Silme

* Silme işlemi onay gerektirir
* API: `DELETE /api/todos/{id}`

### 3.5 Tamamlanma Durumu

* Tek tıklama ile durum değiştirme (toggle)
* API: `PATCH /api/todos/{id}/complete`

---

## 4. 🧱 Teknik Gereksinimler

### 4.1 Frontend

* **Framework:** Next.js (React)
* **Dil:** TypeScript
* **Stil:** Tailwind CSS
* **Durum Yönetimi:** React Context, Zustand veya Jotai
* **API İletişimi:** `axios` veya `fetch`
* **Kimlik Doğrulama:** JWT → HTTP-only cookies (tercihen)

### 4.2 Backend

* **Framework:** Spring Boot
* **Dil:** Java
* **Veritabanı:** PostgreSQL (dev için H2 opsiyonel)
* **ORM:** Spring Data JPA
* **API:** RESTful
* **Güvenlik:** Spring Security + JWT
* **Bağımlılıklar:**

  * `spring-boot-starter-web`
  * `spring-boot-starter-security`
  * `spring-boot-starter-data-jpa`
  * `jjwt` (JWT için)
  * `postgresql-driver`

---

## 5. 👥 Kullanıcı Akışları

### 5.1 Kayıt Akışı

1. Ana sayfada "Kayıt Ol" formuna yönlendirilir
2. E-posta + şifre + şifre onayı girilir
3. Kurallara uygunsa kayıt işlemi yapılır
4. Başarılı ise giriş yapılır veya login sayfasına yönlendirilir

### 5.2 Giriş Akışı

1. Giriş formuna e-posta + şifre girilir
2. Doğrulama başarılı ise JWT alınır ve To-Do sayfasına yönlendirilir
3. Hatalı girişte uygun mesaj gösterilir

### 5.3 To-Do Kullanımı

1. Giriş yapmış kullanıcı To-Do listesini görür
2. Yeni To-Do ekler, düzenler, siler
3. Görevleri tamamlandı olarak işaretler
4. Filtreleme ve sıralama işlemleri uygular

---

## 6. 🖼️ UI Taslakları (Özet)

* **Auth Pages:** Basit form, yönlendirme bağlantıları
* **Dashboard:**

  * Arama, filtre/sıralama alanı
  * To-Do kartları veya satırları
  * "Yeni To-Do" butonu
* **Edit Formu:** Modal veya ayrı sayfa


