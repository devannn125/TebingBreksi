# 02 — Desain UI/UX

Acuan untuk merapikan Figma dan membangun komponen. Turunan PRD §10, §11, §12 + keputusan D-10, D-11.

**Prinsip:** monokrom + satu aksen teal. Modular, berbasis kartu, Flexbox/Grid, tanpa absolute positioning untuk struktur utama.

---

## 1. Urutan Kerja Desain (karena Figma belum final)

Rapikan minimal ini sebelum coding, jangan semuanya:

1. **Halaman Tokens**: warna, tipografi, spacing, radius, shadow (isi dari dokumen ini).
2. **Komponen**: Button, Header (desktop + mobile), Attraction Card.
3. **Hero** desktop dan mobile.
4. Sisanya (section lain) bisa dirancang langsung dengan kode, mengikuti §8 dokumen ini.

Aturan Figma: pakai **Variables** untuk warna (hanya token di §2), **Auto Layout** di semua frame, dan hapus semua layer/warna dari eksplorasi lama (hijau, gold, krem).

---

## 2. Design Tokens

### 2.1 Warna (final)

| Token | Nama | Hex | Peran |
|---|---|---|---|
| `color.black` | Pure Black | `#000000` | Heading, tombol primer |
| `color.charcoal` | Charcoal Black | `#1A1A1A` | Header, footer, teks body, hover tombol primer |
| `color.white` | Pure White | `#FFFFFF` | Kartu, panel, tombol sekunder |
| `color.gray-100` | Light Gray | `#F0F2F5` | Latar halaman, divider |
| `color.teal` | Teal Blue | `#00A3BF` | Aksen: ikon, badge, indikator, angka besar |

### 2.2 Turunan netral (disetujui sebagai tambahan, lihat README P-01)

| Token | Hex | Peran | Catatan |
|---|---|---|---|
| `color.border` | `#E1E4E8` | Border kartu, input, divider | Hanya abu netral, bukan komponen teks |
| `color.text-secondary` | `#4D4D4D` | Teks sekunder, caption | Kontras ±8,4:1 di atas putih |
| `shadow.card` | `0 4px 12px rgba(0,0,0,0.06)` | Bayangan kartu | |
| `shadow.card-hover` | `0 12px 28px rgba(0,0,0,0.12)` | Hover kartu | |
| `overlay.hero` | `rgba(26,26,26,0.55)` | Overlay gambar hero | Berbasis Charcoal; bukan warna baru |

### 2.3 Token opsional: teal untuk teks (perlu persetujuan)

Jika pembimbing/klien ingin teks teal kecil, gunakan versi lebih gelap:

| Token | Hex | Kontras di atas putih |
|---|---|---|
| `color.teal-text` *(opsional)* | `#007A8F` | ±5,0:1 (lulus AA) |

Default: **tidak dipakai.** Hanya aktifkan jika ada kebutuhan nyata dan tercatat sebagai keputusan.

### 2.4 Tabel Kontras (hitungan saya, verifikasi ulang dengan alat checker sebelum launch)

| Teks | Latar | Rasio | Hasil AA teks biasa (4,5:1) | Penggunaan |
|---|---|---|---|---|
| Black `#000` | White | 21:1 | Lulus | Heading |
| Charcoal `#1A1A1A` | White | ±17:1 | Lulus | Body |
| Charcoal | Light Gray | ±15:1 | Lulus | Body di latar halaman |
| text-secondary `#4D4D4D` | White | ±8,4:1 | Lulus | Caption |
| text-secondary | Light Gray | ±7,6:1 | Lulus | Caption di latar |
| White | Charcoal | ±17:1 | Lulus | Teks header/footer |
| White | Black | 21:1 | Lulus | Label tombol primer |
| Teal `#00A3BF` | Charcoal | ±5,8:1 | Lulus | Highlight di footer/header gelap |
| Teal | White | ±3,0:1 | **Gagal** untuk teks kecil; lulus untuk komponen UI/teks besar (≥3:1) | Ikon, indikator, angka ≥24 px |
| Teal | Light Gray | ±2,7:1 | **Gagal** | **Jangan** dipakai untuk teks |

**Aturan penggunaan teal:**
- ✅ Ikon, garis aksen, badge (teks badge tetap Black/Charcoal; teal hanya untuk garis/latar kecil), indikator aktif, angka metrik ≥ 24 px bold di atas putih, teks di atas Charcoal, underline link.
- ❌ Teks paragraf, teks link kecil, label kecil di atas putih/Light Gray, latar section besar.
- Link: teks Black/Charcoal **dengan underline teal** (tebal 2 px, offset 3 px). Hover: underline menebal / berubah solid Black. Status tidak boleh hanya dibedakan oleh warna.

**Warna terlarang:** Vibrant Green `#38C172`, hijau apa pun, gold/ochre, krem/beige, semua gradien hijau/emas. Foto boleh berwarna alami; UI tidak.

### 2.5 CSS Variables (siap salin)

```css
:root {
  /* Warna inti */
  --color-black: #000000;
  --color-charcoal: #1A1A1A;
  --color-white: #FFFFFF;
  --color-gray-100: #F0F2F5;
  --color-teal: #00A3BF;

  /* Turunan netral */
  --color-border: #E1E4E8;
  --color-text-secondary: #4D4D4D;

  /* Semantik */
  --bg-page: var(--color-gray-100);
  --bg-card: var(--color-white);
  --text-heading: var(--color-black);
  --text-body: var(--color-charcoal);
  --focus-ring: var(--color-black);

  /* Spacing (kelipatan 4/8) */
  --space-1: 4px;  --space-2: 8px;   --space-3: 12px; --space-4: 16px;
  --space-5: 20px; --space-6: 24px;  --space-8: 32px; --space-10: 40px;
  --space-12: 48px; --space-16: 64px; --space-20: 80px; --space-24: 96px;

  /* Radius */
  --radius-sm: 8px; --radius-md: 12px; --radius-lg: 16px; --radius-pill: 999px;

  /* Shadow */
  --shadow-card: 0 4px 12px rgba(0,0,0,0.06);
  --shadow-card-hover: 0 12px 28px rgba(0,0,0,0.12);

  /* Motion */
  --transition-base: 200ms ease-in-out;

  /* Layout */
  --container-max: 1296px;
  --gutter-sm: 16px; --gutter-md: 24px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 2.6 Tailwind (jika dipakai)

Nonaktifkan palet bawaan agar warna terlarang tidak bisa dipakai tidak sengaja:

```js
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      charcoal: '#1A1A1A',
      white: '#FFFFFF',
      gray: { 100: '#F0F2F5' },
      teal: '#00A3BF',
      border: '#E1E4E8',
      'text-secondary': '#4D4D4D',
    },
    extend: {
      borderRadius: { card: '12px' },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 12px 28px rgba(0,0,0,0.12)',
      },
      maxWidth: { container: '1296px' },
    },
  },
};
```

Menimpa `theme.colors` (bukan `extend`) berarti `bg-green-500` dan sejenisnya otomatis tidak ada.

---

## 3. Tipografi

| Peran | Font | Desktop | Mobile | Line-height |
|---|---|---|---|---|
| Display hero | Playfair Display | 56–64 px | 36–44 px | 1,1 |
| H1 halaman | Playfair Display | 48–56 px | 34–40 px | 1,15 |
| H2 section | Playfair Display | 36–42 px | 28–32 px | 1,2 |
| H3 kartu | Playfair Display / DM Sans semibold | 22–28 px | 20–24 px | 1,25 |
| Body | DM Sans | 15–17 px | 14–16 px | 1,5–1,7 |
| Caption/eyebrow | DM Sans, uppercase, letter-spacing 0,08em | 11–12 px | 10–11 px | 1,4 |
| Button | DM Sans Bold | 12–14 px | 12–14 px | 1 |

**Catatan implementasi**
- Muat lewat `next/font` (self-host, tanpa request ke Google saat runtime), subset `latin` + `latin-ext`, `display: swap`.
- Muat hanya bobot yang dipakai: Playfair 600/700, DM Sans 400/500/700.
- Gunakan `clamp()` untuk ukuran fluid, misalnya `font-size: clamp(2.25rem, 1.5rem + 3vw, 4rem)` untuk hero.
- Caption 10 px di PRD sangat kecil. Saran: **minimum 11 px** dan gunakan hanya untuk eyebrow uppercase, bukan informasi penting.
- Uji teks Indonesia dan Inggris panjang agar tidak patah di 320 px (`overflow-wrap: anywhere` untuk judul panjang).

---

## 4. Layout dan Grid

| Viewport | Lebar | Kolom | Padding sisi |
|---|---|---|---|
| Small mobile | 320–374 | 1 | 16 px |
| Mobile | 375–767 | 1 | 20–24 px |
| Tablet | 768–1023 | 2 (jika cukup) | 32 px |
| Desktop | 1024–1439 | 2–3 | 40 px |
| Large | ≥1440 | maks. 1296 px, auto margin | auto |

```css
.container { width: 100%; max-width: var(--container-max); margin-inline: auto; padding-inline: var(--gutter-sm); }
@media (min-width: 768px)  { .container { padding-inline: 32px; } }
@media (min-width: 1024px) { .container { padding-inline: 40px; } }

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 24px;
}

.section { padding-block: 64px; }
@media (min-width: 1024px) { .section { padding-block: 96px; } }
```

Spasi antar-section konsisten: 64 px (mobile) / 96 px (desktop). Jangan ada ruang kosong tak disengaja.

---

## 5. Komponen

### 5.1 Button
| Varian | Default | Hover | Focus | Disabled |
|---|---|---|---|---|
| Primary | Fill Black, label White | Fill Charcoal | Outline 2 px White + ring 2 px Black (offset 2 px) | Fill Charcoal 40% opacity, kursor not-allowed |
| Secondary | Fill White, border 1 px Black, label Black | Fill Black, label White | Sama seperti di atas | Border dan label 40% |
| Text/link | Teks Black + underline teal | Underline tebal | Outline | — |

- Tinggi minimum **44 px** (mobile) / 48 px (desktop). Padding horizontal 24 px. Radius `pill` atau 8 px (pilih satu, konsisten di seluruh situs).
- **Active:** `transform: translateY(1px)`.
- Ikon panah opsional (ikon, bukan warna baru).

### 5.2 Header
- Desktop (≥1024): wordmark kiri, nav tengah, CTA primer + switch bahasa kanan. Latar Charcoal dengan teks White, **atau** White dengan teks Black (pilih satu agar konsisten; rekomendasi: **Charcoal** agar kontras dengan hero).
- Mobile (<1024): wordmark + tombol menu (44×44). Drawer penuh lebar dengan daftar tautan (tinggi tiap item ≥48 px), CTA di bawah, switch bahasa.
- Item aktif: underline teal 2 px (di atas Charcoal teal terbaca ±5,8:1).
- Sticky opsional: tinggi mengecil saat scroll, tanpa animasi berlebihan.

### 5.3 Attraction Card
- Surface White, border 1 px `border`, radius 12 px, `shadow-card`, padding 24 px (desktop) / 16–20 px (mobile).
- Susunan: gambar rasio 4:3 radius atas 12 px → badge kategori → H3 → ringkasan (1–2 kalimat, `line-clamp: 3`) → tautan "Selengkapnya →".
- **Default / Hover** (`translateY(-4px)`, `shadow-card-hover`, 200 ms) **/ Focus** (outline 2 px Black, offset 2 px) **/ Active** (`translateY(-1px)`).
- Seluruh kartu satu `<a>` jika bertaut. Teks kartu tidak boleh berubah warna menjadi teal saat hover.
- Hover hanya efek tambahan; informasi tidak boleh tersembunyi di balik hover (mobile).

### 5.4 Activity Card
Mirip Attraction Card, tetapi foto opsional, ditambah **badge status** (`Aktif`, `Musiman`, `Konfirmasi ketersediaan`) dan tombol kontak WhatsApp (secondary).

### 5.5 Metric Card
- Surface White, angka besar (Playfair 40–56 px) Black atau teal (≥24 px bold, aman kontras), unit kecil, label (text-secondary), baris sumber/tanggal verifikasi (11–12 px).
- Jangan semua angka teal. Maksimal satu atau dua highlight.

### 5.6 Section Heading
Eyebrow (caption uppercase, text-secondary atau teal di atas Charcoal) → H2 → paragraf intro (panjang baris ideal ±65–75 karakter). Varian **light-on-dark** untuk section gelap.

### 5.7 Visit Info Panel
Kartu putih dengan baris ikon + label + nilai (alamat, jam, tarif, fasilitas, kontak). Tombol "Petunjuk Arah" (primer) dan "Hubungi via WhatsApp" (sekunder). Setiap blok operasional memiliki baris kecil "Terakhir diverifikasi: 9 Nov 2026".

### 5.8 Ticket Table
- Verified: tabel 2–3 kolom (Kategori | Weekday | Weekend/Libur) atau satu kolom harga bila `differentiate_weekend=false`.
- Pending: kartu informasi dengan ikon info (teal) dan teks "Konfirmasi tarif terbaru", tombol WhatsApp.
- Pada mobile: tabel diubah menjadi daftar kartu bertumpuk (bukan tabel yang menggulir ke samping).

### 5.9 Badge
Dua varian: **neutral** (latar Light Gray, teks Charcoal) dan **teal** (latar White, border 1 px teal, teks Charcoal, titik/ikon teal). Tinggi 24 px, teks 11–12 px. Tidak dominan.

### 5.10 Language Switch
Dua tombol/segmen `ID | EN`, status aktif ditandai **tebal + underline** (bukan hanya warna). `aria-label="Ganti bahasa"`, `lang` pada tiap opsi.

### 5.11 Footer
Latar Charcoal, teks White, tautan White dengan underline saat hover, teal hanya untuk highlight kecil. Mobile: grup tautan bertumpuk, akordeon tidak perlu.

### 5.12 Gallery Item (P1) dan Lightbox
Gambar rasio konsisten, hover naik tipis, lightbox dengan fokus terkunci, Esc menutup, caption + kredit.

### 5.13 Placeholder Image
Selama foto resmi belum ada: blok Light Gray dengan ikon gambar dan label kecil "Foto menyusul". Jangan memakai foto dari internet tanpa lisensi. Placeholder tidak boleh lolos ke produksi (lihat QA).

---

## 6. Interaksi dan Motion

- Transisi umum: `transition: transform 200ms ease-in-out, box-shadow 200ms ease-in-out, background-color 200ms ease-in-out`. **Jangan** `transition: all`.
- Hormati `prefers-reduced-motion` (CSS di §2.5).
- Fokus: outline 2 px solid Black (di latar terang) atau White (di latar gelap), offset 2 px; **tidak dihapus**.
- Mobile: semua status harus jelas dengan tap/focus, tidak bergantung hover.
- Scroll ke anchor: `scroll-behavior: smooth` dengan `scroll-margin-top` sebesar tinggi header + 16 px.

---

## 7. Aksesibilitas Desain (WCAG 2.2 AA)

- Kontras teks ≥ 4,5:1, komponen UI ≥ 3:1 (lihat §2.4).
- Target sentuh ≥ 44×44 px (WCAG 2.2 menetapkan minimum 24×24; PRD lebih ketat, ikuti PRD).
- Fokus tidak tersembunyi di balik header sticky (`scroll-padding-top`).
- Landmark: `<header>`, `<nav aria-label>`, `<main>`, `<section aria-labelledby>`, `<footer>`.
- Satu `<h1>` per halaman, urutan heading tidak melompat.
- Alt text untuk foto informatif; dekoratif `alt=""`.
- Link "Lewati ke konten utama" di awal halaman.
- Teks tidak menyampaikan makna lewat warna saja.

---

## 8. Spesifikasi Section Homepage

Wireframe teks ringkas; ukuran mengikuti §3–§4.

### 8.1 Hero
```
[Header]
┌──────────────────────────────────────────────────────────┐
│  FOTO LANDSCAPE (overlay Charcoal 55%)                   │
│  GEOHERITAGE · SAMBIREJO                  (eyebrow)      │
│  Jelajahi jejak bumi purba.               (display)      │
│  Deskripsi 2 kalimat tentang batuan, relief, panorama.   │
│  [Rencanakan Kunjungan]  [Jelajahi Cerita]               │
└──────────────────────────────────────────────────────────┘
```
- Tinggi desktop `min-height: 80vh` (maks. 760 px), mobile `min-height: 560 px`.
- Teks di atas overlay, kolom teks maks. 640 px.
- Tombol sekunder di atas gambar: varian "light-on-dark" (border White, label White; hover fill White, label Black) agar tetap monokrom.
- Gambar: `object-fit: cover`, `object-position` per breakpoint dari CMS (focal point).

### 8.2 Intro
Dua kolom (teks | foto) di desktop; teks dulu lalu foto di mobile. Subheading "Lebih dari sekadar tebing". Tautan "Kenali sejarahnya".

### 8.3 At a Glance
Grid 4 Metric Card (desktop), 2×2 (tablet), 1 kolom atau 2×2 kecil (mobile). Hanya metrik berstatus `published` dan bersumber.

### 8.4 Daya Tarik
Judul section + `card-grid` 3 Attraction Card (Relief Wayang, Tlatar Seneng, Panorama/Sunset). Latar section: Light Gray (kartu putih di atasnya).

### 8.5 Aktivitas
`card-grid` Activity Card (maks. 6 di MVP). Filter kategori **tidak** diperlukan di MVP.

### 8.6 Heritage Story
Timeline vertikal: titik teal (ikon), garis `border`, tahun (Playfair), judul, deskripsi. Section dengan latar Charcoal diperbolehkan (varian light-on-dark), maka titik teal terbaca baik.

### 8.7 Plan Your Visit
Dua kolom desktop: kiri Visit Info Panel (alamat, jam, fasilitas, kontak), kanan Ticket Table dan peta (tombol "Petunjuk Arah"; **embed peta opsional**, pakai tautan dahulu agar ringan). Mobile: satu kolom bertumpuk.

### 8.8 Closing CTA
Blok full-width Charcoal: headline, 1–2 kalimat, satu tombol primer. Karena latar Charcoal, tombol primer (Black) kurang kontras terhadap latar; gunakan **varian terbalik** (fill White, label Black) pada latar gelap. Catatan ini menyimpang halus dari "CTA hitam teks putih" PRD §12.9 demi keterbacaan. **Alternatif yang patuh PRD:** letakkan CTA di kartu putih di atas Light Gray (tombol Black + label White). Pilih alternatif patuh PRD sebagai default.

### 8.9 Footer
Empat kolom desktop (identitas | navigasi | kontak | media sosial), satu kolom mobile. Baris hak cipta dan tautan Kebijakan Privasi.

---

## 9. Gambar dan Media

| Jenis | Rasio | Lebar sumber | Format |
|---|---|---|---|
| Hero | 16:9 desktop, 4:5 mobile | 2400 px | AVIF/WebP + JPEG fallback |
| Kartu | 4:3 | 1200 px | AVIF/WebP |
| Intro | 4:3 atau 3:4 | 1400 px | AVIF/WebP |
| OG image | 1200×630 | — | JPEG |

- `srcset` + `sizes`, `loading="lazy"` di bawah fold, hero `fetchpriority="high"`.
- Selalu atur `width`/`height` atau `aspect-ratio` untuk mencegah CLS.
- Fokus gambar (focal point) tiap breakpoint dicatat di CMS.

---

## 10. Checklist Serah-Terima Desain → Kode

- [ ] Seluruh warna di Figma berasal dari Variables di §2.
- [ ] Tidak ada layer hijau/gold/krem.
- [ ] Komponen punya state default, hover, focus, active, disabled.
- [ ] Frame desktop (1440), tablet (768), mobile (390), dan 320.
- [ ] Teks nyata (ID dan EN), bukan lorem ipsum.
- [ ] Placeholder foto jelas ditandai.
- [ ] Spasi dan ukuran sesuai token.
