"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import GlassCard from "../ui/GlassCard";
import GlassButton from "../ui/GlassButton";
import { cn } from "../../lib/utils";
import { useCartStore } from "@/lib/store";

interface ProductCardProps {
    product: {
        id: string; // Changed to string to match product IDs
        name: string;
        price: number;
        image: string;
        category: string;
        discountPrice?: number;
    };
    className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
    const { addItem } = useCartStore();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
        });
    };

    return (
        <Link href={`/product/${product.id}`} className="block h-full group">
            <GlassCard className={cn("h-full border-secondary/10 hover:border-secondary/30 bg-surface-dark/40 transition-all duration-700", className)}>
                <div className="aspect-square mb-6 overflow-hidden glass rounded-3xl group-hover:shadow-[0_0_60px_rgba(168,85,247,0.2)] transition-all duration-700 relative">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-secondary text-[10px] uppercase tracking-[0.2em] font-black mb-1">
                                {product.category}
                            </p>
                            <h3 className="text-xl font-black text-white uppercase tracking-tighter">
                                {product.name}
                            </h3>
                        </div>
                        <div className="flex flex-col items-end">
                            {product.discountPrice && product.discountPrice < product.price ? (
                                <>
                                    <span className="text-xs text-red-500 line-through font-bold opacity-70">{product.price} TL</span>
                                    <span className="text-xl font-bold text-green-400 font-mono bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 shadow-neon-sm">
                                        {product.discountPrice} TL
                                    </span>
                                </>
                            ) : (
                                <span className="text-xl font-bold text-white font-mono bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                                    {product.price} TL
                                </span>
                            )}
                        </div>
                    </div>
                    <GlassButton
                        variant="secondary"
                        className="w-full shadow-lg hover:shadow-neon-purple transition-shadow py-4"
                        onClick={handleAddToCart}
                    >
                        Cephaneliğe Ekle
                    </GlassButton>
                </div>
            </GlassCard>
        </Link>
    );
};

export default ProductCard;
