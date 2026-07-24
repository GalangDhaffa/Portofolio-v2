# Product Requirements Document (PRD)

## 1. Project Overview
**Name:** Portfolio Dhaffa
**Description:** Sebuah website portofolio pribadi interaktif dan modern yang dirancang untuk memamerkan profil, keterampilan (skills), dan proyek-proyek yang telah dikerjakan. Website ini memiliki sisi publik untuk pengunjung dan *Admin Panel* untuk manajemen konten secara dinamis tanpa perlu mengubah kode sumber.
**Platform:** Web Application (Responsive Desktop & Mobile)

## 2. Tech Stack & Architecture
- **Framework:** Next.js 14 (App Router)
- **Bahasa Pemrograman:** TypeScript / JavaScript (React)
- **Styling:** Tailwind CSS v4, Framer Motion (Animasi UI), CSS Variables untuk dukungan tema.
- **Database ORM:** Prisma
- **Database Engine:** SQLite (Lokal) / PostgreSQL (Cloud/Production)
- **Authentication:** NextAuth.js v5 (Credentials Provider)
- **Storage/CDN:** UploadThing (Untuk unggahan gambar)
- **Ikonography:** React Icons (FontAwesome, HeroIcons)

## 3. Core Features

### 3.1. Public User Interface (Frontend)
Bagian yang dapat diakses oleh siapa pun di internet.
- **Dynamic Navbar & Footer:**
  - Navigasi mulus antar sesi halaman (Home, About, Skills, Projects, Contact).
  - Tautan *Admin* disembunyikan untuk mencegah akses tidak sah.
  - Ikon sosial media di Footer (YouTube, TikTok).
  - **Light / Dark Mode Toggle:** Tombol interaktif untuk mengganti tema website secara instan, lengkap dengan pergantian otomatis logo website.
- **Hero Section:** Menampilkan sapaan, nama, dan foto profil dinamis.
- **About Me:** Paragraf deskripsi diri yang dapat diubah dari admin, beserta kartu tautan cepat ke platform eksternal (YouTube, TikTok, Instagram).
- **Skills Showcase:** Menampilkan daftar keahlian/tools lengkap dengan logo/ikon masing-masing dan deskripsi singkat.
- **Projects Showcase:** Galeri hasil karya berupa *card* yang berisi *cover* gambar, judul, deskripsi, dan tautan ke *live preview/demo*.
- **Contact Form:** Formulir interaktif (Nama, Email, Pesan) bagi pengunjung untuk menghubungi pemilik portofolio secara langsung.

### 3.2. Admin Panel (Backend & CMS)
Area terproteksi khusus untuk pemilik website (Dhaffa) mengatur seluruh konten publik.
- **Secure Authentication:**
  - Login khusus admin (`/admin/login`) menggunakan *username* dan *password* yang di-hash (Bcrypt).
  - Sesi dilindungi oleh *NextAuth Middleware*.
- **Dashboard:** Ringkasan statistik total (jumlah skills, projects, dan pesan masuk).
- **Profile Management (`/admin/profile`):**
  - Mengubah foto profil utama di *Hero Section* (via UploadThing).
  - Memperbarui teks paragraf *About Me*.
- **Skills Management (`/admin/skills`):**
  - **Create, Read, Update, Delete (CRUD)** data skill.
  - Unggah ikon/logo skill ke Cloud.
- **Projects Management (`/admin/projects`):**
  - **CRUD** data project (Judul, deskripsi, tautan URL, dan gambar *cover* project).
- **Message Inbox (`/admin/messages`):**
  - Membaca dan menghapus pesan yang dikirim oleh pengunjung dari *Contact Form* di halaman depan.

## 4. User Flow
1. **Pengunjung Umum:** 
   - Membuka halaman utama (`/`).
   - Melakukan navigasi (klik menu Navbar atau gulir ke bawah).
   - Mengganti tema layar (Terang/Gelap).
   - Menghubungi Dhaffa melalui *Contact Form*.
2. **Admin (Dhaffa):**
   - Menuju ke rute `/admin` (jika belum login, dilempar ke `/admin/login`).
   - Memasukkan Username dan Password.
   - Masuk ke Dashboard.
   - Menambah, mengubah, atau menghapus konten (Skills/Projects) di menu *Sidebar*.
   - Mengunggah gambar (Sistem akan secara otomatis mengirim gambar ke UploadThing dan menyimpan URL-nya di database).
   - Logout dari sistem.

## 5. Deployment Requirements (Vercel)
Untuk membawa aplikasi ini ke ranah *Production* (Publik), beberapa syarat lingkungan (*environment*) mutlak diperlukan:
1. **DATABASE_URL:** Koneksi ke database eksternal (contoh: Supabase, Neon) karena SQLite tidak didukung di Vercel.
2. **UPLOADTHING_TOKEN:** *API Key* wajib untuk memungkinkan pengunggahan gambar ke *Cloud Storage*.
3. **AUTH_SECRET:** *String* rahasia untuk enkripsi sesi *NextAuth*.

## 6. Future Enhancements (Opsional)
- Implementasi sistem *Blog / Artikel* pribadi.
- Menambah sistem balasan (*auto-reply*) ke email pengunjung pada fitur Kotak Masuk.
- Fitur *Rich-Text Editor* pada deskripsi Project.
