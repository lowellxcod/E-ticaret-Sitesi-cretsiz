'use client';

import { useCartStore } from '@/lib/store';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
    const { items, removeItem, updateQuantity, getTotal } = useCartStore();
    const totalPrice = getTotal();
    const shippingCost = totalPrice > 1000 ? 0 : 49.90;
    const finalTotal = totalPrice + shippingCost;

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
                <GlassCard className="p-12 text-center max-w-lg w-full">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag size={32} className="text-white/20" />
                    </div>
                    <h2 className="text-2xl font-black text-white mb-2">Sepetiniz Boş</h2>
                    <p className="text-gray-400 mb-8">Henüz sepetinize ürün eklemediniz.</p>
                    <Link href="/products">
                        <GlassButton variant="primary" className="w-full py-4">
                            Alışverişe Başla
                        </GlassButton>
                    </Link>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
                    <ShoppingBag className="text-primary" /> Alışveriş Sepeti
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <GlassCard key={item.id} className="p-4 flex gap-4 group hover:border-primary/30 transition-colors">
                                <div className="w-24 h-24 bg-white/5 rounded-xl overflow-hidden relative flex-shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-grow flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-white text-lg">{item.name}</h3>
                                            <p className="text-sm text-gray-400">{item.price.toFixed(2)} TL</p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-gray-500 hover:text-red-500 transition-colors p-2"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 bg-black/20 rounded-lg p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-md text-white transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="font-mono text-white w-8 text-center font-bold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-md text-white transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-primary text-lg">
                                                {(item.price * item.quantity).toFixed(2)} TL
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <GlassCard className="p-6 sticky top-32 space-y-6">
                            <h3 className="font-bold text-white text-xl">Sipariş Özeti</h3>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between text-gray-400">
                                    <span>Ara Toplam</span>
                                    <span className="text-white font-mono">{totalPrice.toFixed(2)} TL</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Kargo</span>
                                    <span className={`font-mono ${shippingCost === 0 ? 'text-green-400' : 'text-white'}`}>
                                        {shippingCost === 0 ? 'ÜCRETSİZ' : `${shippingCost.toFixed(2)} TL`}
                                    </span>
                                </div>
                                {shippingCost > 0 && (
                                    <div className="text-xs text-secondary bg-secondary/10 p-2 rounded text-center">
                                        {(1000 - totalPrice).toFixed(2)} TL daha ekleyin, kargo bedava olsun!
                                    </div>
                                )}
                                <div className="w-full h-px bg-white/10 my-4" />
                                <div className="flex justify-between text-lg font-bold">
                                    <span className="text-white">Genel Toplam</span>
                                    <span className="text-primary font-mono">{finalTotal.toFixed(2)} TL</span>
                                </div>
                            </div>

                            <Link href="/checkout" className="block w-full">
                                <GlassButton variant="primary" className="w-full py-4 font-bold flex items-center justify-center gap-2 group">
                                    Ödemeye Geç <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </GlassButton>
                            </Link>

                            <div className="flex items-center gap-2 justify-center text-xs text-gray-500 mt-4">
                                <Shield size={12} />
                                <span>256-bit SSL ile Güvenli Ödeme</span>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
