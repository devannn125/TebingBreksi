<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use App\Models\Metric;
use App\Models\Attraction;
use App\Models\Activity;
use App\Models\TimelineEvent;
use App\Models\TicketPrice;
use Illuminate\Http\JsonResponse;

class HomeController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'settings' => SiteSetting::first(),
                'metrics' => Metric::orderBy('order')->get(),
                'attractions' => Attraction::where('is_active', true)->orderBy('order')->get(),
                'activities' => Activity::where('is_active', true)->orderBy('order')->get(),
                'timeline' => TimelineEvent::orderBy('order')->get(),
                'tickets' => TicketPrice::orderBy('order')->get(),
            ],
        ]);
    }
}
