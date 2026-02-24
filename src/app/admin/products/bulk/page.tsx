'use client';

import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import { mainCategories } from '@/data/categories';
import { ArrowRight, RotateCcw, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BulkUpdatePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [actionType, setActionType] = useState<"increase_percent" | "decrease_percent" | "increase_fixed" | "decrease_fixed">("increase_percent");
    const [amount, setAmount] = useState<number | "">("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || confirm('Bu işlem seçili kategorideki tüm ürünlerin fiyatını kalıcı olarak değiştirecektir. Emin misiniz?') === false) return;

        setLoading(true);
        try {
            const res = await fetch('/api/admin/products/bulk-update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    categorySlug: selectedCategory,
                    actionType,
                    amount: Number(amount)
                }),
            });

            if (res.ok) {
                const data = await res.json();
                alert(`İşlem Başarılı! ${data.count} ürün güncellendi.`);
                setAmount("");
            } else {
                alert('Hata oluştu.');
            }
        } catch (error) {
            console.error(error);
            alert('Sunucu hatası.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-white mb-2">Toplu Fiyat Yönetimi</h1>
                <p className="text-gray-400">Kategorilere göre toplu zam veya indirim uygulayın.</p>
            </div>

            <GlassCard className="p-8 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-400 ml-1">Kategori Seçin</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors"
                        >
                            <option value="all" className="bg-black text-white font-bold">Tüm Kategoriler</option>
                            {mainCategories.map((cat) => (
                                <option key={cat.slug} value={cat.slug} className="bg-black text-white">{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 ml-1">İşlem Türü</label>
                            <select
                                value={actionType}
                                onChange={(e) => setActionType(e.target.value as any)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors"
                            >
                                <option value="increase_percent" className="bg-black text-white">Fiyat Artır (%)</option>
                                <option value="decrease_percent" className="bg-black text-white">Fiyat İndir (%)</option>
                                <option value="increase_fixed" className="bg-black text-white">Fiyat Artır (TL)</option>
                                <option value="decrease_fixed" className="bg-black text-white">Fiyat İndir (TL)</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 ml-1">Miktar</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    placeholder={actionType.includes('percent') ? "Örn: 10 (%)" : "Örn: 500 (TL)"}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors"
                                    required
                                    min="0"
                                />
                                <div className="absolute right-4 top-3 text-gray-500 font-bold">
                                    {actionType.includes('percent') ? '%' : 'TL'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-200 text-sm">
                        <p className="flex gap-2 items-center font-bold mb-1">
                            ⚠️ Dikkat
                        </p>
                        Bu işlem veritabanındaki fiyatları kalıcı olarak güncelleyecektir. Geri almak için ters işlem yapmanız gerekir.
                    </div>

                    <GlassButton
                        variant="primary"
                        className="w-full py-4 text-lg font-bold flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        {loading ? <RotateCcw className="animate-spin" /> : <Save />}
                        FİYATLARI GÜNCELLE
                    </GlassButton>
                </form>
            </GlassCard>
        </div>
    );
}
