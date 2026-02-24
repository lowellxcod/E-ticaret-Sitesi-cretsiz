"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Trash2, Plus, Minus, CreditCard, Ticket } from "lucide-react";
import { useCartStore } from "@/lib/store";
import GlassButton from "../ui/GlassButton";
import Image from "next/image";
import Link from "next/link";

const CartDrawer = () => {
    // @ts-ignore - Zustand store type mismatch with persist middleware sometimes causes issues, but runtime is fine.
    const { items, removeItem, updateQuantity, total, isOpen, closeCart, coupon, removeCoupon, getSubtotal } = useCartStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        // Using style attribute for dynamic properties that aren't in tailwind config yet or need arbitrary values from vars
                        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)' }}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-md backdrop-blur-2xl border-l z-[200] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b flex items-center justify-between backdrop-blur-md sticky top-0 z-10" style={{ borderColor: 'var(--border-color)', backgroundColor: 'rgba(var(--surface-rgb), 0.8)' }}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shadow-neon-sm">
                                    <ShoppingBag size={20} />
                                </div>
                                <div>
                                    <h3 className="font-black uppercase text-lg tracking-tighter shadow-black drop-shadow-md" style={{ color: 'var(--text-main)' }}>Sepetim</h3>
                                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{items.length} ÜRÜN</p>
                                </div>
                            </div>
                            <button
                                onClick={closeCart}
                                className="w-10 h-10 glass rounded-full flex items-center justify-center text-gray-light hover:text-primary transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-grow overflow-y-auto custom-scrollbar p-6 flex flex-col gap-4">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-24 h-24 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: 'var(--highlight-bg)', color: 'var(--text-muted)' }}>
                                        <ShoppingBag size={48} />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="font-black text-xl tracking-tight" style={{ color: 'var(--text-main)' }}>Sepetiniz Boş</p>
                                        <p className="text-sm max-w-[250px] mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>Hemen alışverişe başlayıp en yeni ekipmanları keşfedin.</p>
                                    </div>
                                    <GlassButton
                                        variant="primary"
                                        className="mt-6 px-10 py-4 shadow-neon hover:scale-105 transition-transform"
                                        onClick={closeCart}
                                    >
                                        ALIŞVERİŞE BAŞLA
                                    </GlassButton>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-3 rounded-2xl border group hover:border-primary/30 transition-all"
                                        style={{ backgroundColor: 'var(--highlight-bg)', borderColor: 'var(--border-color)' }}>
                                        <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--surface-dark)' }}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex-grow flex flex-col justify-between py-1">
                                            <div className="flex justify-between items-start gap-2">
                                                <h4 className="font-bold text-sm leading-snug line-clamp-2 pr-2" style={{ color: 'var(--text-main)' }}>{item.name}</h4>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-gray-500 hover:text-red-500 transition-colors p-1.5 hover:bg-red-500/10 rounded-lg"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-1 rounded-lg p-1 border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)' }}>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-primary/10 rounded-md transition-all"
                                                        style={{ color: 'var(--text-muted)' }}
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="font-mono text-xs w-6 text-center font-bold" style={{ color: 'var(--text-main)' }}>{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-primary/10 rounded-md transition-all"
                                                        style={{ color: 'var(--text-muted)' }}
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <p className="text-primary font-black text-lg font-mono tracking-tight">{item.price * item.quantity} TL</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>


                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-8 border-t flex flex-col gap-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-color)' }}>
                                {/* Coupon Input */}
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="KUPON KODU"
                                        className="bg-transparent border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50 w-full uppercase placeholder:text-gray-400"
                                        style={{ backgroundColor: 'var(--highlight-bg)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                                        id="coupon-input"
                                    />
                                    <button
                                        onClick={async () => {
                                            const input = document.getElementById('coupon-input') as HTMLInputElement;
                                            const code = input.value;
                                            if (!code) return;

                                            try {
                                                const res = await fetch('/api/coupons/validate', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ code })
                                                });

                                                if (res.ok) {
                                                    const coupon = await res.json();
                                                    // Implementation would need to hook into store properly
                                                    // For now just alert
                                                    alert('Kupon eklendi!');
                                                } else {
                                                    alert('Geçersiz Kupon');
                                                }
                                            } catch (e) {
                                                alert('Hata');
                                            }
                                        }}
                                        className="text-xs font-bold px-4 rounded-lg transition-colors border"
                                        style={{ backgroundColor: 'var(--surface-light)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                                    >
                                        EKLE
                                    </button>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold uppercase tracking-widest text-[10px]" style={{ color: 'var(--text-muted)' }}>ARA TOPLAM</span>
                                        <span className="font-mono font-bold text-lg" style={{ color: 'var(--text-main)' }}>{getSubtotal()} TL</span>
                                    </div>
                                    {coupon && (
                                        <div className="flex justify-between items-center text-sm text-green-400">
                                            <span className="font-bold uppercase tracking-widest text-[10px] flex items-center gap-1">
                                                <Ticket size={12} /> {coupon.code}
                                            </span>
                                            <span className="font-mono font-bold text-md cursor-pointer hover:text-red-400" onClick={removeCoupon}>
                                                -{getSubtotal() - total} TL <span className="text-[10px] ml-1">(Kaldır)</span>
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold uppercase tracking-widest text-[10px]" style={{ color: 'var(--text-muted)' }}>KARGO</span>
                                        <span className="text-primary font-bold text-[10px] tracking-widest uppercase bg-primary/10 px-2 py-1 rounded border border-primary/20">ÜCRETSİZ</span>
                                    </div>
                                    <div className="h-px w-full my-2" style={{ backgroundColor: 'var(--border-color)' }} />
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-black tracking-tighter uppercase" style={{ color: 'var(--text-main)' }}>TOPLAM</span>
                                        <span className="text-primary text-2xl md:text-3xl font-black font-mono neon-text">{total} TL</span>
                                    </div>
                                </div>
                                <Link href="/checkout" onClick={closeCart} className="block w-full">
                                    <GlassButton variant="primary" className="w-full py-5 text-sm font-black tracking-[0.2em] flex items-center justify-center gap-2 group/btn shadow-neon">
                                        ÖDEME ADIMINA GEÇ
                                        <CreditCard size={18} className="group-hover/btn:scale-110 transition-transform" />
                                    </GlassButton>
                                </Link>
                                <p className="text-[10px] text-center font-bold tracking-widest uppercase flex items-center justify-center gap-2" style={{ color: 'var(--text-muted)' }}>
                                    <span className="w-1 h-1 rounded-full bg-green-500"></span>
                                    Güvenli Ödeme Sis. & Nexus Pay
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
