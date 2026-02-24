"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
    return (
        <Toaster
            position="bottom-right"
            toastOptions={{
                style: {
                    background: "#333",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.1)",
                },
                success: {
                    iconTheme: {
                        primary: "#4ade80",
                        secondary: "#fff",
                    },
                },
                error: {
                    iconTheme: {
                        primary: "#ef4444",
                        secondary: "#fff",
                    },
                },
            }}
        />
    );
}
