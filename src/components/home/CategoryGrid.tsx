"use client";

import React from "react";
import { motion } from "framer-motion";
import { Keyboard, Mouse, Headphones, Monitor, Cpu, Laptop } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import Container from "../ui/Container";
import { cn } from "../../lib/utils";

import Link from "next/link";

const categories = [
    { name: "Klavyeler", icon: Keyboard, count: "42 Ünite", color: "text-primary", href: "/products/keyboards" },
    { name: "Fareler", icon: Mouse, count: "28 Ünite", color: "text-secondary", href: "/products/mice" },
    { name: "Kulaklıklar", icon: Headphones, count: "15 Ünite", color: "text-accent", href: "/products/headsets" },
    { name: "Monitörler", icon: Monitor, count: "12 Ünite", color: "text-primary", href: "/products/monitors" },
    { name: "Keycaps", icon: Cpu, count: "24 Ünite", color: "text-secondary", href: "/products/keycaps" },
    { name: "Dekorasyon", icon: Laptop, count: "30 Ünite", color: "text-accent", href: "/products/setup-decoration" },
];

const CategoryGrid = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
                            Popüler <span className="text-primary">Kategoriler</span>
                        </h2>
                        <p className="text-gray-light max-w-md font-medium">
                            Oyun teknolojisindeki en son gelişmeleri keşfedin. Performans ve estetiğe göre filtrelenmiştir.
                        </p>
                    </div>
                    <Link href="/products" className="text-primary font-bold uppercase tracking-widest text-sm hover:underline">
                        Tüm Arşivleri Görüntüle
                    </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link href={cat.href}>
                                <GlassCard className="group cursor-pointer border-primary/5 hover:border-primary/40 transition-all duration-500">
                                    <div className="flex flex-col items-center text-center space-y-6">
                                        <div className={cn("p-6 glass rounded-full group-hover:shadow-neon transition-all duration-500", cat.color)}>
                                            <cat.icon size={32} />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-black text-white uppercase tracking-tighter">
                                                {cat.name}
                                            </h3>
                                            <p className="text-gray/50 text-[10px] uppercase tracking-widest font-bold">
                                                {cat.count}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hover line effect */}
                                    <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-gradient-to-r from-primary to-secondary transition-all duration-700 group-hover:w-full" />
                                </GlassCard>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default CategoryGrid;
