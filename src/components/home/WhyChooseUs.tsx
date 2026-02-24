"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Headphones, Globe } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import Container from "../ui/Container";
import { cn } from "../../lib/utils";

const stats = [
    { label: "Seçkin Üyeler", value: "50b+", icon: Globe, color: "text-primary" },
    { label: "Donanım Ünitesi", value: "1.2b+", icon: Zap, color: "text-secondary" },
    { label: "Canlı Destek", value: "24/7", icon: Headphones, color: "text-accent" },
    { label: "Güvenli Merkez", value: "100%", icon: Shield, color: "text-primary" },
];

const WhyChooseUs = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-tight">
                                <span className="text-primary">ELECTRONOVA</span> <br />
                                AVANTAJI
                            </h2>
                            <p className="text-gray-light mt-6 text-lg max-w-lg leading-relaxed font-medium">
                                Sadece donanım satmıyoruz; dijital dünyaya hükmetmeniz için araçlar sunuyoruz.
                                Her ünite, insan arayüzüyle maksimum senkronizasyon için denetlenir.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-6">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <GlassCard className="p-4 border-primary/5">
                                        <stat.icon className={cn("mb-2", stat.color)} size={24} />
                                        <h3 className="text-3xl font-black text-white font-mono">{stat.value}</h3>
                                        <p className="text-[10px] text-gray/50 uppercase tracking-widest font-bold">{stat.label}</p>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        {/* Abstract Tech Illustration Placeholder */}
                        <div className="aspect-square glass rounded-3xl border-primary/20 relative overflow-hidden group shadow-[0_20px_50px_rgba(168,85,247,0.1)]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-secondary/30" />
                            <div className="absolute inset-0 bg-[url('/images/latency-visual.png')] bg-cover bg-center grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-1000" />

                            {/* Scanning Line Effect */}
                            <motion.div
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-1.5 bg-primary/50 shadow-neon z-10"
                            />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 border-2 border-primary/30 rounded-full animate-ping" />
                                <div className="absolute w-48 h-48 border border-secondary/20 rounded-full animate-[spin_10s_linear_infinite]" />
                            </div>
                        </div>

                        {/* Floating Data Tags */}
                        <div className="absolute -top-6 -right-6 glass p-6 border-accent/20 animate-bounce rounded-full shadow-neon-purple">
                            <p className="text-accent text-[10px] font-bold uppercase tracking-widest leading-none">Latency</p>
                            <p className="text-white font-mono font-bold">0.12ms</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default WhyChooseUs;
