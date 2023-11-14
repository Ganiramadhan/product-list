// Import yang diperlukan
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, usePage, Link, router } from "@inertiajs/react";
import React from "react";

export default function EditCategory(props) {
    const { category } = usePage().props;
    const { data, setData, errors } = useForm({
        name: category.name || "",
        description: category.description || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("category.update", category.id), {
            ...data,
            _method: "put",
            forceFormData: true,
        });
    };

    return (
        <AdminLayout
            auth={props.auth}
            errors={props.errors}
            user={props.auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Category
                </h2>
            }
        >
            <Head title="Category" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("category.index")}
                                >
                                    Back
                                </Link>
                            </div>

                            <form
                                name="editForm"
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
                                            placeholder="Category Name"
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
