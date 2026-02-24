"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import GlassButton from "../ui/GlassButton";
import NeonInput from "../ui/NeonInput";
import Container from "../ui/Container";

const Newsletter = () => {
    return (
        <section className="py-24 relative">
            <Container>
                <div className="glass p-12 md:p-24 relative overflow-hidden border-primary/10 rounded-5xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                    <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                                <span className="text-primary text-glow">NÖRAL AĞA</span> KATILIN
                            </h2>
                            <p className="text-gray-light font-medium">
                                En son güncellemelerimiz ve özel terminal erişim kodlarımızla gelen kutunuzu senkronize edin.
                                Stoklardan ilk siz haberdar olun.
                            </p>
                        </motion.div>

                        <motion.form
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <NeonInput
                                type="email"
                                placeholder="KULLANICI_EPOSTA_GİRİŞİ"
                                className="font-mono"
                            />
                            <GlassButton variant="primary" className="whitespace-nowrap px-10">
                                Senkronize Et <Send size={16} className="ml-2" />
                            </GlassButton>
                        </motion.form>

                        <p className="text-[10px] text-gray/40 uppercase tracking-[0.2em] font-bold">
                            Veri koruması aktif // Sıfır takip protokolü
                        </p>
                    </div>

                    {/* Background Decoration */}
                    <div className="absolute top-1/2 left-0 w-48 h-48 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />
                    <div className="absolute top-1/2 right-0 w-48 h-48 bg-secondary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                </div>
            </Container>
        </section>
    );
};

export default Newsletter;
