<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('name')->default('Tebing Breksi');
            $table->string('tagline')->nullable()->default('Taman Wisata Alam & Geoheritage Yogyakarta');
            $table->text('address')->nullable();
            $table->string('coordinates')->nullable()->default('-7.781668, 110.504588');
            $table->string('whatsapp_number')->nullable()->default('6281200000000');
            $table->string('instagram_handle')->nullable()->default('@tebingbreksi_official');
            $table->string('opening_hours_text')->nullable()->default('Setiap Hari, 06.00 – 21.00 WIB');
            $table->text('facilities')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
