<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketPrice extends Model
{
    protected $guarded = [];

    protected $casts = [
        'effective_until' => 'date',
    ];
}
