import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Category(props) {
    const [isNotif, setIsNotif] = useState(!!props.flash.message);

    console.log("MY PROPS :", props);
    const { categories } = usePage().props;

    function destroy(e) {
        if (confirm("Apakah Anda yakin ingin menghapus Product ini?")) {
            router.delete(route("category.destroy", e.currentTarget.id));
        }
    }

    useEffect(() => {
        setIsNotif(!!props.flash.message);
        if (isNotif) {
            const notificationTimeout = setTimeout(() => {
                setIsNotif(false);
            }, 3000); //  detik

            return () => clearTimeout(notificationTimeout);
        }
    }, [props.flash.message]);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            user={props.auth.user}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Category
                </h2>
            }
        >
            <Head title="Category" />

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
                                className="px-3 py-2 text-sm text-white bg-green-500 rounded"
                                href={route("category.create")}
                            >
                                <i
                                    className="fas fa-plus"
                                    style={{ marginRight: "4px" }}
                                />
                                Create New Category
                            </Link>
                            <table className="w-full mt-4">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 w-20">
                                            Nomor
                                        </th>
                                        <th className="py-2">Name</th>
                                        <th className="px-4 py-2">
                                            Description
                                        </th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((item, index) => (
                                        <tr key={item.id}>
                                            <td className="border px-4 py-2">
                                                {index + 1}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {item.name}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {item.description}
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
                                                        "category.edit",
                                                        item.id
                                                    )}
                                                >
                                                    <i
                                                        className="fas fa-edit"
                                                        style={{
                                                            marginRight: "4px",
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
                                                            marginRight: "4px",
                                                        }}
                                                    />
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
