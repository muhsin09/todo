# Todo Backend

JWT Kimlik Doğrulamalı To-Do Uygulaması Backend API

## 🚀 Özellikler

- **JWT Kimlik Doğrulama**: Güvenli kullanıcı girişi ve kayıt
- **To-Do Yönetimi**: CRUD işlemleri ile görev yönetimi
- **Kullanıcı İzolasyonu**: Her kullanıcı sadece kendi görevlerini görebilir
- **Filtreleme ve Sıralama**: Tamamlanma durumu ve önceliğe göre filtreleme
- **API Dokümantasyonu**: Swagger UI ile interaktif API dokümantasyonu
- **CORS Desteği**: Cross-origin istekleri için CORS konfigürasyonu

## 🛠️ Teknolojiler

- **Java 21**
- **Spring Boot 3.5.4**
- **Spring Security**
- **Spring Data JPA**
- **JWT (JSON Web Tokens)**
- **H2 Database** (Development)
- **PostgreSQL** (Production)
- **Maven**
- **Lombok**
- **OpenAPI 3** (Swagger)

## 📋 Gereksinimler

- Java 21+
- Maven 3.6+
- PostgreSQL (Production için)

## 🚀 Kurulum

### 1. Projeyi Klonlayın

```bash
git clone <repository-url>
cd todo-backend
```

### 2. Bağımlılıkları Yükleyin

```bash
mvn clean install
```

### 3. Uygulamayı Çalıştırın

#### Development (H2 Database)
```bash
mvn spring-boot:run
```

#### Production (PostgreSQL)
```bash
# PostgreSQL veritabanını hazırlayın
# Environment variables'ları ayarlayın
export DB_USERNAME=your_username
export DB_PASSWORD=your_password
export JWT_SECRET=your_jwt_secret

# Production profile ile çalıştırın
mvn spring-boot:run -Dspring.profiles.active=prod
```

## 👤 Development Ortamı Kullanıcı Bilgileri

Uygulama ilk çalıştırıldığında otomatik olarak aşağıdaki demo kullanıcısı ve görevler oluşturulur:

### Demo Kullanıcısı
- **E-posta**: `demo@todo.com`
- **Şifre**: `Demo1234!`

### Demo Görevler
1. **İlk Görev**
   - Açıklama: Bu bir örnek görevdir.
   - Teslim Tarihi: 3 gün sonra
   - Öncelik: Orta
   - Durum: Tamamlanmadı

2. **Alışveriş Yap**
   - Açıklama: Süt, ekmek, yumurta al.
   - Teslim Tarihi: 1 gün sonra
   - Öncelik: Yüksek
   - Durum: Tamamlanmadı

3. **Kitap Oku**
   - Açıklama: Her gün 20 sayfa oku.
   - Teslim Tarihi: 7 gün sonra
   - Öncelik: Düşük
   - Durum: Tamamlandı

> **Not**: Bu demo veriler sadece veritabanı boş olduğunda oluşturulur. Eğer veritabanında kullanıcı varsa, demo veriler oluşturulmaz.

## 📚 API Dokümantasyonu

Uygulama çalıştıktan sonra Swagger UI'a erişebilirsiniz:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/v3/api-docs

## 🔐 Kimlik Doğrulama

### Demo Kullanıcısı ile Giriş
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "demo@todo.com",
  "password": "Demo1234!"
}
```

### Yeni Kullanıcı Kaydı
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!"
}
```

### JWT Token Kullanımı
```http
GET /api/todos
Authorization: Bearer <your-jwt-token>
```

## 📝 API Endpoints

### Kimlik Doğrulama
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi

### To-Do İşlemleri
- `GET /api/todos` - Tüm görevleri listele
- `GET /api/todos?completed=true` - Tamamlanan görevleri listele
- `GET /api/todos?completed=false` - Tamamlanmayan görevleri listele
- `POST /api/todos` - Yeni görev oluştur
- `GET /api/todos/{id}` - Belirli görevi getir
- `PUT /api/todos/{id}` - Görevi güncelle
- `DELETE /api/todos/{id}` - Görevi sil
- `PATCH /api/todos/{id}/complete` - Görev tamamlanma durumunu değiştir

### Örnek To-Do Oluşturma
```http
POST /api/todos
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Yeni Görev",
  "description": "Bu görevin açıklaması",
  "dueDate": "2024-12-31",
  "priority": "HIGH"
}
```

## 🏗️ Proje Yapısı

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

## 🧪 Test

```bash
# Tüm testleri çalıştır
mvn test

# Belirli test sınıfını çalıştır
mvn test -Dtest=TodoControllerTest
```

## 🚀 Hızlı Başlangıç

1. **Backend'i başlatın**:
   ```bash
   cd todo-backend
   mvn spring-boot:run
   ```

2. **Swagger UI'ı açın**: http://localhost:8080/swagger-ui.html

3. **Demo kullanıcısı ile giriş yapın**:
   - E-posta: `demo@todo.com`
   - Şifre: `Demo1234!`

4. **API'yi test edin**:
   - Önce `/api/auth/login` endpoint'i ile JWT token alın
   - Token'ı kullanarak diğer endpoint'leri test edin

## 🔧 Konfigürasyon

### Development Ortamı
- **Port**: 8080
- **Database**: H2 (In-Memory)
- **H2 Console**: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:tododb`
  - Username: `sa`
  - Password: `password`

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_USERNAME` | PostgreSQL kullanıcı adı | `postgres` |
| `DB_PASSWORD` | PostgreSQL şifresi | `password` |
| `JWT_SECRET` | JWT imzalama anahtarı | `404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970` |
| `JWT_EXPIRATION` | JWT geçerlilik süresi (ms) | `86400000` (24 saat) |

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add some amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun 