"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GlassButton from "@/components/ui/GlassButton";
import NeonInput from "@/components/ui/NeonInput";
import Container from "@/components/ui/Container";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Bot protection: if honeypot is filled, ignore the request
        const formData = new FormData(e.target as HTMLFormElement);
        if (formData.get("website")) {
            console.log("Bot detected!");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const err = await res.text();
                throw new Error(err || "Kayıt sırasında bir hata oluştu");
            }

            setSuccess(true);
            setTimeout(() => router.push("/auth/login"), 2000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Container className="max-w-md text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="p-12 glass rounded-[40px] border-green-500/20"
                    >
                        <div className="inline-flex p-6 rounded-3xl bg-green-500/10 text-green-500 mb-6">
                            <CheckCircle2 size={48} />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Başarılı!</h2>
                        <p className="text-white/60">Hesabınız başarıyla oluşturuldu. Giriş sayfasına yönlendiriliyorsunuz...</p>
                    </motion.div>
                </Container>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-20 flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] -z-10 animate-pulse delay-700" />

            <Container className="max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <GlassCard className="p-8 border-primary/20 shadow-neon-blue/20">
                        <div className="text-center mb-8">
                            <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-4">
                                <UserPlus size={32} />
                            </div>
                            <h1 className="text-3xl font-bold mb-2">Hesap Oluştur</h1>
                            <p className="text-white/60">Nexus OS ailesine katılın</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-x-0 space-y-6">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3 text-sm"
                                >
                                    <AlertCircle size={18} />
                                    {error}
                                </motion.div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80 ml-1">Tam Adınız</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                                    <NeonInput
                                        placeholder="Ad Soyad"
                                        required
                                        value={data.name}
                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                        className="pl-12"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80 ml-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                                    <NeonInput
                                        type="email"
                                        placeholder="ornek@mail.com"
                                        required
                                        value={data.email}
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                        className="pl-12"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80 ml-1">Şifre</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                                    <NeonInput
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        value={data.password}
                                        onChange={(e) => setData({ ...data, password: e.target.value })}
                                        className="pl-12"
                                    />
                                </div>
                            </div>

                            {/* Honeypot field - hidden from users */}
                            <div className="hidden" aria-hidden="true">
                                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                            </div>

                            <GlassButton
                                type="submit"
                                variant="secondary"
                                className="w-full py-4 rounded-2xl shadow-neon-blue group"
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin mr-2" />
                                ) : (
                                    <>Kayıt Ol <UserPlus className="ml-2 group-hover:translate-x-1 transition-transform" size={18} /></>
                                )}
                            </GlassButton>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-white/60 text-sm">
                                Zaten hesabınız var mı?{" "}
                                <Link href="/auth/login" className="text-primary font-semibold hover:underline">Giriş Yapın</Link>
                            </p>
                        </div>
                    </GlassCard>
                </motion.div>
            </Container>
        </div>
    );
}
