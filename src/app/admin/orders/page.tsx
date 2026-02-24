'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Package, Truck, CheckCircle, Clock, XCircle, Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data type until we have real data
interface Order {
    id: string;
    customerName: string;
    total: number;
    status: string;
    createdAt: string;
    items: any[];
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/admin/orders');
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (error) {
            console.error('Failed to fetch orders', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId: string, newStatus: string) => {
        try {
            const res = await fetch('/api/admin/orders', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, status: newStatus }),
            });

            if (res.ok) {
                fetchOrders(); // Refresh
            }
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case 'PAID': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'SHIPPED': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
            case 'DELIVERED': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'CANCELLED': return 'text-red-400 bg-red-400/10 border-red-400/20';
            default: return 'text-gray-400';
        }
    };

    // Calculate Stats
    const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'PENDING').length,
        paid: orders.filter(o => o.status === 'PAID').length,
        shipped: orders.filter(o => o.status === 'SHIPPED').length,
        cancelled: orders.filter(o => o.status === 'CANCELLED').length,
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.includes(searchTerm) || order.customerName?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-black mb-6">Sipariş Yönetimi</h1>

            {/* Detailed Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <GlassCard className="p-4 border-yellow-500/20 bg-yellow-500/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Clock size={40} /></div>
                    <p className="text-xs text-yellow-400 font-bold uppercase tracking-widest mb-1">Onay Bekleyen</p>
                    <p className="text-2xl font-black text-white">{stats.pending}</p>
                    <p className="text-[10px] text-gray-400 mt-2">Yeni Gelen Siparişler</p>
                </GlassCard>

                <GlassCard className="p-4 border-blue-500/20 bg-blue-500/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><CheckCircle size={40} /></div>
                    <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-1">Hazırlanacak</p>
                    <p className="text-2xl font-black text-white">{stats.paid}</p>
                    <p className="text-[10px] text-gray-400 mt-2">Ödemesi Onaylananlar</p>
                </GlassCard>

                <GlassCard className="p-4 border-purple-500/20 bg-purple-500/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Truck size={40} /></div>
                    <p className="text-xs text-purple-400 font-bold uppercase tracking-widest mb-1">Kargoda</p>
                    <p className="text-2xl font-black text-white">{stats.shipped}</p>
                    <p className="text-[10px] text-gray-400 mt-2">Yola Çıkanlar</p>
                </GlassCard>

                <GlassCard className="p-4 border-red-500/20 bg-red-500/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><XCircle size={40} /></div>
                    <p className="text-xs text-red-400 font-bold uppercase tracking-widest mb-1">İptal Edilen</p>
                    <p className="text-2xl font-black text-white">{stats.cancelled}</p>
                    <p className="text-[10px] text-gray-400 mt-2">İade veya İptal</p>
                </GlassCard>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/10 pb-6">

                {/* Status Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 flex-grow">
                    {[
                        { id: 'ALL', label: 'Tümü' },
                        { id: 'PENDING', label: 'Onay Bekleyen' },
                        { id: 'PAID', label: 'Ödendi / Hazırlanıyor' },
                        { id: 'SHIPPED', label: 'Kargolandı' },
                        { id: 'DELIVERED', label: 'Teslim Edildi' },
                        { id: 'CANCELLED', label: 'İptal' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setStatusFilter(tab.id)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border whitespace-nowrap ${statusFilter === tab.id
                                ? 'bg-primary/20 text-primary border-primary/50'
                                : 'bg-black/20 text-gray-500 border-white/5 hover:bg-white/5'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Sipariş Ara..."
                        className="bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-primary/50 focus:outline-none w-full md:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid gap-4">
                {loading ? (
                    <div className="text-center py-20 text-gray-500">Yükleniyor...</div>
                ) : filteredOrders.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">Sipariş bulunamadı.</div>
                ) : (
                    filteredOrders.map((order) => (
                        <GlassCard key={order.id} className="p-6 flex flex-col md:flex-row items-center gap-6 group hover:border-primary/30 transition-all">
                            <div className="flex items-center gap-4 flex-1">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(order.status).replace('text-', 'bg-').replace('border-', 'text-white ')} bg-opacity-20`}>
                                    <Package size={24} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-mono text-gray-500">#{order.id.slice(-6)}</span>
                                        <span className="text-[10px] text-gray-600">• {new Date(order.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="font-bold text-lg text-white">{order.customerName || 'Misafir Kullanıcı'}</h3>
                                    <p className="text-sm text-gray-400">{order.items.length} Ürün • <span className="text-white font-bold">{order.total} TL</span></p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                                    {
                                        order.status === 'PENDING' ? 'Onay Bekliyor' :
                                            order.status === 'PAID' ? 'Ödendi / Hazırlanıyor' :
                                                order.status === 'SHIPPED' ? 'Kargoda' :
                                                    order.status === 'DELIVERED' ? 'Teslim Edildi' :
                                                        'İptal Edildi'
                                    }
                                </span>
                                <div className="h-8 w-px bg-white/10 mx-2"></div>
                                <select
                                    className="bg-black/40 text-white text-xs px-3 py-2 rounded-lg border border-white/10 focus:border-primary/50 outline-none cursor-pointer hover:bg-white/5 transition-colors"
                                    value={order.status}
                                    onChange={(e) => updateStatus(order.id, e.target.value)}
                                >
                                    <option value="PENDING" className="bg-black text-white">Onay Bekliyor</option>
                                    <option value="PAID" className="bg-black text-white">Ödendi (Hazırla)</option>
                                    <option value="SHIPPED" className="bg-black text-white">Kargola</option>
                                    <option value="DELIVERED" className="bg-black text-white">Teslim Et</option>
                                    <option value="CANCELLED" className="bg-black text-white">İptal Et</option>
                                </select>
                            </div>
                        </GlassCard>
                    ))
                )}
            </div>
        </div>
    );
}
