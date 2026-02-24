import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import Link from "next/link";
import { Package, Users, PlusCircle, ArrowRight, Shield, AlertTriangle, TrendingUp, CheckCircle, Clock } from "lucide-react";
import Prisma from "@/lib/db"; // Using shared instance to avoid connection limit issues


export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
    const session = await getServerSession(authOptions);

    // Double check
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!session || session.user?.email !== adminEmail) {
        redirect("/");
    }

    // 1. Fetch Basic Counts
    const productCount = await Prisma.product.count();
    const orderCount = await Prisma.order.count();
    const userCount = await Prisma.user.count();

    // 2. Calculate Total Revenue (Simple sum of all non-cancelled orders)
    // Note: In a real app, you'd filter by 'PAID' or 'DELIVERED' status strictly.
    const revenueResult = await Prisma.order.aggregate({
        _sum: {
            total: true
        },
        where: {
            status: { not: "CANCELLED" }
        }
    });
    const totalRevenue = revenueResult._sum.total || 0;

    // 3. Find Low Stock Products (< 10)
    const lowStockProducts = await Prisma.product.findMany({
        where: {
            stock: { lt: 10 }
        },
        take: 5,
        orderBy: { stock: 'asc' },
        select: { id: true, name: true, stock: true, image: true }
    });

    // 4. Find Recent Orders
    const recentOrders = await Prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
            user: { select: { name: true, email: true } },
            items: true
        }
    });

    // 5. Payment Transactions (Safe fetch)
    const transactionCount = await Prisma.paymentTransaction.count().catch(() => 0);


    const stats = [
        { label: "Toplam Ciro", value: `${totalRevenue.toLocaleString('tr-TR')} ₺`, icon: TrendingUp, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
        { label: "Toplam Sipariş", value: orderCount, icon: Package, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
        { label: "Kayıtlı Kullanıcı", value: userCount, icon: Users, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
        { label: "Toplam Ürün", value: productCount, icon: Shield, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20" },
    ];

    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-black neon-text">Kontrol Paneli</h1>
                <span className="text-xs font-bold text-gray-500 bg-white/5 px-3 py-1 rounded-full">v2.5 System Active</span>
            </div>

            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <GlassCard key={index} className={`p-6 flex items-center gap-4 ${stat.border}`}>
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                            <p className="text-2xl font-black text-white">{stat.value}</p>
                        </div>
                    </GlassCard>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Recent Orders (Takes 2 cols) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Clock size={20} className="text-primary" /> Son Siparişler
                        </h3>
                        <Link href="/admin/orders" className="text-xs font-bold text-primary hover:text-white transition-colors">
                            Tümünü Gör
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {recentOrders.length === 0 ? (
                            <div className="text-center py-10 text-gray-500 text-sm">Henüz sipariş yok.</div>
                        ) : (
                            recentOrders.map((order) => (
                                <GlassCard key={order.id} className="p-4 flex items-center justify-between border-white/5 hover:border-primary/30 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 font-bold text-xs">
                                            {order.customerName?.charAt(0) || "?"}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                                                {order.customerName || "Misafir"}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(order.createdAt).toLocaleDateString('tr-TR')} • {order.items.length} Ürün
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-white">{order.total} ₺</p>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${order.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500' :
                                            order.status === 'PAID' ? 'bg-green-500/10 text-green-500' :
                                                'bg-gray-500/10 text-gray-500'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </GlassCard>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Column: Alerts & Actions */}
                <div className="space-y-8">
                    {/* Low Stock Alert */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <AlertTriangle size={20} className="text-red-500" /> Kritik Stok
                        </h3>
                        {lowStockProducts.length === 0 ? (
                            <GlassCard className="p-6 text-center border-green-500/20 bg-green-500/5">
                                <CheckCircle size={32} className="text-green-500 mx-auto mb-2" />
                                <p className="text-green-400 font-bold text-sm">Stok durumu harika!</p>
                            </GlassCard>
                        ) : (
                            <div className="space-y-3">
                                {lowStockProducts.map(product => (
                                    <div key={product.id} className="flex items-center justify-between p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                                        <div className="flex items-center gap-3">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={product.image} alt={product.name} className="w-8 h-8 rounded-lg object-cover opacity-80" />
                                            <p className="text-xs font-bold text-red-200 truncate max-w-[120px]">{product.name}</p>
                                        </div>
                                        <span className="text-xs font-black text-red-500 bg-red-500/10 px-2 py-1 rounded-md">
                                            {product.stock} Adet
                                        </span>
                                    </div>
                                ))}
                                <Link href="/admin/products" className="block text-center text-[10px] font-bold text-red-400 hover:text-red-300 mt-2">
                                    Stokları Düzenle →
                                </Link>
                            </div>
                        )}
                    </div>



                    {/* Quick Actions Grid */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">Hızlı İşlemler</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/admin/products/new">
                                <GlassCard className="p-4 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/5 cursor-pointer transition-colors border-dashed border-white/20 hover:border-primary/50 h-32">
                                    <PlusCircle size={24} className="text-primary" />
                                    <span className="text-xs font-bold text-gray-300">Yeni Ürün Ekle</span>
                                </GlassCard>
                            </Link>
                            <Link href="/admin/invoices">
                                <GlassCard className="p-4 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/5 cursor-pointer transition-colors border-dashed border-white/20 hover:border-green-500/50 h-32">
                                    <div className="text-green-500 font-black text-xl">GİB</div>
                                    <span className="text-xs font-bold text-gray-300">Fatura Kes</span>
                                </GlassCard>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
