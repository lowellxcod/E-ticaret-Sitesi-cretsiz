"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Upload,
    Package,
    ShoppingCart,
    Users,
    Ticket,
    CreditCard,
    FileText
} from "lucide-react";

export default function AdminSidebar() {
    const pathname = usePathname();

    const links = [
        {
            name: "Siparişler",
            href: "/admin/orders",
            icon: ShoppingCart,
            color: "text-purple-400",
            bg: "bg-purple-400/10",
            border: "border-purple-400/20"
        },
        {
            name: "Ürünleri Yönet",
            href: "/admin/products",
            icon: Package,
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            border: "border-blue-400/20"
        },
        {
            name: "+ Ürün Ekle",
            href: "/admin/products/new",
            icon: Upload,
            color: "text-primary",
            bg: "bg-primary/10",
            border: "border-primary/50",
            special: true
        },
        {
            name: "Toplu Fiyat",
            href: "/admin/products/bulk",
            icon: CreditCard, // Using CreditCard as a placeholder for price/money
            color: "text-pink-400",
            bg: "bg-pink-400/10",
            border: "border-pink-400/20"
        },
        {
            name: "Kullanıcılar",
            href: "/admin/users",
            icon: Users,
            color: "text-green-400",
            bg: "bg-green-400/10",
            border: "border-green-400/20"
        },
        {
            name: "Kuponlar",
            href: "/admin/coupons",
            icon: Ticket,
            color: "text-yellow-400",
            bg: "bg-yellow-400/10",
            border: "border-yellow-400/20"
        },
        {
            name: "Ödeme Logları",
            href: "/admin/transactions",
            icon: CreditCard,
            color: "text-gray-400",
            bg: "bg-gray-400/10",
            border: "border-gray-400/20"
        },
        {
            name: "Faturalar (GİB)",
            href: "/admin/invoices",
            icon: FileText,
            color: "text-green-400",
            bg: "bg-green-500/10",
            border: "border-green-500/20"
        },
    ];

    return (
        <aside className="w-64 fixed left-0 top-20 bottom-0 border-r border-white/10 bg-black/50 backdrop-blur-xl hidden lg:block">
            <div className="p-6">
                <Link href="/admin">
                    <h2 className="text-xl font-black neon-text mb-8 cursor-pointer">NEXUS ADMIN</h2>
                </Link>
                <nav className="space-y-2">
                    {links.map((link) => {
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                                    isActive
                                        ? `bg-white/5 border border-primary/50 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]`
                                        : "hover:bg-white/5 text-gray-400 hover:text-white border border-transparent"
                                )}
                            >
                                <div className={cn(
                                    "p-1.5 rounded-lg transition-colors",
                                    isActive ? "bg-primary/20 text-primary" : "bg-white/5 text-gray-500 group-hover:text-white"
                                )}>
                                    <link.icon size={18} />
                                </div>
                                <span className={cn(
                                    "font-bold text-sm",
                                    isActive ? "text-white" : ""
                                )}>
                                    {link.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}
