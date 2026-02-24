"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverGlow?: boolean;
}

const GlassCard = ({ children, className, hoverGlow = true }: CardProps) => {
    return (
        <motion.div
            whileHover={hoverGlow ? { y: -8, boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.4)" } : {}}
            className={cn(
                "glass p-8 relative overflow-hidden group border-primary/10 hover:border-primary/30 transition-all duration-500 rounded-4xl",
                className
            )}
        >
            {/* Animated corner border */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/20 rounded-tl-4xl group-hover:border-primary transition-colors" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/20 rounded-br-4xl group-hover:border-primary transition-colors" />

            {children}
        </motion.div>
    );
};

export default GlassCard;
