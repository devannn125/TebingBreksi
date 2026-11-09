# 01 — Kebutuhan Fitur

Turunan dari PRD §3, §4, §5, §8, §9, §12 dengan penyesuaian keputusan D-01 s.d. D-14 (lihat `00-README.md`).

Prioritas: **P0** = wajib MVP · **P1** = sesudah MVP · **P2** = pengembangan lanjutan.

---

## 1. Ringkasan Produk

Website resmi destinasi Tebing Breksi: pusat informasi dan perencanaan kunjungan. Bukan sistem tiket. Alur utama pengunjung:

```
Pahami destinasi → Jelajahi daya tarik & aktivitas → Cek informasi kunjungan
       → Klik "Rencanakan Kunjungan" → Petunjuk arah / WhatsApp / media sosial resmi
```

**Bahasa:** Indonesia (utama) + Inggris (MVP versi dasar).
**Platform:** Responsive web, 320 px s.d. ≥1440 px.

---

## 2. Persona dan Kebutuhan

| Persona | Kebutuhan | Info terpenting | Aksi utama |
|---|---|---|---|
| Keluarga | Kunjungan aman dan nyaman | Lokasi, fasilitas, tiket, akses | Lihat informasi kunjungan |
| Individu/pasangan | Spot visual dan pengalaman | Relief, panorama, sunset, jeep | Jelajahi daya tarik |
| Minat khusus/geologi | Nilai geologi dan konservasi | Asal batuan, umur, geoheritage | Baca cerita geologi |
| Pelajar/mahasiswa | Studi lapangan | Konteks geologi, sejarah, kontak | Hubungi pengelola |
| Komunitas/EO | Venue dan kegiatan | Tlatar Seneng, kapasitas, kontak | Tanya ketersediaan via WhatsApp |
| Mancanegara | Info ringkas bahasa mudah | Deskripsi, lokasi, fasilitas, akses | Ganti bahasa ke Inggris |

---

## 3. Scope

### 3.1 In scope — MVP
1. Homepage responsif dengan 10 section (lihat §5).
2. Header desktop + navigasi mobile (drawer).
3. Language switch **ID / EN**.
4. Informasi kunjungan (lokasi, tarif dengan status verifikasi, jam, fasilitas, kontak).
5. CTA ke WhatsApp / media sosial resmi / petunjuk arah.
6. Admin panel (Filament) untuk seluruh konten dinamis, termasuk tarif dan tanggal verifikasi.
7. SEO dasar, analytics dasar dengan consent, aksesibilitas, optimasi performa.
8. Halaman minimal: Homepage, Informasi Kunjungan, Kebijakan Privasi, 404.
9. Redirect URL dari website lama.

### 3.2 Fase berikutnya (setelah MVP)
Halaman detail daya tarik/aktivitas, galeri berkategori, halaman Watu Tapak/Balkondes/venue, berita dan agenda, peta interaktif, pencarian.

### 3.3 Out of scope
Pembayaran tiket, kapasitas real-time, booking engine, review/UGC, marketplace, akun pengguna, loyalty/membership.

### 3.4 Batasan produk: website informasi saja

Website **tidak** memproses transaksi apa pun. Konsekuensinya:

| Hal | Di website |
|---|---|
| Tarif tiket | Informasi saja, tampil setelah diverifikasi |
| Reservasi jeep, camping, venue | Lewat WhatsApp / kontak resmi |
| Pembayaran | Tidak ada; ditangani pengelola di luar website |
| Kalkulator / estimasi total biaya | Tidak ada di MVP (jika diminta, masuk backlog) |
| Formulir dan data pengunjung | Tidak ada, tidak ada data pribadi tersimpan |
| Biaya jeep/camping/venue | Tampil hanya bila terverifikasi; default "hubungi untuk harga" |

### 3.5 Alur "Rencanakan Kunjungan"

```
Klik "Rencanakan Kunjungan"
        ↓
Bagian / halaman Informasi Kunjungan
(alamat, jam, tarif, fasilitas, kontak)
        ↓
   ┌────┴─────────────┐
   ↓                  ↓
Petunjuk Arah     Hubungi via WhatsApp
(Google Maps)     (wa.me + pesan awal sesuai bahasa)
```

| Kebutuhan pengunjung | Output |
|---|---|
| Menuju lokasi | Google Maps |
| Bertanya, memesan jeep/camping/venue, konfirmasi tarif | WhatsApp pengelola |
| Mengikuti kabar | Media sosial resmi (footer) |
| Hanya mencari informasi | Cukup membaca website |

### 3.6 Peran pengguna

**Pengunjung** (persona di §2) tidak login; MVP tidak punya akun pengguna.
**Pengelola konten (CMS):** `admin` (semua akses, termasuk tarif, kontak, pengguna, audit log), `editor` (konten: hero, daya tarik, aktivitas, timeline, foto), `verifier` opsional (hanya status verifikasi tarif/jam). Peran adalah usulan, bukan bagian PRD.

---

## 4. Functional Requirements

### FR-01 Global Navigation — P0
**Kebutuhan:** Navigasi desktop dan mobile.
**Item menu:** Beranda · Tentang · Daya Tarik · Aktivitas · Informasi Kunjungan · CTA "Rencanakan Kunjungan" · Switch bahasa.

**User story:** Sebagai pengunjung, saya ingin menu yang jelas agar bisa langsung ke bagian yang saya cari.

**Acceptance criteria**
- [ ] Semua item mengarah ke target benar (anchor pada homepage atau halaman terpisah).
- [ ] Menu mobile berupa drawer/dropdown, bukan menu desktop yang dipadatkan.
- [ ] Buka/tutup menu bisa dengan sentuhan **dan** keyboard (Enter/Space/Esc).
- [ ] Item aktif punya penanda yang tidak hanya bergantung pada warna (misalnya underline).
- [ ] Focus ring terlihat; fokus terkunci dalam drawer saat terbuka dan kembali ke tombol saat ditutup.
- [ ] Header sticky hanya jika tidak mengurangi viewport secara berlebihan (tinggi ≤ 72 px desktop, ≤ 64 px mobile).

### FR-02 Hero — P0
**Konten:** eyebrow, headline, deskripsi, foto, CTA utama dan sekunder (semua dari CMS, dua bahasa).

**Acceptance criteria**
- [ ] CTA utama terlihat tanpa scroll pada desktop umum (1366×768) dan mobile 390×844.
- [ ] Headline tidak terpotong pada 320 px.
- [ ] Teks berkontras ≥ 4,5:1 terhadap area gambar (gunakan overlay Charcoal semitransparan atau panel solid; tidak boleh gradien berwarna).
- [ ] CTA utama → bagian Informasi Kunjungan. CTA sekunder → scroll ke Intro.
- [ ] Gambar hero responsif (`srcset`), memiliki focal point per breakpoint, prioritas loading tinggi (LCP).
- [ ] Tidak ada angka atau klaim tanpa verifikasi.

### FR-03 Intro / Cerita Destinasi — P0
**Acceptance criteria**
- [ ] Subheading "Lebih dari sekadar tebing" (ID) / padanan EN, narasi pendek, foto pendukung, tautan "Kenali sejarahnya" (scroll ke Heritage).
- [ ] Paragraf maksimal ±70 kata per blok, mudah dipindai.

### FR-04 At a Glance (Metric) — P0
**Acceptance criteria**
- [ ] Setiap metrik punya: nilai, unit, label, sumber, `verified_at`, urutan tampil.
- [ ] Metrik tanpa sumber **tidak tampil** (status `draft`).
- [ ] Angka teal besar (≥ 24 px) hanya untuk metrik yang dipilih; jangan semua angka.
- [ ] Metrik kapasitas Tlatar Seneng diberi label "sekitar" dan tampil hanya jika terverifikasi.

### FR-05 Attraction Cards — P0
**Kandidat:** Relief Wayang/pahatan batu · Tlatar Seneng · Panorama/sunset.

**Acceptance criteria**
- [ ] Setiap kartu: foto (rasio konsisten 4:3), badge kategori, judul, ringkasan 1–2 kalimat, tautan.
- [ ] Seluruh area kartu dapat diklik bila memiliki tautan (satu elemen `<a>`, bukan nested link).
- [ ] State default, hover (naik 4 px + shadow), focus (outline), active (tekan).
- [ ] MVP: tautan menuju anchor atau info lanjutan; halaman detail menyusul di fase berikutnya. **Jangan membuat tautan ke halaman yang belum ada.** Jika tidak ada tujuan, kartu tidak berupa link.

### FR-06 Activity Cards — P0
**Kategori:** Jeep wisata · Camping Watu Tapak · Seni & budaya · Kuliner & belanja · Venue event · Homestay/Balkondes.

**Acceptance criteria**
- [ ] Judul, ringkasan, kategori, tautan kontak/info.
- [ ] Setiap aktivitas punya `availability_status` (`active | inactive | seasonal | unverified`) dan `verified_at`.
- [ ] Aktivitas `inactive` disembunyikan; `unverified` ditampilkan dengan label "Konfirmasi ketersediaan".
- [ ] Kontak mengarah ke WhatsApp (format `https://wa.me/<nomor>?text=<pesan awal sesuai bahasa>`).

### FR-07 Heritage Story / Timeline — P0
**Acceptance criteria**
- [ ] Urutan kronologis; tanggal ditulis jelas ("30 Mei 2015").
- [ ] Setiap entri punya sumber di CMS.
- [ ] Layout timeline vertikal di mobile; boleh horizontal di desktop jika tidak overflow.
- [ ] Redaksi final disetujui pengelola sebelum publikasi.

### FR-08 Visit Information / Plan Your Visit — P0
**Isi:** alamat, tautan Google Maps, petunjuk arah, tarif, jam operasional, fasilitas, kontak, catatan keselamatan.

**Acceptance criteria**
- [ ] Alamat: Dusun Groyokan, Desa Sambirejo, Kecamatan Prambanan, Kabupaten Sleman, DI Yogyakarta.
- [ ] Tombol "Petunjuk Arah" membuka Google Maps dengan titik benar. **Uji di perangkat nyata**: koordinat dalam PRD (-7.781668, 110.504588) harus dibuka di peta dan dicocokkan dengan lokasi sebenarnya sebelum dipakai.
- [ ] Setiap blok data operasional menampilkan "Terakhir diverifikasi: <tanggal>".
- [ ] **Aturan tarif** (lihat §6): harga hanya tampil jika `status = verified`. Jika tidak, tampil "Konfirmasi tarif terbaru" + tombol WhatsApp.
- [ ] Jam operasional tidak terverifikasi tidak ditampilkan sebagai angka.

### FR-09 Reservation / Contact CTA — P0
**Acceptance criteria**
- [ ] Hanya mengarah ke kanal resmi: WhatsApp dan/atau media sosial resmi (disetujui pembimbing/pengelola).
- [ ] Tidak ada tautan placeholder (`#`, `wa.me/0000`) di build produksi. Build produksi **gagal** jika data kontak kosong (lihat `03-arsitektur-teknis.md` §10).
- [ ] Semua tautan eksternal memakai `rel="noopener noreferrer"` dan `target="_blank"` hanya bila perlu.

### FR-10 Footer — P0
- [ ] Logo/wordmark, deskripsi singkat, tautan, kontak resmi, media sosial, hak cipta, tautan Kebijakan Privasi.
- [ ] Teks putih di atas Charcoal; teal hanya untuk highlight.

### FR-11 Language Switch (ID/EN) — P0 *(dinaikkan dari P1)*
**Acceptance criteria**
- [ ] URL berbentuk `/id/...` dan `/en/...`; default `/id`.
- [ ] Pilihan bahasa dipertahankan saat berpindah halaman (cookie `NEXT_LOCALE`).
- [ ] Semua teks UI dan konten MVP tersedia di kedua bahasa. Konten EN yang belum diisi **tidak** jatuh diam-diam ke ID tanpa indikator; admin melihat peringatan "Terjemahan belum lengkap" dan frontend menampilkan fallback ID dengan atribut `lang="id"`.
- [ ] `<html lang>` benar; `hreflang` + canonical per bahasa.
- [ ] Switch bahasa mengirim event `language_switch`.

### FR-12 CMS / Admin Panel — P0
- [ ] Editor memperbarui teks, foto, tautan, tarif, jam, dan tanggal verifikasi tanpa mengubah kode.
- [ ] Setiap field teks punya tab ID dan EN.
- [ ] Perubahan konten tampil di website ≤ 60 detik (revalidasi ISR on-demand).
- [ ] Peran: `admin` (semua), `editor` (konten), `verifier` (hanya boleh mengubah status verifikasi tarif/jam). Minimal `admin` dan `editor` di MVP.
- [ ] Data lama diarsipkan, tidak dihapus permanen (soft delete + status `archived`).
- [ ] Audit trail perubahan tarif, jam, kontak (siapa, kapan, nilai lama/baru).

### FR-13 Gallery — P1
Galeri foto/video berkategori, lightbox dengan alt text dan caption, kredit foto.

### FR-14 News/Events — P1
Pengumuman dan agenda dengan tanggal terbit dan status.

### FR-15 Search — P2
Pencarian konten internal, empty state informatif.

### FR-16 Redirect dari Website Lama — P0 *(baru)*
- [ ] Inventarisasi URL website lama (sitemap atau crawl) sebelum launch.
- [ ] Peta redirect 301 (misalnya `/profil/` → `/id/#tentang`, `/wisata/` → `/id/#aktivitas`, `/formulir-reservasi/` → `/id/informasi-kunjungan`, artikel tarif → `/id/informasi-kunjungan`).
- [ ] Redirect diuji satu per satu sebelum DNS dialihkan.

### FR-17 Privasi dan Consent — P0 *(baru)*
- [ ] Banner consent analytics sederhana (tolak/terima); analytics tidak aktif sebelum persetujuan.
- [ ] Halaman Kebijakan Privasi (ID/EN).
- [ ] Tidak ada formulir yang mengumpulkan data pribadi di MVP (reservasi lewat WhatsApp).

---

## 5. Struktur Homepage (10 section)

| # | Section | Anchor id | FR | Sumber data CMS |
|---|---|---|---|---|
| 1 | Header | — | FR-01 | Site settings |
| 2 | Hero | `#beranda` | FR-02 | Hero |
| 3 | Intro | `#tentang` | FR-03 | Section |
| 4 | At a Glance | `#fakta` | FR-04 | Metric |
| 5 | Daya Tarik | `#daya-tarik` | FR-05 | Attraction |
| 6 | Aktivitas | `#aktivitas` | FR-06 | Activity |
| 7 | Heritage Story | `#sejarah` | FR-07 | Timeline |
| 8 | Plan Your Visit | `#informasi-kunjungan` | FR-08 | Visit info, Ticket, Activity |
| 9 | Closing CTA | `#rencanakan` | FR-09 | Section |
| 10 | Footer | — | FR-10 | Site settings |

Dengan i18n, anchor id tetap bahasa Indonesia agar tidak berubah antar bahasa (sederhana dan stabil).

---

## 6. Aturan Bisnis: Tarif Tiket

Keputusan D-06: tarif terbaru berlaku; weekday/weekend **dapat diatur**.

**Model data (ringkas):** satu catatan tarif per kategori pengunjung, dengan field `weekday_price`, `weekend_price`, `holiday_price`, serta saklar `differentiate_weekend` (boolean).

| Kondisi | Tampilan di website |
|---|---|
| `status = verified` dan `differentiate_weekend = true` | Dua kolom: Weekday dan Weekend/Libur nasional |
| `status = verified` dan `differentiate_weekend = false` | Satu harga ("Setiap hari") |
| `status = pending_confirmation` | **Tidak ada angka.** Teks: "Konfirmasi tarif terbaru" + tombol WhatsApp |
| `status = expired` | Tidak tampil. Admin mendapat peringatan |
| `effective_until` sudah lewat | Diperlakukan sebagai `expired` secara otomatis |

**Data awal (seed), dari kutipan PRD terhadap pengumuman 28 Nov 2024, belum diverifikasi oleh saya langsung:**

| Kategori | Weekday | Weekend/libur nasional |
|---|---|---|
| WNI | Rp10.000 | Rp15.000 |
| WNA | Rp20.000 | Rp30.000 |

Seed ini masuk dengan `status = pending_confirmation`. Setelah pengelola mengonfirmasi, admin mengubah status menjadi `verified`, mengisi `verified_by`, `verified_at`, `effective_from`.

**Konflik sumber:** pengumuman 28 Nov 2024 memakai tarif baru dengan pembedaan hari; halaman `/formulir-reservasi/` menurut PRD menampilkan nominal lebih lama tanpa pembedaan weekend. Website baru **tidak** menyalin dari formulir lama.

---

## 7. Analytics (Event Tracking)

Hanya aktif setelah consent. Parameter wajib setiap event: `page_name`, `section_name`, `destination_url`, `device_type`, `locale`, `timestamp`. Tidak ada data pribadi.

| Event | Pemicu |
|---|---|
| `hero_primary_cta_click` | Klik "Rencanakan Kunjungan" di hero |
| `hero_secondary_cta_click` | Klik "Jelajahi Cerita" |
| `attraction_card_click` | Klik kartu daya tarik |
| `activity_card_click` | Klik kartu aktivitas |
| `gallery_open` | (P1) Lightbox dibuka |
| `location_directions_click` | Klik "Petunjuk Arah" |
| `ticket_info_view` | Blok tarif masuk viewport ≥ 50% selama ≥ 1 dtk |
| `reservation_cta_click` | Klik CTA reservasi/rencanakan |
| `whatsapp_contact_click` | Klik tautan WhatsApp |
| `language_switch` | Ganti bahasa (`from`, `to`) |
| `footer_link_click` | Klik tautan footer |
| `nav_click` *(tambahan)* | Klik menu utama |

**KPI (usulan, bukan capaian):** CTR kartu daya tarik, visit-info engagement, CTA conversion, kedalaman scroll, persentase konten operasional dengan tanggal verifikasi aktif, Core Web Vitals (LCP ≤ 2,5 dtk, INP ≤ 200 ms, CLS ≤ 0,1).

---

## 8. Matriks Ketertelusuran (PRD → Dokumen)

| Area PRD | Dokumen |
|---|---|
| §10, §11, §12 (desain, responsif, section) | `02-desain-ui-ux.md` |
| §13, §15, §16 (CMS, teknologi, data model) | `03-arsitektur-teknis.md`, `04-konten-dan-cms.md` |
| §6 (konten, tarif) | `04-konten-dan-cms.md` |
| §14, §17, §18, §22 (NFR, acceptance, QA, DoD) | `05-qa-dan-acceptance.md` |
| §19, §20 (risiko, roadmap) | `06-sprint-plan.md` |
