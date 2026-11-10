# 07 — Rencana Kerja Harian (versi vibe coding, padat)

Versi ini menggantikan jadwal harian sebelumnya. Satu hari berisi **satu paket hasil utuh** (misalnya "semua tabel + model + seeder"), bukan satu tiket kecil. Targetnya **±8 minggu (40 hari kerja)**, dengan demo di **akhir minggu 3**.

**Asumsi:** Senin-Jumat, ±5-6 jam per hari. Estimasi saya, bukan angka baku. Kecepatan sebenarnya baru terlihat setelah 3-4 hari pertama, jadi sesuaikan di situ.

## Yang dipercepat dan yang tidak

| Dipercepat vibe coding | Tidak bisa dipercepat |
|---|---|
| Scaffold backend (migrasi, model, Filament Resource, API) | Menunggu tarif, jam, WhatsApp, foto dari pengelola |
| Komponen UI dan section dari spesifikasi `02` | Debugging keluaran AI yang tampak benar tapi salah |
| Boilerplate i18n, SEO, analytics, tes | Uji di perangkat nyata (iOS Safari, Android) |
| Konversi desain ke kode | Uji aksesibilitas manual dan screen reader |
| | Persetujuan redaksi dan UAT |

Karena itu jadwal padat di minggu 1-3 (membangun), lalu melambat di minggu 4-8 (kualitas dan menunggu orang lain).

## Pola kerja per hari (wajib, supaya cepat tapi tidak rusak)

1. **Awal (15 mnt):** `git pull`, baca target hari ini, cek balasan pembimbing.
2. **Sesi AI per paket:** lampirkan dokumen yang relevan (lihat `00-README.md` §6) + aturan non-negosiasi. Minta kode **dan tes**.
3. **Cek manual wajib setelah tiap paket (20-30 mnt):** jalankan, buka di lebar 320 dan 1440, periksa warna, baca diff. Jangan menggabungkan kode yang belum Anda baca.
4. **Commit per paket** (`feat: ...`). Cabang per hari bila perlu.
5. **Akhir (10 mnt):** 3 baris di `PROGRESS.md`: selesai / macet / besok.

**Aturan macet:** satu masalah > 60 menit → catat, lompat ke paket lain, kembali besok.

---

## Minggu 1 — Backend jadi, desain dasar siap

### Hari 1 (Senin): Fondasi
- Kirim pertanyaan wajib ke pembimbing (K-01) · tanya anggaran/hosting (K-09)
- Repo backend + frontend, GitHub, `.gitignore`, `AI_RULES.md`
- Install Laravel 11 + Filament 3 + `spatie/laravel-translatable` + `medialibrary` + plugin Filament
- Figma: halaman Tokens (variabel warna, tipografi, spasi) dari `02` §2
- **Cara AI:** satu sesi untuk instalasi dan konfigurasi dua bahasa.
- **Cek manual:** login panel, tab ID/EN muncul.
- **Selesai bila:** panel Filament terbuka, Figma Variables hanya 5 warna + 2 abu.

### Hari 2 (Selasa): Seluruh model data
- Semua migrasi dan model sekaligus: `site_settings`, `hero`, `sections`, `metrics`, `attractions`, `activities`, `timeline_events`, `visit_info`, `opening_hours`, `ticket_prices`, `redirects`, `audit_logs`
- Seeder konten draft ID/EN dari `04` §5; tarif seed `pending_confirmation`
- Figma: Button, Header (desktop/mobile), Attraction Card
- **Cara AI:** berikan §4 dari `03` dan minta migrasi + model + seeder dalam satu kali.
- **Cek manual:** `migrate:fresh --seed` tanpa error; periksa tipe kolom JSON terjemahan.
- **Selesai bila:** database terisi homepage lengkap.

### Hari 3 (Rabu): Seluruh admin panel + aturan tarif
- Semua Filament Resource (±11) dengan label Indonesia, helper text, tab ID/EN
- Validasi media: kredit dan izin wajib sebelum publish
- `TicketVisibilityService` + tes unit (verified / pending / expired / `effective_until` lewat)
- **Putuskan:** satu panel atau dua panel login (`03` §10.1), lalu terapkan peran
- **Cek manual:** isi satu entri tiap resource lewat admin seperti editor awam.
- **Selesai bila:** tes tarif hijau; editor tidak melihat menu tarif/kontak.

### Hari 4 (Kamis): API + deploy backend
- Endpoint `/home`, `/settings`, `/visit`, `/redirects` + API Resource, cache, CORS, throttle
- Observer: bersihkan cache + audit log tarif/jam/kontak
- Deploy backend ke staging (HTTPS)
- Figma: Hero desktop dan mobile
- **Cek manual:** buka `/api/v1/home` di browser; pastikan tarif tidak bocor saat pending, dan hanya konten `published` tampil.
- **Selesai bila:** staging backend dapat diakses, JSON sesuai `03` §5.

### Hari 5 (Jumat): Frontend dimulai
- Next.js (App Router, TS) + Tailwind palet terkunci + `tokens.css` + `next/font`
- `next-intl`: `/id`, `/en`, cookie bahasa, pesan UI
- API client + tipe TypeScript + ISR + tag; endpoint revalidate + webhook Laravel→Next
- Ritual Jumat: review diri, audit warna awal
- **Cek manual:** ubah judul di admin → muncul di frontend ≤ 60 dtk.
- **Selesai bila:** halaman `/id` dan `/en` render data dari API staging.

---

## Minggu 2 — Seluruh homepage

### Hari 6 (Senin): Komponen inti
- Button (4 state), Badge, SectionHeading, Container, Card (Attraction/Activity), Metric Card
- Header desktop + drawer mobile (fokus terkunci, Esc, aria), Language Switch, Footer
- Skip-link, landmark, fokus global, `prefers-reduced-motion`
- **Cek manual:** keyboard saja (Tab/Enter/Esc) di header dan drawer.
- **Selesai bila:** layout kosong ID/EN lengkap dengan header dan footer.

### Hari 7 (Selasa): CI kualitas + section atas
- Playwright: tes overflow 320 px + audit warna computed + switch bahasa (jalan di CI)
- Hero (overlay, focal point, CTA, LCP) + Intro + At a Glance (hanya metrik `published`)
- **Cek manual:** hero di 320, 390, 1440 px; teks tetap berkontras.
- **Selesai bila:** tiga section atas live di staging dan CI hijau.

### Hari 8 (Rabu): Section tengah
- Daya Tarik (grid fluid 3 kartu) + Aktivitas (status badge, tombol WhatsApp)
- Pipeline gambar: konversi AVIF/WebP, `srcset`, placeholder "Foto menyusul", aspect-ratio
- Closing CTA (versi putih di atas Light Gray sesuai `02` §8.8)
- **Cek manual:** ubah status aktivitas jadi `inactive` / `unverified` / `seasonal` dan lihat hasilnya.
- **Selesai bila:** QA-04, 05, 22 lulus.

### Hari 9 (Kamis): Section data operasional
- Heritage Timeline (vertikal, sumber per entri)
- Plan Your Visit: Visit Info Panel + Opening Hours + label "Terakhir diverifikasi"
- Ticket Table: verified 1 kolom / 2 kolom, pending ("Konfirmasi tarif terbaru"), expired; mobile berbentuk kartu
- Tautan Google Maps + WhatsApp dengan pesan awal per bahasa
- **Cek manual:** **buka tautan peta dan WhatsApp di HP nyata.** Cocokkan koordinat dengan lokasi sebenarnya.
- **Selesai bila:** QA-10, 11, 19, 20, 21 lulus.

### Hari 10 (Jumat): Konsolidasi
- Responsif menyeluruh 320-1440 px di semua 10 section; perbaiki overflow dan tumpang tindih
- Isi CMS dengan konten dan foto sementara (bertanda placeholder)
- Deploy staging; ritual Jumat
- **Selesai bila:** homepage utuh di staging, tanpa scroll horizontal di 320 px.

---

## Minggu 3 — Fitur penutup dan DEMO

### Hari 11 (Senin): Analytics dan halaman pendukung
- Consent banner + wrapper event + 12 event (`01` §7), tanpa request sebelum consent
- Halaman Informasi Kunjungan, Kebijakan Privasi (ID/EN), 404
- **Cek manual:** tolak consent → tidak ada request analytics di tab Network.
- **Selesai bila:** QA-14, 27 lulus.

### Hari 12 (Selasa): Bahasa Inggris dan guard produksi
- Seluruh terjemahan EN (UI + konten), indikator "EN belum diisi" di admin, fallback bertanda
- Guard build produksi: gagal bila kontak/maps/alamat/hero kosong atau placeholder
- **Cek manual:** baca ulang semua teks EN; jangan terima terjemahan mentah.
- **Selesai bila:** QA-16, 24, 30 lulus.

### Hari 13 (Rabu): Polish dan siapkan demo
- Perbaikan bug dari uji sendiri; kerapian jarak, tipografi, state hover/focus
- Staging stabil, skrip demo 10 menit, daftar keputusan yang diminta
- **Selesai bila:** Anda bisa menjalankan demo tanpa kejutan.

### Hari 14 (Kamis): DEMO ke pembimbing
- Demo dan catat semua umpan balik secara tertulis
- Minta keputusan: arah visual, redaksi hero, navigasi, kekurangan konten, bahasa Inggris
- **Selesai bila:** daftar umpan balik tersimpan.

### Hari 15 (Jumat): Triase umpan balik
- Ubah umpan balik jadi tiket (P0/P1/P2); kerjakan yang cepat
- Kejar K-02 (tarif), K-03 (WhatsApp), K-04 (jam), K-05 (foto)
- **Selesai bila:** backlog minggu 4-5 jelas.

---

## Minggu 4 — Kualitas teknis

### Hari 16 (Senin): SEO
- Metadata, OG, canonical, hreflang, sitemap, robots, JSON-LD (hanya jika data disetujui)
- **Selesai bila:** sumber halaman menampilkan satu H1, meta unik, hreflang benar.

### Hari 17 (Selasa): Redirect website lama
- Inventaris URL lama (K-08) → isi tabel `redirects` → implementasi → uji satu per satu
- **Cek manual:** tidak ada rantai redirect; formulir reservasi lama menuju Informasi Kunjungan.
- **Selesai bila:** QA-25 lulus.

### Hari 18 (Rabu): Performa
- Optimasi LCP hero, ukuran JS, font, lazy loading; Lighthouse CI di pull request
- **Selesai bila:** LCP ≤ 2,5 dtk di Lighthouse mobile (Slow 4G), CLS ≤ 0,1.

### Hari 19 (Kamis): Aksesibilitas
- axe di Playwright, uji keyboard menyeluruh, kontras, satu uji screen reader (NVDA/VoiceOver/TalkBack)
- **Cek manual:** alat otomatis hanya menangkap sebagian masalah.
- **Selesai bila:** nol pelanggaran serious/critical; QA-13 lulus.

### Hari 20 (Jumat): Warna, perangkat nyata, keamanan
- Audit warna 3 pendekatan (`05` §3); tangani temuan
- Uji iOS Safari dan Android Chrome nyata; lintas browser
- Header keamanan, backup terjadwal, 2FA admin (opsional)
- **Selesai bila:** QA-06 s.d. 09 lulus dan tidak ada bug P0/P1 yang diketahui.

---

## Minggu 5 — Umpan balik, CMS, QA tahap 1

### Hari 21 (Senin): Umpan balik demo (batch 1)
- Kerjakan semua tiket P0/P1 dari demo
### Hari 22 (Selasa): Umpan balik (batch 2) + konten asli
- Masukkan konten asli yang sudah datang (tarif, jam, WhatsApp, foto, izin foto)
- Jika tarif sudah dikonfirmasi: ubah status `verified`, isi `verified_by`, `effective_from`
### Hari 23 (Rabu): Kesiapan editor
- Panduan editor 1-2 halaman + video layar pendek
- Uji CMS dengan satu orang non-teknis (jangan Anda yang mengarahkan)
- **Selesai bila:** ia bisa mengubah teks, foto, dan status tanpa bantuan.
### Hari 24 (Kamis): QA regresi bagian 1
- Jalankan matriks `05` §2: navigasi, warna, konten, tarif
### Hari 25 (Jumat): QA regresi bagian 2
- Aksesibilitas, performa, analytics, CMS; perbaiki P0/P1; ritual Jumat

---

## Minggu 6 — UAT dan penyiapan produksi

### Hari 26 (Senin): Perbaikan hasil QA
### Hari 27 (Selasa): UAT dengan pembimbing/pengelola
- Mereka mencoba website dan CMS; catat semua temuan
### Hari 28 (Rabu): Perbaikan hasil UAT
### Hari 29 (Kamis): Finalisasi konten
- Checklist `04` §8; keputusan redaksi geologi (umur) final; hapus semua placeholder; izin foto tercatat
- Jika tarif/jam belum ada: pastikan teks "Konfirmasi" tampil benar
### Hari 30 (Jumat): Lingkungan produksi
- Server, env, HTTPS, HSTS, backup, uptime monitor, Sentry; deploy ke produksi (belum dialihkan DNS)

---

## Minggu 7 — Penyangga persetujuan

Minggu ini sengaja longgar karena persetujuan tertulis sering terlambat.

### Hari 31-32 (Senin-Selasa)
- Kejar persetujuan konten dan foto secara tertulis; regresi cepat di produksi
### Hari 33-34 (Rabu-Kamis)
- Pekerjaan pasca-MVP yang aman dikerjakan sambil menunggu, urut prioritas: halaman detail Daya Tarik, galeri berkategori (`06` §10). **Jangan** dirilis bila belum disetujui.
### Hari 35 (Jumat)
- **Turunkan TTL DNS** (24 jam sebelum cutover); backup penuh website lama; uji ulang redirect di staging

---

## Minggu 8 — Launch

### Hari 36 (Senin)
- Cek akhir: `05` §9 (APP_DEBUG=false, guard produksi lolos, akun uji dihapus, rencana rollback)
### Hari 37 (Selasa): Cutover
- Alihkan DNS, verifikasi HTTPS, uji redirect produksi, daftarkan sitemap di Search Console
- **Selesai bila:** website live dan redirect jalan.
### Hari 38-39 (Rabu-Kamis): Pemantauan
- Pantau error 404, uptime, Sentry; perbaikan cepat
### Hari 40 (Jumat): Serah-terima
- Akun dan kredensial (via pengelola password), panduan editor, dokumen arsitektur, catatan backlog pasca-MVP

---

## Bila Tertinggal atau Lebih Cepat

| Situasi | Tindakan |
|---|---|
| Satu hari terlambat | Gabungkan ke hari berikutnya; pakai akhir pekan seperlunya |
| Terlambat ≥ 3 hari di minggu 1-3 | Pangkas dulu: JSON-LD, 2FA, embed peta, animasi halus |
| Lebih cepat dari rencana | Majukan SEO/aksesibilitas; mulai halaman detail lebih awal; **jangan** lompat ke booking/pembayaran |
| Konten pengelola belum datang | Jalankan fallback "Konfirmasi tarif/jam"; jangan menunda |
| Minggu 7 kosong | Boleh dipangkas; launch lebih cepat bila persetujuan sudah ada → total ±6-7 minggu |

**Jangan dipotong dalam kondisi apa pun:** aturan tarif, audit warna, aksesibilitas dasar, consent analytics, redirect, guard placeholder, uji di perangkat nyata.

## Ringkasan Jadwal

| Minggu | Fokus | Tonggak |
|---|---|---|
| 1 | Backend + desain dasar | API siap, tes tarif hijau |
| 2 | Seluruh homepage | 10 section di staging |
| 3 | Analytics, EN, polish | **Demo (hari 14)** |
| 4 | SEO, redirect, performa, aksesibilitas | Tidak ada P0/P1 yang diketahui |
| 5 | Umpan balik, CMS, QA | QA regresi lengkap |
| 6 | UAT, konten final, produksi | Produksi siap |
| 7 | Penyangga persetujuan | Konten disetujui tertulis |
| 8 | Launch | **Website live (hari 37)** |
