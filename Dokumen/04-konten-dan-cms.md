# 04 — Konten dan CMS

Panduan isi konten, tata kelola, draft copy (ID/EN), sumber geologi, dan rencana foto. Turunan PRD §6, §12, §13 + keputusan D-05, D-06, D-09, D-13.

---

## 1. Prinsip Konten

1. **Tidak ada klaim tanpa sumber.** Setiap fakta punya sumber di CMS.
2. **Data operasional wajib berstatus verifikasi.** Tarif, jam, kontak, fasilitas, keselamatan.
3. **Tidak hiperbolis.** Hindari "terbaik", "terindah", "wajib dikunjungi" tanpa dasar.
4. **Kalimat pendek, spesifik, mudah dipindai.** Maks. ±20 kata per kalimat.
5. **Hormati konservasi dan budaya lokal.**
6. **Bilingual sejak awal.** Tulis ID dulu, lalu EN; jangan terjemahan mesin mentah tanpa dibaca ulang.

---

## 2. Content Types di Filament (ringkas)

Detail field ada di `03-arsitektur-teknis.md` §4. Berikut navigasi admin yang disarankan agar editor non-teknis tidak bingung:

| Grup menu admin | Resource | Siapa mengubah |
|---|---|---|
| **Beranda** | Hero, Sections (Intro, CTA penutup), Metrics | editor |
| **Wisata** | Attractions, Activities, Timeline | editor |
| **Informasi Kunjungan** | Visit Info, Opening Hours, Ticket Prices | admin / verifier |
| **Pengaturan** | Site Settings (kontak, WhatsApp, media sosial, peta), Redirects | admin |
| **Media** | Media Library | editor |
| **Sistem** | Users, Audit Log | admin |

**Kemudahan untuk editor non-teknis**
- Label bahasa Indonesia di seluruh admin.
- Teks bantuan (helper text) di tiap field, misalnya "Maks. 2 kalimat".
- Batas karakter dengan penghitung.
- Pratinjau (tautan "Lihat di website" ke staging/preview).
- Peringatan merah di dashboard: "Tarif belum diverifikasi", "Jam operasional > 90 hari belum diperbarui", "Terjemahan EN belum lengkap".
- Tidak ada field HTML bebas; rich text terbatas (paragraf, tebal, miring, daftar, tautan).

---

## 3. Tata Kelola Konten

### 3.1 Siklus status
`draft` → `published` → `archived`. Data lama **diarsipkan**, tidak dihapus dan tidak tampil bersamaan dengan data baru.

### 3.2 Verifikasi data operasional

| Data | Pemilik konten (diisi saat tahu) | Kedaluwarsa | Aksi bila kedaluwarsa |
|---|---|---|---|
| Tarif tiket | Pengelola | Sesuai `effective_until`, atau 180 hari | Otomatis `expired`, harga disembunyikan |
| Jam operasional | Pengelola | 90 hari | Peringatan admin; setelah 180 hari disembunyikan |
| Kontak/WhatsApp | Pengelola | 180 hari | Peringatan admin |
| Fasilitas dan keselamatan | Pengelola | 180 hari | Peringatan admin |
| Status aktivitas (aktif/musiman) | Pengelola/penyedia | 90 hari | Berubah ke `unverified` |
| Fakta geologi/sejarah | Pengelola atau ahli | Tidak kedaluwarsa, tinjau saat ada sumber baru | — |

Untuk kedaluwarsa otomatis gunakan Laravel scheduler harian (`php artisan schedule:run` via cron).

### 3.3 Hak cipta dan izin foto
Setiap media menyimpan: pemilik/kredit, jenis lisensi/izin, referensi persetujuan (nama + tanggal), dan status. Foto tanpa catatan izin **tidak bisa dipublikasikan** (validasi di admin).

---

## 4. Aturan Tarif (ringkasan; detail di `01-kebutuhan-fitur.md` §6)

- Tarif awal di-seed dari pengumuman resmi 28 November 2024 (kutipan PRD) sebagai `pending_confirmation`.
- Tarif **terbaru berlaku**; pembedaan weekday/weekend diatur lewat saklar `differentiate_weekend`.
- Tidak tampil sebagai angka sampai diverifikasi.
- Teks pengganti: ID "Konfirmasi tarif terbaru" / EN "Please confirm the latest fare" + tombol WhatsApp.

**Langkah verifikasi (untuk Anda lakukan lewat pembimbing):**
1. Minta pengelola menuliskan tarif berlaku (kategori, weekday, weekend, libur nasional, tanggal berlaku).
2. Simpan bukti tertulis (pesan WhatsApp/surat) dan masukkan ke `source_note`.
3. Admin mengubah status ke `verified`, mengisi `verified_by`, `verified_at`, `effective_from`.
4. Cek di staging bahwa angka tampil benar sebelum produksi.

---

## 5. Draft Copy (siap dipakai sebagai konten awal)

> Semua teks di bawah adalah **draft** yang disusun dari fakta PRD dan sumber di §6. Pengelola harus menyetujui redaksi final. Teks tanpa fakta yang sulit diverifikasi sengaja dibuat umum.

### 5.1 Hero

| Field | ID | EN |
|---|---|---|
| Eyebrow | Geoheritage · Sambirejo | Geoheritage · Sambirejo |
| Headline | Jelajahi jejak bumi purba. | Explore the traces of ancient earth. |
| Deskripsi | Tebing batu vulkanik dengan relief pahatan dan panorama Prambanan, di bekas kawasan tambang yang kini menjadi ruang wisata dan belajar. | A volcanic rock cliff with carved reliefs and wide views over Prambanan, set in a former quarry that is now a place to visit and learn. |
| CTA utama | Rencanakan Kunjungan | Plan Your Visit |
| CTA sekunder | Jelajahi Cerita | Explore the Story |

### 5.2 Intro

| Field | ID | EN |
|---|---|---|
| Eyebrow | Tentang Tebing Breksi | About Tebing Breksi |
| Heading | Lebih dari sekadar tebing | More than a cliff |
| Isi | Tebing Breksi dahulu adalah lokasi penambangan batu. Setelah penambangan dihentikan, kawasan ini dikembangkan menjadi destinasi wisata dan edukasi bersama masyarakat Sambirejo. Batuannya merupakan endapan material vulkanik purba, dan kini menjadi bagian dari kawasan geoheritage di Daerah Istimewa Yogyakarta. | Tebing Breksi used to be a stone quarry. After quarrying stopped, the area was developed into a tourism and education destination together with the people of Sambirejo. Its rock is made of ancient volcanic deposits, and it is now part of a geoheritage area in the Special Region of Yogyakarta. |
| Tautan | Kenali sejarahnya | Learn its history |

> Frasa "bagian dari kawasan geoheritage" mengikuti redaksi situs resmi. Pertahankan terminologi pengelola (lihat PRD §6.1).

### 5.3 At a Glance (metrik)

| Nilai | Unit | Label ID | Label EN | Status awal |
|---|---|---|---|---|
| 20–36 | juta tahun | Rentang umur geologi menurut situs resmi | Geological age range per the official site | `draft` sampai ditinjau (lihat §6) |
| ±200 | mdpl | Ketinggian kawasan | Approximate elevation | `published` setelah sumber profil dicatat |
| ±1.000 | penonton | Kapasitas Tlatar Seneng (perkiraan) | Estimated Tlatar Seneng capacity | `draft` sampai kapasitas aktual dikonfirmasi |
| 2015 | tahun | Diresmikan sebagai destinasi wisata | Opened as a tourist destination | `published` (30 Mei 2015, situs resmi) |

### 5.4 Daya Tarik

| Kartu | Kategori | ID (ringkasan) | EN (summary) |
|---|---|---|---|
| Relief Wayang | Warisan | Pahatan bertema wayang pada dinding batu, hasil kerja pemahat setempat. | Wayang-themed carvings on the rock walls, made by local sculptors. |
| Tlatar Seneng | Venue | Panggung terbuka di kaki tebing untuk pertunjukan seni dan acara budaya. | An open-air stage at the foot of the cliff for arts performances and cultural events. |
| Panorama dan Sunset | Panorama | Titik pandang ke hamparan sekitar, ramai saat sore menjelang matahari terbenam. | Viewpoints over the surrounding landscape, popular in the late afternoon. |

> Detail "hasil kerja pemahat setempat" dan sejenisnya harus diverifikasi; hapus bila belum ada sumber.

### 5.5 Aktivitas

| Kartu | Kategori | ID | EN |
|---|---|---|---|
| Jeep Wisata | Jeep | Rute jeep di sekitar kawasan. Hubungi penyedia untuk rute dan ketersediaan. | Jeep tours around the area. Contact the provider for routes and availability. |
| Camping Watu Tapak | Camping | Area perkemahan dengan fasilitas camping. Konfirmasi ketersediaan sebelum datang. | A campground with camping facilities. Please confirm availability before you come. |
| Seni dan Budaya | Budaya | Pertunjukan dan kegiatan seni yang diadakan oleh masyarakat lokal. | Arts performances and activities organised by the local community. |
| Kuliner dan Belanja | Kuliner | Lapak kuliner dan produk lokal di kawasan wisata. | Food stalls and local products around the site. |
| Venue Event | Venue | Ruang untuk acara komunitas dan kelompok. Tanyakan ketersediaan lewat WhatsApp. | A space for community and group events. Ask about availability via WhatsApp. |
| Homestay dan Balkondes | Menginap | Pilihan menginap di sekitar desa. | Places to stay in the surrounding village. |

> Hindari menyebut harga, jam, atau rute spesifik di kartu. Detail itu hanya tampil bila `verified`.

### 5.6 Heritage Story (timeline awal)

| Periode | Judul ID | Deskripsi ID | EN |
|---|---|---|---|
| Sebelum wisata | Kawasan tambang batu | Masyarakat menambang batu dari tebing ini. | Local people quarried stone from this cliff. |
| 2014 | Penetapan geoheritage | Kawasan disebut sebagai salah satu geoheritage/geotapak DIY menurut materi situs resmi. | The area is described as one of DIY's geoheritage sites in the official site's materials. |
| 30 Mei 2015 | Peresmian destinasi wisata | Tebing Breksi diresmikan sebagai destinasi wisata. | Tebing Breksi officially opened as a tourist destination. |
| Setelahnya | Ruang wisata berkembang | Ditambahkan ruang wisata, kegiatan budaya, dan layanan masyarakat. | Tourism spaces, cultural activities and community services were added. |

### 5.7 Plan Your Visit

| Field | ID | EN |
|---|---|---|
| Heading | Rencanakan kunjungan Anda | Plan your visit |
| Alamat | Dusun Groyokan, Desa Sambirejo, Kecamatan Prambanan, Kabupaten Sleman, DI Yogyakarta | Groyokan Hamlet, Sambirejo Village, Prambanan District, Sleman Regency, Special Region of Yogyakarta |
| Tombol arah | Petunjuk Arah | Get Directions |
| Tombol WA | Hubungi via WhatsApp | Contact via WhatsApp |
| Tarif belum verifikasi | Konfirmasi tarif terbaru | Please confirm the latest fare |
| Jam belum verifikasi | Konfirmasi jam operasional | Please confirm opening hours |
| Label verifikasi | Terakhir diverifikasi: {tanggal} | Last verified: {date} |

### 5.8 Closing CTA

| Field | ID | EN |
|---|---|---|
| Headline | Siap menjelajah Tebing Breksi? | Ready to explore Tebing Breksi? |
| Isi | Lihat informasi kunjungan dan hubungi pengelola untuk detail terbaru. | See the visit information and contact the managers for the latest details. |
| Tombol | Rencanakan Kunjungan | Plan Your Visit |

### 5.9 Pesan WhatsApp Awal

| ID | EN |
|---|---|
| Halo, saya ingin bertanya tentang kunjungan ke Tebing Breksi. | Hello, I would like to ask about visiting Tebing Breksi. |

### 5.10 Meta SEO (draft)

| Halaman | Title | Description |
|---|---|---|
| Beranda ID | Tebing Breksi — Destinasi Geoheritage di Prambanan, Sleman | Jelajahi tebing batu vulkanik, relief wayang, dan panorama Tebing Breksi. Lihat informasi kunjungan dan rencanakan perjalanan Anda. |
| Beranda EN | Tebing Breksi — Geoheritage Destination in Prambanan, Sleman | Explore the volcanic rock cliff, wayang reliefs and views of Tebing Breksi. See visit information and plan your trip. |
| Info Kunjungan ID | Informasi Kunjungan Tebing Breksi: Lokasi, Tarif, dan Kontak | Alamat, petunjuk arah, tarif, jam, dan fasilitas Tebing Breksi. |
| Info Kunjungan EN | Visit Tebing Breksi: Location, Fares and Contact | Address, directions, fares, hours and facilities at Tebing Breksi. |

---

## 6. Sumber Fakta Geologi

Keputusan D-13: sumber geologi bebas diambil selama dicantumkan. Berikut temuan dari pencarian saya (belum saya baca penuh; verifikasi di sumber asli sebelum dikutip).

### 6.1 Ringkasan temuan

| Topik | Temuan literatur | Sumber |
|---|---|---|
| Lokasi singkapan | Tebing Breksi (Candi Ijo, Prambanan) adalah singkapan batuan vulkaniklastik menerus setinggi sekitar 12 m (menurut satu studi) | Penelitian UGM, *Stratigrafi Batuan Vulkaniklastik Tebing Breksi, Candi Ijo...* (etd.repository.ugm.ac.id/penelitian/detail/107615) |
| Jenis batuan | Batuan vulkanik resedimentasi piroklastik; diendapkan oleh arus debris dan turbidit; lingkungan laut neritik dalam; umur Miosen Awal | Sumber UGM di atas |
| Formasi | Bagian dari Formasi Semilir, Pegunungan Selatan Jawa; didominasi tuf, tuf lapili, dan breksi batuapung | Surono & Puspa (2007), *Formasi Semilir di Pegunungan Selatan, Jawa Tengah*, Proc. Joint Convention Bali 2007 (HAGI-IAGI-IATMI) |
| Umur Formasi Semilir (bervariasi) | Beberapa studi memberi umur Miosen Awal. Ada yang menyebut Oligosen Akhir–Miosen Awal. Penarikan U-Pb disebut sekitar 20 juta tahun. Jejak belah zirkon menunjukkan sekitar 16–17 juta tahun. Angka berbeda antar penelitian | Surono & Puspa (2007); tinjauan di jurnal ReTII (ITNY): journal.itny.ac.id (artikel 1985); Dinarek UNSOED (artikel 422) |
| Asal vulkanik | Formasi Semilir dikaitkan dengan aktivitas vulkanik sistem subduksi dan letusan besar gunung api Miosen | Surono & Puspa (2007); Dinarek UNSOED |

### 6.2 Dampak ke konten

1. **Rentang "20–36 juta tahun"** dari situs resmi **lebih lebar** daripada rentang yang saya temukan di literatur (±16–29 juta tahun menurut sumber-sumber di atas, tergantung metode dan lokasi). Karena itu:
   - Tampilkan sebagai "menurut situs resmi" dan beri tanda ⚠ di CMS, **atau**
   - Ganti menjadi redaksi yang lebih aman: "Terbentuk sekitar Miosen Awal (± puluhan juta tahun lalu)", dengan sumber akademik.
   - Putuskan bersama pembimbing/pengelola; sampai itu, metrik umur berstatus `draft` (tidak tampil).
2. **Istilah "abu vulkanik / gunung api purba"** pada situs resmi adalah penyederhanaan. Studi UGM menggambarkan endapan resedimentasi di lingkungan laut dangkal; jika ingin lebih akurat, gunakan "endapan material vulkanik" tanpa klaim detail.
3. **Tinggi singkapan 12 m** berasal dari satu studi lokal pada bagian tertentu, **jangan** disajikan sebagai tinggi seluruh tebing.
4. Setiap kutipan angka di website wajib menyertakan `source_title` + `source_url` di tabel `metrics`.

### 6.3 Ahli atau narasumber untuk review (jika diperlukan nanti)
Pengelola dan pemerintah Desa Sambirejo (sejarah lokal); Dinas Pariwisata Sleman/DIY (status geoheritage); Departemen Teknik Geologi UGM atau perguruan tinggi geologi lain (umur dan stratigrafi); Badan Geologi (ESDM). Minta pembimbing mengajukan satu pertanyaan sederhana: *"Apakah redaksi geologi ini boleh dipakai?"*

### 6.4 Cara mengutip
Di footer bagian geologi atau di halaman "Tentang", tampilkan "Sumber:" dengan tautan ke publikasi. Parafrase, jangan menyalin paragraf jurnal.

---

## 7. Rencana Foto

### 7.1 Status
Belum ada foto resmi/HD (D-05). Opsi, urut dari terbaik:

1. **Foto resmi dari pengelola** (dengan izin tertulis). Minta lewat pembimbing.
2. **Foto sendiri** di lokasi (tanya izin pengelola dulu; lokasi mudah dijangkau dari Yogyakarta). Anda bisa memotret pagi atau sore (golden hour), minimal 12 MP, orientasi landscape dan portrait.
3. **Foto berlisensi bebas** (Wikimedia Commons dengan lisensi yang membolehkan penggunaan komersial/atribusi) dengan kredit lengkap. Baca lisensinya satu per satu.
4. **Placeholder** (blok abu + label "Foto menyusul") untuk pengembangan. Tidak boleh ada di produksi.

Jangan memakai foto dari Google Images, media sosial, atau situs lain tanpa izin tertulis.

### 7.2 Daftar bidikan (shot list)

| # | Bidikan | Dipakai di | Format |
|---|---|---|---|
| 1 | Panorama tebing, cahaya hangat sore | Hero | Landscape 16:9 (+ crop 4:5) |
| 2 | Detail relief wayang | Kartu Daya Tarik 1 | 4:3 |
| 3 | Panggung Tlatar Seneng (kosong dan saat acara) | Kartu Daya Tarik 2, Venue | 4:3 |
| 4 | Pemandangan sunset dari atas | Kartu Daya Tarik 3 | 4:3 |
| 5 | Tekstur batu (tuf/breksi) close-up | Intro, At a Glance | 4:3 atau 3:4 |
| 6 | Pengunjung berjalan di tangga/teras (wajah tidak jelas) | Intro | 4:3 |
| 7 | Jeep di jalur | Aktivitas | 4:3 |
| 8 | Area camping Watu Tapak | Aktivitas | 4:3 |
| 9 | Kuliner/lapak lokal | Aktivitas | 4:3 |
| 10 | Foto sejarah/tambang lama (jika pengelola punya arsip) | Heritage | Bebas |
| 11 | Gambar OG 1200×630 | Berbagi sosial | 1200×630 |

**Etika:** hindari memotret wajah orang yang dapat dikenali tanpa izin; anak-anak khususnya.

### 7.3 Spesifikasi teknis
- Sumber minimal 2400 px sisi panjang untuk hero, 1200 px untuk kartu.
- Unggah JPEG berkualitas tinggi; backend mengonversi ke AVIF/WebP.
- Isi: alt text ID/EN, kredit, lisensi, focal point.

### 7.4 Contoh alt text
| Baik | Buruk |
|---|---|
| "Dinding batu Tebing Breksi dengan pahatan relief wayang" | "foto tebing" |
| "Panggung terbuka Tlatar Seneng di kaki tebing saat sore" | "IMG_2034.jpg" |

---

## 8. Checklist Konten Sebelum Launch

- [ ] Semua teks ID dan EN terisi dan sudah dibaca ulang.
- [ ] Tarif berstatus `verified` (atau teks "Konfirmasi tarif terbaru" tampil benar).
- [ ] Jam operasional: terverifikasi atau disembunyikan.
- [ ] Nomor WhatsApp diuji (klik → obrolan terbuka dengan nomor benar).
- [ ] Koordinat/peta diuji di perangkat nyata.
- [ ] Fakta geologi punya sumber; metrik umur sudah diputuskan.
- [ ] Setiap foto punya alt text, kredit, dan izin.
- [ ] Tidak ada placeholder foto di produksi.
- [ ] Kebijakan privasi terisi.
- [ ] Redaksi disetujui pembimbing/pengelola (bukti tertulis disimpan).
