import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone, Send } from "lucide-react";
import Container from "../ui/Container";
import GlassButton from "../ui/GlassButton";
import NeonInput from "../ui/NeonInput";

const Footer = () => {
    return (
        <footer className="relative bg-black border-t border-primary/20 pt-20 pb-10 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px] opacity-20 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-secondary/10 rounded-full blur-[100px] opacity-10 pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full rotate-45 group-hover:shadow-neon transition-all" />
                            <span className="text-2xl font-black tracking-tighter text-white">
                                ELECTRO<span className="text-primary">NOVA</span>
                            </span>
                        </Link>
                        <p className="text-gray-light max-w-xs text-sm leading-relaxed font-medium">
                            Dijital dünyanın efsanevi kaşiflerini donatıyoruz. Gelecek için tasarlanmış yüksek performanslı oyuncu ekipmanları.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-12 h-12 glass rounded-full flex items-center justify-center text-gray-light hover:text-primary border-primary/10 hover:border-primary transition-all group shadow-sm hover:shadow-neon"
                                >
                                    <Icon size={20} className="transition-transform group-hover:scale-110" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold uppercase tracking-widest text-sm border-b border-primary/20 pb-2 inline-block">
                            HIZLI BAĞLANTILAR
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { name: "Tüm Ürünler", href: "/products" },
                                { name: "Yeni Gelenler", href: "/products?sort=newest" },
                                { name: "En Çok Satanlar", href: "/products?sort=bestselling" },
                                { name: "İndirimli Ürünler", href: "/products?filter=deals" },
                                { name: "Blog", href: "/blog" },
                                { name: "Hakkımızda", href: "/about" },
                                { name: "İletişim", href: "/contact" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-light hover:text-primary transition-colors text-xs font-bold uppercase tracking-wide">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold uppercase tracking-widest text-sm border-b border-primary/20 pb-2 inline-block">
                            DESTEK MERKEZİ
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { name: "SSS (Sıkça Sorulan Sorular)", href: "/support/faq" },
                                { name: "Gönderim Politikası", href: "/support/shipping" },
                                { name: "İade ve Değişim", href: "/support/returns" },
                                { name: "Gizlilik Protokolü (KVKK)", href: "/legal/privacy" },
                                { name: "Kullanım Şartları", href: "/legal/terms" },
                                { name: "Çerez Politikası", href: "/legal/cookies" },
                                { name: "Garanti Koşulları", href: "/support/warranty" },
                                { name: "Sipariş Takibi", href: "/dashboard/orders" },
                                { name: "Kargo Bilgileri", href: "/support/shipping" },
                                { name: "Ödeme Seçenekleri", href: "/support/payment" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-light hover:text-primary transition-colors text-[11px] font-bold uppercase tracking-wide">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service / Contact */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold uppercase tracking-widest text-sm border-b border-primary/20 pb-2 inline-block">
                            MÜŞTERİ HİZMETLERİ
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Mail size={18} className="text-primary mt-1" />
                                <div>
                                    <p className="text-[10px] text-gray uppercase font-black tracking-widest mb-1">Email</p>
                                    <a href="mailto:destek@nexaplay.com" className="text-white text-xs font-bold hover:text-primary transition-colors">destek@nexaplay.com</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone size={18} className="text-primary mt-1" />
                                <div>
                                    <p className="text-[10px] text-gray uppercase font-black tracking-widest mb-1">WhatsApp</p>
                                    <a href="https://wa.me/905555555555" className="text-white text-xs font-bold hover:text-primary transition-colors">+90 555 555 55 55</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-primary mt-1" />
                                <div>
                                    <p className="text-[10px] text-gray uppercase font-black tracking-widest mb-1">Çalışma Saatleri</p>
                                    <p className="text-white text-xs font-bold uppercase tracking-tighter">09:00 - 21:00</p>
                                </div>
                            </li>
                        </ul>

                        {/* Newsletter Mini */}
                        <div className="pt-6 border-t border-white/5">
                            <p className="text-gray/40 text-[10px] uppercase font-black tracking-widest mb-4">Fırsatları Yakalayın</p>
                            <div className="flex bg-surface-dark border border-white/5 rounded-full overflow-hidden focus-within:border-primary transition-all p-1">
                                <input
                                    type="email"
                                    placeholder="E-POSTA"
                                    className="w-full bg-transparent px-4 py-2 text-white text-[10px] focus:outline-none font-bold"
                                />
                                <button className="bg-primary text-black px-4 py-2 rounded-full text-[10px] font-black hover:shadow-neon transition-all">
                                    KATIL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="space-y-1 text-center md:text-left">
                        <p className="text-gray/50 text-[10px] uppercase tracking-[0.2em]">
                            © 2026 ElectroNova Sistemleri. Tüm hakları saklıdır.
                        </p>
                        <p className="text-primary/40 text-[9px] uppercase font-black tracking-widest">
                            Powered by lowellxcod & luwex13
                        </p>
                    </div>
                    <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Payment Icons Placeholder */}
                        {["VISA", "MC", "PAYPAL", "BITCOIN"].map((method) => (
                            <span key={method} className="text-[10px] font-bold border border-white/20 px-2 py-1 text-white/50">
                                {method}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
