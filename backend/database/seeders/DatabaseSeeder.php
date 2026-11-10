<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\SiteSetting;
use App\Models\Metric;
use App\Models\Attraction;
use App\Models\Activity;
use App\Models\TimelineEvent;
use App\Models\TicketPrice;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin User
        User::updateOrCreate(
            ['email' => 'admin@tebingbreksi.com'],
            [
                'name' => 'Admin Tebing Breksi',
                'password' => Hash::make('password'),
            ]
        );

        // 2. Site Setting
        SiteSetting::updateOrCreate(
            ['id' => 1],
            [
                'name' => 'Tebing Breksi',
                'tagline' => 'Taman Wisata Alam & Geoheritage Yogyakarta',
                'address' => 'Dusun Groyokan, Desa Sambirejo, Kecamatan Prambanan, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55572.',
                'coordinates' => '-7.781668, 110.504588',
                'whatsapp_number' => '6281200000000',
                'instagram_handle' => '@tebingbreksi_official',
                'opening_hours_text' => 'Setiap Hari, 06.00 – 21.00 WIB (Waktu terbaik senja: 16.30 - 18.00)',
                'facilities' => 'Area Parkir Luas, Mushola, Toilet, Gazebo, Kios Kuliner & Oleh-oleh.',
            ]
        );

        // 3. Metrics
        Metric::truncate();
        Metric::insert([
            [
                'value' => '20 – 36 JUTA',
                'label' => 'Tahun Umur Geologi',
                'subtext' => 'Endapan Formasi Semilir',
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'value' => '± 200 MDPL',
                'label' => 'Ketinggian dari Permukaan Laut',
                'subtext' => 'Dari Permukaan Air Laut',
                'order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'value' => '2015',
                'label' => 'Diresmikan Sebagai Wisata',
                'subtext' => '30 Mei 2015 oleh Sri Sultan HB X',
                'order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // 4. Attractions
        Attraction::truncate();
        Attraction::insert([
            [
                'title' => 'Relief Wayang',
                'category' => 'Karya Seni Cadas',
                'desc' => 'Pahatan seni wayang dan ornamen tradisional yang diukir langsung pada dinding batu kapur oleh seniman lokal.',
                'image' => '/images/Relief.png',
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Tlatar Seneng',
                'category' => 'Amfiteater Terbuka',
                'desc' => 'Amfiteater terbuka berundak melingkar, panggung utama konser musik, festival budaya, dan pertunjukan seni.',
                'image' => '/images/Tlatar-Seneng.png',
                'order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Senja dari Puncak',
                'category' => 'Panorama Alam',
                'desc' => 'Pemandangan matahari terbenam spektakuler dengan latar lanskap Gunung Merapi dan megahnya Candi Prambanan.',
                'image' => '/images/Senja.png',
                'order' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // 5. Activities
        Activity::truncate();
        Activity::insert([
            [
                'title' => 'Jeep Adventure',
                'category' => 'Wisata Petualangan',
                'desc' => 'Sensasi offroad seru menyusuri rute perbukitan kapur dan candi-candi sekitar.',
                'image' => 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Camping Watu Tapak',
                'category' => 'Bermalam di Alam',
                'desc' => 'Bermalam di area camping dengan pemandangan lampu kota Jogja dari ketinggian bukit.',
                'image' => 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
                'order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Seni & Budaya',
                'category' => 'Pentas Seni Tradisi',
                'desc' => 'Pertunjukan tari tradisional, atraksi musik, dan agenda festival budaya Sambirejo.',
                'image' => 'https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?auto=format&fit=crop&w=800&q=80',
                'order' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Kuliner & Belanja',
                'category' => 'UMKM Lokal',
                'desc' => 'Menikmati aneka kuliner khas pedesaan Jogja serta suvenir kerajinan UMKM lokal.',
                'image' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
                'order' => 4,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // 6. Timeline Events
        TimelineEvent::truncate();
        TimelineEvent::insert([
            [
                'year' => '2014',
                'title' => 'Penetapan Kawasan Geoheritage',
                'desc' => 'Kawasan ditetapkan sebagai situs geoheritage penting Daerah Istimewa Yogyakarta oleh Badan Geologi.',
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'year' => '30 Mei 2015',
                'title' => 'Peresmian Destinasi Wisata',
                'desc' => 'Tebing Breksi diresmikan sebagai destinasi wisata alam dan budaya oleh Sri Sultan Hamengku Buwono X.',
                'order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'year' => '2016+',
                'title' => 'Ruang Budaya & Konservasi',
                'desc' => 'Pembangunan panggung terbuka Tlatar Seneng dan pemahatan dinding batu menjadi ikon kesenian terbuka.',
                'order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // 7. Ticket Prices
        TicketPrice::truncate();
        TicketPrice::insert([
            [
                'visitor_type' => 'Wisatawan Nusantara (WNI)',
                'weekday_price' => 10000,
                'weekend_price' => 15000,
                'status' => 'verified',
                'effective_until' => now()->addDays(180),
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'visitor_type' => 'Wisatawan Mancanegara (WNA)',
                'weekday_price' => 20000,
                'weekend_price' => 30000,
                'status' => 'verified',
                'effective_until' => now()->addDays(180),
                'order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
