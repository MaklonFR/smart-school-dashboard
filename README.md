# 📊 Smart School Dashboard

**Smart School Dashboard** adalah antarmuka web interaktif yang menampilkan berbagai statistik dan kontrol sistem berbasis IoT untuk SMK Negeri 1 Kuwus – Manggarai Barat, NTT. Dashboard ini bertema modern dengan integrasi grafik, animasi, dan sistem kontrol pintar.

## 🚀 Fitur Utama

### 📁 1. Tab Statistik Sekolah
- Menampilkan informasi:
  - Jumlah Guru, Guru Bersertifikasi & Belum Sertifikasi, dan Pegawai
  - Total Siswa: Laki-laki, Perempuan, dan masing-masing jurusan (APAT, ATPH, ATR, RPL, UPW)
  - Total Ruang: Kelas, Lab, Perpustakaan, WC
  - Alumni 3 tahun terakhir: Bekerja, Studi Lanjut, Wirausaha, Belum Bekerja
- Ditampilkan dalam format **widget dengan ikon**, **tabel**, dan **grafik (Pie & Bar Chart)**

### 💡 2. Tab Sistem Kontrol
- Kontrol ON/OFF lampu untuk:
  - Ruang Teras
  - Ruang Kantor
  - Ruang Kelas
  - Ruang Lab
- Setiap lampu ditampilkan dengan gambar dan berubah warna saat aktif
- Tombol ON/OFF otomatis toggle ke semua lampu (hanya satu lampu aktif)

### 🌡️ 3. Tab IoT Temperatur
- (Placeholder untuk integrasi sensor suhu ruangan menggunakan IoT)
- Dapat diperluas untuk mendeteksi suhu real-time menggunakan ESP32 atau microcontroller lain

### 🚦 4. Simulasi Traffic Light
- Menampilkan 4 arah: **West, North, East, South**
- Hanya satu arah menyala hijau, lainnya merah
- Siklus:
  - Hijau: 5 detik
  - Kuning: 2 detik
  - Lalu berganti ke arah berikutnya
- Terdapat fungsi untuk **menghentikan siklus** kapan pun (`stopTrafficCycle()`)

### 🎨 Desain
- Menggunakan tema gelap (Dark Mode)
- Gradien putih-biru untuk widget
- Font modern `Poppins`
- Responsif dan ringan

---

## 🛠️ Teknologi yang Digunakan

- **HTML5**
- **CSS3** (Flexbox, Grid, Animasi, Dark Theme)
- **JavaScript Vanilla**
- **Chart.js** – untuk visualisasi data (Pie & Bar Chart)
- **Google Fonts** – Font Poppins

---

## 📦 Cara Menjalankan

1. Clone atau download repositori ini
2. Buka file `index.html` langsung di browser
3. Tidak memerlukan server lokal (jika tanpa IoT backend)

```bash
git clone https://github.com/username/smart-school-dashboard.git
cd smart-school-dashboard
open index.html
