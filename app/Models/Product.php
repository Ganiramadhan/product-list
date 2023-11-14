<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'image',
        'stock',
        'category_id',
        'description'
    ];

    public function Category()
    {
        return $this->belongsTo(Category::class);
    }
}
