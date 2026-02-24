'use client';

import React, { useEffect, useState } from 'react';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import ProductCard from '@/components/products/ProductCard';
import { Heart, ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { useWishlistStore, useCartStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function WishlistPage() {
    const { items, removeItem, clearWishlist } = useWishlistStore();
    const { addItem: addToCart } = useCartStore();
    const [isHydrated, setIsHydrated] = useState(false);

    // Prevent hydration mismatch for zustand persist
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    if (!isHydrated) return null;

    const handleMoveToCart = (item: any) => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1,
        });
        removeItem(item.id);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -z-10" />

            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-2">
                            FAVORİ <span className="text-primary italic">LİSTEM</span>
                        </h1>
                        <p className="text-gray-400 font-medium uppercase tracking-[0.2em] text-xs">
                            {items.length} ÜRÜN BEĞENİLDİ
                        </p>
                    </div>

                    {items.length > 0 && (
                        <div className="flex gap-4">
                            <GlassButton
                                variant="glass"
                                className="text-xs py-2 px-6 border-red-500/20 text-red-400 hover:bg-red-500/10"
                                onClick={clearWishlist}
                            >
                                <Trash2 size={14} className="mr-2" /> TÜMÜNÜ TEMİZLE
                            </GlassButton>
                        </div>
                    )}
                </div>

                <AnimatePresence mode="popLayout">
                    {items.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {items.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <GlassCard className="group h-full flex flex-col overflow-hidden border-white/5 hover:border-primary/20 transition-all duration-500">
                                        <div className="aspect-square relative overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white/60 hover:text-red-500 hover:bg-red-500/20 transition-all border border-white/10"
                                            >
                                                <Heart size={18} fill="currentColor" className="text-red-500" />
                                            </button>
                                        </div>

                                        <div className="p-6 flex-grow flex flex-col">
                                            <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                                                {item.name}
                                            </h3>
                                            <p className="text-2xl font-black text-white mb-6 font-mono">
                                                {item.price} TL
                                            </p>

                                            <div className="mt-auto space-y-3">
                                                <GlassButton
                                                    variant="primary"
                                                    className="w-full text-xs py-3"
                                                    onClick={() => handleMoveToCart(item)}
                                                >
                                                    <ShoppingBag size={14} className="mr-2" /> SEPETE TAŞI
                                                </GlassButton>
                                                <Link href={`/product/${item.id}`} className="block">
                                                    <GlassButton variant="glass" className="w-full text-xs py-3">
                                                        İNCELE
                                                    </GlassButton>
                                                </Link>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="py-32 text-center"
                        >
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/5 border border-white/10 text-gray-400 mb-8">
                                <Heart size={40} className="opacity-20" />
                            </div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-4">Henüz favori ürününüz yok</h2>
                            <p className="text-gray-500 max-w-md mx-auto mb-10 text-sm leading-relaxed">
                                Görünüşe göre henüz hiçbir ürünü kalbinize eklememişsiniz.
                                En yeni donanımlarımıza göz atarak başlayabilirsiniz!
                            </p>
                            <Link href="/products">
                                <GlassButton variant="primary">
                                    <ArrowLeft size={16} className="mr-2" /> ALIŞVERİŞE BAŞLA
                                </GlassButton>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Container>
        </div>
    );
}
