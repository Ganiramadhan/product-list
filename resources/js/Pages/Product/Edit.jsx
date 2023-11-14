import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, usePage, Link, router } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

// Fungsi untuk mengonversi format rupiah ke angka
function parseRupiah(input) {
    const cleanedInput = input.replace(/[^\d]/g, "");
    // Parse nilai float dari input yang telah dibersihkan
    return cleanedInput !== "" ? parseFloat(cleanedInput) : 0;
}

// Fungsi untuk mengonversi harga ke format rupiah
function formatRupiah(amount) {
    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0, // Ubah ke 0 jika tidak ingin menampilkan desimal
    });
    return formatter.format(amount);
}

export default function EditProduct(props) {
    const [imagePreview, setImagePreview] = useState(props.oldImageUrl);

    const { categories } = usePage().props;
    const { product } = usePage().props;
    const { data, setData, processing, errors, reset } = useForm({
        name: product.name || "",
        category_id: product.category_id || "", // Menambahkan field category
        stock: product.stock || "", // Menambahkan field stock
        price: formatRupiah(product.price) || "",
        description: product.description || "", // Menambahkan field description
        image: null,
    });

    useEffect(() => {
        if (data.image === null && props.oldImageUrl) {
            setImagePreview(props.oldImageUrl);
        }
    }, [data.image, props.oldImageUrl]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Hapus format mata uang sebelum mengirimkan harga ke server
        const cleanedPrice = parseRupiah(data.price);
        router.post(route("product.update", product.id), {
            ...data,
            price: cleanedPrice, // Mengirimkan data numerik ke server
            _method: "put",
            forceFormData: true,
        });
    };

    function handleImageChange(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
            setData("image", file);
        }
    }

    return (
        <AdminLayout
            auth={props.auth}
            errors={props.errors}
            user={props.auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Product
                </h2>
            }
        >
            <Head title="Product" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("product.index")}
                                >
                                    Back
                                </Link>
                            </div>

                            <form
                                name="createForm"
                                onSubmit={handleSubmit}
                                encType="multipart/form-data"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="form-control">
                                        <label htmlFor="name" className="label">
                                            <span className="label-text">
                                                Name
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="input input-bordered"
                                            placeholder="Product Name"
                                            name="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.name}
                                        </span>
                                    </div>

                                    <div className="form-control">
                                        <label
                                            htmlFor="category"
                                            className="label"
                                        >
                                            <span className="label-text">
                                                Category
                                            </span>
                                        </label>
                                        <select
                                            id="category"
                                            className="input input-bordered"
                                            name="category_id"
                                            value={data.category_id}
                                            onChange={(e) =>
                                                setData(
                                                    "category_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select Category
                                            </option>
                                            {categories.map((category) => (
                                                <option
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="text-red-600">
                                            {errors.category_id}
                                        </span>
                                    </div>

                                    <div className="form-control">
                                        <label
                                            htmlFor="stock"
                                            className="label"
                                        >
                                            <span className="label-text">
                                                Stock
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            id="stock"
                                            className="input input-bordered"
                                            placeholder="Stock"
                                            name="stock"
                                            value={data.stock}
                                            onChange={(e) =>
                                                setData("stock", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.stock}
                                        </span>
                                    </div>

                                    <div className="form-control">
                                        <label
                                            htmlFor="price"
                                            className="label"
                                        >
                                            <span className="label-text">
                                                Price
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            id="price"
                                            className="input input-bordered"
                                            placeholder="Price"
                                            name="price"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData(
                                                    "price",
                                                    formatRupiah(
                                                        parseRupiah(
                                                            e.target.value
                                                        )
                                                    )
                                                )
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.price}
                                        </span>
                                    </div>

                                    <div className="form-control">
                                        <label
                                            htmlFor="description"
                                            className="label"
                                        >
                                            <span className="label-text">
                                                Description
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            id="description"
                                            className="input input-bordered"
                                            placeholder="Description"
                                            name="description"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.description}
                                        </span>
                                    </div>

                                    <div className="form-control">
                                        <label
                                            htmlFor="image"
                                            className="label"
                                        >
                                            <span className="label-text">
                                                Image
                                            </span>
                                        </label>
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                        <span className="text-red-600">
                                            {errors.image}
                                        </span>
                                        {imagePreview && (
                                            <div className="mb-4">
                                                <img
                                                    src={imagePreview}
                                                    alt="Old Preview"
                                                    className="max-w-xs w-full"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
