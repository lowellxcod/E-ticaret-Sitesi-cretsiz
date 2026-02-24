"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Heart, Search, Menu, X, ChevronDown, Rocket, Sparkles, LogOut, Settings, Shield } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { cn } from "../../lib/utils";
import Container from "../ui/Container";
import GlassButton from "../ui/GlassButton";
import { mainCategories } from "@/data/categories";
import { useCartStore } from "@/lib/store";
import CartDrawer from "../cart/CartDrawer";
import SearchOverlay from "./SearchOverlay";


const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { getItemCount, openCart } = useCartStore();
    const { data: session, status } = useSession();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [points, setPoints] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        if (status === "authenticated") {
            fetch('/api/loyalty')
                .then(res => res.json())
                .then(data => {
                    if (data.points !== undefined) setPoints(data.points);
                })
                .catch(err => console.error("Points fetch error:", err));
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, [status]);

    const handleMouseEnter = (slug: string) => {
        if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
        setActiveCategory(slug);
    };

    const handleMouseLeave = () => {
        menuTimeoutRef.current = setTimeout(() => {
            setActiveCategory(null);
        }, 300);
    };

    return (
        <nav
            onMouseLeave={handleMouseLeave}
            className={cn(
                "fixed top-0 left-0 right-0 z-[60] transition-all duration-300 border-b",
                isScrolled || activeCategory
                    ? "bg-background/95 backdrop-blur-xl border-primary/20 py-2 shadow-2xl"
                    : "bg-transparent border-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between gap-8 h-12">
                    {/* Logo */}
                    <Link href="/" className="group flex-shrink-0">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2"
                        >
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full rotate-45 group-hover:rotate-180 transition-transform duration-500 shadow-neon" />
                            <span className="text-xl font-black tracking-tighter text-white">
                                ELECTRO<span className="text-primary">NOVA</span>
                            </span>
                        </motion.div>
                    </Link>

                    {/* Desktop Nav - High-end Category Rail */}
                    <div className="hidden xl:flex items-center justify-center flex-grow gap-1">
                        {mainCategories.slice(0, 5).map((cat) => (
                            <div
                                key={cat.slug}
                                onMouseEnter={() => handleMouseEnter(cat.slug)}
                                className="relative py-2"
                            >
                                <Link
                                    href={`/products/${cat.slug}`}
                                    className={cn(
                                        "px-3 py-1 text-[11px] font-black tracking-[0.15em] uppercase transition-all duration-300 rounded-full flex items-center gap-1.5 whitespace-nowrap",
                                        activeCategory === cat.slug
                                            ? "text-primary bg-primary/10"
                                            : "text-gray-light hover:text-white"
                                    )}
                                >
                                    {cat.name}
                                    <ChevronDown size={10} className={cn("transition-transform duration-300", activeCategory === cat.slug && "rotate-180")} />
                                </Link>
                                {activeCategory === cat.slug && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute -bottom-1 left-3 right-3 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                                    />
                                )}
                            </div>
                        ))}

                        {/* "Diğer" Dropdown for remaining categories */}
                        <div className="relative py-2" onMouseEnter={() => handleMouseEnter("other-categories")}>
                            <button
                                className={cn(
                                    "px-3 py-1 text-[11px] font-black tracking-[0.15em] uppercase transition-all duration-300 rounded-full flex items-center gap-1.5 whitespace-nowrap",
                                    activeCategory === "other-categories"
                                        ? "text-secondary bg-secondary/10"
                                        : "text-gray-light hover:text-white"
                                )}
                            >
                                DİĞER <ChevronDown size={10} className={cn("transition-transform duration-300", activeCategory === "other-categories" && "rotate-180")} />
                            </button>
                            {activeCategory === "other-categories" && (
                                <motion.div
                                    layoutId="nav-underline"
                                    className="absolute -bottom-1 left-3 right-3 h-px bg-gradient-to-r from-transparent via-secondary to-transparent"
                                />
                            )}
                        </div>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-4 flex-shrink-0">

                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-gray-light hover:text-primary transition-colors"
                        >
                            <Search size={18} />
                        </button>
                        <button
                            onClick={openCart}
                            className="text-gray-light hover:text-primary transition-colors relative group"
                        >
                            <ShoppingCart size={18} />
                            <span className="absolute -top-1.5 -right-1.5 bg-primary text-black text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                                {mounted ? getItemCount() : 0}
                            </span>
                        </button>

                        <div className="relative">
                            {status === "authenticated" ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 px-3 py-1.5 glass border-secondary/20 rounded-full hover:border-secondary transition-all"
                                    >
                                        {points !== null && (
                                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-secondary/20 rounded-full border border-secondary/30 mr-1">
                                                <Sparkles size={10} className="text-secondary" />
                                                <span className="text-[9px] font-black text-secondary">{points}</span>
                                            </div>
                                        )}
                                        <div className="w-5 h-5 bg-gradient-to-tr from-secondary to-primary rounded-full flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                            {session.user?.name?.charAt(0)}
                                        </div>
                                        <span className="text-[10px] font-bold text-white/80 hidden lg:block uppercase tracking-widest">
                                            {session.user?.name?.split(' ')[0]}
                                        </span>
                                    </button>

                                    <AnimatePresence>
                                        {isProfileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className="absolute top-full right-0 mt-2 w-48 glass border-secondary/20 rounded-2xl overflow-hidden shadow-2xl z-[70]"
                                            >
                                                <div className="p-4 border-b border-white/5 bg-secondary/5">
                                                    <p className="text-[10px] font-black tracking-widest text-white uppercase">{session.user?.name}</p>
                                                    <p className="text-[9px] text-white/40 truncate">{session.user?.email}</p>
                                                </div>
                                                <div className="p-2">
                                                    <Link href="/dashboard" className="flex items-center gap-2 w-full p-2 text-[10px] font-bold text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                                                        <User size={14} /> PANELİM
                                                    </Link>
                                                    {/* Admin Link - Only for specific email (Client side check for UI, Server side for security) */}
                                                    {/* In a real app, use a role-based check from the session */}
                                                    {(session.user?.email === "eklc67841z@gmail.com" || session.user?.email === "admin@alanadiniz.com") && (
                                                        <Link href="/admin" className="flex items-center gap-2 w-full p-2 text-[10px] font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all bg-red-500/5 mb-1">
                                                            <Shield size={14} /> YÖNETİCİ PANELİ
                                                        </Link>
                                                    )}
                                                    <Link href="/dashboard/settings" className="flex items-center gap-2 w-full p-2 text-[10px] font-bold text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                                                        <Settings size={14} /> AYARLAR
                                                    </Link>
                                                    <button
                                                        onClick={() => signOut()}
                                                        className="flex items-center gap-2 w-full p-2 text-[10px] font-bold text-red-400 hover:text-red-300 hover:bg-red-500/5 rounded-xl transition-all mt-1"
                                                    >
                                                        <LogOut size={14} /> ÇIKIŞ YAP
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link href="/auth/login">
                                    <GlassButton variant="secondary" className="px-5 py-2 !text-[10px] !font-black rounded-full border-secondary/30">
                                        GİRİŞ YAP
                                    </GlassButton>
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="xl:hidden text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mega Menu Overlay */}
            <AnimatePresence>
                {activeCategory && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 bg-black backdrop-blur-3xl border-b border-primary/20 shadow-2xl py-12 overflow-hidden z-[70]"
                        onMouseEnter={() => {
                            if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
                        }}
                    >
                        {/* Background Glows */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                        <Container className="relative z-10">
                            <div className="grid grid-cols-12 gap-12">
                                {/* Featured Promo in Mega Menu */}
                                <div className="col-span-3 space-y-6">
                                    <div className="glass p-6 border-primary/20 rounded-3xl group cursor-pointer overflow-hidden">
                                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                                            <div className="absolute top-2 left-2 z-20 bg-primary/20 backdrop-blur-md px-2 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-primary/30">
                                                Özel Fırsat
                                            </div>
                                            <div className="absolute inset-0 bg-[url('/images/klavye.png')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
                                        </div>
                                        <h4 className="text-white font-black uppercase text-sm tracking-tighter">Cyber-Edition Serisi</h4>
                                        <p className="text-gray/60 text-xs mt-2 leading-relaxed">Yeni nesil ekipmanlarla kurulumunuzu bir üst seviyeye taşıyın.</p>
                                        <div className="mt-4 flex items-center text-primary text-[10px] font-bold uppercase tracking-widest gap-2">
                                            Keşfet <Rocket size={12} />
                                        </div>
                                    </div>
                                </div>

                                {/* Multi-column Links */}
                                <div className="col-span-9">
                                    {activeCategory === "other-categories" ? (
                                        <div className="grid grid-cols-4 gap-x-8 gap-y-10">
                                            {mainCategories.slice(5).map((cat, i) => (
                                                <motion.div
                                                    key={cat.slug}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.03 }}
                                                >
                                                    <div className="space-y-4">
                                                        <Link href={`/products/${cat.slug}`} className="text-primary font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors">
                                                            {cat.name}
                                                        </Link>
                                                        <div className="flex flex-col gap-2">
                                                            {cat.subCategories.slice(0, 4).map((sub) => (
                                                                <Link
                                                                    key={sub.slug}
                                                                    href={`/products/${cat.slug}/${sub.slug}`}
                                                                    className="text-gray/60 hover:text-white transition-all text-xs font-semibold"
                                                                >
                                                                    {sub.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-4 gap-x-8 gap-y-10">
                                            {mainCategories.find(c => c.slug === activeCategory)?.subCategories.map((sub, i) => (
                                                <motion.div
                                                    key={sub.slug}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.03 }}
                                                >
                                                    <Link
                                                        href={`/products/${activeCategory}/${sub.slug}`}
                                                        className="group flex flex-col"
                                                    >
                                                        <span className="text-gray-light hover:text-primary transition-all duration-300 text-sm font-bold uppercase tracking-wide group-hover:translate-x-1">
                                                            {sub.name}
                                                        </span>
                                                        <div className="w-4 h-0.5 bg-primary/20 mt-1 transition-all group-hover:w-full group-hover:bg-primary" />
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Additional Navigation Links */}
                                    <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex gap-8">
                                            <Link href="/products" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray/40 hover:text-white transition-colors">Tüm Ürünleri Gör</Link>
                                            <Link href="/deals" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-white transition-colors flex items-center gap-2">
                                                <Sparkles size={12} /> Güncel Kampanyalar
                                            </Link>
                                        </div>
                                        <p className="text-[10px] text-gray/20 font-mono tracking-widest">Nexus Projelendirme v2.4</p>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu - Re-engineered for deep hierarchy */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-surface-dark/98 backdrop-blur-2xl z-[70] p-6 lg:hidden"
                    >
                        <div className="flex justify-between items-center mb-10">
                            <span className="text-xl font-black text-white tracking-tighter">MENÜ</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 glass rounded-full flex items-center justify-center text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-2 h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
                            {mainCategories.map((cat) => (
                                <details key={cat.slug} className="group border-b border-white/5 pb-2">
                                    <summary className="list-none flex justify-between items-center py-4 cursor-pointer">
                                        <span className="text-xl font-black text-gray-light group-open:text-primary transition-colors uppercase tracking-tighter">
                                            {cat.name}
                                        </span>
                                        <ChevronDown size={20} className="text-gray/40 transition-transform group-open:rotate-180" />
                                    </summary>
                                    <div className="grid grid-cols-1 gap-4 pl-4 pb-4">
                                        {cat.subCategories.map((sub) => (
                                            <Link
                                                key={sub.slug}
                                                href={`/products/${cat.slug}/${sub.slug}`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="text-sm font-bold text-gray/60 hover:text-white transition-colors"
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                </details>
                            ))}
                        </div>

                        <div className="absolute bottom-8 left-6 right-6 space-y-4">
                            <div className="flex gap-4">
                                <Link href="/cart" className="flex-grow glass py-4 flex items-center justify-center gap-2 text-white font-bold text-sm">
                                    <ShoppingCart size={18} /> Sepet
                                </Link>
                                {status === "authenticated" ? (
                                    <button
                                        onClick={() => signOut()}
                                        className="flex-grow glass py-4 flex items-center justify-center gap-2 text-red-400 font-bold text-sm"
                                    >
                                        <LogOut size={18} /> ÇIKIŞ
                                    </button>
                                ) : (
                                    <Link href="/auth/login" className="flex-grow glass py-4 flex items-center justify-center gap-2 text-white font-bold text-sm">
                                        <User size={18} /> GİRİŞ
                                    </Link>
                                )}
                            </div>
                            <div className="p-4 glass border-primary/20 flex items-center gap-3">
                                <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-neon" />
                                <span className="text-[10px] font-black tracking-widest text-white/50 uppercase">Bağlantı Aktif // Nexus v2.4</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Global Overlays */}
            <CartDrawer />
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </nav >
    );
};

export default Navbar;
