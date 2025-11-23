# 🎬 Proyek UTS Arsitektur Mikroservis: Aplikasi Streaming Film

## Kelompok Big Four

Proyek Ujian Tengah Semester (UTS) ini bertujuan untuk mendemonstrasikan implementasi praktis dari arsitektur mikroservis, *containerization* menggunakan Docker, dan orkestrasi menggunakan Docker Compose.

-----

## 👨‍🎓 Nama Anggota Kelompok

| NIM | Nama Lengkap | Kontribusi/Layanan |
| :--- | :--- | :--- |
| 42230045 | I Gusti Ngurah Abi Praja Andika | Frontend (FE) & Dokumentasi |
| 42230022 | Nabila Chrisitan Putri Hermawan | Backend: User Service |
| 42230034 | Gusti Ayu Purna Savitri | Backend: Movie Service |
| 42230016 | Putu Wahyu Wardaya | Backend: Subscription Service |

-----

## 🎥 Tema Aplikasi

**Aplikasi Streaming Film (Movie Service)**

## 📝 Deskripsi Singkat Proyek

Aplikasi ini adalah platform *streaming* film sederhana yang diimplementasikan menggunakan arsitektur *Microservices*. Proyek ini terdiri dari **lima (5) kontainer** yang berjalan secara independen dan dikoordinasikan oleh Docker Compose.

### Arsitektur Layanan Kunci

| Layanan | Fungsi Utama | Port (Host) |
| :--- | :--- | :--- |
| **frontend** | *User Interface* aplikasi. | 3000 |
| **user-service** | Otentikasi, data pengguna (Register/Login). | 8001 |
| **movie-service** | Manajemen konten film, genre, dan aktor. | 8002 |
| **subscription-service**| Transaksi dan status langganan. | 8003 |
| **db** | *Shared Database* terpusat (PostgreSQL). | 5432 |

**Kepatuhan Teknis:**

  * **Shared Database:** Semua layanan backend terhubung ke satu *instance* PostgreSQL.
  * **Independensi Data:** Setiap layanan backend bertanggung jawab atas migrasi tabel datanya sendiri.
  * **Komunikasi API:** Komunikasi antar-layanan dilakukan melalui panggilan HTTP/API.

-----

## ⚙️ Instruksi Menjalankan Proyek

Pastikan Anda telah menginstal **Docker** dan **Docker Compose** di sistem Anda.

### 1\. Kloning Repositori

```
git clone [Link Repository GitHub Anda]
cd [Nama Folder Repository Anda]
```

### 2\. Konfigurasi Lingkungan (.env)

Buat file `.env` di *root* direktori proyek yang berisi variabel lingkungan yang diperlukan oleh kontainer.

```
# Contoh isi file .env:
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=movie_db
POSTGRES_PORT=5432
JWT_SECRET=S3cr3tKeyUt5Pr0y3k

# Backend Ports
USER_SERVICE_PORT=8001
MOVIE_SERVICE_PORT=8002
SUBSCRIPTION_SERVICE_PORT=8003
```

### 3\. Eksekusi Docker Compose

Jalankan perintah ini di *root* direktori proyek:

```
docker compose up --build
```

### 4\. Akses Aplikasi

Aplikasi *Frontend* akan tersedia di:
http://localhost:3000

### 5\. Menghentikan Aplikasi

```
docker compose down
```

-----

## 🌐 Dokumentasi API Sederhana

### 1\. User Service (Port 8001)

| Endpoint | Metode | Deskripsi | Tanggung Jawab Data |
| :--- | :--- | :--- | :--- |
| /register | POST | Membuat akun pengguna baru (CRUD: Create). | Users, Watchlists |
| /login | POST | Autentikasi dan menghasilkan token JWT. | Users |
| /users/watchlist | POST | Menambahkan film ke daftar tonton. | Watchlists |
| /users/watchlist/:id | DELETE | Menghapus film dari daftar tonton. | Watchlists |

### 2\. Movie Service (Port 8002)

| Endpoint | Metode | Deskripsi | Tanggung Jawab Data |
| :--- | :--- | :--- | :--- |
| /movies | GET | Mendapatkan daftar semua film (CRUD: Read). | Movies, Genres, Actors |
| /movies/:id | GET | Mendapatkan detail spesifik film. | Movies |
| /admin/movies | POST | [ADMIN] Menambahkan data film baru. | Movies |

### 3\. Subscription Service (Port 8003)

| Endpoint | Metode | Deskripsi | Tanggung Jawab Data |
| :--- | :--- | :--- | :--- |
| /subscriptions | POST | Melakukan pembelian langganan. | Subscriptions, Updates Users |
| /subscriptions/:id | GET | Mendapatkan detail transaksi langganan. | Subscriptions |