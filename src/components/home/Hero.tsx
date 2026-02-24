import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import GlassButton from "../ui/GlassButton";
import Container from "../ui/Container";

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
            {/* 3D Background Elements */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 -left-20 w-[45rem] h-[45rem] bg-primary/20 rounded-full blur-[150px]"
                />
                <motion.div
                    animate={{
                        rotate: [360, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 -right-20 w-[45rem] h-[45rem] bg-secondary/20 rounded-full blur-[150px]"
                />

                {/* Neon Grid Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <Container className="relative z-10">
                <div className="text-center space-y-10 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase tracking-[0.3em] font-bold mb-6">
                            Veri Bağlantısı Kuruldu :: Faz 01
                        </span>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none">
                            <span className="block text-white">YENİ NESİL</span>
                            <span className="block bg-gradient-to-r from-primary via-secondary to-purple-400 bg-clip-text text-transparent">
                                OYUNCU EKİPMANLARI
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="text-gray-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
                    >
                        Cyberpunk esintili koleksiyonumuzla performansın zirvesine tırmanın.
                        Dijital göçebeler için hassasiyetle tasarlanmış donanımlar.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-wrap justify-center gap-6"
                    >
                        <GlassButton size="lg" variant="primary" className="min-w-[200px]" href="/products">
                            Koleksiyonu İncele
                        </GlassButton>
                        <GlassButton size="lg" variant="glass" className="min-w-[200px]" href="/tech">
                            Teknolojiyi Keşfet
                        </GlassButton>
                    </motion.div>

                    {/* Floating Search Bar (Conceptual) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="mt-16 max-w-2xl mx-auto hidden md:block"
                    >
                        <div className="glass p-1 rounded-full flex items-center border-primary/20 focus-within:border-primary transition-all group overflow-hidden">
                            <input
                                type="text"
                                placeholder="NEXUS_AĞINDA_ARA..."
                                className="bg-transparent border-none outline-none flex-grow px-8 py-4 text-white font-mono placeholder:text-gray/30"
                            />
                            <button className="bg-primary text-black px-10 py-4 font-bold hover:bg-primary-dark transition-colors uppercase tracking-widest text-xs rounded-full">
                                Tara
                            </button>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};

export default Hero;
