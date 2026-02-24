'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import GlassCard from '@/components/ui/GlassCard';
import Skeleton from '@/components/ui/Skeleton';
import { Package, Clock, CheckCircle, XCircle, Search, ChevronRight, Calendar } from 'lucide-react';
import Link from 'next/link';

interface Order {
    id: string;
    status: string;
    total: number;
    createdAt: string;
    items: {
        product: {
            name: string;
            image: string;
        };
        quantity: number;
    }[];
}

export default function UserOrdersPage() {
    const { data: session } = useSession();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/user/orders');
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error("Siparişler çekilemedi", error);
            } finally {
                setLoading(false);
            }
        };

        if (session) {
            fetchOrders();
        }
    }, [session]);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 max-w-5xl mx-auto space-y-6">
                <Skeleton className="h-10 w-48 mb-8" />
                {[1, 2, 3].map((i) => (
                    <GlassCard key={i} className="p-6 h-40">
                        <div className="flex justify-between mb-6">
                            <div className="flex gap-4">
                                <Skeleton className="w-12 h-12 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="w-32 h-6" />
                                    <Skeleton className="w-24 h-4" />
                                </div>
                            </div>
                            <Skeleton className="w-24 h-8" />
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="w-10 h-10 rounded-full" />
                            <Skeleton className="w-10 h-10 rounded-full" />
                            <Skeleton className="w-10 h-10 rounded-full" />
                        </div>
                    </GlassCard>
                ))}
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 max-w-5xl mx-auto">
            <h1 className="text-3xl font-black mb-8 flex items-center gap-3 text-white">
                <Package className="text-primary" /> Siparişlerim
            </h1>

            {orders.length === 0 ? (
                <GlassCard className="p-12 flex flex-col items-center justify-center text-center text-gray-400">
                    <Package size={64} className="mb-4 opacity-20" />
                    <h2 className="text-xl font-bold text-white mb-2">Henüz siparişiniz yok.</h2>
                    <p className="mb-6">Nexus OS dünyasındaki fırsatları kaçırma.</p>
                    <Link href="/products" className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-bold transition-colors">
                        Alışverişe Başla
                    </Link>
                </GlassCard>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <GlassCard key={order.id} className="p-0 overflow-hidden group hover:border-primary/30 transition-all">
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${order.status === 'PAID' || order.status === 'DELIVERED' ? 'bg-green-500/10 text-green-400' :
                                            order.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
                                            }`}>
                                            {order.status === 'PAID' ? <CheckCircle size={24} /> :
                                                order.status === 'DELIVERED' ? <Package size={24} /> :
                                                    order.status === 'PENDING' ? <Clock size={24} /> : <XCircle size={24} />}
                                        </div>
                                        <div>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                <span className="font-mono font-bold text-white text-lg">#{order.id.slice(-8)}</span>
                                                <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded w-fit ${order.status === 'PAID' ? 'bg-green-500/10 text-green-400' :
                                                    order.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-white/5 text-gray-400'
                                                    }`}>
                                                    {order.status === 'PAID' ? 'Ödendi / Hazırlanıyor' :
                                                        order.status === 'PENDING' ? 'Ödeme Bekleniyor' : order.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                                <Calendar size={12} />
                                                {new Date(order.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-400 mb-1">Toplam Tutar</p>
                                        <span className="font-mono font-bold text-xl text-white">
                                            {order.total.toFixed(2)} TL
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-white/5 rounded-xl p-4 gap-4 flex flex-col md:flex-row items-center">
                                    <div className="flex -space-x-3 overflow-hidden">
                                        {order.items.slice(0, 5).map((item, idx) => (
                                            <div key={idx} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center overflow-hidden">
                                                <img src={item.product.image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                        {order.items.length > 5 && (
                                            <div className="w-10 h-10 rounded-full border-2 border-black bg-gray-700 flex items-center justify-center text-xs text-white font-bold">
                                                +{order.items.length - 5}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-grow text-sm text-gray-400">
                                        {order.items.length} ürün
                                    </div>

                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            )}
        </div>
    );
}
