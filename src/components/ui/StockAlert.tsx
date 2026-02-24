"use client";

import React, { useState } from "react";
import GlassButton from "./GlassButton";
import NeonInput from "./NeonInput";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StockAlertProps {
    productId: string;
    productName: string;
}

const StockAlert: React.FC<StockAlertProps> = ({ productId, productName }) => {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/stock-alert", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, email })
            });

            if (res.ok) {
                setIsSubscribed(true);
                setTimeout(() => setIsOpen(false), 2000);
            } else {
                alert("Bir hata oluştu, lütfen tekrar deneyin.");
            }
        } catch (error) {
            console.error("Stock Alert Error:", error);
            alert("Sanal sunucu hatası!");
        }
    };

    return (
        <div className="relative">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 text-[10px] text-primary font-black uppercase tracking-widest hover:underline"
                >
                    <Bell size={12} /> Haber Ver
                </button>
            ) : (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute bottom-full left-0 mb-4 w-64 glass p-4 rounded-2xl border-primary/20 shadow-neon-purple z-50"
                    >
                        <h4 className="text-white text-xs font-black uppercase mb-2">Stok Bildirimi</h4>
                        <p className="text-gray/60 text-[10px] mb-4">Ürün stoka girdiğinde sana haber verelim.</p>

                        {!isSubscribed ? (
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <NeonInput
                                    placeholder="E-posta adresin"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="text-[10px]"
                                />
                                <div className="flex gap-2">
                                    <GlassButton variant="primary" className="flex-grow py-2 text-[10px]">KAYDET</GlassButton>
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="px-3 border border-white/10 rounded-xl hover:bg-white/5"
                                    >✕</button>
                                </div>
                            </form>
                        ) : (
                            <div className="text-primary text-[10px] font-bold text-center py-2 animate-pulse">
                                BAŞARIYLA KAYDEDİLDİ! ✨
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
};

export default StockAlert;
