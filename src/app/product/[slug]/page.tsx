"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Shield, Truck, RotateCcw, ChevronLeft, Star, Share2, Bell, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import GlassButton from "@/components/ui/GlassButton";
import GlassCard from "@/components/ui/GlassCard";
import StockAlert from "@/components/ui/StockAlert";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store";

import { useSession } from "next-auth/react";
import { useWishlistStore } from "@/lib/store";
import ProductReviews from "@/components/products/ProductReviews";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState(0);
    const { addItem } = useCartStore();
    const { addItem: addToWishlist, removeItem: removeFromWishlist, hasItem: isInWishlist } = useWishlistStore();
    const { data: session } = useSession();

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Hydration fix for zustand persist
    const [isWishlistActive, setIsWishlistActive] = useState(false);
    // Lightbox State
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    useEffect(() => {
        if (product) {
            setIsWishlistActive(isInWishlist(product.id));
        }
    }, [product, isInWishlist]);

    const handleWishlist = () => {
        if (!product) return;

        if (!session) {
            alert('Favorilere eklemek için lütfen giriş yapın!');
            router.push('/auth/login');
            return;
        }

        if (isWishlistActive) {
            removeFromWishlist(product.id);
            setIsWishlistActive(false);
            // Optional: Toast "Favorilerden çıkarıldı"
        } else {
            addToWishlist({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                slug: product.id, // Using ID as slug based on current logic
            });
            setIsWishlistActive(true);
            alert('Ürün favorilerinize eklendi! ❤️');
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${params.slug}`);
                if (!res.ok) throw new Error("Product not found");
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (params.slug) {
            fetchProduct();
        }
    }, [params.slug]);


    const handleAddToCart = () => {
        if (!product) return;
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
        });
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Yükleniyor...</div>;

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-white uppercase mb-4">Ürün Bulunamadı</h1>
                    <GlassButton onClick={() => router.back()}>Geri Dön</GlassButton>
                </div>
            </div>
        );
    }

    // Safety defaults
    const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
    const specs = product.specs || [];



    // ... (existing code for handlers)

    return (
        <div className="min-h-screen pb-24 bg-background">
            {/* Lightbox Overlay */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2"
                            onClick={() => setIsLightboxOpen(false)}
                        >
                            <X size={32} />
                        </button>

                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
                            }}
                        >
                            <ChevronLeft size={40} />
                        </button>

                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
                            }}
                        >
                            <ChevronLeft size={40} className="rotate-180" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center pointer-events-none"
                        >
                            <Image
                                src={gallery[selectedImage] || product.image}
                                alt={product.name}
                                fill
                                className="object-contain pointer-events-auto"
                                quality={100}
                                priority
                            />
                        </motion.div>

                        {/* Thumbnails in Lightbox */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-screen md:max-w-xl p-2 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>
                            {gallery.map((img: string, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={cn(
                                        "relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0",
                                        selectedImage === i ? "border-primary opacity-100" : "border-transparent opacity-50 hover:opacity-100"
                                    )}
                                >
                                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Top Navigation */}
            <div className="pt-24 pb-8">
                <Container>
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray/60 hover:text-white transition-colors group mb-8"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Donanımlara Dön</span>
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Product Gallery */}
                        <div className="space-y-6">
                            <motion.div
                                layoutId={`product-image-${product.id}`}
                                className="aspect-square relative glass rounded-[40px] overflow-hidden border-white/5 shadow-2xl cursor-zoom-in group"
                                onClick={() => setIsLightboxOpen(true)}
                            >
                                <Image
                                    src={gallery[selectedImage] || product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ImageIcon size={20} />
                                </div>
                            </motion.div>

                            <div className="grid grid-cols-4 gap-4">
                                {gallery.map((img: string, i: number) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedImage(i)}
                                        className={cn(
                                            "aspect-square glass rounded-2xl overflow-hidden border-2 transition-all p-1",
                                            selectedImage === i ? "border-primary shadow-neon-sm" : "border-transparent opacity-50 hover:opacity-100"
                                        )}
                                    >
                                        <Image src={img} alt={product.name} width={200} height={200} className="w-full h-full object-cover rounded-xl" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-4">
                                    {product.category}
                                </span>

                                <div className="flex justify-between items-start mb-4">
                                    <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                                        {product.name}
                                    </h1>
                                    <button className="p-4 glass rounded-full text-white/40 hover:text-primary transition-colors">
                                        <Share2 size={20} />
                                    </button>
                                </div>

                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex text-primary">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                    </div>
                                    <span className="text-xs text-gray/40 font-bold uppercase tracking-widest">48 İNCELEME</span>
                                </div>

                                <div className="text-3xl font-black text-white font-mono mb-8 p-6 glass rounded-3xl border-white/5 flex items-center justify-between">
                                    <div>
                                        {product.discountPrice && product.discountPrice < product.price ? (
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-red-500 line-through text-lg opacity-60">{product.price} TL</span>
                                                    <span className="text-green-400 font-black text-4xl">{product.discountPrice} TL</span>
                                                </div>
                                                <span className="text-[10px] text-green-400 font-bold mt-1">
                                                    %{Math.round(((product.price - product.discountPrice) / product.price) * 100)} İNDİRİM
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-4xl">{product.price} TL</span>
                                        )}
                                        {product.stock === 0 && (
                                            <div className="mt-2 text-red-400">
                                                <StockAlert productId={product.id} productName={product.name} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        {product.stock > 0 ? (
                                            <span className="text-[10px] text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">STOKTA VAR</span>
                                        ) : (
                                            <span className="text-[10px] text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 font-black">STOKTA YOK</span>
                                        )}
                                        {product.discountPrice && (
                                            <span className="text-[10px] text-white bg-red-500/20 px-3 py-1 rounded-full border border-red-500/30 animate-pulse">
                                                FIRSAT ÜRÜNÜ
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <p className="text-gray-light/80 text-lg leading-relaxed mb-10">
                                    {product.description}
                                </p>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                    {specs.length > 0 ? specs.map((spec: any, i: number) => (
                                        <div key={i} className="glass p-4 rounded-2xl border-white/5">
                                            <p className="text-[8px] text-gray uppercase font-black tracking-widest mb-1">{spec.label}</p>
                                            <p className="text-[10px] text-white font-bold">{spec.value}</p>
                                        </div>
                                    )) : (
                                        <div className="col-span-4 text-xs text-gray-500">Özellik belirtilmemiş.</div>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                    <GlassButton
                                        variant="primary"
                                        className={cn(
                                            "flex-grow py-6 text-xl h-auto rounded-3xl group shadow-neon-purple",
                                            product.stock === 0 && "opacity-50 cursor-not-allowed grayscale"
                                        )}
                                        onClick={handleAddToCart}
                                        disabled={product.stock === 0}
                                    >
                                        {product.stock > 0 ? (
                                            <>SEPETE EKLE <ShoppingCart className="ml-2 group-hover:scale-110 transition-transform" /></>
                                        ) : (
                                            <>STOKTA YOK <Bell size={24} className="ml-2" /></>
                                        )}
                                    </GlassButton>
                                    <button
                                        onClick={handleWishlist}
                                        className={cn(
                                            "p-6 glass rounded-3xl transition-colors border-white/5 group",
                                            isWishlistActive ? "text-red-500 bg-red-500/10 border-red-500/20" : "text-white hover:text-red-500"
                                        )}
                                    >
                                        <Heart size={24} className={cn("transition-transform", isWishlistActive ? "fill-current scale-110" : "group-active:scale-125")} />
                                    </button>
                                </div>

                                {/* Trust Badges */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-primary border-primary/20">
                                            <Shield size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-white uppercase tracking-widest">2 YIL</p>
                                            <p className="text-[9px] text-gray/60 uppercase font-bold">Resmi Garanti</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-secondary border-secondary/20">
                                            <Truck size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-white uppercase tracking-widest">ÜCRETSİZ</p>
                                            <p className="text-[9px] text-gray/60 uppercase font-bold">Hızlı Teslimat</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray border-white/20">
                                            <RotateCcw size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-white uppercase tracking-widest">30 GÜN</p>
                                            <p className="text-[9px] text-gray/60 uppercase font-bold">Kolay İade</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </Container>
            </div>

            <Container className="pb-16">
                <ProductReviews productId={product.id} reviews={product.reviews || []} />
            </Container>
        </div>
    );
}
