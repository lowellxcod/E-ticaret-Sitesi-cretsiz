'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import NeonInput from '@/components/ui/NeonInput';
import Link from 'next/link';
import { Package, Search, Edit, Trash2, Plus } from 'lucide-react';

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                alert('Ürün silindi!');
                fetchProducts(); // Refresh list
            } else {
                alert('Silme işlemi başarısız.');
            }
        } catch (error) {
            console.error("Delete error", error);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-black neon-text">Ürün Yönetimi</h1>
                <Link href="/admin/products/new" className="px-6 py-3 rounded-xl bg-primary text-black font-bold hover:scale-105 transition-transform flex items-center gap-2">
                    <Plus size={20} />
                    Yeni Ürün Ekle
                </Link>
            </div>

            {/* Search and Filter */}
            <GlassCard className="p-4 flex items-center gap-4">
                <Search className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Ürün adı veya kategori ara..."
                    className="bg-transparent border-none focus:ring-0 text-white w-full placeholder-gray-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </GlassCard>

            {/* Products Table */}
            <div className="grid gap-4">
                {loading ? (
                    <div className="text-center py-20 text-gray-500">Yükleniyor...</div>
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <GlassCard key={product.id} className="p-4 flex flex-col md:flex-row items-center justify-between gap-4 group hover:border-primary/50 transition-colors">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="w-16 h-16 rounded-lg bg-white/5 overflow-hidden flex-shrink-0 relative">
                                    <img
                                        src={product.image || product.images?.[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {!product.inStock && (product.stock === 0) && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                            <span className="text-[10px] font-bold text-red-500 uppercase">Tükendi</span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">{product.name}</h3>
                                    <p className="text-sm text-gray-400">{product.category}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-primary font-mono">{product.price} TL</span>
                                        {product.discountPrice && (
                                            <span className="text-xs text-green-400 bg-green-900/30 px-2 py-0.5 rounded-full">
                                                {product.discountPrice} TL (İndirimli)
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                                <Link
                                    href={`/admin/products/${product.id}`}
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-blue-400 hover:text-blue-300 transition-colors"
                                    title="Düzenle"
                                >
                                    <Edit size={18} />
                                </Link>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="p-2 rounded-lg bg-white/5 hover:bg-red-900/20 text-red-400 hover:text-red-300 transition-colors"
                                    title="Sil"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </GlassCard>
                    ))
                ) : (
                    <div className="text-center py-20 text-gray-500">Ürün bulunamadı.</div>
                )}
            </div>
        </div>
    );
}
