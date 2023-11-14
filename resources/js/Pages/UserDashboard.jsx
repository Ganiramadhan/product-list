import React from "react";
import UserLayout from "@/Layouts/UserLayout"; // Pastikan Anda telah mengimpor komponen yang benar
import { Head } from "@inertiajs/react";

export default function UserDashboard(props) {
    return (
        <UserLayout
            auth={props.auth}
            user={props.auth.user} // Jika Anda ingin menampilkan data pengguna, pastikan properti user tersedia di objek auth
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    User Dashboard
                </h2>
            }
        >
            <Head title="User Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            You're logged in as User!
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
