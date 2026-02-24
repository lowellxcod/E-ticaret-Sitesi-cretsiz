'use client';

import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import NeonInput from '@/components/ui/NeonInput';
import GlassButton from '@/components/ui/GlassButton';
import { Search, Package, CheckCircle, Clock, XCircle, Truck, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function TrackingPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [order, setOrder] = useState<any>(null);

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setOrder(null);

        const formData = new FormData(e.currentTarget);
        const orderId = formData.get('orderId');
        const email = formData.get('email');

        try {
            const res = await fetch(`/api/tracking?orderId=${orderId}&email=${email}`);
            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg || "Sipariş bulunamadı");
            }
            const data = await res.json();
            setOrder(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10" />

            <div className="max-w-xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
                        Sipariş <span className="text-primary">Takibi</span>
                    </h1>
                    <p className="text-gray-400">
                        Üye olmadan sipariş durumunuzu sorgulayın.
                    </p>
                </div>

                <GlassCard className="p-8 border-primary/20 shadow-neon-purple/20">
                    <form onSubmit={handleSearch} className="space-y-6">
                        <NeonInput
                            label="Sipariş Numarası"
                            name="orderId"
                            placeholder="Örn: clz..."
                            required
                        />
                        <NeonInput
                            label="E-posta Adresi"
                            name="email"
                            type="email"
                            placeholder="Siparişte kullanılan e-posta"
                            required
                        />
                        <GlassButton
                            type="submit"
                            variant="primary"
                            className="w-full py-4 text-lg font-bold flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Search size={20} /> SORGULA
                                </>
                            )}
                        </GlassButton>
                    </form>

                    {error && (
                        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center font-bold text-sm">
                            {error}
                        </div>
                    )}
                </GlassCard>

                {order && (
                    <GlassCard className="p-0 overflow-hidden animate-in slide-in-from-bottom-4">
                        <div className="p-20 bg-gradient-to-b from-primary/10 to-transparent flex flex-col items-center justify-center text-center border-b border-white/5">
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${order.status === 'DELIVERED' ? 'bg-green-500/20 text-green-400' :
                                order.status === 'SHIPPED' ? 'bg-blue-500/20 text-blue-400' :
                                    order.status === 'CANCELLED' ? 'bg-red-500/20 text-red-400' :
                                        'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                {order.status === 'DELIVERED' ? <CheckCircle size={40} /> :
                                    order.status === 'SHIPPED' ? <Truck size={40} /> :
                                        order.status === 'CANCELLED' ? <XCircle size={40} /> :
                                            <Clock size={40} />}
                            </div>
                            <h2 className="text-2xl font-black text-white mb-1">
                                {order.status === 'PENDING' && 'Siparişiniz Alındı'}
                                {order.status === 'PAID' && 'Hazırlanıyor'}
                                {order.status === 'SHIPPED' && 'Kargoya Verildi'}
                                {order.status === 'DELIVERED' && 'Teslim Edildi'}
                                {order.status === 'CANCELLED' && 'İptal Edildi'}
                            </h2>
                            <p className="text-gray-400 font-mono text-sm">#{order.id}</p>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="flex justify-between items-center py-4 border-b border-white/5">
                                <span className="text-gray-400">Tarih</span>
                                <span className="text-white font-medium">
                                    {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-4 border-b border-white/5">
                                <span className="text-gray-400">Toplam Tutar</span>
                                <span className="text-primary font-bold font-mono">
                                    {order.total.toFixed(2)} TL
                                </span>
                            </div>
                            <div className="space-y-4 pt-4">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Sipariş İçeriği</h3>
                                {order.items.map((item: any, i: number) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/5 rounded-lg overflow-hidden relative">
                                            <Image
                                                src={item.product.image}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-sm">{item.product.name}</p>
                                            <p className="text-gray-500 text-xs">x{item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </GlassCard>
                )}
            </div>
        </div>
    );
}
