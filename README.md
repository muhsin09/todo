# 📝 JWT Kimlik Doğrulamalı To-Do Uygulaması

Modern web teknolojileri ile geliştirilmiş, JWT tabanlı kimlik doğrulama sistemi olan To-Do uygulaması.

## 🎯 Proje Özeti

Bu proje, kullanıcıların kimlik doğrulaması ile giriş yaparak kendi To-Do listelerini yönetebilecekleri güvenli ve modern bir uygulamadır. Frontend Next.js, backend Spring Boot ile geliştirilmiştir.

## 🏗️ Mimari

```
todo/
├── todo-backend/          # Spring Boot Backend
│   ├── src/
│   ├── pom.xml
│   └── README.md
├── todo-frontend/         # Next.js Frontend
│   ├── src/
│   ├── package.json
│   └── README.md
└── README.md             # Bu dosya
```

## 🚀 Hızlı Başlangıç

### 1. Backend'i Başlatın

```bash
cd todo-backend
mvn spring-boot:run
```

Backend http://localhost:8080 adresinde çalışacak.

### 2. Frontend'i Başlatın

```bash
cd todo-frontend
npm install
npm run dev
```

Frontend http://localhost:3000 adresinde çalışacak.

### 3. Demo Kullanıcısı ile Giriş Yapın

- **E-posta**: `demo@todo.com`
- **Şifre**: `Demo1234!`

## 👤 Demo Kullanıcı ve Veriler

Uygulama ilk çalıştırıldığında otomatik olarak demo veriler oluşturulur:

### Demo Kullanıcısı
- **E-posta**: `demo@todo.com`
- **Şifre**: `Demo1234!`

### Demo Görevler
1. **İlk Görev** - Orta öncelik, 3 gün sonra teslim
2. **Alışveriş Yap** - Yüksek öncelik, 1 gün sonra teslim  
3. **Kitap Oku** - Düşük öncelik, 7 gün sonra teslim, tamamlandı

## 🛠️ Teknolojiler

### Backend
- **Java 21**
- **Spring Boot 3.5.4**
- **Spring Security + JWT**
- **Spring Data JPA**
- **H2 Database** (Development)
- **PostgreSQL** (Production)
- **Maven**
- **Lombok**
- **OpenAPI 3** (Swagger)

### Frontend
- **Next.js 15** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form**
- **Zod** (Form validation)
- **Axios** (HTTP client)
- **Lucide React** (Icons)

## 📋 Özellikler

### 🔐 Kimlik Doğrulama
- JWT tabanlı güvenli kimlik doğrulama
- Kullanıcı kaydı ve girişi
- Şifre güvenlik kuralları
- Otomatik token yönetimi

### ✅ To-Do Yönetimi
- Görev oluşturma, düzenleme, silme
- Tamamlanma durumu değiştirme
- Öncelik seviyeleri (Düşük/Orta/Yüksek)
- Teslim tarihi belirleme
- Filtreleme (Tüm/Tamamlanan/Bekleyen)

### 🎨 Kullanıcı Arayüzü
- Modern ve responsive tasarım
- Mobil uyumlu
- Form validasyonu
- Loading states
- Error handling

## 📚 API Dokümantasyonu

Backend çalıştıktan sonra Swagger UI'a erişebilirsiniz:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/v3/api-docs

### Ana Endpoint'ler

#### Kimlik Doğrulama
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi

#### To-Do İşlemleri
- `GET /api/todos` - Görevleri listele
- `POST /api/todos` - Yeni görev oluştur
- `GET /api/todos/{id}` - Belirli görevi getir
- `PUT /api/todos/{id}` - Görevi güncelle
- `DELETE /api/todos/{id}` - Görevi sil
- `PATCH /api/todos/{id}/complete` - Tamamlanma durumunu değiştir

## 🔧 Konfigürasyon

### Backend Konfigürasyonu

#### Development
- **Port**: 8080
- **Database**: H2 (In-Memory)
- **H2 Console**: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:tododb`
  - Username: `sa`
  - Password: `password`

#### Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `DB_USERNAME` | PostgreSQL kullanıcı adı | `postgres` |
| `DB_PASSWORD` | PostgreSQL şifresi | `password` |
| `JWT_SECRET` | JWT imzalama anahtarı | `404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970` |
| `JWT_EXPIRATION` | JWT geçerlilik süresi (ms) | `86400000` (24 saat) |

### Frontend Konfigürasyonu

#### Environment Variables
`.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## 🏗️ Proje Yapısı

### Backend (todo-backend/)
```
src/main/java/com/todo/backend/
├── controller/           # REST Controller'lar
├── shared/              # Paylaşılan bileşenler
│   ├── config/         # Konfigürasyon sınıfları
│   ├── dto/            # Data Transfer Objects
│   ├── exception/      # Exception handler'lar
│   └── security/       # JWT ve güvenlik
├── todo/               # Todo domain
│   ├── command/        # Command objects
│   ├── model/          # Entity sınıfları
│   ├── query/          # Query objects
│   ├── repository/     # Repository interfaces
│   └── service/        # Business logic
└── user/               # User domain
    ├── command/        # Command objects
    ├── model/          # Entity sınıfları
    ├── query/          # Query objects
    ├── repository/     # Repository interfaces
    └── service/        # Business logic
```

### Frontend (todo-frontend/)
```
src/
├── app/                    # Next.js App Router
│   ├── login/             # Login sayfası
│   ├── register/          # Register sayfası
│   ├── globals.css        # Global stiller
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Ana sayfa
├── components/            # React bileşenleri
│   ├── ui/               # UI bileşenleri
│   ├── AuthForm.tsx      # Kimlik doğrulama formu
│   ├── TodoCard.tsx      # Todo kartı
│   └── TodoForm.tsx      # Todo formu
├── lib/                  # Utility fonksiyonları
├── services/             # API servisleri
└── types/               # TypeScript type tanımları
```

## 🧪 Test

### Backend Test
```bash
cd todo-backend
mvn test
```

### Frontend Test
```bash
cd todo-frontend
npm run dev    # Development
npm run build  # Build
npm run lint   # Lint
```

## 🚀 Deployment

### Backend Deployment
```bash
cd todo-backend
mvn clean package
java -jar target/todo-backend-1.0.0.jar --spring.profiles.active=prod
```

### Frontend Deployment
```bash
cd todo-frontend
npm run build
npm start
```

## 🔒 Güvenlik

- JWT tabanlı kimlik doğrulama
- Şifre hash'leme (BCrypt)
- CORS konfigürasyonu
- Input validasyonu
- SQL injection koruması

## 📱 Responsive Design

Frontend mobil, tablet ve masaüstü cihazlarda uyumlu çalışır:
- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add some amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Proje hakkında sorularınız için issue açabilirsiniz.

---

**Not**: Bu proje eğitim amaçlı geliştirilmiştir. Production ortamında kullanmadan önce güvenlik ayarlarını gözden geçirin. 