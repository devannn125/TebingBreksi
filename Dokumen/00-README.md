# Tebing Breksi Website Redesign — Dokumen Proyek

**Versi:** 1.1 (turunan dari PRD v1.0, 8 November 2026)
**Diperbarui:** 9 November 2026
**Developer:** 1 orang (solo, magang, AI-assisted / vibe coding)
**Stack:** Laravel (API + Filament admin) + React (Next.js) — headless CMS

Dokumen ini adalah paket kerja yang diturunkan dari PRD asli dan dari jawaban-jawaban klarifikasi. Jika ada konflik antara dokumen ini dan PRD, lihat bagian **"Penyimpangan dari PRD"** di bawah. Selain itu, PRD tetap menjadi acuan.

---

## 1. Daftar Dokumen

| File | Isi | Dibaca saat |
|---|---|---|
| `00-README.md` | Indeks, keputusan, asumsi, penyimpangan dari PRD | Pertama kali, dan saat bingung |
| `01-kebutuhan-fitur.md` | Persona, scope, functional requirement, user story, acceptance criteria, analytics | Sebelum membuat fitur |
| `02-desain-ui-ux.md` | Design tokens, kontras warna, tipografi, komponen, spesifikasi section, responsif, a11y | Saat membangun UI / merapikan Figma |
| `03-arsitektur-teknis.md` | Arsitektur sistem, data model, API, struktur repo, i18n, SEO, caching, keamanan, deployment | Saat setup backend/frontend |
| `04-konten-dan-cms.md` | Content type, tata kelola konten, aturan tarif, draft copy ID/EN, sumber geologi, rencana foto | Saat mengisi CMS dan menulis konten |
| `05-qa-dan-acceptance.md` | NFR, test matrix, audit warna, checklist rilis, Definition of Done | Saat testing dan sebelum launch |
| `06-sprint-plan.md` | Rencana sprint, backlog, estimasi, risiko, demo checkpoint | Setiap hari / setiap sprint |

---

## 2. Log Keputusan (hasil klarifikasi)

| # | Topik | Keputusan | Sumber |
|---|---|---|---|
| D-01 | Pemilik / klien | Tidak diketahui; proyek magang, klien dikenalkan lewat perusahaan. **Semua approval lewat pembimbing magang.** | Jawaban pengguna |
| D-02 | Website lama | Digantikan penuh oleh website baru. Wajib rencana redirect URL lama. | Jawaban pengguna |
| D-03 | Stack | Headless CMS: Laravel backend + React frontend. Rekomendasi: Next.js (React) agar SEO baik. | Jawaban pengguna + rekomendasi |
| D-04 | Editor konten | Mayoritas non-teknis, kadang teknis. Admin panel harus sederhana (Filament). | Jawaban pengguna |
| D-05 | Foto resmi | Belum ada akses. Pakai placeholder bertanda jelas sampai foto resmi tersedia. | Jawaban pengguna |
| D-06 | Tarif tiket | **Tarif terbaru yang berlaku.** Pembedaan weekday/weekend dibuat **dapat diatur dari CMS.** Tetap perlu konfirmasi pengelola sebelum tampil sebagai "terkini". | Jawaban pengguna |
| D-07 | Reservasi | Sederhana: tautan WhatsApp / media sosial resmi. Tidak ada booking engine. | Jawaban pengguna |
| D-08 | CTA utama | "Rencanakan Kunjungan" → bagian/halaman Informasi Kunjungan (sesuai usulan PRD OQ-09). | Jawaban pengguna |
| D-09 | Bahasa | Indonesia + Inggris masuk MVP (versi dasar). | Jawaban pengguna |
| D-10 | Kontras teal & warna netral | Mengikuti rekomendasi di `02-desain-ui-ux.md` §3. | Jawaban pengguna ("rekomendasi terbaik") |
| D-11 | Figma | Belum final dan berantakan; akan dirapikan ulang. Dokumen desain ini jadi acuan, bukan file Figma lama. | Jawaban pengguna |
| D-12 | Hosting / anggaran | Hanya diketahui owner. Rancang agar bisa berjalan di hosting murah (VPS kecil atau shared yang mendukung PHP 8.2+). | Jawaban pengguna |
| D-13 | Sumber fakta geologi | Bebas diambil dari mana saja untuk sementara; jurnal akademik boleh. Wajib cantumkan sumber di CMS. | Jawaban pengguna |
| D-15 | Sifat website | **Informasi saja.** Tidak ada transaksi, pembayaran, formulir, akun, atau kalkulator biaya. Tarif hanya ditampilkan sebagai informasi (setelah diverifikasi). Semua tindak lanjut (tanya, pesan, bayar) terjadi di luar website, terutama via WhatsApp. | Diskusi lanjutan + PRD §5.3 |
| D-16 | Alur "Rencanakan Kunjungan" | Dua langkah: tombol → bagian/halaman Informasi Kunjungan → pilihan Petunjuk Arah (Google Maps) atau WhatsApp. Tidak langsung ke WhatsApp. | Diskusi lanjutan + PRD OQ-09 |
| D-17 | Role pengelola konten | Usulan: `admin` dan `editor` (+ `verifier` opsional). Pemisahan **satu panel** vs **dua panel login** (`/panel` dan `/editor`) **belum diputuskan**; lihat `03-arsitektur-teknis.md` §10.1. | Diskusi lanjutan |
| D-14 | Tanggal launch | Tidak ada batas keras, tetapi "secepat mungkin". Target: **±13 minggu**, dengan demo di minggu 7. | Jawaban pengguna |

---

## 3. Asumsi yang Saya Buat

Koreksi jika salah, karena memengaruhi estimasi.

1. Waktu kerja Anda sekitar **25–30 jam per minggu**. Jika kurang, durasi sprint memanjang.
2. Anda bisa menggunakan satu server/VPS atau hosting PHP, dan domain `tebingbreksi.com` bisa dialihkan saat launch.
3. Anda mendapat akses ke seseorang (pembimbing) yang bisa meneruskan pertanyaan ke pengelola.
4. Tarif yang dimasukkan pertama kali ke CMS berasal dari pengumuman resmi 28 November 2024 (kutipan dari PRD, **belum saya buka sendiri**), dengan status `pending_confirmation` sampai pengelola mengonfirmasi.
5. Foto sementara berasal dari sumber berlisensi bebas (misalnya Wikimedia Commons dengan atribusi benar) atau foto yang Anda ambil sendiri, dan ditandai placeholder.

---

## 4. Penyimpangan dari PRD (disengaja)

Saya menyesuaikan seminimal mungkin, sesuai permintaan "jangan terlalu jauh dari PRD".

| # | PRD | Dokumen ini | Alasan |
|---|---|---|---|
| P-01 | Hanya 5 warna, melarang "warna keenam" | Tambah **3 token netral abu**: `border`, `text-secondary`, `shadow`. Tidak ada hue baru. | PRD sendiri meminta border abu dan teks sekunder berkontras; butuh token resmi agar tidak melanggar. |
| P-02 | Teal sebagai aksen link, badge, metrik | Teal **tidak dipakai untuk teks kecil di atas putih/Light Gray** (kontras ±3:1 dan ±2,7:1, hitungan saya, di bawah 4,5:1 untuk WCAG AA). Boleh untuk ikon, indikator, underline, angka besar, dan teks di atas Charcoal. | PRD menargetkan WCAG 2.2 AA. |
| P-03 | Bahasa kedua = P1 (pasca-MVP) | **Masuk MVP** versi dasar (Indonesia + Inggris untuk homepage dan informasi kunjungan) | Keputusan D-09. |
| P-04 | Frontend "React + Next.js atau setara" | Next.js (App Router) dengan SSG/ISR | SEO destinasi wisata; React murni (SPA) lemah di SEO. |
| P-05 | Tarif tidak boleh hardcode | Tarif **di-seed** ke CMS dengan status `pending_confirmation`, tidak ada di kode frontend | Sejalan dengan PRD §6.2, §16.3. |
| P-06 | Rentang umur "20–36 juta tahun" sebagai fakta | Ditampilkan hanya dengan sumber, dan diberi catatan bahwa literatur akademik memberi angka yang bervariasi (lihat `04-konten-dan-cms.md` §6) | Hasil pencarian literatur menunjukkan perbedaan angka. |

---

## 5. Pertanyaan yang Masih Terbuka (kirim lewat pembimbing)

**Wajib sebelum launch**

- [ ] Tarif yang berlaku: kategori (WNI/WNA/anak?), weekday/weekend/libur nasional, tanggal berlaku.
- [ ] Jam operasional destinasi dan tiap layanan (jeep, camping, venue, kafe).
- [ ] Nomor WhatsApp resmi dan akun media sosial resmi.
- [ ] Izin penggunaan foto dan sumber foto resmi (atau izin memotret langsung).
- [ ] Siapa yang menyetujui konten, dan siapa yang akan memperbarui tarif/pengumuman setelah launch.
- [ ] Akses domain, hosting, dan anggaran.

- [ ] Nomor WhatsApp satu untuk semua keperluan, atau dipisah (umum, venue/event, camping/jeep)? Siapa pemegangnya dan seberapa cepat membalas?
- [ ] Apakah pengelola setuju formulir reservasi lama tidak dipertahankan (dialihkan ke Informasi Kunjungan)?

**Boleh menyusul**

- [ ] Apakah formulir reservasi lama dinonaktifkan atau tetap dipakai?
- [ ] Apakah ada kategori tarif anak?
- [ ] Logo dan panduan brand resmi (jika ada).
- [ ] Kebijakan privasi: siapa pihak pengelola data yang disebut.

---

## 6. Cara Memakai Dokumen Ini dengan AI Coding Assistant

Saat vibe coding, jangan tempel semua dokumen sekaligus. Pakai per tugas:

| Tugas | Lampirkan |
|---|---|
| Setup backend | `03-arsitektur-teknis.md` + `04-konten-dan-cms.md` §2 |
| Komponen UI | `02-desain-ui-ux.md` §3–§7 |
| Section homepage | `02-desain-ui-ux.md` §8 (section yang dimaksud) + `01-kebutuhan-fitur.md` (FR terkait) |
| Isi konten | `04-konten-dan-cms.md` |
| Testing | `05-qa-dan-acceptance.md` |

**Aturan wajib yang selalu disertakan dalam prompt:**

```
Aturan non-negosiasi:
- Warna UI hanya: #000000, #1A1A1A, #FFFFFF, #F0F2F5, #00A3BF,
  plus netral abu: border #E1E4E8, text-secondary #4D4D4D.
- Dilarang: hijau, emas/gold, krem/beige, gradien.
- Jangan hardcode tarif, jam operasional, nomor kontak. Semua dari API/CMS.
- Teks teal kecil di atas putih dilarang (kontras kurang).
- Tidak ada absolute positioning untuk struktur konten utama.
- Semua gambar punya alt text. Target sentuh minimal 44x44 px.
```
