// Import yang diperlukan
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";

export default function CreateProduct(props) {
    const [imagePreview, setImagePreview] = useState(null);

    const { categories } = usePage().props;
    const { data, setData, errors, post } = useForm({
        name: "",
        category_id: "",
        stock: "",
        price: "",
        description: "",
        image: null,
    });

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

    function parseRupiah(input) {
        const cleanedInput = input.replace(/[^\d]/g, "");
        return cleanedInput !== "" ? parseFloat(cleanedInput) : null;
    }

    function formatRupiah(amount) {
        const formatter = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });
        return formatter.format(amount);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const priceToSend = data.price;

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("category_id", data.category_id);
        formData.append("stock", data.stock);
        formData.append("description", data.description);
        formData.append("price", priceToSend);
        formData.append("image", data.image);

        post(route("product.store"), {
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onSuccess: () => {
                setData({
                    name: "",
                    category: "",
                    stock: "",
                    price: "",
                    description: "",
                    image: null,
                });
            },
        });
    }

    return (
        <AdminLayout
            auth={props.auth}
            user={props.auth.user}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Product
                </h2>
            }
        >
            <Head title="Create Product" />

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
                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                            type="number"
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
                                            value={
                                                data.price !== ""
                                                    ? formatRupiah(data.price)
                                                    : ""
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "price",
                                                    parseRupiah(e.target.value)
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
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="mt-2 max-w-20"
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Save
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
