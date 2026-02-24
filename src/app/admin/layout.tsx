import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import Link from "next/link";
import { headers, cookies } from "next/headers";
import AdminNotifications from "@/components/admin/AdminNotifications";
import AdminSidebar from "@/components/admin/AdminSidebar";

import MobileAdminNav from "@/components/admin/MobileAdminNav";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/login");
    }

    if (session.user.role !== "ADMIN" && session.user.email !== process.env.ADMIN_EMAIL) {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 px-4 flex flex-col lg:flex-row">
            <AdminNotifications />
            <AdminSidebar />

            {/* Content */}
            <main className="flex-1 lg:ml-64 p-4 lg:p-6 pb-24 lg:pb-6 w-full">
                <div className="max-w-4xl mx-auto">
                    {children}
                </div>
            </main>

            <MobileAdminNav />
        </div>
    );
}
