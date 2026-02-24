"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/products/ProductCard";
import GlassCard from "@/components/ui/GlassCard";
import { Filter, SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import { mainCategories } from "@/data/categories";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
    { id: "newest", label: "En Yeni" },
    { id: "price-low", label: "Fiyat: Düşükten Yükseğe" },
    { id: "price-high", label: "Fiyat: Yüksekten Düşüğe" },
];

export default function SubCategoryPage() {
    const params = useParams();
    const slug = params.slug as string;
    const subslug = params.subslug as string;

    const [sortBy, setSortBy] = useState("newest");
    const [maxPrice, setMaxPrice] = useState(25000);
    const [isSortOpen, setIsSortOpen] = useState(false);

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch using subslug as the category filter
                const res = await fetch(`/api/products?categorySlug=${subslug}`);
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [subslug]);

    const mainCategory = mainCategories.find(c => c.slug === slug);
    const subCategory = mainCategory?.subCategories.find(s => s.slug === subslug);

    const categoryName = mainCategory?.name || "Koleksiyon";
    const subCategoryName = subCategory?.name || "Özel Seri";

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products].filter(p => p.price <= maxPrice);

        if (sortBy === "price-low") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-high") {
            result.sort((a, b) => b.price - a.price);
        }
        // Newest is default from API usually, but can sort by date if needed

        return result;
    }, [products, sortBy, maxPrice]);

    return (
        <div className="min-h-screen pb-24 bg-background">
            {/* Enhanced Header */}
            <div className="relative h-[45vh] flex items-center justify-center overflow-hidden border-b border-primary/10">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background z-0" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                <Container className="relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-block py-1 px-3 bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase tracking-[0.4em] font-bold mb-6 rounded-full">
                            {categoryName}
                        </span>
                        <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase mb-6 leading-none">
                            {subCategoryName}
                        </h1>
                        <p className="text-gray-light max-w-xl mx-auto font-medium text-lg md:text-xl opacity-80">
                            Performans odaklı {subCategoryName.toLowerCase()} serimizle sınırları zorlayın.
                        </p>
                    </motion.div>
                </Container>
            </div>

            <Container className="mt-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar / Filters */}
                    <aside className="lg:w-1/4 space-y-8">
                        <GlassCard className="p-6 border-primary/10 rounded-3xl" hoverGlow={false}>
                            <div className="flex items-center gap-3 mb-6 text-white border-b border-white/10 pb-4">
                                <Filter size={20} className="text-primary" />
                                <h3 className="font-black uppercase tracking-widest text-sm">Filtreler</h3>
                            </div>

                            <div className="space-y-6">
                                {/* Sort Dropdown */}
                                <div className="relative">
                                    <p className="text-[10px] text-gray uppercase tracking-widest font-black mb-4">Sıralama</p>
                                    <button
                                        onClick={() => setIsSortOpen(!isSortOpen)}
                                        className="w-full flex items-center justify-between p-3 glass rounded-full border-white/5 text-sm text-white hover:border-primary/30 transition-all"
                                    >
                                        <span>{SORT_OPTIONS.find(o => o.id === sortBy)?.label}</span>
                                        <ChevronDown size={14} className={cn("transition-transform", isSortOpen && "rotate-180")} />
                                    </button>
                                    <AnimatePresence>
                                        {isSortOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute z-50 top-full left-0 right-0 mt-2 p-2 glass rounded-2xl border-white/10 shadow-2xl overflow-hidden"
                                            >
                                                {SORT_OPTIONS.map((option) => (
                                                    <button
                                                        key={option.id}
                                                        onClick={() => {
                                                            setSortBy(option.id);
                                                            setIsSortOpen(false);
                                                        }}
                                                        className={cn(
                                                            "w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all",
                                                            sortBy === option.id ? "bg-primary/20 text-primary" : "text-gray-light hover:bg-white/5 hover:text-white"
                                                        )}
                                                    >
                                                        {option.label}
                                                        {sortBy === option.id && <Check size={14} />}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Price Slider */}
                                <div>
                                    <p className="text-[10px] text-gray uppercase tracking-widest font-black mb-4">Maksimum Fiyat</p>
                                    <input
                                        type="range"
                                        min="0"
                                        max="25000"
                                        step="100"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                                        className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="flex justify-between mt-4 text-[10px] text-gray uppercase font-bold tracking-tighter">
                                        <span>0 TL</span>
                                        <span className="text-primary font-black">{maxPrice} TL</span>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </aside>

                    {/* Product Grid */}
                    <div className="lg:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredAndSortedProducts.length > 0 ? (
                                filteredAndSortedProducts.map((product, i) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1, duration: 0.5 }}
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full py-24 text-center glass rounded-5xl border-white/5">
                                    <h2 className="text-2xl font-black text-gray/30 uppercase tracking-[0.2em]">Bu kriterlerde ürün bulunmuyor.</h2>
                                    <p className="text-gray/20 text-xs mt-2 uppercase tracking-widest">Filtreleri sıfırlamayı veya değiştirmeyi deneyin.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
