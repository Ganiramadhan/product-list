import { Link, router, usePage } from "@inertiajs/react";
import React from "react";

export default function Product() {
    const { products } = usePage().props;

    const formatRupiah = (angka) => {
        const numberFormat = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });

        return numberFormat.format(angka);
    };

    function destroy(e) {
        if (confirm("Apakah Anda yakin ingin menghapus Product ini?")) {
            router.delete(route("product.destroy", e.currentTarget.id));
        }
    }

    return (
        <div>
            <h2 className="font-semibold text-xl text-gray-700 leading-tight m-4">
                Products
            </h2>
            <hr />
            <div className="m-4">
                <Link
                    tabIndex="1"
                    className="px-3 py-2 text-sm text-white bg-green-500 rounded"
                    href={route("product.create")} // Pastikan route ini benar
                >
                    <i className="fas fa-plus" style={{ marginRight: "4px" }} />
                    Create New Product
                </Link>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 w-20">Id</th>
                        <th className="py-2">Name</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Image Telepon</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr key={item.id}>
                            <td className="border px-4 py-2">{item.id}</td>
                            <td className="border px-4 py-2">{item.name}</td>
                            <td className="border px-4 py-2">
                                {formatRupiah(item.price)}
                            </td>
                            <td className="border px-4 py-2">
                                <img
                                    src={`/storage/${item.image}`}
                                    alt={item.name}
                                    style={{
                                        maxWidth: "100px",
                                    }}
                                />
                            </td>
                            <td
                                className="border px-4 py-2"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Link
                                    tabIndex="1"
                                    className="px-3 py-2 text-sm text-white bg-blue-500 rounded"
                                    href={route("product.edit", item.id)}
                                >
                                    <i
                                        className="fas fa-edit"
                                        style={{ marginRight: "4px" }}
                                    />
                                    Edit
                                </Link>
                                <button
                                    onClick={destroy}
                                    id={item.id}
                                    tabIndex="-1"
                                    type="button"
                                    className="mx-1 px-3 py-2 text-sm text-white bg-red-500 rounded"
                                >
                                    <i
                                        className="fas fa-trash"
                                        style={{ marginRight: "4px" }}
                                    />
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
