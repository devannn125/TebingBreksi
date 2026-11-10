<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ticket_prices', function (Blueprint $table) {
            $table->id();
            $table->string('visitor_type'); // e.g. Wisatawan Nusantara (WNI), Mancanegara (WNA)
            $table->integer('weekday_price');
            $table->integer('weekend_price');
            $table->string('status')->default('verified'); // verified, pending_confirmation, expired
            $table->date('effective_until')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ticket_prices');
    }
};
