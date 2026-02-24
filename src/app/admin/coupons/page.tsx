'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import NeonInput from '@/components/ui/NeonInput';
import GlassButton from '@/components/ui/GlassButton';
import { Ticket, Trash2, Plus } from 'lucide-react';

interface Coupon {
    id: string;
    code: string;
    type: string;
    value: number;
    isActive: boolean;
    usedCount: number;
}

export default function CouponsPage() {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);
    const [createLoading, setCreateLoading] = useState(false);

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const res = await fetch('/api/admin/coupons');
            if (res.ok) {
                const data = await res.json();
                setCoupons(data);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCreateLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/admin/coupons', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                alert('Kupon oluşturuldu!');
                (e.target as HTMLFormElement).reset();
                fetchCoupons();
            } else {
                alert('Hata!');
            }
        } finally {
            setCreateLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-black">İndirim Kuponları</h1>

            {/* Create Form */}
            <GlassCard className="p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Plus size={20} className="text-primary" /> Yeni Kupon Ekle
                </h2>
                <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <NeonInput name="code" label="Kupon Kodu" placeholder="YAZ2024" required />
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-400 ml-1">İndirim Tipi</label>
                        <select name="type" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none">
                            <option value="PERCENT">Yüzde (%)</option>
                            <option value="AMOUNT">Tutar (TL)</option>
                        </select>
                    </div>
                    <NeonInput name="value" label="Değer" type="number" placeholder="10" required />
                    <NeonInput name="minAmount" label="Min. Sepet Tutarı" type="number" placeholder="0" />

                    <div className="lg:col-span-4">
                        <GlassButton disabled={createLoading} variant="primary" className="w-full font-bold">
                            {createLoading ? 'Oluşturuluyor...' : 'KUPON OLUŞTUR'}
                        </GlassButton>
                    </div>
                </form>
            </GlassCard>

            {/* List */}
            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <p className="text-white/50">Yükleniyor...</p>
                ) : coupons.length === 0 ? (
                    <GlassCard className="p-8 text-center text-white/40">Henüz kupon yok.</GlassCard>
                ) : (
                    coupons.map((coupon) => (
                        <GlassCard key={coupon.id} className="p-4 flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Ticket size={24} />
                                </div>
                                <div>
                                    <p className="text-xl font-black text-white tracking-widest">{coupon.code}</p>
                                    <p className="text-sm text-gray-400">
                                        {coupon.type === 'PERCENT' ? `%${coupon.value} İndirim` : `${coupon.value} TL İndirim`}
                                        <span className="mx-2">•</span>
                                        {coupon.usedCount} kez kullanıldı
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${coupon.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {coupon.isActive ? 'AKTİF' : 'PASİF'}
                                </div>
                                <button
                                    onClick={async () => {
                                        if (!confirm('Bu kuponu silmek istediğinize emin misiniz?')) return;
                                        try {
                                            const res = await fetch(`/api/admin/coupons?id=${coupon.id}`, { method: 'DELETE' });
                                            if (res.ok) {
                                                fetchCoupons();
                                            } else {
                                                alert('Silinirken hata oluştu');
                                            }
                                        } catch (e) {
                                            alert('Hata');
                                        }
                                    }}
                                    className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </GlassCard>
                    ))
                )}
            </div>
        </div>
    );
}
