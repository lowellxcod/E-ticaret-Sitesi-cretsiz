"use client";

import React from "react";
import Container from "@/components/ui/Container";
import GlassCard from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { HelpCircle, ChevronRight } from "lucide-react";

const FAQS = [
    {
        q: "Siparişimi nasıl takip edebilirim?",
        a: "Siparişinizi verdikten sonra size gönderilen takip numarası ile 'Sipariş Takibi' sayfamızdan veya ilgili kargo firmasının web sitesinden durumunu kontrol edebilirsiniz."
    },
    {
        q: "İade politikası nedir?",
        a: "Satın aldığınız ürünleri, ambalajı açılmamış ve kullanılmamış olması kaydıyla 14 gün içerisinde koşulsuz iade edebilirsiniz."
    },
    {
        q: "Garanti süresi ne kadar?",
        a: "Tüm elektronik ürünlerimiz 2 yıl resmi üretici garantisi altındadır. Bazı özel ekipmanlarda bu süre 3 veya 5 yıla kadar çıkabilmektedir."
    },
    {
        q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
        a: "Tüm kredi kartları, banka kartları, havale/EFT ve seçili kripto para birimleri ile ödeme yapabilirsiniz."
    }
];

export default function FAQPage() {
    return (
        <div className="min-h-screen py-24 bg-background">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">SSS</h1>
                    <p className="text-gray-light max-w-2xl mx-auto uppercase tracking-widest text-xs font-bold px-4">Sıkça Sorulan Sorular // Destek Merkezi</p>
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-6">
                    {FAQS.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <GlassCard className="p-8 border-white/5 hover:border-primary/20 transition-all cursor-pointer group">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 glass rounded-full flex items-center justify-center text-primary border-primary/20 group-hover:shadow-neon transition-all flex-shrink-0">
                                        <HelpCircle size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3 flex items-center gap-2">
                                            {faq.q}
                                        </h3>
                                        <p className="text-gray-light/70 leading-relaxed text-sm">
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </div>
    );
}
