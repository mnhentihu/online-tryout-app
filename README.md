# TryOut – Platform Simulasi Tryout Online

TryOut merupakan aplikasi simulasi ujian online yang dikembangkan sebagai bagian dari pengerjaan technical test untuk PT Lini Suara Nusantara (Penerbit Buku Liniswara).

Aplikasi ini dibuat untuk memberikan pengalaman mengerjakan tryout secara online, mulai dari registrasi akun, mengakses materi pembelajaran, mengerjakan soal dengan batas waktu, hingga melihat hasil pengerjaan. Selain itu, terdapat sistem berlangganan menggunakan redeem code untuk membatasi akses ke fitur-fitur premium.

## Demo

- **Website:** [Masukkan URL deployment di sini]
- **Repository:** [Masukkan URL repository di sini]

## Teknologi yang Digunakan

Beberapa teknologi yang digunakan dalam pengembangan aplikasi ini:

- **Next.js (App Router)** – Framework utama untuk frontend dan backend.
- **TypeScript** – Membantu menjaga konsistensi tipe data dalam aplikasi.
- **Tailwind CSS** – Untuk styling dan membangun tampilan yang responsif.
- **Shadcn UI** – Sebagai pendukung komponen antarmuka.
- **Supabase** – Digunakan untuk autentikasi pengguna dan PostgreSQL database.
- **Prisma ORM** – Untuk mengelola komunikasi dan query database.
- **Vercel** – Digunakan untuk deployment aplikasi.

## Fitur yang Tersedia

### 1. Autentikasi Pengguna

- Registrasi akun menggunakan email dan password.
- Login dan logout.
- Verifikasi email setelah registrasi.
- Pengelolaan sesi pengguna menggunakan Supabase Auth.

### 2. Dashboard

- Menampilkan informasi akun pengguna.
- Menampilkan status langganan (Free atau Premium).
- Menyediakan navigasi ke materi pembelajaran, tryout, dan halaman langganan.

### 3. Materi Pembelajaran

- Menampilkan daftar materi pembelajaran.
- Menampilkan detail materi.
- Mendukung konten video pembelajaran.

### 4. Tryout Online

- Menampilkan daftar tryout yang tersedia.
- Menampilkan detail dan informasi tryout.
- Mengerjakan soal dengan batas waktu.
- Navigasi antarsoal.
- Menyimpan jawaban selama sesi pengerjaan berlangsung.
- Pengumpulan jawaban secara manual maupun otomatis ketika waktu habis.
- Menghitung nilai berdasarkan jawaban yang benar.

### 5. Hasil Tryout

- Menampilkan nilai akhir pengerjaan.
- Menampilkan jumlah jawaban benar, salah, dan belum dijawab.
- Menampilkan informasi waktu pengerjaan.
- Menyediakan akses untuk melihat hasil pengerjaan sebelumnya.
- Menampilkan nilai terakhir dan nilai terbaik pada halaman detail tryout.

### 6. Sistem Langganan dan Redeem Code

- Menampilkan status dan informasi masa aktif langganan.
- Mengaktifkan langganan menggunakan redeem code.
- Setiap redeem code hanya dapat digunakan satu kali.
- Mendukung durasi langganan yang berbeda.
- Masa aktif langganan dihitung berdasarkan periode langganan sebelumnya apabila pengguna masih memiliki langganan aktif.
- Kode redeem disimpan dalam bentuk SHA-256 hash, bukan sebagai teks asli di database.

## Akun dan Redeem Code untuk Pengujian

Untuk mempermudah proses pengujian, berikut beberapa redeem code yang telah disediakan:

| Redeem Code            |  Durasi |
| ---------------------- | ------: |
| `TRYOUT-1BULAN-K7Q9M2` | 30 hari |
| `TRYOUT-1BULAN-P4X8N6` | 30 hari |
| `TRYOUT-2BULAN-R9T3W5` | 60 hari |
| `TRYOUT-2BULAN-H6C2V8` | 60 hari |
| `TRYOUT-3BULAN-Z8M4K7` | 90 hari |

**Catatan:** Redeem code hanya dapat digunakan satu kali. Silakan melakukan registrasi akun terlebih dahulu sebelum menggunakannya.

## Menjalankan Project Secara Lokal

Jika ingin menjalankan aplikasi di lingkungan lokal, ikuti langkah berikut:

**1. Clone repository**

```bash
git clone <repository-url>
cd <project-folder>
```

**2. Install dependencies**

```bash
npm install
```

**3. Konfigurasi environment variables**

Buat file `.env` di root project dan sesuaikan nilainya dengan konfigurasi Supabase yang digunakan.

```env
DATABASE_URL="your-database-connection-string"
DIRECT_URL="your-direct-database-connection-string"

NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your-supabase-publishable-key"
```

**4. Generate Prisma Client dan jalankan migration**

```bash
npx prisma generate
npx prisma migrate deploy
```

**5. Jalankan aplikasi**

```bash
npm run dev
```

Aplikasi dapat diakses melalui `http://localhost:3000`.

**6. Seed redeem code**

Untuk menambahkan redeem code yang disediakan, jalankan:

```bash
npx tsx scripts/seed-redeem-codes.ts
```

Pastikan environment variables sudah dikonfigurasi sebelum menjalankan proses seeding.

## Prioritas Pengembangan

Dalam pengerjaan project ini, saya memprioritaskan alur utama aplikasi terlebih dahulu agar fitur-fitur penting dapat digunakan secara end-to-end.

Beberapa prioritas yang saya ambil:

1. **Autentikasi dan pengelolaan pengguna.** Saya memilih Supabase Auth agar proses autentikasi dapat dikelola dengan baik, sementara data profil pengguna tetap disimpan pada database aplikasi.
2. **Sistem langganan.** Saya membangun mekanisme redeem code dan pengecekan masa aktif langganan agar akses ke fitur premium dapat dikontrol dari sisi server.
3. **Fungsionalitas tryout.** Fokus utama berikutnya adalah memastikan proses pengerjaan soal, timer, pengumpulan jawaban, perhitungan nilai, dan penyimpanan hasil berjalan dengan baik.
4. **Integrasi database.** Data materi, soal, jawaban, hasil pengerjaan, dan langganan diintegrasikan dengan PostgreSQL menggunakan Prisma ORM.
5. **Tampilan dan pengalaman pengguna.** Setelah alur utama berjalan, saya melakukan penyesuaian tampilan agar konsisten, responsif, dan mudah digunakan.

## Pengembangan Selanjutnya

Masih ada beberapa hal yang ingin saya kembangkan lebih lanjut setelah versi awal ini:

- Menambahkan autentikasi menggunakan Google OAuth.
- Menambahkan fitur penyimpanan jawaban otomatis (_autosave_) selama pengerjaan tryout.
- Menambahkan pembahasan atau penjelasan untuk setiap soal setelah tryout selesai.
- Mengembangkan riwayat pengerjaan agar pengguna dapat melihat dan membandingkan hasil tryout sebelumnya dengan lebih lengkap.
- Mengembangkan halaman administrasi untuk mengelola materi, tryout, soal, dan redeem code.

Beberapa fitur tersebut belum menjadi prioritas pada versi awal karena saya lebih berfokus memastikan alur utama aplikasi dapat berjalan terlebih dahulu.

---

Terima kasih telah meluangkan waktu untuk mencoba aplikasi ini. Saya terbuka terhadap masukan dan evaluasi untuk pengembangan selanjutnya.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
