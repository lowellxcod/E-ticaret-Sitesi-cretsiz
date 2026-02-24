# 🚀 ElectroNova - Ücretsiz Dağıtım ve Kurulum Rehberi

Bu proje, topluluğa destek olmak ve hayallerime bir adım daha yaklaşmak adına tamamen **ÜCRETSİZ** olarak paylaşılmıştır. Aşağıda kurulum adımlarını ve bu projenin vizyonunu bulabilirsiniz.

---

## 📋 Gereksinimler

Kuruluma başlamadan önce bilgisayarınızda şu yazılımların kurulu olduğundan emin olun:

1.  **Node.js (v20 veya üzeri):** [nodejs.org](https://nodejs.org/) adresinden indirebilirsiniz. (LTS önerilir)
2.  **PostgreSQL:** Veritabanı olarak PostgreSQL kullanılmaktadır. [postgresql.org](https://www.postgresql.org/) adresinden kurabilirsiniz.
3.  **Git (Opsiyonel):** Projeyi indirmek için gerekebilir.

---

## 🛠️ Kurulum Adımları

### 1. Dosyaları Hazırlayın
Projeyi indirin ve bir klasöre çıkartın. Terminalinizi (CMD, PowerShell veya VS Code Terminali) bu klasörün içinde açın.

### 2. Bağımlılıkları Kurun
Terminalde aşağıdaki komutu çalıştırarak gerekli tüm paketleri yükleyin:
```bash
npm install
```
*Not: Bu işlem internet hızınıza bağlı olarak birkaç dakika sürebilir.*

### 3. Veritabanını Hazırlayın
PostgreSQL üzerinde `electronova` adında boş bir veritabanı oluşturun. (pgAdmin veya psql kullanabilirsiniz).

### 4. Ortam Değişkenlerini Ayarlayın (.env)
Proje kök dizininde `.env` adında bir dosya oluşturun (veya varsa düzenleyin). İçeriği şu şekilde doldurmalısınız:

```env
# Veritabanı Bağlantısı (Kendi kullanıcı adı ve şifrenizi girin)
DATABASE_URL="postgresql://KULLANICI_ADI:SIFRE@localhost:5432/electronova?schema=public"

# NextAuth Güvenlik Ayarları
NEXTAUTH_SECRET="rastgele_uzun_bir_sifre_girin"
NEXTAUTH_URL="http://localhost:3000"

# Mail Gönderim Sitemi (Resend.com'dan API anahtarı almalısınız)
RESEND_API_KEY="re_sizin_api_anahtariniz"

# Admin Giriş Bilgileri
ADMIN_EMAIL="sizin_mail@gmail.com"
ADMIN_ACCESS_KEY="Panel Girişi İçin Güçlü Bir Şifre"

# WhatsApp Destek Hattı
NEXT_PUBLIC_WHATSAPP_PHONE="905XXXXXXXXX"
```

### 5. Veritabanı Tablolarını Oluşturun
Prisma kullanarak veritabanı şemasını PostgreSQL'e aktarın:
```bash
npx prisma db push
```

### 6. Başlangıç Verilerini Yükleyin (Seed)
Sitedeki kategorilerin ve örnek ürünlerin oluşması için şu komutu çalıştırın:
```bash
npm run seed
```

### 7. Uygulamayı Başlatın
Her şey hazır! Şimdi siteyi ayağa kaldırın:
```bash
npm run dev
```
Uygulama çalışmaya başladığında tarayıcınızdan `http://localhost:3000` adresine girerek siteyi görebilirsiniz.

---

## 🔑 Yönetici Paneline Giriş

1.  Siteye giriş yapmak için önce `/auth/register` sayfasından `.env` dosyasında belirttiğiniz `ADMIN_EMAIL` adresi ile bir hesap oluşturun.
2.  Giriş yaptıktan sonra `/admin` adresine gidin.
3.  Sizden istenen **Yönetici Anahtarı** kısmına `.env` dosyasındaki `ADMIN_ACCESS_KEY` değerini girin.

---

## ⚙️ .env Değişkenleri Detayları

| Değişken | Açıklama |
| :--- | :--- |
| `DATABASE_URL` | PostgreSQL bağlantı cümlesidir. `postgresql://user:password@host:port/database` formatındadır. |
| `NEXTAUTH_SECRET` | Oturum güvenliği için kullanılır. En az 32 karakterlik karmaşık bir yazı yazın. |
| `RESEND_API_KEY` | E-posta bildirimleri (Sipariş onayı vb.) için gereklidir. [resend.com](https://resend.com) adresinden ücretsiz alabilirsiniz. |
| `ADMIN_EMAIL` | Panel yetkisine sahip olacak e-posta adresi. |
| `ADMIN_ACCESS_KEY` | Admin paneline girişte sorulan ekstra güvenlik şifresidir. |

---

## 🌟 Vizyon ve Misyonumuz

Bu projenin arkasında bir hayal var. Hepimizin hayalleri olduğu gibi benim de hayalimdeki motora kavuşmak gibi bir hedefim var. 

*   **Ücretsiz & Samimi:** Bu siteyi tamamen ücretsiz paylaşıyorum. Eğer işine yararsa ve hayalime destek olmak istersen gönlünden ne koparsa bir bağış atman beni çok mutlu eder.
*   **Hediye Web Sitesi:** Her videomun altında yorum yapan bir kişiye istediği bir web sitesini hediye edeceğim. Beraber büyüyelim!

---

## 🏗️ Teknik Altyapı 

Sektörün en sağlam teknolojilerini kullandık:
*   **Next.js 14 (React 18) & TypeScript:** Hızlı ve güvenli ana geliştirme dili ve çatısı.
*   **Tailwind CSS & Framer Motion:** Şık, modern ve akıcı kullanıcı arayüzü tasarımı.
*   **PostgreSQL & Prisma:** Performanslı ve sağlam veritabanı altyapısı (ORM).
*   **NextAuth.js & Resend:** Güvenli oturum yönetimi ve e-posta bildirim sistemi.
*   **Zustand:** Ultra hafif ve hızlı durum (state) yönetimi.
*   **Lucide React:** Modern ikon koleksiyonu.
*   **SQL & HTML (JSX):** Standart veritabanı sorguları ve dinamik sayfa yapıları.

---

## ❗ Yaygın Sorunlar ve Çözümleri

-   **"Prisma Client not found" Hatası:** `npx prisma generate` komutunu çalıştırın.
-   **Veritabanı Bağlantı Hatası:** PostgreSQL servisinin çalıştığından ve şifrenizin doğru olduğundan emin olun.
-   **Port Hatası:** Eğer 3000 portu doluysa `npm run dev -- -p 3001` komutu ile farklı portta açabilirsiniz.

---

**🎁 Hediye:** Bu proje topluluğa bir hediye olarak sunulmuştur. Hayallerimize giden yolda destekleriniz için teşekkürler!

**Powered by Emre Kılıçoğlu (lowellxcod & luwex13)**
