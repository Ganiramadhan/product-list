import React, { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";

const CreateProduct = (props) => {
    const [isNotif, setIsNotif] = useState(!!props.flash.message);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const { products, categories } = usePage().props;
    const categoryMap = {};

    const formatRupiah = (angka) => {
        const numberFormat = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });

        return numberFormat.format(angka);
    };

    useEffect(() => {
        setIsNotif(!!props.flash.message);
        if (isNotif) {
            const notificationTimeout = setTimeout(() => {
                setIsNotif(false);
            }, 3000); // 2 detik

            return () => clearTimeout(notificationTimeout);
        }
    }, [props.flash.message, isNotif]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const destroy = (e) => {
        if (confirm("Apakah Anda yakin ingin menghapus Product ini?")) {
            router.delete(route("product.destroy", e.currentTarget.id));
        }
    };

    categories.forEach((category) => {
        categoryMap[category.id] = category.name;
    });

    const filteredProducts = products.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            categoryMap[item.category_id]
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <AdminLayout
            auth={props.auth}
            user={props.auth.user}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Products
                </h2>
            }
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {isNotif && (
                        <div className="alert alert-info mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{props.flash.message}</span>
                        </div>
                    )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <Link
                                tabIndex="1"
                                className="px-3 py-2 text-sm text-white bg-green-500 rounded "
                                href={route("product.create")}
                            >
                                <i
                                    className="fas fa-plus"
                                    style={{ marginRight: "4px" }}
                                />
                                Create New Product
                            </Link>

                            <div className="mb-4 mt-4">
                                <input
                                    type="text"
                                    placeholder="Search Product or Category"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>

                            {currentItems.length > 0 ? (
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="px-4 py-2 w-20">
                                                Nomor
                                            </th>
                                            <th className="py-2">Name</th>
                                            <th className="py-2">Category</th>
                                            <th className="px-4 py-2">Price</th>
                                            <th className="px-4 py-2">Stock</th>
                                            <th className="px-4 py-2">
                                                Picture
                                            </th>
                                            <th className="px-4 py-2">
                                                Description
                                            </th>
                                            <th className="px-4 py-2">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((item, index) => (
                                            <tr key={item.id}>
                                                <td className="border px-4 py-2">
                                                    {(currentPage - 1) *
                                                        itemsPerPage +
                                                        index +
                                                        1}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {item.name}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {categoryMap[
                                                        item.category_id
                                                    ] || "Tidak ada"}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {formatRupiah(item.price)}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {item.stock}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {item.description}
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
                                                        href={route(
                                                            "product.edit",
                                                            item.id
                                                        )}
                                                    >
                                                        <i
                                                            className="fas fa-edit"
                                                            style={{
                                                                marginRight:
                                                                    "4px",
                                                            }}
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
                                                            style={{
                                                                marginRight:
                                                                    "4px",
                                                            }}
                                                        />
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center text-gray-500 mt-4">
                                    No products found.
                                </div>
                            )}

                            <div className="join mt-8 ">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`join-item btn px-3 py-2 text-sm text-white rounded-md ${
                                        currentPage === 1
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-blue-500 hover:bg-blue-600"
                                    }`}
                                >
                                    Prev
                                </button>
                                <button className="join-item btn bg-blue-600 text-white hover:bg-blue-600">
                                    {currentPage}
                                </button>
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={` join-item btn px-3 py-2 text-sm text-white rounded-md ${
                                        currentPage === totalPages
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-blue-500 hover:bg-blue-600"
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default CreateProduct;
