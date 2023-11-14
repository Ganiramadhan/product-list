import React from "react";
import AdminLayout from "@/Layouts/AdminLayout"; // Pastikan Anda telah mengimpor komponen yang benar
import { Head } from "@inertiajs/react";

export default function AdminDashboard(props) {
    return (
        <AdminLayout
            auth={props.auth}
            user={props.auth.user} // Jika Anda ingin menampilkan data pengguna, pastikan properti user tersedia di objek auth
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            You're logged in as Admin!
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
