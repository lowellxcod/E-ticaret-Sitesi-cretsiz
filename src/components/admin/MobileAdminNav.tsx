"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    FileText,
    Menu
} from "lucide-react";
import { useState } from "react";

export default function MobileAdminNav() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        {
            name: "Panel",
            href: "/admin",
            icon: LayoutDashboard,
        },
        {
            name: "Sipariş",
            href: "/admin/orders",
            icon: ShoppingCart,
        },
        {
            name: "Ürünler",
            href: "/admin/products",
            icon: Package,
        },
        {
            name: "Faturalar",
            href: "/admin/invoices",
            icon: FileText,
        },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-t border-white/10 safe-area-bottom">
            <nav className="flex items-center justify-around h-16 px-2">
                {links.map((link) => {
                    const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-all",
                                isActive ? "text-primary" : "text-gray-500 hover:text-gray-300"
                            )}
                        >
                            <div className={cn(
                                "p-1 rounded-lg transition-all",
                                isActive ? "bg-primary/20" : "bg-transparent"
                            )}>
                                <link.icon size={20} />
                            </div>
                            <span className="text-[10px] font-bold">{link.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
