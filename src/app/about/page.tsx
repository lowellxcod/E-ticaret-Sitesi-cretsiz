"use client";

import React from "react";
import Container from "@/components/ui/Container";
import GlassCard from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { Rocket, Target, Users, Zap } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen py-24 bg-background overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] -z-10" />

            <Container>
                <div className="text-center mb-20 space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter"
                    >
                        BİZ <span className="text-primary">KİMİZ?</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-light max-w-2xl mx-auto text-lg"
                    >
                        Oyun dünyasının sınırlarını zorlayanlar için, geleceğin teknolojisini bugünden sunuyoruz.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-black text-white uppercase">HİKAYEMİZ</h2>
                        <p className="text-gray-400 leading-relaxed">
                            2024 yılında kurulan ElectroNova, sıradan bir e-ticaret sitesi olmanın ötesinde, oyuncular tarafından oyuncular için tasarlanmış bir ekosistemdir.
                            Teknolojinin hızına yetişmek değil, ona yön vermek amacıyla yola çıktık.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Misyonumuz basit: En yeni donanımları, en adil fiyatlarla ve kusursuz bir deneyimle sizlere ulaştırmak. Çünkü biliyoruz ki, doğru ekipman
                            sadece performansı değil, oyunun kaderini değiştirir.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative h-[400px] rounded-2xl overflow-hidden glass border-primary/20 group"
                    >
                        {/* Placeholder for About Image - could be a generated one later */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 mix-blend-overlay z-10" />
                        <Image
                            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop"
                            alt="Gaming Setup"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { icon: Rocket, title: "İNOVASYON", desc: "Sürekli en yeni teknolojiyi takip ediyoruz." },
                        { icon: Target, title: "HEDEF", desc: "Mükemmel müşteri memnuniyeti." },
                        { icon: Users, title: "TOPLULUK", desc: "Oyuncularla büyüyen bir aile." },
                        { icon: Zap, title: "HIZ", desc: "Aynı gün kargo ve hızlı destek." },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <GlassCard className="p-8 text-center h-full hover:border-primary/50 transition-colors">
                                <item.icon size={40} className="text-primary mx-auto mb-6" />
                                <h3 className="font-black text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.desc}</p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </div>
    );
}
