/**
 * @license
 * Telif Hakkı (c) 2024-2026 lowellxcod & luwex13. Tüm hakları saklıdır.
 * Bu yazılımın izinsiz satılması, sızdırılması veya üzerinde hak iddia edilmesi kesinlikle yasaktır.
 * Daha fazla bilgi için LICENSE.md dosyasını inceleyin.
 */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import MouseGlow from "../components/ui/MouseGlow";
import WhatsAppButton from "../components/ui/WhatsAppButton";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/lib/theme-context";
import ToastProvider from "@/providers/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ElectroNova | Yeni Nesil Oyuncu Ekipmanları",
    description: "Fütüristik Oyuncu ve Elektronik Mağazası",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr">
            <body className={inter.className}>
                <AuthProvider>
                    <ThemeProvider>
                        <MouseGlow />
                        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface via-background to-black opacity-50" />
                        <Navbar />
                        <div className="flex flex-col min-h-screen">
                            <main className="flex-grow pt-20">
                                {children}
                            </main>
                            <Footer />
                        </div>
                        <WhatsAppButton />
                        <ToastProvider />

                        {/* Google Analytics 4 */}
                        <Script
                            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}`}
                            strategy="afterInteractive"
                        />
                        <Script id="google-analytics" strategy="afterInteractive">
                            {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}');
                    `}
                        </Script>
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
