"use client";

import React from "react";
import { cn } from "../../lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const NeonInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="space-y-2 w-full">
                {label && <label className="text-sm font-bold text-gray-400 ml-1 block">{label}</label>}
                <div className="relative group">
                    <input
                        ref={ref}
                        className={cn(
                            "w-full bg-surface-dark/50 px-6 py-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:shadow-neon transition-all placeholder:text-gray/50 glass rounded-full border border-white/5",
                            error && "border-red-500 focus:ring-red-500",
                            className
                        )}
                        {...props}
                    />
                    {error && <p className="text-red-500 text-xs mt-1 ml-2">{error}</p>}
                </div>
            </div>
        );
    }
);

NeonInput.displayName = "NeonInput";

export default NeonInput;
