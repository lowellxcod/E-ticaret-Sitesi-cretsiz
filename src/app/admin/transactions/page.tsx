'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Shield, AlertTriangle, CheckCircle, XCircle, Search, User, MapPin, ShoppingBag, FileText, CreditCard, Calendar } from 'lucide-react';

interface Transaction {
    id: string;
    orderId: string;
    merchantOid: string;
    status: string;
    totalAmount: string;
    details: any;
    createdAt: string;
    order?: {
        id: string;
        customerName: string;
        customerEmail: string;
        customerPhone: string;
        shippingAddress: string;
        status: string;
        total: number;
        createdAt: string;
        paymentId: string;
        items: Array<{
            quantity: number;
            price: number;
            product: {
                name: string;
                image: string;
            }
        }>;
    }
}

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const res = await fetch('/api/admin/transactions');
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data)) {
                    setTransactions(data);
                } else {
                    setError("Veri formatı hatalı");
                }
            } else {
                setError(`Veri çekilemedi: ${res.status}`);
            }
        } catch (error) {
            setError("Bağlantı hatası");
        } finally {
            setLoading(false);
        }
    };

    const filtered = transactions.filter(tx =>
        tx.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.merchantOid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.order?.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-20">
            <h1 className="text-3xl font-black mb-6 flex items-center gap-3">
                <Shield className="text-primary" /> Ödeme Logları & Güvenlik Denetimi
            </h1>

            {/* Search Bar */}
            <div className="relative max-w-xl">
                <input
                    type="text"
                    placeholder="İşlem No, Sipariş No, Müşteri Adı veya Durum Ara..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-primary/50 transition-all font-mono text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            </div>

            {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200">
                    Hata: {error}
                </div>
            )}

            <div className="grid gap-4">
                {loading ? (
                    <div className="text-center py-20 text-gray-500">Güvenlik logları taranıyor...</div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">Kayıt bulunamadı.</div>
                ) : (
                    filtered.map((tx) => (
                        <GlassCard key={tx.id} className="p-0 overflow-hidden group hover:border-primary/30 transition-all">
                            {/* Summary Header */}
                            <div
                                className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer hover:bg-white/5 transition-colors"
                                onClick={() => setSelectedTx(selectedTx?.id === tx.id ? null : tx)}
                            >
                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${tx.status === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                        {tx.status === 'success' ? <CheckCircle size={24} /> : <XCircle size={24} />}
                                    </div>
                                    <div>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                            <span className="font-mono font-bold text-white text-lg tracking-wide">{tx.merchantOid}</span>
                                            <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded font-mono">
                                                Order: #{tx.orderId.slice(-6)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                            <Calendar size={12} />
                                            {new Date(tx.createdAt).toLocaleString('tr-TR')}
                                            <span className="text-gray-600">•</span>
                                            <User size={12} />
                                            {tx.order?.customerName || 'Bilinmeyen Müşteri'}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                    <div className="text-right">
                                        <span className={`block text-xs font-black uppercase tracking-widest mb-1 ${tx.status === 'success' ? 'text-green-400' : 'text-red-500'}`}>
                                            {tx.status === 'success' ? 'BAŞARILI' : 'BAŞARISIZ'}
                                        </span>
                                        <span className="font-mono font-bold text-xl text-white">
                                            {(parseFloat(tx.totalAmount) / 100).toFixed(2)} TL
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Audit View */}
                            {selectedTx?.id === tx.id && (
                                <div className="bg-black/40 border-t border-white/5 p-8 animate-in slide-in-from-top-4 grid grid-cols-1 lg:grid-cols-2 gap-8">

                                    {/* Left Column: Customer & Order Info */}
                                    <div className="space-y-8">
                                        <div className="space-y-4">
                                            <h4 className="text-primary font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                                <User size={14} /> Müşteri & Teslimat Bilgileri
                                            </h4>
                                            <GlassCard className="p-6 space-y-3 bg-white/5 border-white/5">
                                                <div className="grid grid-cols-[100px_1fr] gap-4 text-sm">
                                                    <span className="text-gray-500">Ad Soyad:</span>
                                                    <span className="text-white font-medium">{tx.order?.customerName || '-'}</span>

                                                    <span className="text-gray-500">E-posta:</span>
                                                    <span className="text-white font-medium">{tx.order?.customerEmail || '-'}</span>

                                                    <span className="text-gray-500">Telefon:</span>
                                                    <span className="text-white font-medium">{tx.order?.customerPhone || '-'}</span>

                                                    <span className="text-gray-500">Adres:</span>
                                                    <span className="text-white font-medium">{tx.order?.shippingAddress || '-'}</span>
                                                </div>
                                            </GlassCard>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-primary font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                                <ShoppingBag size={14} /> Sipariş İçeriği
                                            </h4>
                                            <GlassCard className="p-0 overflow-hidden bg-white/5 border-white/5">
                                                {tx.order?.items?.map((item, idx) => (
                                                    <div key={idx} className="p-4 border-b border-white/5 last:border-0 flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center text-xs overflow-hidden">
                                                                {item.product.image ? (
                                                                    <img src={item.product.image} alt="" className="w-full h-full object-cover" />
                                                                ) : (
                                                                    "IMG"
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="text-white text-sm font-medium">{item.product.name}</p>
                                                                <p className="text-gray-500 text-xs">{item.quantity} adet x {item.price} TL</p>
                                                            </div>
                                                        </div>
                                                        <span className="text-white font-bold text-sm">{(item.price * item.quantity).toFixed(2)} TL</span>
                                                    </div>
                                                ))}
                                                <div className="p-4 bg-white/5 flex justify-between items-center text-sm font-bold">
                                                    <span className="text-gray-400">Toplam Sipariş Tutarı:</span>
                                                    <span className="text-primary">{tx.order?.total} TL</span>
                                                </div>
                                            </GlassCard>
                                        </div>
                                    </div>

                                    {/* Right Column: Technical & PayTR Audit */}
                                    <div className="space-y-8">
                                        <div className="space-y-4">
                                            <h4 className="text-primary font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                                <CreditCard size={14} /> Ödeme Teknik Detayları
                                            </h4>
                                            <GlassCard className="p-6 space-y-3 bg-white/5 border-white/5">
                                                <div className="grid grid-cols-[140px_1fr] gap-4 text-sm font-mono text-xs">
                                                    <span className="text-gray-500">Platform İşlem No:</span>
                                                    <span className="text-white">{tx.merchantOid}</span>

                                                    <span className="text-gray-500">PayTR Ref No:</span>
                                                    <span className="text-white">{tx.details?.payment_id || tx.order?.paymentId || '-'}</span>

                                                    <span className="text-gray-500">Ödeme Tipi:</span>
                                                    <span className="text-white">{tx.details?.payment_type || 'card'}</span>

                                                    <span className="text-gray-500">Tarih Zaman:</span>
                                                    <span className="text-white">{new Date(tx.createdAt).toLocaleString('tr-TR')}</span>

                                                    <span className="text-gray-500">İşlem Durumu:</span>
                                                    <span className={tx.status === 'success' ? 'text-green-400' : 'text-red-400'}>{tx.status}</span>
                                                </div>
                                            </GlassCard>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-primary font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                                <AlertTriangle size={14} /> Ham PayTR JSON Verisi (Fraud Kontrolü)
                                            </h4>
                                            <div className="relative group">
                                                <pre className="text-[10px] text-gray-400 font-mono bg-black/80 p-6 rounded-xl overflow-x-auto border border-white/10 h-64 overflow-y-auto">
                                                    {JSON.stringify(tx.details, null, 2)}
                                                </pre>
                                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-white">JSON</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )}
                        </GlassCard>
                    ))
                )}
            </div>
        </div>
    );
}
