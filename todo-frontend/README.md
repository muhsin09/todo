# To-Do Frontend

JWT Kimlik Doğrulamalı To-Do Uygulaması Frontend

## 🚀 Özellikler

- **Modern UI/UX**: Tailwind CSS ile modern ve responsive tasarım
- **JWT Kimlik Doğrulama**: Güvenli kullanıcı girişi ve kayıt
- **To-Do Yönetimi**: CRUD işlemleri ile görev yönetimi
- **Filtreleme**: Tamamlanma durumuna göre filtreleme
- **Form Validasyonu**: Zod ile güçlü form validasyonu
- **TypeScript**: Tip güvenliği
- **Responsive Design**: Mobil ve masaüstü uyumlu

## 🛠️ Teknolojiler

- **Next.js 15** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form**
- **Zod** (Form validation)
- **Axios** (HTTP client)
- **Lucide React** (Icons)

## 📋 Gereksinimler

- Node.js 18+
- npm veya yarn

## 🚀 Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
npm install
```

### 2. Environment Variables

`.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 3. Development Server'ı Başlatın

```bash
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacak.

## 📁 Proje Yapısı

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
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   └── Card.tsx
│   ├── AuthForm.tsx      # Kimlik doğrulama formu
│   ├── TodoCard.tsx      # Todo kartı
│   └── TodoForm.tsx      # Todo formu
├── lib/                  # Utility fonksiyonları
│   ├── utils.ts          # Genel utility'ler
│   └── validations.ts    # Form validasyon şemaları
├── services/             # API servisleri
│   └── api.ts           # API client
└── types/               # TypeScript type tanımları
    └── index.ts
```

## 🔐 Kimlik Doğrulama

### Kayıt Olma
- E-posta ve şifre ile kayıt
- Güçlü şifre validasyonu
- Otomatik giriş

### Giriş Yapma
- E-posta ve şifre ile giriş
- JWT token yönetimi
- Otomatik yönlendirme

## 📝 To-Do İşlemleri

### Görev Oluşturma
- Başlık (zorunlu)
- Açıklama (opsiyonel)
- Teslim tarihi (opsiyonel)
- Öncelik seviyesi (Düşük/Orta/Yüksek)

### Görev Yönetimi
- Görev listeleme
- Görev düzenleme
- Görev silme
- Tamamlanma durumu değiştirme

### Filtreleme
- Tüm görevler
- Tamamlanan görevler
- Bekleyen görevler

## 🎨 UI Bileşenleri

### Button
- Primary, secondary, danger, ghost varyantları
- Loading state
- Farklı boyutlar

### Input
- Label desteği
- Error handling
- Placeholder

### Card
- Header, content, footer bölümleri
- Responsive tasarım

### Form
- React Hook Form entegrasyonu
- Zod validasyonu
- Error handling

## 🔧 Konfigürasyon

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8080` |

### Tailwind CSS

Proje Tailwind CSS ile stillendirilmiştir. Özel stiller `globals.css` dosyasında tanımlanmıştır.

## 🧪 Test

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Lint
npm run lint
```

## 📱 Responsive Design

Uygulama mobil, tablet ve masaüstü cihazlarda uyumlu çalışır:

- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+

## 🔒 Güvenlik

- JWT token localStorage'da saklanır
- Token geçerliliği kontrol edilir
- Otomatik logout (401 hatası)
- Form validasyonu

## 🚀 Deployment

### Vercel

```bash
npm run build
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add some amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
