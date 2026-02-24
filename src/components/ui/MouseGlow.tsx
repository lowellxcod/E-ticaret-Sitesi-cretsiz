"use client";

import React, { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";

const MouseGlow = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 150 };
    const smoothedX = useSpring(mouseX, springConfig);
    const smoothedY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const background = useMotionTemplate`radial-gradient(800px circle at ${smoothedX}px ${smoothedY}px, rgba(168, 85, 247, 0.15), transparent 80%)`;

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-[9999]"
            style={{ background }}
        />
    );
};

export default MouseGlow;
