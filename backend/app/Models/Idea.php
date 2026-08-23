<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Idea extends Model
{
    use HasUuids;

    protected $fillable = [
        'title',
        'angle',
        'content_pillar',
        'status',
    ];
}
