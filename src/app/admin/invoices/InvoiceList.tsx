'use client';

import { useState } from 'react';
import GlassCard from "../../../components/ui/GlassCard";
import { Copy, CheckCircle, ExternalLink, RefreshCw, FileText, User, Building, MapPin, Hash, Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function InvoiceList({ initialOrders, issuedOrders = [] }: { initialOrders: any[], issuedOrders?: any[] }) {
    const router = useRouter();
    const [loading, setLoading] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'pending' | 'issued'>('pending');

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const markAsIssued = async (orderId: string) => {
        setLoading(orderId);
        try {
            await fetch(`/api/admin/invoices/${orderId}/issue`, { method: 'POST' });
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("İşlem başarısız.");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="flex gap-4 border-b border-white/10 pb-4">
                <button
                    onClick={() => setActiveTab('pending')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    Bekleyenler ({initialOrders.length})
                </button>
                <button
                    onClick={() => setActiveTab('issued')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'issued'
                        ? 'bg-green-500/20 text-green-500 border border-green-500/50'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    Kesilen Faturalar (Log)
                </button>
            </div>

            {/* Content Switch */}
            {activeTab === 'pending' ? (
                <div className="grid gap-8">
                    {initialOrders.length === 0 ? (
                        <GlassCard className="p-12 flex flex-col items-center justify-center text-center border-dashed border-white/10">
                            <div className="w-20 h-20 bg-green-500/5 rounded-full flex items-center justify-center text-green-500 mb-6 animate-pulse">
                                <CheckCircle size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-white">Her Şey Güncel!</h3>
                            <p className="text-gray-400 mt-2 max-w-sm">Kesilecek bekleyen fatura bulunmuyor. Yeni siparişler geldiğinde burada listelenecek.</p>
                        </GlassCard>
                    ) : (
                        initialOrders.map((order) => {
                            const isCorporate = order.isCorporate;
                            const name = isCorporate ? order.billingAddress?.split('-')[0] : order.customerName;
                            const taxId = order.taxNumber || "11111111111";
                            const address = order.billingAddress || order.shippingAddress;

                            return (
                                <div key={order.id} className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <GlassCard className="relative p-0 overflow-hidden border-white/10 group-hover:border-primary/30 transition-colors">
                                        <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary w-full" />

                                        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-10">
                                            {/* Left: GİB Portal Data */}
                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                                                            <FileText size={18} />
                                                        </div>
                                                        GİB İÇİN HAZIR BİLGİLER
                                                    </h3>
                                                    <div className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-[10px] font-black uppercase tracking-widest border border-yellow-500/20">
                                                        BEKLİYOR
                                                    </div>
                                                </div>

                                                <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-4">
                                                    <CopyField
                                                        label={isCorporate ? "KURUM ADI" : "ALICI ADI SOYADI"}
                                                        value={name}
                                                        icon={isCorporate ? Building : User}
                                                        onCopy={() => copyToClipboard(name || "", `name-${order.id}`)}
                                                        copied={copiedId === `name-${order.id}`}
                                                    />

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <CopyField
                                                            label="VKN / TCKN"
                                                            value={taxId}
                                                            icon={Hash}
                                                            onCopy={() => copyToClipboard(taxId, `tax-${order.id}`)}
                                                            copied={copiedId === `tax-${order.id}`}
                                                        />
                                                        {isCorporate && (
                                                            <CopyField
                                                                label="VERGİ DAİRESİ"
                                                                value={order.taxOffice || ""}
                                                                icon={Building}
                                                                onCopy={() => copyToClipboard(order.taxOffice || "", `office-${order.id}`)}
                                                                copied={copiedId === `office-${order.id}`}
                                                            />
                                                        )}
                                                    </div>

                                                    <CopyField
                                                        label="AÇIK ADRES"
                                                        value={address}
                                                        icon={MapPin}
                                                        isTextArea
                                                        onCopy={() => copyToClipboard(address || "", `addr-${order.id}`)}
                                                        copied={copiedId === `addr-${order.id}`}
                                                    />
                                                </div>

                                                <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/5 p-3 rounded-xl border border-white/5">
                                                    <span className="text-primary font-bold">İPUCU:</span>
                                                    <span>GİB Portal'da "Fatura Oluştur" dedikten sonra bu bilgileri tek tek kopyalayıp yapıştırın.</span>
                                                </div>
                                            </div>

                                            {/* Right: Order Summary & Actions */}
                                            <div className="flex flex-col h-full bg-white/5 -m-6 md:-m-8 md:ml-0 p-6 md:p-8 border-t md:border-t-0 md:border-l border-white/10">
                                                <h3 className="text-lg font-black text-white mb-6">SİPARİŞ ÖZETİ</h3>

                                                <div className="flex-1 overflow-y-auto max-h-[200px] custom-scrollbar mb-6 space-y-3 pr-2">
                                                    {order.items.map((item: any, i: number) => (
                                                        <div key={i} className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-gray-500">
                                                                    x{item.quantity}
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-bold text-white max-w-[150px] truncate">{item.productId}</p>
                                                                    <p className="text-[10px] text-gray-500">Birim: {item.price} ₺</p>
                                                                </div>
                                                            </div>
                                                            <p className="text-sm font-bold text-white">{item.price * item.quantity} ₺</p>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="space-y-4 mt-auto">
                                                    <div className="flex justify-between items-center p-4 bg-primary/10 rounded-xl border border-primary/20">
                                                        <span className="text-xs font-bold text-primary uppercase tracking-widest">TOPLAM TUTAR</span>
                                                        <span className="text-2xl font-black text-white">{order.total} ₺</span>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-3">
                                                        <a
                                                            href="https://earsivportal.efatura.gov.tr/"
                                                            target="_blank"
                                                            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                                                        >
                                                            <ExternalLink size={16} /> GİB Portal
                                                        </a>
                                                        <button
                                                            onClick={() => markAsIssued(order.id)}
                                                            disabled={loading === order.id}
                                                            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100"
                                                        >
                                                            {loading === order.id ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                                                            Kesildi
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </div>
                            );
                        })
                    )}
                </div>
            ) : (
                /* Issued Invoices Log View */
                <div className="space-y-4">
                    {issuedOrders && issuedOrders.length > 0 ? (
                        issuedOrders.map((order) => (
                            <GlassCard key={order.id} className="p-4 flex items-center justify-between border-white/5 hover:border-green-500/20 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                                        <CheckCircle size={20} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-white group-hover:text-green-400 transition-colors">
                                                {order.customerName || order.billingAddress?.split('-')[0] || "İsimsiz"}
                                            </h3>
                                            <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full font-bold">KESİLDİ</span>
                                        </div>
                                        <p className="text-xs text-gray-500 font-mono">
                                            {new Date(order.updatedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm font-black text-white">{order.total} ₺</p>
                                    <p className="text-[10px] text-gray-500">{order.items.length} Kalem</p>
                                </div>
                            </GlassCard>
                        ))
                    ) : (
                        <div className="text-center py-20 text-gray-500">
                            Henüz kesilen fatura kaydı yok.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function CopyField({ label, value, icon: Icon, onCopy, copied, isTextArea }: {
    label: string,
    value: string,
    icon: any,
    onCopy: () => void,
    copied: boolean,
    isTextArea?: boolean
}) {
    return (
        <div className="group relative">
            <div className="flex justify-between items-center mb-1.5 ">
                <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest flex items-center gap-1.5">
                    <Icon size={12} className="text-primary" /> {label}
                </label>
                {copied && <span className="text-[10px] font-bold text-green-500 animate-fade-in">Kopyalandı!</span>}
            </div>

            <div className="relative">
                {isTextArea ? (
                    <div className="w-full bg-black/60 px-4 py-3 rounded-xl border border-white/5 text-sm text-gray-200 font-medium min-h-[80px] leading-relaxed break-words">
                        {value}
                    </div>
                ) : (
                    <div className="w-full bg-black/60 px-4 py-3 rounded-xl border border-white/5 text-sm text-gray-200 font-medium truncate flex items-center h-[46px]">
                        {value}
                    </div>
                )}

                <button
                    onClick={onCopy}
                    className="absolute top-2 right-2 p-2 bg-white/5 hover:bg-primary hover:text-white rounded-lg text-gray-400 transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 shadow-lg"
                    title="Kopyala"
                >
                    <Copy size={14} />
                </button>
            </div>
        </div>
    );
}
