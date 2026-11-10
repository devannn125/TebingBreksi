<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('metrics', function (Blueprint $table) {
            $table->id();
            $table->string('value'); // e.g. "20 – 36 JUTA", "± 200 MDPL", "2015"
            $table->string('label'); // e.g. "Tahun Umur Geologi"
            $table->string('subtext')->nullable(); // e.g. "Endapan Formasi Semilir"
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('metrics');
    }
};
