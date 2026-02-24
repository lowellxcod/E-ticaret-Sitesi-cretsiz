"use client";

import React from "react";
import Container from "@/components/ui/Container";
import GlassCard from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen py-24 bg-background">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">İLETİSİM</h1>
                    <p className="text-gray-light max-w-2xl mx-auto uppercase tracking-widest text-xs font-bold px-4">Nexus İletişim Hattı // Müşteri Hizmetleri</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
                        <GlassCard className="p-10 border-primary/10 flex flex-col items-center text-center h-full">
                            <Mail size={40} className="text-primary mb-6" />
                            <h3 className="text-xl font-black text-white uppercase mb-2">EMAIL</h3>
                            <p className="text-gray-light/60 text-sm mb-6">Sorularınız için bize yazın.</p>
                            <a href="mailto:destek@nexaplay.com" className="text-primary font-bold hover:underline">destek@nexaplay.com</a>
                        </GlassCard>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                        <GlassCard className="p-10 border-secondary/10 flex flex-col items-center text-center h-full shadow-neon-sm">
                            <Phone size={40} className="text-secondary mb-6" />
                            <h3 className="text-xl font-black text-white uppercase mb-2">WHATSAPP</h3>
                            <p className="text-gray-light/60 text-sm mb-6">Anlık destek hattı.</p>
                            <a href="https://wa.me/905555555555" className="text-secondary font-bold hover:underline">+90 555 555 55 55</a>
                        </GlassCard>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
                        <GlassCard className="p-10 border-white/10 flex flex-col items-center text-center h-full">
                            <Clock size={40} className="text-white mb-6" />
                            <h3 className="text-xl font-black text-white uppercase mb-2">SAATLER</h3>
                            <p className="text-gray-light/60 text-sm mb-6">Size hizmet verdiğimiz zamanlar.</p>
                            <span className="text-white font-bold">Hergün: 09:00 - 21:00</span>
                        </GlassCard>
                    </motion.div>
                </div>

                <div className="mt-20">
                    <GlassCard className="p-1 max-w-4xl mx-auto overflow-hidden rounded-[40px] border-white/5">
                        <div className="bg-surface-dark/40 p-12">
                            <h2 className="text-3xl font-black text-white uppercase mb-8">Bize Mesaj Gönderin</h2>
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray font-black uppercase tracking-widest ml-4">Adınız</label>
                                    <input type="text" className="w-full glass bg-transparent border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-primary transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray font-black uppercase tracking-widest ml-4">Email</label>
                                    <input type="email" className="w-full glass bg-transparent border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-primary transition-all" />
                                </div>
                                <div className="col-span-full space-y-2">
                                    <label className="text-[10px] text-gray font-black uppercase tracking-widest ml-4">Mesajınız</label>
                                    <textarea rows={4} className="w-full glass bg-transparent border-white/10 rounded-[30px] px-6 py-4 text-white focus:outline-none focus:border-primary transition-all resize-none"></textarea>
                                </div>
                                <button className="col-span-full bg-primary text-black font-black uppercase tracking-widest py-5 rounded-full hover:shadow-neon transition-all mt-4">
                                    GÖNDER :: TRANSMIT
                                </button>
                            </form>
                        </div>
                    </GlassCard>
                </div>
            </Container>
        </div>
    );
}
