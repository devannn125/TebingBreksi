import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  ArrowRight, 
  Menu, 
  X, 
  Navigation
} from 'lucide-react';

const DEFAULT_SETTINGS = {
  name: 'Tebing Breksi',
  tagline: 'Taman Wisata Alam & Geoheritage Yogyakarta',
  address: 'Dusun Groyokan, Desa Sambirejo, Kecamatan Prambanan, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55572.',
  coordinates: '-7.781668, 110.504588',
  whatsapp_number: '6281200000000',
  instagram_handle: '@tebingbreksi_official',
  opening_hours_text: 'Buka setiap hari: 06.00 – 21.00 WIB (Waktu terbaik senja: 16.30 - 18.00)',
  facilities: 'Area Parkir Luas, Mushola, Toilet, Gazebo, Kios Kuliner & Oleh-oleh.',
};

const resolveImage = (path, defaultImg) => {
  if (!path) return defaultImg;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) {
    return path;
  }
  return `http://127.0.0.1:8000/storage/${path.replace(/^\//, '')}`;
};

const formatRupiah = (val) => {
  if (val === null || val === undefined || isNaN(val)) return '';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(val);
};

const DEFAULT_METRICS = [
  { value: '20 – 36 JUTA', label: 'Tahun Umur Geologi', subtext: 'Endapan Formasi Semilir' },
  { value: '± 200 MDPL', label: 'Ketinggian dari Permukaan Laut', subtext: 'Dari Permukaan Air Laut' },
  { value: '2015', label: 'Diresmikan Sebagai Wisata', subtext: '30 Mei 2015 oleh Sri Sultan HB X' },
];

const DEFAULT_ATTRACTIONS = [
  {
    title: 'Relief Wayang',
    desc: 'Pahatan seni wayang dan ornamen tradisional yang diukir langsung pada dinding batu kapur oleh seniman lokal.',
    image: '/images/Relief.png',
  },
  {
    title: 'Tlatar Seneng',
    desc: 'Amfiteater terbuka berundak melingkar, panggung utama konser musik, festival budaya, dan pertunjukan seni.',
    image: '/images/Tlatar-Seneng.png',
  },
  {
    title: 'Senja dari Puncak',
    desc: 'Pemandangan matahari terbenam spektakuler dengan latar lanskap Gunung Merapi dan megahnya Candi Prambanan.',
    image: '/images/Senja.png',
  },
];

const DEFAULT_ACTIVITIES = [
  {
    title: 'Jeep Adventure',
    desc: 'Sensasi offroad seru menyusuri rute perbukitan kapur dan candi-candi sekitar.',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Camping Watu Tapak',
    desc: 'Bermalam di area camping dengan pemandangan lampu kota Jogja dari ketinggian bukit.',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Seni & Budaya',
    desc: 'Pertunjukan tari tradisional, atraksi musik, dan agenda festival budaya Sambirejo.',
    image: 'https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Kuliner & Belanja',
    desc: 'Menikmati aneka kuliner khas pedesaan Jogja serta suvenir kerajinan UMKM lokal.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  },
];

const DEFAULT_TIMELINE = [
  {
    year: '2014',
    desc: 'Kawasan ditetapkan sebagai situs geoheritage penting Daerah Istimewa Yogyakarta oleh Badan Geologi.',
  },
  {
    year: '30 Mei 2015',
    desc: 'Tebing Breksi diresmikan sebagai destinasi wisata alam dan budaya oleh Sri Sultan Hamengku Buwono X.',
  },
  {
    year: '2016+',
    desc: 'Pembangunan panggung terbuka Tlatar Seneng dan pemahatan dinding batu menjadi ikon kesenian terbuka.',
  },
];

const NAV_LINKS = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Daya Tarik', href: '#daya-tarik' },
  { label: 'Aktivitas', href: '#aktivitas' },
  { label: 'Sejarah', href: '#sejarah' },
  { label: 'Kunjungan', href: '#kunjungan' },
];

export default function App() {
  const navLinks = NAV_LINKS;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [metrics, setMetrics] = useState(DEFAULT_METRICS);
  const [attractions, setAttractions] = useState(DEFAULT_ATTRACTIONS);
  const [activities, setActivities] = useState(DEFAULT_ACTIVITIES);
  const [timelineEvents, setTimelineEvents] = useState(DEFAULT_TIMELINE);
  const [ticketPrices, setTicketPrices] = useState([
    { visitor_type: 'Wisatawan Nusantara (WNI)', weekday_price: 10000, weekend_price: 15000 },
    { visitor_type: 'Wisatawan Mancanegara (WNA)', weekday_price: 20000, weekend_price: 30000 },
  ]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/home')
      .then((res) => res.json())
      .then((res) => {
        if (res?.data) {
          if (res.data.settings) setSettings(res.data.settings);
          if (res.data.metrics?.length) setMetrics(res.data.metrics);
          if (res.data.attractions?.length) setAttractions(res.data.attractions);
          if (res.data.activities?.length) setActivities(res.data.activities);
          if (res.data.timeline?.length) setTimelineEvents(res.data.timeline);
          if (res.data.tickets?.length) setTicketPrices(res.data.tickets);
        }
      })
      .catch(() => {
        // Graceful fallback to default static data when backend is not reached
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#1A1A1A] font-sans antialiased selection:bg-[#B57E38] selection:text-white">
      
      {/* =========================================================================
          1. HEADER & NAVBAR (No logo icon, clean Poppins typography, gold button)
      ========================================================================= */}
      <header className="absolute top-0 inset-x-0 z-50 text-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
          
          {/* Brand Text Only (NO LOGO ICON) */}
          <a href="#beranda" className="text-xl sm:text-2xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity">
            {settings?.name || 'Tebing Breksi'}
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/90">
            {navLinks.map((item) => (
              <a 
                key={item.label}
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action: Gold/Caramel Button (Matching Mockup) */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="#kunjungan"
              className="px-5 py-2.5 rounded-full bg-[#B57E38] hover:bg-[#A16D2C] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:translate-y-0.5"
            >
              Rencanakan
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-black/30 backdrop-blur-sm text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black/90 backdrop-blur-md px-6 py-6 space-y-4 border-b border-white/10">
            <div className="flex flex-col space-y-3">
              {navLinks.map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-white/90 hover:text-[#B57E38]"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="pt-2">
              <a 
                href="#kunjungan"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-4 py-2.5 rounded-full bg-[#B57E38] text-white text-xs font-bold uppercase tracking-wider"
              >
                Rencanakan Kunjungan
              </a>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          2. HERO SECTION ("Jelajahi Jejak Bumi Purba" - Exact Layout in Mockup)
      ========================================================================= */}
      <section id="beranda" className="relative min-h-[90vh] sm:min-h-screen flex items-end pb-24 sm:pb-32 overflow-hidden bg-black">
        {/* Full Landscape Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/Hero.jpg" 
            alt="Pemandangan tebing cadas dan amfiteater Tebing Breksi saat senja"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient overlay to ensure perfect readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30" />
        </div>

        {/* Hero Text matching mockup */}
        <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl text-white">
            <p className="text-xl sm:text-2xl font-medium tracking-wide drop-shadow mb-1">
              Jelajahi Jejak
            </p>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight drop-shadow-lg leading-tight mb-6">
              Bumi Purba
            </h1>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. AT A GLANCE (Deep Forest Green Bar matching Mockup)
      ========================================================================= */}
      <section className="bg-[#1E5638] text-white py-9">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 text-center">
            {metrics.map((item, idx) => (
              <div 
                key={item.label || idx} 
                className={`px-4 ${idx === 1 ? 'md:border-x md:border-white/20' : ''}`}
              >
                <div className="text-3xl sm:text-4xl font-bold tracking-tight">
                  {item.value}
                </div>
                <p className="text-xs sm:text-sm font-medium text-white/90 mt-1">
                  {item.label}
                </p>
                {item.subtext && (
                  <p className="text-[11px] text-white/60 mt-0.5">
                    {item.subtext}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. INTRO SECTION ("Dari bekas tambang, menjadi warisan yang hidup.")
      ========================================================================= */}
      <section id="tentang" className="py-20 lg:py-28 bg-[#F8F6F0]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Text */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] leading-snug">
                Dari bekas tambang, menjadi warisan yang hidup.
              </h2>
              
              <p className="text-sm sm:text-base text-[#4D4D4D] leading-relaxed">
                Tebing Breksi dahulu adalah lokasi penambangan batu kapur oleh masyarakat sekitar. Setelah penambangan dihentikan demi menjaga kelestarian alam dan geologi purba, kawasan ini bertransformasi menjadi ruang seni dan edukasi.
              </p>

              <p className="text-sm sm:text-base text-[#4D4D4D] leading-relaxed">
                Kini, sisa dinding tebing yang dipahat menjadi kanvas mahakarya seni cadas lokal yang memukau ribuan pengunjung setiap tahunnya.
              </p>

              <div className="pt-2">
                <a 
                  href="#sejarah" 
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A1A1A] hover:text-[#B57E38] transition-colors"
                >
                  Kenali Sejarahnya
                  <ArrowRight className="w-4 h-4 text-[#B57E38]" />
                </a>
              </div>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden shadow-lg aspect-[4/3] bg-neutral-200">
                <img 
                  src="/images/Relief.png" 
                  alt="Relief ukiran naga pada dinding batu kapur Tebing Breksi"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          5. DAYA TARIK ("Satu Kawasan, Banyak Cerita" - 3 Cards with Overlay)
      ========================================================================= */}
      <section id="daya-tarik" className="py-20 lg:py-28 bg-[#FFFFFF]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Heading */}
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              Satu Kawasan, Banyak Cerita
            </h2>
            <p className="text-sm text-[#666666] mt-3">
              Jelajahi keindahan batuan, karya seni cadas, dan panorama matahari terbenam.
            </p>
          </div>

          {/* 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {attractions.map((item) => (
              <div 
                key={item.title}
                className="relative rounded-xl overflow-hidden shadow-md aspect-[3/4] flex items-end p-6 group"
              >
                {/* Image Background */}
                <img 
                  src={resolveImage(item.image, '/images/Relief.png')} 
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Text on Image */}
                <div className="relative z-10 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. AKTIVITAS ("Jelajahi Tebing Breksi Dengan Caramu" - 2x2 Grid)
      ========================================================================= */}
      <section id="aktivitas" className="py-20 lg:py-28 bg-[#F8F6F0]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Heading */}
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              Jelajahi Tebing Breksi Dengan Caramu
            </h2>
            <p className="text-xs uppercase font-semibold text-[#888888] tracking-widest mt-2">
              Aktivitas wisata untuk semua kalangan
            </p>
            <p className="text-xs sm:text-sm text-[#666666] mt-2">
              Temukan pengalaman liburan seru mulai dari offroad perbukitan hingga malam hangat berkemah.
            </p>
          </div>

          {/* 2x2 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {activities.map((act) => (
              <div 
                key={act.title}
                className="relative rounded-xl overflow-hidden shadow-md min-h-[220px] sm:min-h-[260px] flex items-end p-6 sm:p-8 group"
              >
                {/* Background Image */}
                <img 
                  src={resolveImage(act.image, 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80')} 
                  alt={act.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

                {/* Text Content */}
                <div className="relative z-10 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-1">
                    {act.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {act.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. HERITAGE / TIMELINE ("Ketika alam, manusia dan budaya bertemu.")
          Full image bleed on the left side
      ========================================================================= */}
      <section id="sejarah" className="bg-[#FFFFFF] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px] lg:min-h-[640px]">
          
          {/* Left: Full-bleed Photo covering the entire left side */}
          <div className="lg:col-span-5 relative min-h-[360px] sm:min-h-[460px] lg:min-h-full w-full">
            <img 
              src="/images/Tlatar-Seneng.png" 
              alt="Dinding batuan cadas dan amfiteater Tebing Breksi"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>

          {/* Right Text & Timeline */}
          <div className="lg:col-span-7 py-14 sm:py-20 px-6 sm:px-12 lg:px-16 flex flex-col justify-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] leading-snug">
              Ketika alam, manusia dan budaya bertemu.
            </h2>
            
            <p className="text-sm sm:text-base text-[#4D4D4D] leading-relaxed max-w-xl">
              Dari endapan material vulkanik purba hingga menjadi destinasi wisata kreatif yang menyejahterakan masyarakat sekitar. Inilah jejak perjalanan bagaimana batuan cadas tambang bertransformasi menjadi geoheritage kebanggaan Yogyakarta.
            </p>

            {/* Timeline List */}
            <div className="mt-8 space-y-6 pt-4 border-t border-neutral-200 max-w-xl">
              {timelineEvents.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
                  <span className="sm:col-span-4 text-sm font-bold text-[#1A1A1A]">
                    {item.year}
                  </span>
                  <p className="sm:col-span-8 text-xs sm:text-sm text-[#4D4D4D] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          8. PLAN YOUR VISIT ("Temukan Tebing Breksi" - Left Info, Right Map)
      ========================================================================= */}
      <section id="kunjungan" className="py-20 lg:py-28 bg-[#F8F6F0]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Heading */}
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              Temukan Tebing Breksi
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Information */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Alamat */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A]">
                  {settings?.name || 'Tebing Breksi Prambanan'}
                </h3>
                <p className="text-xs sm:text-sm text-[#4D4D4D] mt-1 leading-relaxed">
                  {settings?.address || 'Dusun Groyokan, Desa Sambirejo, Kecamatan Prambanan, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55572.'}
                </p>
                {settings?.coordinates && (
                  <p className="text-[11px] text-[#666666] mt-0.5">
                    Titik Koordinat: {settings.coordinates}
                  </p>
                )}
              </div>

              {/* Detail Kunjungan */}
              <div className="space-y-4 pt-2">
                <h4 className="text-sm font-bold text-[#1A1A1A]">
                  Informasi Kunjungan
                </h4>

                <div>
                  <span className="text-xs font-semibold text-[#1A1A1A] block">Tarif Tiket:</span>
                  <div className="space-y-1 mt-1">
                    {ticketPrices.length > 0 ? (
                      ticketPrices.map((ticket, idx) => (
                        <p key={ticket.id || idx} className="text-xs sm:text-sm text-[#4D4D4D]">
                          <span className="font-medium text-[#1A1A1A]">{ticket.visitor_type}:</span> {formatRupiah(ticket.weekday_price)}
                          {ticket.weekend_price ? ` (Hari Libur: ${formatRupiah(ticket.weekend_price)})` : ''}
                        </p>
                      ))
                    ) : (
                      <p className="text-xs sm:text-sm text-[#4D4D4D]">
                        Rp 10.000 (Wisatawan WNI) / Rp 20.000 (Wisatawan WNA)
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-[#1A1A1A] block">Jam Buka:</span>
                  <p className="text-xs sm:text-sm text-[#4D4D4D]">
                    {settings?.opening_hours_text || 'Buka setiap hari: 06.00 – 21.00 WIB (Waktu terbaik senja: 16.30 - 18.00)'}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-semibold text-[#1A1A1A] block">Fasilitas:</span>
                  <p className="text-xs sm:text-sm text-[#4D4D4D]">
                    {settings?.facilities || 'Area Parkir Luas, Mushola, Toilet, Gazebo, Kios Kuliner & Oleh-oleh.'}
                  </p>
                </div>
              </div>

              {/* Gold Button matching Mockup */}
              <div className="pt-2">
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(settings?.coordinates || '-7.781668,110.504588')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#B57E38] hover:bg-[#A16D2C] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Petunjuk Arah
                </a>
              </div>

            </div>

            {/* Right: Live Interactive Google Map Embed */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-neutral-200">
                <div className="w-full h-[360px] sm:h-[420px] rounded-lg overflow-hidden relative bg-[#F2EFE9]">
                  <iframe 
                    title="Google Map Lokasi Tebing Breksi"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.078235882672!2d110.50201307588147!3d-7.781667992238056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5a8a183d2d9d%3A0x8979c5957d19c0b1!2sTebing%20Breksi!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
                <div className="mt-3 px-2 flex items-center justify-between text-xs text-[#666666]">
                  <span>Peta Langsung Google Maps</span>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(settings?.coordinates || '-7.781668,110.504588')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-semibold text-[#B57E38] hover:underline"
                  >
                    Buka Rute Navigasi ↗
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          9. FOOTER (Pure Black, Text-only Brand, No Logo Icon)
      ========================================================================= */}
      <footer className="bg-black text-white py-14 border-t border-neutral-900">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-800">
            
            {/* Identity Text Only (NO LOGO ICON) */}
            <div className="space-y-3 md:col-span-1">
              <h3 className="text-xl font-bold tracking-tight text-white">
                {settings?.name || 'Tebing Breksi'}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {settings?.tagline || 'Taman Wisata Alam & Geoheritage Yogyakarta.'}
              </p>
            </div>

            {/* Navigasi */}
            <div>
              <h4 className="text-xs uppercase font-semibold text-neutral-400 mb-3 tracking-wider">
                Navigasi
              </h4>
              <ul className="space-y-2 text-xs text-neutral-300">
                {navLinks.slice(0, 4).map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Informasi */}
            <div>
              <h4 className="text-xs uppercase font-semibold text-neutral-400 mb-3 tracking-wider">
                Informasi
              </h4>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li><a href="#kunjungan" className="hover:text-white transition-colors">Tiket & Jam Buka</a></li>
                <li><a href="#kunjungan" className="hover:text-white transition-colors">Petunjuk Arah</a></li>
                <li><a href="#sejarah" className="hover:text-white transition-colors">Cerita Sejarah</a></li>
              </ul>
            </div>

            {/* Kontak */}
            <div>
              <h4 className="text-xs uppercase font-semibold text-neutral-400 mb-3 tracking-wider">
                Kontak
              </h4>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li>{settings?.address ? (settings.address.length > 40 ? settings.address.substring(0, 40) + '...' : settings.address) : 'Sambirejo, Prambanan, Sleman'}</li>
                <li>Instagram: {settings?.instagram_handle || '@tebingbreksi_official'}</li>
                {settings?.whatsapp_number && (
                  <li>WhatsApp: +{settings.whatsapp_number}</li>
                )}
                <li>{settings?.opening_hours_text ? (settings.opening_hours_text.length > 30 ? settings.opening_hours_text.substring(0, 30) + '...' : settings.opening_hours_text) : 'Buka: 06.00 – 21.00 WIB'}</li>
              </ul>
            </div>

          </div>

          {/* Copyright */}
          <div className="pt-8 text-center text-xs text-neutral-500">
            © 2026 Pengelola Taman Wisata Tebing Breksi. Seluruh hak cipta dilindungi.
          </div>

        </div>
      </footer>

    </div>
  );
}
