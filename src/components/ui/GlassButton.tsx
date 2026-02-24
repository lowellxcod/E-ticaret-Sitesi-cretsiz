"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "accent" | "glass";
    size?: "sm" | "md" | "lg";
    href?: string;
    // Motion props we want to support explicitly
    whileHover?: any;
    whileTap?: any;
}

const GlassButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", href, children, ...props }, ref) => {
        const variants = {
            primary: "border-primary/50 text-white hover:border-primary hover:shadow-neon",
            secondary: "border-secondary/50 text-white hover:border-secondary hover:shadow-neon-purple",
            accent: "border-accent/50 text-white hover:border-accent hover:shadow-[0_0_10px_rgba(255,0,110,0.5)]",
            glass: "bg-white/5 border-white/10 text-white hover:bg-white/10",
        };

        const sizes = {
            sm: "px-4 py-2 text-xs",
            md: "px-8 py-3 text-sm",
            lg: "px-10 py-4 text-base",
        };

        const classes = cn(
            "glass font-bold uppercase tracking-widest transition-all duration-300 relative overflow-hidden group inline-flex items-center justify-center cursor-pointer rounded-full",
            variants[variant],
            sizes[size],
            className
        );

        const buttonContent = (
            <>
                <span className="relative z-10">{children as React.ReactNode}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </>
        );

        if (href) {
            return (
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Link href={href} className={classes}>
                        {buttonContent}
                    </Link>
                </motion.div>
            );
        }

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={classes}
                {...(props as any)}
            >
                {buttonContent}
            </motion.button>
        );
    }
);

GlassButton.displayName = "GlassButton";

export default GlassButton;
