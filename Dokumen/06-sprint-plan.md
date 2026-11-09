# 06 — Rencana Sprint

**Developer:** 1 orang (solo, AI-assisted) · **Stack:** Laravel + Filament, Next.js + Tailwind
**Target:** MVP live dalam **±13 minggu**, demo fungsional di **akhir minggu 7**.
**Kapasitas asumsi:** 25–30 jam/minggu → ±50–60 jam per sprint 2 minggu. Sisakan **±20% buffer** (sudah dihitung di bawah). Jika jam kerja Anda berbeda, skala durasinya.

> Estimasi jam adalah perkiraan saya, bukan angka baku. Ukur kecepatan Anda di Sprint 1, lalu sesuaikan Sprint 2 s.d. 6.

---

## 1. Peta Waktu

```
Minggu:   1    2  3    4  5    6  7    8  9    10 11   12 13
         ┌────┐┌──────┐┌──────┐┌──────┐┌──────┐┌──────┐┌──────┐
         │ S0 ││  S1  ││  S2  ││  S3  ││  S4  ││  S5  ││  S6  │
         └────┘└──────┘└──────┘└──────┘└──────┘└──────┘└──────┘
Fokus:   Fondasi Backend  Frontend Home 1    Home 2    Polish   QA &
         & diskusi  CMS    fondasi  (demo)   + data    i18n/SEO  Launch
                                     ▲
                              DEMO ke pembimbing (akhir minggu 7)

Paralel (sepanjang proyek): "Jalur konten" → tarif, jam, WA, foto, izin
```

| Sprint | Minggu | Tema | Output utama |
|---|---|---|---|
| **S0** | 1 | Persiapan | Repo, Figma dirapikan (minimal), daftar pertanyaan terkirim, hosting dipilih |
| **S1** | 2–3 | Backend + CMS | Laravel + Filament, model, seeder, API `/home` |
| **S2** | 4–5 | Frontend fondasi | Next.js, token, komponen dasar, header/footer, i18n routing |
| **S3** | 6–7 | Homepage bagian 1 → **DEMO** | Hero, Intro, At a Glance, Daya Tarik terhubung CMS |
| **S4** | 8–9 | Homepage bagian 2 | Aktivitas, Timeline, Info Kunjungan + tarif, CTA, analytics |
| **S5** | 10–11 | Kualitas | i18n penuh, SEO, redirect, performa, aksesibilitas, audit warna |
| **S6** | 12–13 | QA dan Launch | QA, UAT, konten final, deploy, serah-terima |

Setelah launch: **Fase Berikutnya** (§9).

---

## 2. Jalur Konten (berjalan paralel, bukan sprint)

Ini risiko jadwal terbesar karena bergantung pada orang lain. Jalankan sejak **hari pertama**.

| ID | Tugas | Mulai | Tenggat internal | Pemilik | Tergantung |
|---|---|---|---|---|---|
| K-01 | Kirim daftar pertanyaan wajib ke pembimbing (lihat `00-README.md` §5) | Minggu 1, hari 1 | Minggu 1 | Anda | — |
| K-02 | Dapatkan konfirmasi tarif tertulis | M1 | **M8** | Pengelola via pembimbing | K-01 |
| K-03 | Nomor WhatsApp + media sosial resmi | M1 | **M6** | Pengelola | K-01 |
| K-04 | Jam operasional layanan | M1 | **M8** | Pengelola | K-01 |
| K-05 | Foto resmi / izin memotret | M1 | **M6** | Pengelola | K-01 |
| K-06 | Keputusan redaksi geologi (umur, istilah) | M4 | **M9** | Pembimbing/pengelola | `04` §6 |
| K-07 | Persetujuan redaksi draft copy ID/EN | M7 (setelah demo) | **M10** | Pembimbing | Demo |
| K-08 | Inventaris URL website lama | M3 | M5 | Anda | akses website lama |
| K-09 | Persetujuan pemakaian domain/hosting | M2 | **M5** | Owner via pembimbing | — |

**Aturan fallback:** jika K-02/K-04 belum ada di minggu 10, **launch dengan teks "Konfirmasi tarif/jam"** (sudah didukung desain). Jangan menunda launch karena itu.

---

## 3. Sprint 0 — Persiapan (Minggu 1) · ±25 jam

**Goal:** Semua yang menghambat dihilangkan sebelum coding dimulai.

| ID | Tiket | Est. | Acceptance |
|---|---|---|---|
| S0-01 | Kirim pertanyaan wajib ke pembimbing (K-01) | 1 j | Pesan terkirim; tanggal respons yang diharapkan dicatat |
| S0-02 | Setup repo (backend, frontend), GitHub, branch `main`/`develop`, `.gitignore`, README | 2 j | Repo dapat di-clone dan dijalankan |
| S0-03 | Rapikan Figma: halaman Tokens (variabel warna, tipografi, spasi) | 4 j | Hanya 5 warna + 2 netral |
| S0-04 | Figma: Button, Header (desktop + mobile), Attraction Card | 5 j | State default/hover/focus lengkap |
| S0-05 | Figma: Hero desktop dan mobile | 3 j | Mengikuti `02` §8.1 |
| S0-06 | Hapus layer/warna lama (hijau, gold, krem) di Figma | 1 j | Audit visual bersih |
| S0-07 | Pilih opsi hosting (A/B di `03` §11), tanyakan batas anggaran | 2 j | Keputusan tercatat |
| S0-08 | Siapkan folder foto placeholder + sumber lisensi bebas bila perlu | 2 j | Daftar bidikan `04` §7 diadaptasi |
| S0-09 | Susun "prompt kit" AI: aturan non-negosiasi + konteks proyek | 2 j | File `AI_RULES.md` di repo |
| S0-10 | Setup CI dasar (lint) + ekstensi/pre-commit | 2 j | CI hijau |

**Definition of Done S0:** pertanyaan terkirim, tokens Figma siap, repo hidup, hosting diputuskan.

---

## 4. Sprint 1 — Backend + CMS (Minggu 2–3) · ±55 jam

**Goal:** Editor bisa mengisi seluruh konten homepage lewat admin, dan API `/home` mengembalikannya.

| ID | Tiket | Est. | Acceptance |
|---|---|---|---|
| S1-01 | Install Laravel 11, Filament 3, konfigurasi DB, `.env.example` | 3 j | Panel login berfungsi |
| S1-02 | Instal `spatie/laravel-translatable`, `medialibrary`, plugin Filament terkait | 3 j | Field ID/EN tampil sebagai tab |
| S1-03 | Migrasi + model: `site_settings`, `hero`, `sections`, `metrics` | 5 j | Migrasi jalan; soft delete |
| S1-04 | Migrasi + model: `attractions`, `activities`, `timeline_events` | 5 j | |
| S1-05 | Migrasi + model: `visit_info`, `opening_hours`, `ticket_prices` | 5 j | Field verifikasi lengkap |
| S1-06 | Filament Resource untuk semua model + label Indonesia + helper text | 10 j | Editor non-teknis bisa mengisi tanpa petunjuk |
| S1-07 | Validasi media: kredit dan izin wajib sebelum publish | 3 j | QA-33 |
| S1-08 | `TicketVisibilityService` + **tes unit** (verified/pending/expired) | 5 j | QA-10, 19, 20 lulus |
| S1-09 | API Resource + endpoint `GET /api/v1/home`, `/settings`, `/visit` + cache + CORS + throttle | 6 j | Respons sesuai `03` §5; hanya `published` |
| S1-10 | Seeder: konten draft ID/EN dari `04` §5, tarif seed `pending_confirmation` | 4 j | `migrate:fresh --seed` menghasilkan homepage lengkap |
| S1-11 | Peran dan kebijakan (`admin`, `editor`), audit log tarif/jam/kontak. **+3–4 j jika dipilih dua panel login** (`03` §10.1) | 5 j (+3–4) | QA-31, 32 |
| S1-12 | Deploy backend ke staging | 3 j | URL staging dapat diakses via HTTPS |
| *Buffer* | | ±8 j | |

**Risiko S1:** terjemahan field JSON di Filament; tarif/logika verifikasi. Mulai dari S1-08 (paling penting) bila waktu mepet.

**DoD S1:** admin staging bisa diisi; `GET /home` valid; tes tarif hijau.

---

## 5. Sprint 2 — Frontend Fondasi (Minggu 4–5) · ±55 jam

**Goal:** Kerangka Next.js dengan design system terkunci, header/footer, i18n, siap menerima section.

| ID | Tiket | Est. | Acceptance |
|---|---|---|---|
| S2-01 | Next.js (App Router, TypeScript) + Tailwind palet terkunci + `tokens.css` | 4 j | `bg-green-500` tidak valid; token tersedia |
| S2-02 | `next/font` Playfair + DM Sans, skala tipografi fluid | 3 j | QA-18 |
| S2-03 | `next-intl`: routing `/id`, `/en`, pesan UI, cookie bahasa | 5 j | QA-16 |
| S2-04 | API client + tipe TypeScript dari kontrak API, ISR + tag | 5 j | Homepage render dari API staging |
| S2-05 | Komponen: Button (4 state), Badge, SectionHeading, Container | 6 j | `02` §5.1, 5.6, 5.9 |
| S2-06 | Komponen: Card dasar (Attraction/Activity) dengan 4 state | 5 j | QA-04 |
| S2-07 | Header desktop + drawer mobile (fokus terkunci, Esc, aria) | 8 j | QA-01, 02 |
| S2-08 | Language switch + event `language_switch` (stub analytics) | 3 j | |
| S2-09 | Footer desktop/mobile | 3 j | FR-10 |
| S2-10 | Skip-link, landmark, fokus global, `prefers-reduced-motion` | 3 j | |
| S2-11 | Endpoint revalidate + webhook Laravel→Next, queue retry | 5 j | QA-29, 34 |
| S2-12 | Playwright: tes overflow 320 px + audit warna (pendekatan 2 `05` §3) di CI | 4 j | CI hijau |
| S2-13 | Deploy frontend ke staging, hubungkan ke backend staging | 3 j | Staging dua-sisi hidup |
| *Buffer* | | ±8 j | |

**DoD S2:** halaman kosong berbahasa ID/EN dengan header/footer, komponen terdokumentasi, CI memeriksa warna dan overflow.

---

## 6. Sprint 3 — Homepage Bagian 1 → DEMO (Minggu 6–7) · ±55 jam

**Goal:** Bagian atas homepage nyata dan terhubung CMS; demo ke pembimbing di akhir sprint.

| ID | Tiket | Est. | Acceptance |
|---|---|---|---|
| S3-01 | Section Hero (focal point per breakpoint, overlay, CTA, LCP) | 8 j | FR-02; QA-03 |
| S3-02 | Section Intro | 5 j | FR-03 |
| S3-03 | Section At a Glance + Metric Card (hanya metrik `published`) | 5 j | FR-04; QA-23 |
| S3-04 | Section Daya Tarik (3 kartu, grid fluid) | 6 j | FR-05; QA-05 |
| S3-05 | Section Closing CTA | 3 j | FR-09 |
| S3-06 | Pipeline gambar: konversi AVIF/WebP, `srcset`, placeholder "Foto menyusul" | 6 j | CLS ≤ 0,1 |
| S3-07 | Pemeriksaan responsif 320–1440 px untuk semua section | 6 j | Checklist `05` §4 |
| S3-08 | Isi CMS dengan konten draft nyata + foto sementara (bertanda) | 4 j | Homepage tampak utuh |
| S3-09 | Bug fixing dan polish | 4 j | |
| S3-10 | **Siapkan demo:** staging stabil, skrip demo 10 menit, daftar keputusan yang perlu disetujui | 3 j | Demo dilakukan |
| *Buffer* | | ±6 j | |

**Keputusan yang diminta dari pembimbing saat demo:** arah visual, redaksi hero, struktur navigasi, daftar kekurangan konten (K-02..K-05), persetujuan bahasa Inggris dasar.

**DoD S3:** demo dilakukan; umpan balik dicatat sebagai tiket di backlog S4–S5.

---

## 7. Sprint 4 — Homepage Bagian 2 + Data Operasional (Minggu 8–9) · ±55 jam

**Goal:** Semua 10 section hidup, data operasional dengan aturan verifikasi, analytics siap.

| ID | Tiket | Est. | Acceptance |
|---|---|---|---|
| S4-01 | Section Aktivitas + status badge + tombol WhatsApp | 6 j | FR-06; QA-22 |
| S4-02 | Section Heritage Timeline (vertikal, titik teal, sumber) | 6 j | FR-07 |
| S4-03 | Section Plan Your Visit: Visit Info Panel | 6 j | FR-08 |
| S4-04 | Ticket Table (verified 1/2 kolom, pending, expired; mobile berbentuk kartu) | 7 j | QA-10, 19, 20 |
| S4-05 | Opening hours + status verifikasi + label "Terakhir diverifikasi" | 4 j | |
| S4-06 | Tautan peta/petunjuk arah, uji koordinat di perangkat nyata | 3 j | QA-11 |
| S4-07 | Tautan WhatsApp dengan pesan awal per bahasa | 2 j | QA-21 |
| S4-08 | Analytics: consent banner, wrapper event, 12 event `01` §7 | 8 j | QA-14, 27 |
| S4-09 | Halaman Informasi Kunjungan + Kebijakan Privasi (ID/EN) | 5 j | FR-17 |
| S4-10 | Guard build produksi (tidak ada placeholder/kontak kosong) | 3 j | QA-24 |
| S4-11 | Perbaikan dari umpan balik demo | 5 j | |
| *Buffer* | | ±6 j | |

**DoD S4:** 10 section lengkap, tarif mengikuti aturan, analytics mengikuti consent.

**Titik keputusan (minggu 9):** jika K-02/K-04 belum ada, aktifkan rencana fallback (teks "Konfirmasi").

---

## 8. Sprint 5 — Kualitas (Minggu 10–11) · ±55 jam

**Goal:** i18n penuh, SEO, redirect, performa, aksesibilitas, warna bersih.

| ID | Tiket | Est. | Acceptance |
|---|---|---|---|
| S5-01 | Lengkapi terjemahan EN seluruh konten dan UI; indikator "EN belum diisi" di admin | 6 j | QA-30 |
| S5-02 | SEO: metadata, OG, canonical, hreflang, sitemap, robots, JSON-LD (bila disetujui) | 7 j | `03` §8 |
| S5-03 | Redirect website lama (peta dari K-08), uji satu per satu | 5 j | QA-25 |
| S5-04 | Optimasi performa: LCP hero, ukuran JS, font, lazy | 8 j | QA-26 |
| S5-05 | Aksesibilitas: axe, keyboard, kontras, satu screen reader | 8 j | QA-13 |
| S5-06 | Audit warna menyeluruh (kode + computed + visual), tangani temuan | 4 j | QA-06..09 |
| S5-07 | Uji lintas browser dan perangkat nyata (iOS Safari, Android) | 6 j | |
| S5-08 | Header keamanan, 2FA admin (opsional), backup terjadwal | 4 j | `03` §10 |
| S5-09 | Panduan editor (1–2 halaman) + video layar pendek | 3 j | |
| *Buffer* | | ±6 j | |

**DoD S5:** laporan Lighthouse + axe tersimpan; tidak ada P0/P1 yang diketahui.

---

## 9. Sprint 6 — QA, UAT, Launch (Minggu 12–13) · ±55 jam

**Goal:** Website live, aman, terdokumentasi, bisa dikelola.

| ID | Tiket | Est. | Acceptance |
|---|---|---|---|
| S6-01 | Regresi penuh matriks QA `05` §2 | 8 j | Hasil terdokumentasi |
| S6-02 | UAT dengan pembimbing/pengelola; satu editor non-teknis mencoba CMS | 6 j | Catatan dan perbaikan |
| S6-03 | Perbaikan bug P0/P1 | 10 j | Nol terbuka |
| S6-04 | Finalisasi konten (tarif, jam, WA, foto, redaksi geologi) sesuai K-02..K-07 | 6 j | Checklist `04` §8 |
| S6-05 | Hapus semua placeholder; pastikan izin foto tercatat | 3 j | QA-24 |
| S6-06 | Produksi: server, DNS, HTTPS, env, backup, monitor, Sentry | 6 j | `05` §9 |
| S6-07 | **Cutover** (rencana `03` §11), uji redirect produksi, Search Console | 4 j | Website live |
| S6-08 | Hari-H dan pemantauan 48 jam; perbaikan cepat | 4 j | |
| S6-09 | Serah-terima: akun, panduan, dokumen arsitektur, daftar kredensial aman | 4 j | |
| *Buffer* | | ±4 j | |

**DoD S6 = DoD MVP** (`05` §8).

---

## 10. Backlog Pasca-MVP (Fase Berikutnya)

Urutan usulan; estimasi kasar 6–10 minggu kerja Anda.

| Prioritas | Item | Kira-kira |
|---|---|---|
| 1 | Halaman detail Daya Tarik dan Aktivitas | 2 minggu |
| 2 | Galeri berkategori + lightbox | 1–1,5 minggu |
| 3 | Berita dan agenda | 1–1,5 minggu |
| 4 | Halaman Watu Tapak, Balkondes, Venue | 1,5 minggu |
| 5 | Peta interaktif | 1 minggu |
| 6 | Pencarian | 1 minggu |
| 7 | Integrasi reservasi/booking (hanya setelah sistem sumber jelas) | Terpisah, belum diestimasi |

---

## 11. Ritual Mingguan (ringan, untuk solo)

- **Senin (30 mnt):** pilih tiket minggu ini; periksa jalur konten (K-xx); kirim pengingat ke pembimbing bila macet.
- **Harian (5 mnt):** catat progres dan hambatan di file `PROGRESS.md`.
- **Jumat (45 mnt):** review diri sendiri, jalankan CI + audit warna + Lighthouse, deploy ke staging, perbarui burndown.
- **Akhir sprint (1 jam):** demo singkat/rekaman layar ke pembimbing; retrospektif (apa yang lambat, apa yang diperbaiki).

**Papan Kanban sederhana (GitHub Projects / Trello):** `Backlog → Sprint → Doing (maks. 2) → Review → Done`.

---

## 12. Metrik Kemajuan

| Metrik | Cara ukur | Sehat bila |
|---|---|---|
| Velocity | Jam tiket selesai / jam direncanakan | 0,8–1,1 |
| Jalur konten | Jumlah K-xx selesai | Sesuai tenggat di §2 |
| Bug P0/P1 terbuka | Hitung di papan | Menurun mulai S5 |
| Cakupan tes kunci | Tes tarif + e2e warna/overflow ada | Ada sejak S2 |
| Lighthouse mobile | Laporan mingguan | Naik menuju target |

---

## 13. Risiko dan Rencana Cadangan

| Risiko | Kemungkinan | Dampak | Respons |
|---|---|---|---|
| Pengelola lambat membalas | Tinggi | Tinggi | Fallback "Konfirmasi tarif/jam"; launch tidak menunggu |
| Foto resmi tidak ada | Tinggi | Sedang | Foto sendiri atau lisensi bebas; tunda launch hanya bila hero tidak layak |
| Waktu kerja Anda berkurang (kuliah/tugas) | Sedang | Tinggi | Pangkas dari akhir: S5-07, S5-08 sebagian; pertahankan QA tarif dan warna |
| AI menghasilkan kode rusak/ber-warna salah | Tinggi | Sedang | CI audit warna, tes tarif, review manual, commit kecil |
| Hosting tidak cocok | Sedang | Sedang | Opsi A/B; putuskan di minggu 1–2 |
| Perubahan scope (booking engine, fitur baru) | Sedang | Tinggi | Tolak masuk MVP; catat di backlog pasca-MVP |
| Keputusan redaksi geologi menggantung | Sedang | Rendah | Metrik umur tetap `draft`; launch tanpa metrik itu |
| Webhook revalidate gagal | Rendah | Sedang | ISR berkala + queue retry |

**Jika harus memangkas (urutan pemotongan):**
1. Embed peta (sudah tautan saja)
2. 2FA admin dan video panduan
3. JSON-LD
4. Animasi hover halus
5. **Jangan dipotong:** aturan tarif, audit warna, aksesibilitas dasar, consent analytics, redirect, guard placeholder.

---

## 14. Skenario Waktu

| Skenario | Durasi | Syarat |
|---|---|---|
| **Cepat** | ±10 minggu | 35+ jam/minggu, konten datang lebih awal, foto tersedia, EN dasar sederhana |
| **Realistis** | ±13 minggu | 25–30 jam/minggu, plan di atas |
| **Konservatif** | ±16–18 minggu | <20 jam/minggu, konten terlambat, banyak revisi |

---

## 15. Template Prompt untuk Tiket (vibe coding)

```
Konteks proyek: Website destinasi Tebing Breksi. Stack: Next.js (App Router, TS),
Tailwind palet terkunci, next-intl; backend Laravel + Filament.

Tugas: [ID dan judul tiket, mis. S3-01 Hero]

Acuan: lampirkan bagian relevan dari 01/02/03/04.

Aturan wajib:
- Warna hanya token di 02-desain-ui-ux.md §2.
- Tidak boleh hardcode tarif/jam/kontak; ambil dari API.
- Semua teks dari i18n/CMS (ID & EN).
- Aksesibel: fokus terlihat, target sentuh ≥ 44 px, alt text, landmark.
- Tidak ada absolute positioning untuk struktur utama.
- Tulis juga tes yang relevan (Playwright atau Pest).

Keluaran: kode + penjelasan singkat + cara mengujinya + daftar asumsi.
```
