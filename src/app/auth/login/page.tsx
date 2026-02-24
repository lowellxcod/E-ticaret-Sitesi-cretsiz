"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GlassButton from "@/components/ui/GlassButton";
import NeonInput from "@/components/ui/NeonInput";
import Container from "@/components/ui/Container";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState({
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
            const callback = await signIn("credentials", {
                ...data,
                redirect: false,
            });

            if (callback?.error) {
                setError(callback.error);
            }

            if (callback?.ok && !callback?.error) {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            setError("Bir hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-20 flex items-center justify-center relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse delay-700" />

            <Container className="max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <GlassCard className="p-8 border-secondary/20 shadow-neon-purple/20">
                        <div className="text-center mb-8">
                            <div className="inline-flex p-4 rounded-2xl bg-secondary/10 text-secondary mb-4">
                                <LogIn size={32} />
                            </div>
                            <h1 className="text-3xl font-bold mb-2">Hoş Geldiniz</h1>
                            <p className="text-white/60">Hesabınıza giriş yapın</p>
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
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm font-medium text-white/80">Şifre</label>
                                    <Link href="#" className="text-xs text-secondary hover:underline">Şifremi Unuttum</Link>
                                </div>
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
                                variant="primary"
                                className="w-full py-4 rounded-2xl shadow-neon-purple group"
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin mr-2" />
                                ) : (
                                    <>Giriş Yap <LogIn className="ml-2 group-hover:translate-x-1 transition-transform" size={18} /></>
                                )}
                            </GlassButton>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-white/60 text-sm">
                                Hesabınız yok mu?{" "}
                                <Link href="/auth/register" className="text-secondary font-semibold hover:underline">Kayıt Olun</Link>
                            </p>
                        </div>
                    </GlassCard>
                </motion.div>
            </Container>
        </div>
    );
}
