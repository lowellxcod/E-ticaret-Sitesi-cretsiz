"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Rocket, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        const fetchResults = async () => {
            if (query.length > 2) {
                try {
                    const res = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
                    if (res.ok) {
                        const data = await res.json();
                        setResults(data);
                    }
                } catch (e) {
                    console.error(e);
                }
            } else {
                setResults([]);
            }
        };

        const timeoutId = setTimeout(fetchResults, 300); // Debounce
        return () => clearTimeout(timeoutId);
    }, [query]);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-background/98 backdrop-blur-3xl z-[200] flex flex-col items-center pt-32 px-4 overflow-y-auto pb-20 custom-scrollbar"
                >
                    {/* Background Decorative Elements */}
                    <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-1000" />
                    </div>

                    <button
                        onClick={onClose}
                        className="fixed top-8 right-8 w-12 h-12 glass rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all hover:rotate-90"
                    >
                        <X size={24} />
                    </button>

                    <div className="w-full max-w-4xl space-y-12">
                        {/* Search Input Area */}
                        <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform" size={32} />
                            <input
                                autoFocus
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Donanım arayın... (Klavye, Fare, Monitör)"
                                className="w-full bg-white/5 border-b-4 border-white/10 p-8 pl-20 text-3xl md:text-5xl font-black text-white focus:outline-none focus:border-primary transition-all placeholder:text-white/10 uppercase tracking-tighter"
                            />
                            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary w-0 group-focus-within:w-full transition-all duration-500" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                            {/* Results Section */}
                            <div className="md:col-span-8 space-y-8">
                                {query.length > 2 ? (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Bulunan Sonuçlar</h3>
                                            <span className="text-[10px] font-mono text-gray/40">{results.length} EŞLEŞME</span>
                                        </div>
                                        <div className="space-y-4">
                                            {results.length > 0 ? (
                                                results.map((product) => (
                                                    <Link
                                                        key={product.id}
                                                        href={`/product/${product.slug}`}
                                                        onClick={onClose}
                                                        className="flex items-center gap-6 p-4 glass hover:bg-white/10 border-white/5 transition-all group overflow-hidden"
                                                    >
                                                        <div className="w-20 h-20 bg-black/40 rounded-xl overflow-hidden relative flex-shrink-0">
                                                            <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                                        </div>
                                                        <div className="flex-grow">
                                                            <h4 className="text-white font-bold group-hover:text-primary transition-colors">{product.name}</h4>
                                                            <p className="text-[10px] text-gray/40 font-black uppercase tracking-widest mt-1">{product.category}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-white font-black font-mono">{product.price} TL</p>
                                                            <div className="flex items-center gap-1 text-primary text-[8px] font-black uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                İNCELE <ArrowRight size={10} />
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))
                                            ) : (
                                                <div className="py-20 text-center space-y-4 border-2 border-dashed border-white/5 rounded-3xl">
                                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/20">
                                                        <Search size={32} />
                                                    </div>
                                                    <p className="text-gray/40 font-bold uppercase tracking-widest">Hiçbir sonuç bulunamadı</p>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp size={16} className="text-secondary" />
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">Popüler Aramalar</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {["Mechanical Keyboard", "Gaming Mouse", "4K Monitor", "RGB Mousepad", "Headset"].map((item) => (
                                                <button
                                                    key={item}
                                                    onClick={() => setQuery(item)}
                                                    className="px-6 py-3 glass hover:border-secondary/50 text-white font-bold text-sm transition-all hover:-translate-y-1"
                                                >
                                                    {item}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar / Quick Links */}
                            <div className="md:col-span-4 space-y-10">
                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Hızlı Kategoriler</h3>
                                    <div className="space-y-2">
                                        {[
                                            { name: "Klavyeler", icon: Rocket, slug: "keyboards" },
                                            { name: "Fareler", icon: Rocket, slug: "mice" },
                                            { name: "Monitörler", icon: Rocket, slug: "monitors" },
                                            { name: "Kulaklıklar", icon: Rocket, slug: "audio" },
                                        ].map((cat) => (
                                            <Link
                                                key={cat.slug}
                                                href={`/products/${cat.slug}`}
                                                onClick={onClose}
                                                className="flex items-center justify-between p-4 glass hover:bg-white/10 group transition-all"
                                            >
                                                <span className="text-sm font-bold text-gray-light group-hover:text-white transition-colors">{cat.name}</span>
                                                <ArrowRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-8 glass border-secondary/20 rounded-3xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                                        <Rocket size={80} />
                                    </div>
                                    <h4 className="text-white font-black uppercase tracking-tighter text-xl">Sınırlı Sürüm</h4>
                                    <p className="text-gray/60 text-xs mt-2 leading-relaxed">Cyber-Neon koleksiyonumuzdaki son ürünleri kaçırmayın.</p>
                                    <Link
                                        href="/deals"
                                        onClick={onClose}
                                        className="mt-6 flex items-center gap-2 text-secondary text-[10px] font-black uppercase tracking-[0.2em]"
                                    >
                                        GÖZ AT <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchOverlay;
