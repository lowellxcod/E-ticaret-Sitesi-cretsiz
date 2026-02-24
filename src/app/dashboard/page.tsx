"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import GlassCard from "@/components/ui/GlassCard";
import GlassButton from "@/components/ui/GlassButton";
import { User, Package, Settings, LogOut, ChevronRight, Rocket, Shield, Percent } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) return null;

    const SparklesIcon = ({ size, className }: { size: number, className?: string }) => (
        <Rocket size={size} className={className} />
    );

    const [orderCount, setOrderCount] = useState("0");
    const [points, setPoints] = useState("0");

    useEffect(() => {
        // Fetch Orders count
        fetch('/api/user/orders')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setOrderCount(data.length.toString());
            })
            .catch(err => console.error(err));

        // Fetch Loyalty points
        fetch('/api/loyalty')
            .then(res => res.json())
            .then(data => {
                if (data.points !== undefined) setPoints(data.points.toString());
            })
            .catch(err => console.error(err));
    }, []);

    const stats = [
        { label: "Siparişlerim", value: orderCount, icon: Package, color: "text-blue-400" },
        { label: "Cyber-Puanlarım", value: points, icon: SparklesIcon, color: "text-secondary" },
        { label: "İndirim Oranı", value: "%10", icon: Percent, color: "text-green-400" },
    ];

    return (
        <div className="min-h-screen py-32 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />

            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <GlassCard className="p-6 border-secondary/20">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-gradient-to-tr from-secondary to-primary rounded-full flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-neon-purple/20 border-2 border-white/10">
                                    {session.user?.name?.charAt(0)}
                                </div>
                                <h2 className="text-xl font-bold text-white uppercase tracking-wider">{session.user?.name}</h2>
                                <p className="text-white/40 text-sm mb-6">{session.user?.email}</p>
                                <div className="w-full h-px bg-white/5 mb-6" />
                                <div className="flex flex-col w-full gap-2">
                                    <button className="flex items-center justify-between w-full p-3 rounded-2xl bg-secondary/10 text-secondary text-sm font-bold border border-secondary/20 transition-all">
                                        <span className="flex items-center gap-3"><User size={18} /> Profilim</span>
                                        <ChevronRight size={16} />
                                    </button>

                                    {session.user?.email === "kullanici@sirket.com" && (
                                        <button
                                            onClick={() => router.push('/admin')}
                                            className="flex items-center justify-between w-full p-3 rounded-2xl bg-red-500/10 text-red-500 text-sm font-bold border border-red-500/20 hover:bg-red-500/20 transition-all"
                                        >
                                            <span className="flex items-center gap-3"><Shield size={18} /> YÖNETİCİ PANELİ</span>
                                            <ChevronRight size={16} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => router.push('/dashboard/orders')}
                                        className="flex items-center justify-between w-full p-3 rounded-2xl hover:bg-white/5 text-white/60 text-sm font-bold transition-all"
                                    >
                                        <span className="flex items-center gap-3"><Package size={18} /> Siparişler</span>
                                        <ChevronRight size={16} />
                                    </button>
                                    <button
                                        onClick={() => router.push('/dashboard/settings')}
                                        className="flex items-center justify-between w-full p-3 rounded-2xl hover:bg-white/5 text-white/60 text-sm font-bold transition-all"
                                    >
                                        <span className="flex items-center gap-3"><Settings size={18} /> Ayarlar</span>
                                        <ChevronRight size={16} />
                                    </button>
                                    <button
                                        onClick={() => signOut()}
                                        className="flex items-center justify-between w-full p-3 rounded-2xl hover:bg-red-500/10 text-red-400 text-sm font-bold transition-all mt-4"
                                    >
                                        <span className="flex items-center gap-3"><LogOut size={18} /> Çıkış Yap</span>
                                    </button>
                                </div>
                            </div>
                        </GlassCard>

                        <div className="glass p-6 rounded-[32px] border-primary/20">
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="text-primary" size={20} />
                                <span className="text-[10px] font-black tracking-widest text-primary uppercase">Güvenlik Durumu</span>
                            </div>
                            <p className="text-white/40 text-[10px] leading-relaxed">Hesabınız uçtan uca şifreleme ve Nexus OS gelişmiş koruma sistemi ile korunmaktadır.</p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <GlassCard className="p-6 border-white/5 flex items-center justify-between group cursor-pointer hover:border-secondary/30 transition-all">
                                        <div className="space-y-1">
                                            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                                            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                                        </div>
                                        <div className={`p-4 rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                                            <stat.icon size={24} />
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>

                        <GlassCard className="p-8 border-white/5 min-h-[400px] flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-4">
                                <Package size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Henüz siparişiniz bulunmuyor</h3>
                            <p className="text-white/40 text-sm mb-8 max-w-sm">Nexus OS dünyasındaki binlerce ürün arasından sana en uygun olanı hemen keşfetmeye başla!</p>
                            <GlassButton variant="primary" className="px-8 py-4 rounded-full shadow-neon-purple group">
                                Alışverişe Başla <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </GlassButton>
                        </GlassCard>
                    </div>
                </div>
            </Container>
        </div>
    );
}
