'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import NeonInput from '@/components/ui/NeonInput';
import GlassButton from '@/components/ui/GlassButton';
import { mainCategories } from '@/data/categories';
import { useRouter } from 'next/navigation';

export default function EditProductPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form States
    const [selectedCategory, setSelectedCategory] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [discountPrice, setDiscountPrice] = useState<number | "">("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [inStock, setInStock] = useState("true");
    const [subCategorySlug, setSubCategorySlug] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${params.id}`);
                if (!res.ok) {
                    alert('Ürün bulunamadı!');
                    router.push('/admin/products');
                    return;
                }
                const data = await res.json();

                // Populate form
                setName(data.name);
                setPrice(data.price);
                setDiscountPrice(data.discountPrice || "");
                setImage(data.image);
                setDescription(data.description || "");
                setInStock(data.stock > 0 ? "true" : "false");
                setSelectedCategory(data.categorySlug); // Assuming we store slug or can map it back
                setSubCategorySlug(data.subCategorySlug || "");

            } catch (error) {
                console.error("Failed to fetch product", error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchProduct();
        }
    }, [params.id, router]);

    const handleDiscount = (percent: number) => {
        if (!price || typeof price !== 'number') return;
        const discountAmount = price * (percent / 100);
        const newPrice = price - discountAmount;
        setDiscountPrice(Math.round(newPrice));
    };

    const discountRates = [10, 15, 20, 25, 30, 35];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        // Find category name from slug
        const categoryObj = mainCategories.find(c => c.slug === selectedCategory);
        const categoryName = categoryObj ? categoryObj.name : selectedCategory;

        const productData = {
            name,
            price,
            discountPrice,
            image,
            description,
            category: categoryName, // Update category name based on slug selection
            categorySlug: selectedCategory,
            subCategorySlug,
            inStock: inStock === "true"
        };

        try {
            const res = await fetch(`/api/products/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });

            if (res.ok) {
                alert('Ürün başarıyla güncellendi!');
                router.refresh();
                router.push('/admin/products');
            } else {
                const errorData = await res.text();
                alert(`Hata: ${errorData}`);
            }
        } catch (error) {
            alert(`Sunucu hatası: ${error}`);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="text-white text-center py-20">Yükleniyor...</div>;

    return (
        <div>
            <h1 className="text-3xl font-black mb-8 neon-text">Ürün Düzenle</h1>

            <GlassCard className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <NeonInput
                            label="Ürün Adı"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Örn: Cyberpunk Klavye"
                            required
                        />
                        <div className="space-y-2">
                            <NeonInput
                                label="Fiyat (TL)"
                                name="price"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                placeholder="4999"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <NeonInput
                                    label="İndirimli Fiyat (Opsiyonel)"
                                    name="discountPrice"
                                    type="number"
                                    value={discountPrice}
                                    onChange={(e) => setDiscountPrice(Number(e.target.value))}
                                    placeholder="4499"
                                />
                                {price && discountPrice && (
                                    <div className="text-xs font-bold text-green-400 flex justify-between px-2">
                                        <span>İndirim: %{Math.round(((Number(price) - Number(discountPrice)) / Number(price)) * 100)}</span>
                                        <span>Kazanç: {Number(discountPrice)} TL</span>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 ml-1">Stok Durumu</label>
                                <select
                                    name="inStock"
                                    value={inStock}
                                    onChange={(e) => setInStock(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors"
                                >
                                    <option value="true">Stokta Var</option>
                                    <option value="false">Tükendi</option>
                                </select>
                            </div>
                        </div>

                        {/* Smart Discount Buttons */}
                        {price && (
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <p className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">Otomatik İndirim Uygula</p>
                                <div className="flex flex-wrap gap-2">
                                    {discountRates.map((rate) => (
                                        <button
                                            key={rate}
                                            type="button"
                                            onClick={() => handleDiscount(rate)}
                                            className="px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold border border-primary/20 transition-all hover:scale-105"
                                        >
                                            %{rate}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 ml-1">Kategori</label>
                            <select
                                name="category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors"
                                required
                            >
                                <option value="">Bir Kategori Seçin</option>
                                {mainCategories.map((cat) => (
                                    <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 ml-1">Alt Kategori</label>
                            <select
                                name="subCategorySlug"
                                value={subCategorySlug}
                                onChange={(e) => setSubCategorySlug(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors"
                                disabled={!selectedCategory}
                            >
                                <option value="">Alt Kategori Seçin (Opsiyonel)</option>
                                {selectedCategory && mainCategories.find(c => c.slug === selectedCategory)?.subCategories.map((sub) => (
                                    <option key={sub.slug} value={sub.slug}>{sub.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <NeonInput
                        label="Resim URL"
                        name="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://..."
                        required
                    />

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-400 ml-1">Açıklama</label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors"
                            placeholder="Ürün özelliklerini detaylıca yazın..."
                        ></textarea>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <GlassButton
                            type="button"
                            onClick={() => router.back()}
                            className="w-1/3 py-4 text-lg font-bold bg-white/5 hover:bg-white/10 border-white/10"
                        >
                            İPTAL
                        </GlassButton>
                        <GlassButton
                            variant="primary"
                            className="w-full py-4 text-lg font-bold"
                            disabled={submitting}
                        >
                            {submitting ? 'GÜNCELLENİYOR...' : 'GÜNCELLE'}
                        </GlassButton>
                    </div>
                </form>
            </GlassCard>
        </div>
    );
}
