# Anti-Slop & Editorial Design Rules (Tebing Breksi)

File ini adalah aturan pengaman (*guardrail*) otomatis untuk agen AI saat mendesain dan mengoding antarmuka website Tebing Breksi. Aturan ini mengadopsi filosofi **`anti-slop`** dan **`hallmark`**, dipadukan dengan dokumen acuan proyek di `Dokumen/02-desain-ui-ux.md`.

---

## 1. HARD GATES (Pantangan Mutlak — Dilarang Keras)

AI dilarang menghasilkan elemen-elemen berikut tanpa pengecualian:
1. **NO Neon Gradients / Purple Glow**: Dilarang menggunakan gradien neon khas AI/SaaS (`from-purple-600 to-indigo-600`, glow shadow warna-warni, border gradien berkilau).
2. **NO Heavy Glassmorphism**: Dilarang menggunakan kartu transparan gelap dengan blur pekat (`backdrop-blur-md bg-white/5 border-white/10`).
3. **NO Cliché Bento Grid**: Dilarang membuat susunan 3 atau 4 kartu simetris dengan ikon generik (*Rocket, Shield, Zap*) dan deskripsi 2 baris yang seragam.
4. **NO Robotic Buzzword Copywriting**: Dilarang menulis headline klise AI seperti:
   - *"Supercharge your journey"*
   - *"Experience the extraordinary"*
   - *"Where ancient wonders meet next-gen beauty"*
   Gunakan teks informatif, ramah, dan berakar pada kenyataan lokal (*"Wisata Tebing Breksi: Eksplorasi Seni Ukir Batu Purba di Sleman, Yogyakarta"*).
5. **NO Unrealistic AI Stock Imagery**: Jangan tampilkan placeholder yang menggambarkan gunung bersalju Eropa atau pantai tropis. Tebing Breksi adalah tebing batu kapur purba berwarna abu-putih dengan pahatan relief seniman lokal, amfiteater terbuka, dan pemandangan sunset dari puncak.
6. **NO Forbidden Colors**: Dilarang memakai warna hijau cerah (`#38C172`), warna emas, krem/beige, atau palet default Tailwind di luar token resmi.

---

## 2. PURPOSE GATES (Elemen Visual Harus Memiliki Alasan Fungsional)

Setiap elemen visual harus menjawab kebutuhan pengunjung:
- **Informasi Tiket & Jam Buka**: Harus terlihat dalam 5 detik pertama (bisa diakses cepat di Hero atau bar informasi langsung di bawah Hero).
- **Rute & Arah**: Tautan langsung ke Google Maps dengan label jelas, bukan tombol navigasi abstrak.
- **Kontak & Pertanyaan**: Akses WhatsApp resmi pengelola untuk reservasi rombongan/jeep.
- **Tipografi Editorial**: Gunakan perpaduan tipografi gaya majalah geologi/wisata:
  - **Heading (H1 - H3)**: `Playfair Display` (serif tebal, berwibawa, elegan).
  - **Body & Caption**: `DM Sans` (sans-serif bersih, mudah dibaca, kontras tinggi).

---

## 3. QUALITY LOCKS (Standar Desain & Token Resmi)

Wajib patuh pada Design Token di `Dokumen/02-desain-ui-ux.md`:
* **Warna Utama**:
  - `black`: `#000000` (Heading utama, tombol primer)
  - `charcoal`: `#1A1A1A` (Teks body, footer, header)
  - `white`: `#FFFFFF` (Latar kartu, panel)
  - `gray-100`: `#F0F2F5` (Latar halaman utama)
  - `border`: `#E1E4E8` (Border solid 1px tipis, bersih)
  - `text-secondary`: `#4D4D4D` (Caption dan keterangan)
* **Aturan Penggunaan Warna Teal (`#00A3BF`)**:
  - HANYA untuk: indikator aktif, badge status, ikon aksen, underline tautan (2px offset 3px), atau metrik angka besar (≥24px).
  - JANGAN gunakan teks teal kecil di atas putih/abu-abu (karena rasio kontras < 4.5:1, gagal WCAG AA).
* **Elevasi & Shadow**:
  - Kartu default: `box-shadow: 0 4px 12px rgba(0,0,0,0.06)`
  - Hover: `box-shadow: 0 12px 28px rgba(0,0,0,0.12)`, `transform: translateY(-2px)`, transisi 200ms lembut.

---

## 4. DELIVERY GATE (Verifikasi Mandatori Sebelum Menyelesaikan Komponen)

Sebelum kode komponen UI dianggap selesai, AI harus memverifikasi checklist berikut:
- [ ] **Contrast Check**: Apakah teks lolos kontras minimum 4.5:1 (WCAG AA)?
- [ ] **Cliché Check**: Apakah ada gradien ungu, efek kaca buram, atau tombol berkedip? (Jika ada, hapus).
- [ ] **Mobile-First Check**: Apakah susunan elemen nyaman disentuh di layar HP (lebar 360px - 414px) tanpa teks terpotong?
- [ ] **Real Copy Check**: Apakah teks tiket, fasilitas, dan deskripsi sudah realistis sesuai konteks Tebing Breksi?
