# 05 — QA dan Acceptance

Turunan PRD §14, §17, §18, §22. Karena Anda solo, QA harus **terstruktur dan sebagian otomatis**, jangan hanya mengandalkan "kelihatannya sudah benar".

---

## 1. Non-Functional Requirements

### 1.1 Performa
| Metrik | Target | Alat |
|---|---|---|
| LCP | ≤ 2,5 dtk (p75) | Lighthouse CI, PageSpeed Insights, CrUX bila tersedia |
| INP | ≤ 200 ms | Chrome DevTools, web-vitals |
| CLS | ≤ 0,1 | Lighthouse |
| Skor Lighthouse mobile (Performance) | ≥ 85 (target internal, bukan syarat PRD) | Lighthouse |
| Bobot halaman awal (tanpa gambar lazy) | ≤ 1 MB (target internal) | DevTools Network |
| JavaScript awal | ≤ 150 KB gzip (target internal) | `next build` output |

Kondisi uji: Lighthouse mobile, throttling "Slow 4G", CPU 4× slowdown. Dokumentasikan hasilnya.

Praktik: hero `priority`, `next/image`, font self-host, lazy untuk gambar di bawah fold, tanpa library carousel/animasi berat, `aspect-ratio` untuk mencegah CLS.

### 1.2 Aksesibilitas (WCAG 2.2 AA)
- Kontras sesuai `02-desain-ui-ux.md` §2.4.
- Semua fungsi dapat dipakai dengan keyboard; urutan tab logis.
- Fokus terlihat; tidak tertutup header sticky.
- Menu mobile dan lightbox mendukung screen reader (`aria-expanded`, `aria-controls`, fokus terkunci, Esc).
- Alt text, label, `lang`, landmark.
- Warna bukan satu-satunya pembeda status.
- `prefers-reduced-motion` dihormati.
- Target sentuh ≥ 44×44 px.
- Alat: axe DevTools / `@axe-core/playwright`, Lighthouse a11y, uji manual dengan keyboard, **satu uji screen reader** (NVDA di Windows atau VoiceOver di Mac/iOS/TalkBack Android).

> Alat otomatis hanya menangkap sebagian masalah. Jangan menyatakan "lulus WCAG" hanya dari skor Lighthouse.

### 1.3 SEO
Satu H1, meta unik, OG, canonical, hreflang, sitemap, robots, alt text, structured data bila disetujui, redirect 301 berfungsi, tidak ada halaman `noindex` tidak sengaja di produksi.

### 1.4 Keamanan dan Privasi
HTTPS dan HSTS, header keamanan, admin terlindungi, tidak ada data pribadi disimpan, consent analytics, tidak ada secret di repo, API hanya mengembalikan konten `published`, tarif tidak bocor saat belum verified.

### 1.5 Kompatibilitas
Versi terbaru dan satu sebelumnya: Chrome, Edge, Firefox, Safari. Android Chrome, iOS Safari. Lebar uji: **320, 375, 390, 768, 1024, 1280, 1440 px**.

---

## 2. Matriks Uji

**Kolom "Cara"**: M = manual, O = otomatis (Playwright/CI), A = alat audit.

### 2.1 Navigasi dan Interaksi
| ID | Skenario | Langkah | Hasil diharapkan | Cara |
|---|---|---|---|---|
| QA-01 | Navigasi desktop | 1440 px, klik tiap menu | Menuju target benar, item aktif bergaris | O+M |
| QA-02 | Navigasi mobile | 390 px, buka/tutup menu, Tab, Esc | Drawer bisa dengan tap dan keyboard; fokus terkunci; tombol kembali fokus | M |
| QA-03 | CTA hero | Klik CTA utama dan sekunder | Utama → Info Kunjungan; sekunder → Intro; event terkirim (setelah consent) | O |
| QA-04 | Interaksi kartu | Hover, Tab, klik | Hover naik 4 px; fokus terlihat; tautan aktif; tidak ada link ke halaman 404 | M+O |
| QA-05 | Grid responsif | 320, 390, 768, 1024, 1440 | Kolom menyesuaikan; tanpa overlap/overflow | O (cek `scrollWidth`) |
| QA-16 | Switch bahasa | ID→EN→ID di beberapa halaman | URL `/id` ↔ `/en`; teks berubah; pilihan bertahan; `lang` dan hreflang benar | O |
| QA-17 | Anchor scroll | Klik menu anchor | Berhenti di bawah header, bukan tertutup | M |

### 2.2 Warna dan Desain
| ID | Skenario | Langkah | Hasil | Cara |
|---|---|---|---|---|
| QA-06 | Audit warna | Pindai semua CSS dan DOM hasil build | Tidak ada warna di luar palet (lihat §3) | O |
| QA-07 | Permukaan putih | Periksa kartu/panel | Surface `#FFFFFF` | O+M |
| QA-08 | Warna CTA | Periksa tombol primer | Fill `#000000`, label `#FFFFFF` (varian di latar gelap sesuai keputusan desain) | O |
| QA-09 | Teal terbatas | Periksa badge/indikator/link | Teal tidak dipakai untuk teks kecil di atas putih/Light Gray | O+M |
| QA-18 | Tipografi | Periksa Playfair/DM Sans | Font termuat, ukuran sesuai skala, tidak ada FOUT mengganggu | M |

### 2.3 Konten dan Data
| ID | Skenario | Langkah | Hasil | Cara |
|---|---|---|---|---|
| QA-10 | Verifikasi tarif | Set status `pending_confirmation` di CMS | **Tidak ada angka tarif** di HTML dan di respons API; tampil "Konfirmasi tarif terbaru" | O (tes backend + e2e) |
| QA-19 | Tarif terverifikasi | Set `verified`, `differentiate_weekend` true/false | Dua kolom atau satu harga sesuai saklar; tanggal verifikasi tampil | O |
| QA-20 | Tarif kedaluwarsa | `effective_until` kemarin | Harga disembunyikan, peringatan admin | O |
| QA-11 | Tautan lokasi | Klik "Petunjuk Arah" | Membuka titik Tebing Breksi yang tepat (uji di HP) | M |
| QA-21 | WhatsApp | Klik tautan WA (ID dan EN) | Obrolan terbuka ke nomor benar dengan pesan awal sesuai bahasa | M |
| QA-22 | Aktivitas status | Set `inactive`, `unverified`, `seasonal` | Disembunyikan / label "Konfirmasi ketersediaan" / label "Musiman" | O |
| QA-23 | Metrik tanpa sumber | Metrik `draft` | Tidak tampil | O |
| QA-12 | Pemuatan gambar | Slow 4G | Tidak ada layout shift; placeholder/aspek rasio terjaga | A+M |
| QA-24 | Placeholder produksi | `next build` produksi dengan data placeholder | Build **gagal** | O |
| QA-25 | Redirect lama | Tiap URL lama | 301 ke tujuan benar, tidak ada rantai redirect | O |

### 2.4 Aksesibilitas, Performa, Analytics
| ID | Skenario | Langkah | Hasil | Cara |
|---|---|---|---|---|
| QA-13 | Aksesibilitas | axe + keyboard + satu screen reader | Nol pelanggaran "serious/critical"; semua kontrol dapat dipakai | A+M |
| QA-26 | Performa | Lighthouse mobile pada halaman utama dan info kunjungan | Memenuhi §1.1 | A |
| QA-14 | Analytics | Terima consent, klik CTA/kartu | Event terkirim dengan parameter wajib; tidak ada event sebelum consent | M+O |
| QA-27 | Consent | Tolak consent | Tidak ada request analytics | M |
| QA-28 | Reduced motion | Aktifkan setelan OS | Tidak ada animasi transform | M |

### 2.5 CMS
| ID | Skenario | Langkah | Hasil | Cara |
|---|---|---|---|---|
| QA-29 | Ubah konten | Edit judul hero di Filament | Tampil di website ≤ 60 dtk | M |
| QA-30 | Terjemahan | Kosongkan EN | Peringatan admin; fallback ID bertanda | M |
| QA-31 | Peran | Login sebagai `editor` | Tidak bisa mengubah tarif/kontak | O |
| QA-32 | Audit | Ubah tarif | Entri audit (siapa, kapan, lama/baru) | O |
| QA-33 | Upload | Unggah foto tanpa izin/kredit | Ditolak untuk publish | M |
| QA-34 | Webhook gagal | Matikan frontend, ubah konten | Job retry; cadangan ISR berkala | M |

### 2.6 Footer
| QA-15 | Footer | Klik semua tautan dan kontak | Semua aktif, menuju kanal resmi | O+M |

---

## 3. Audit Warna Otomatis

Tujuan: menjamin "tidak ada hijau/gold/krem" tanpa memeriksa mata.

**Pendekatan 1 — Pindai kode sumber (cepat, jalankan di CI):**
```bash
# Cari hex di luar daftar yang diizinkan di src/
ALLOWED='#000000|#1A1A1A|#FFFFFF|#F0F2F5|#00A3BF|#E1E4E8|#4D4D4D|#000|#FFF|#fff'
grep -rEoh '#[0-9A-Fa-f]{3,8}\b' frontend/src | sort -u | grep -Eiv "^($ALLOWED)$"
# Hasil harus kosong (selain dalam komentar/berkas yang dikecualikan)
```
Juga larang kelas Tailwind warna bawaan dengan palet terkunci (otomatis tidak ada).

**Pendekatan 2 — Pindai warna terhitung di browser (Playwright):**
```ts
// Ambil semua warna computed dari semua elemen dan bandingkan dengan whitelist
const allowed = new Set([
  'rgb(0, 0, 0)','rgb(26, 26, 26)','rgb(255, 255, 255)','rgb(240, 242, 245)',
  'rgb(0, 163, 191)','rgb(225, 228, 232)','rgb(77, 77, 77)','rgba(0, 0, 0, 0)',
]);
const bad = await page.evaluate(() => {
  const props = ['color','backgroundColor','borderTopColor','borderBottomColor','outlineColor','fill','stroke'];
  const found = new Set<string>();
  document.querySelectorAll('*').forEach(el => {
    const cs = getComputedStyle(el);
    props.forEach(p => found.add((cs as any)[p]));
  });
  return [...found];
});
// expect: setiap nilai di bad ada di allowed (abaikan rgba transparan/overlay yang disetujui)
```
Jalankan pada tiap breakpoint dan tiap state utama (hover/focus lewat `page.hover()`/`focus()`). Overlay/shadow berbasis hitam dengan alpha dikecualikan secara eksplisit.

**Pendekatan 3 — Visual:** tangkap tangkapan layar tiap breakpoint, periksa mata untuk gambar placeholder dan gradien.

Foto boleh berwarna alami; yang diaudit hanyalah warna UI.

---

## 4. Uji Responsif (checklist)

Untuk setiap lebar (320, 375, 390, 768, 1024, 1280, 1440):
- [ ] Tidak ada scroll horizontal (`document.documentElement.scrollWidth <= innerWidth`).
- [ ] Tidak ada teks/gambar/tombol bertumpuk.
- [ ] Hero: teks kontras dan tombol terlihat.
- [ ] Header mobile adalah drawer, bukan menu desktop yang dipadatkan.
- [ ] Kartu berubah jumlah kolom secara fluid.
- [ ] Target sentuh ≥ 44×44.
- [ ] Spasi antar-section konsisten, tidak ada ruang kosong tak disengaja.
- [ ] Judul panjang (EN dan ID) tidak merusak layout.

Perangkat nyata minimum: satu Android dan satu iPhone (atau emulator + satu perangkat pinjaman) untuk Safari iOS (sering berbeda: 100vh, font rendering, sticky).

---

## 5. Strategi Tes Otomatis (realistis untuk solo)

| Lapisan | Alat | Cakupan minimum |
|---|---|---|
| Unit backend | Pest/PHPUnit | `TicketVisibilityService`, status kedaluwarsa, filter `published`, locale fallback |
| Feature backend | Pest | Endpoint `/home`, `/visit`; tarif tidak bocor |
| e2e frontend | Playwright | Navigasi, switch bahasa, hero CTA, tarif pending vs verified, audit warna, overflow 320 px |
| Aksesibilitas | `@axe-core/playwright` | Halaman utama dan info kunjungan di dua viewport |
| Performa | Lighthouse CI | Ambang di §1.1 |

Prioritaskan **aturan bisnis tarif** dan **audit warna**, dua hal yang paling mudah diabaikan AI.

---

## 6. Penanganan Bug

| Prioritas | Definisi | Contoh | Tindakan |
|---|---|---|---|
| P0 | Menghalangi fungsi inti atau menampilkan informasi salah | Tarif salah tampil, CTA mati, halaman error | Wajib selesai sebelum launch |
| P1 | Fitur penting rusak atau pelanggaran PRD | Warna terlarang, overflow di 320 px, kontras gagal | Wajib selesai sebelum launch |
| P2 | Gangguan kecil | Jarak tidak rata, animasi kasar | Boleh setelah launch (dicatat) |
| P3 | Kosmetik | Penyempurnaan | Backlog |

---

## 7. Acceptance Criteria Global (MVP)

Mengacu PRD §17, disesuaikan dengan keputusan.

1. [ ] Halaman inti berfungsi di desktop, tablet, mobile.
2. [ ] Palet UI hanya `#000000`, `#1A1A1A`, `#FFFFFF`, `#F0F2F5`, `#00A3BF` + turunan netral `#E1E4E8`, `#4D4D4D` (disetujui).
3. [ ] Tidak ada hijau, emas, krem sebagai warna UI.
4. [ ] Semua kartu berpermukaan `#FFFFFF`; latar halaman `#F0F2F5`.
5. [ ] CTA utama hitam dengan label putih.
6. [ ] Header/footer Charcoal sesuai komposisi; tidak ada hijau.
7. [ ] Teal hanya aksen dan tidak dipakai untuk teks kecil di atas putih/Light Gray.
8. [ ] Komponen kartu punya state default, hover, focus, active.
9. [ ] Tidak ada horizontal overflow di 320 px.
10. [ ] Semua CTA menuju URL/kontak terverifikasi; tidak ada placeholder.
11. [ ] Tarif dan jam punya status verifikasi; tidak menampilkan data usang.
12. [ ] Semua gambar punya alt text dan izin tercatat.
13. [ ] Tidak ada gambar rusak atau tautan mati.
14. [ ] Konten homepage dikelola lewat CMS (ID dan EN).
15. [ ] Uji aksesibilitas dan performa dijalankan, hasilnya didokumentasikan.
16. [ ] Redirect dari website lama diuji.
17. [ ] Consent analytics dan Kebijakan Privasi tersedia.

---

## 8. Definition of Done

**Per tiket:** kode digabung ke `main`, lolos lint dan tes, diuji di dua viewport (mobile + desktop), tidak ada warna di luar token, tidak ada `console.error`, dokumentasi diperbarui bila perlu.

**Per sprint:** demo ke pembimbing (atau rekaman layar), staging diperbarui, catatan retrospektif.

**MVP selesai bila:**
- [ ] Desain desktop dan mobile disetujui.
- [ ] Implementasi mengikuti token warna final.
- [ ] Seluruh section utama berisi konten terverifikasi (atau berstatus "konfirmasi").
- [ ] CTA, navigasi, peta, WhatsApp telah diuji di perangkat nyata.
- [ ] CMS dipakai sukses oleh satu editor penunjuk (uji dengan orang non-teknis).
- [ ] Uji responsif, aksesibilitas, performa, SEO dasar selesai dan didokumentasikan.
- [ ] Tidak ada bug P0/P1 terbuka.
- [ ] Pengelola/pembimbing menyetujui konten, foto, dan informasi operasional secara tertulis.
- [ ] Panduan editor (1–2 halaman) dan catatan serah-terima tersedia.

---

## 9. Checklist Hari Rilis

- [ ] Backup DB dan media.
- [ ] `APP_DEBUG=false`, `APP_ENV=production`.
- [ ] Guard build produksi lolos (tidak ada placeholder).
- [ ] HTTPS aktif, HSTS, header keamanan.
- [ ] Redirect lama diuji.
- [ ] Sitemap, robots, hreflang, canonical diperiksa.
- [ ] Analytics aktif setelah consent saja.
- [ ] Uptime monitor dan Sentry aktif.
- [ ] Akun admin: password kuat, akun demo dihapus.
- [ ] Rencana rollback (DNS lama dan arsip website lama).
