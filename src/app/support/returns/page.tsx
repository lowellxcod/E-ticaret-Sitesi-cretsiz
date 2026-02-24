"use client";

import React from "react";
import Container from "@/components/ui/Container";
import GlassCard from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { RotateCcw, Package, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function ReturnsPage() {
    return (
        <div className="min-h-screen py-24 bg-background">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">İADE & DEĞİŞİM</h1>
                    <p className="text-gray-light max-w-2xl mx-auto uppercase tracking-widest text-xs font-bold px-4">Haklarınız ve Güvencemiz // Nexus Destek</p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-12">
                    <GlassCard className="p-10 border-primary/20 bg-primary/5">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary border-primary/20">
                                <RotateCcw size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight">14 GÜN KOŞULSUZ İADE</h2>
                        </div>
                        <p className="text-gray-light font-medium leading-relaxed">
                            Satın aldığınız ürünü, teslim aldığınız tarihten itibaren 14 gün içerisinde herhangi bir gerekçe göstermeksizin iade edebilirsiniz. Cayma hakkının kullanılması için ürünün orijinal ambalajının bozulmamış ve yeniden satılabilir durumda olması gerekmektedir.
                        </p>
                    </GlassCard>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h3 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <Package className="text-primary" size={20} /> İade Süreci
                            </h3>
                            <ul className="space-y-4 text-sm text-gray-light/70">
                                <li className="flex gap-3">
                                    <span className="text-primary font-black">01.</span>
                                    <span>Hesabım sayfasından iade talebi oluşturun.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-black">02.</span>
                                    <span>Size verilen iade kodu ile kargoya teslim edin.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-black">03.</span>
                                    <span>Ürün kontrol ekibimiz tarafından onaylansın.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-black">04.</span>
                                    <span>3-5 iş günü içerisinde iadeniz gerçekleşsin.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <AlertTriangle className="text-secondary" size={20} /> İade Edilemeyenler
                            </h3>
                            <ul className="space-y-4 text-sm text-gray-light/70">
                                <li className="flex gap-3">
                                    <CheckCircle2 className="text-gray/20" size={16} />
                                    <span>Ambalajı/Koruma bandı açılmış dijital ürünler.</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="text-gray/20" size={16} />
                                    <span>Hijyen kuralları gereği kullanılan kulakiçi kulaklıklar.</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="text-gray/20" size={16} />
                                    <span>Kurulumu yapılmış kişiselleştirilmiş sistemler.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
