"use client";

import React from "react";
import Container from "@/components/ui/Container";
import { Construction } from "lucide-react";

export default function BlogPage() {
    return (
        <div className="min-h-screen py-24 bg-background flex items-center justify-center">
            <Container>
                <div className="text-center space-y-8">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary animate-pulse">
                        <Construction size={48} />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
                        BLOG <span className="text-primary">YAKINDA</span>
                    </h1>
                    <p className="text-gray-light max-w-lg mx-auto text-lg">
                        Oyun incelemeleri, donanım rehberleri ve teknoloji haberleri çok yakında burada olacak.
                    </p>
                    <button onClick={() => window.history.back()} className="px-8 py-3 bg-white/5 hover:bg-white/10 rounded-full text-white font-bold transition-colors border border-white/10">
                        GERİ DÖN
                    </button>
                </div>
            </Container>
        </div>
    );
}
