<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Spatie\LaravelIgnition\Http\Requests\UpdateConfigRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        $products = Product::all();
        return Inertia::render('Product/index', ['products' => $products, 'categories' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Product/Create', ['categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric', // Ubah menjadi numeric untuk mendukung format desimal
            'image' => ['required', 'image'], // Pastikan gambar sesuai dengan aturan validasi yang Anda inginkan
            'stock' => 'required',
            'description' => 'required',
            'category_id' => 'required',
        ]);

        // Jika validasi gagal, kembalikan dengan pesan kesalahan
        if ($validator->fails()) {
            return redirect()->route('product.create')
                ->withErrors($validator)
                ->withInput();
        }

        // Jika validasi berhasil, simpan data produk dan gambar
        $imagePath = $request->file('image')->store('images', 'public');

        // Ubah tipe data harga menjadi integer sebelum menyimpan ke database
        $integerPrice = intval($request->input('price'));

        Product::create([
            'name' => $request->input('name'),
            'category_id' => $request->input('category_id'),
            'price' => $integerPrice,
            'description' => $request->input('description'),
            'stock' => $request->input('stock'),
            'image' => $imagePath, // Simpan nama gambar dalam database
        ]);

        return redirect()->route('product.index')->with('message', 'Data added successfully');
    }




    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::all();

        return Inertia::render('Product/Edit', [
            'categories' => $categories,
            'product' => $product,
            'oldImageUrl' => asset('storage/' . $product->image), // Mengirim URL gambar lama
        ]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $imagePath = $product->image;

        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            Storage::disk('public')->delete($imagePath);

            // Simpan gambar yang baru di storage
            $imagePath = $request->file('image')->store('images', 'public');
        }

        // Perbarui data produk
        $product->update([
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'category_id' => $request->input('category_id'),
            'description' => $request->input('description'),
            'stock' => $request->input('stock'),
            'price' => $request->input('price'),
            'image' => $imagePath,
        ]);


        return redirect()->route('product.index')->with('message', 'Data successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // Menghapus gambar dari penyimpanan sebelum menghapus data
        if ($product->image) {
            Storage::delete('public/' . $product->image);
        }

        // Menghapus data Menu
        $product->delete();

        return redirect()->route('product.index')->with('message', 'Data successfully deleted');
    }
}