'use client';

import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import NeonInput from '@/components/ui/NeonInput';
import GlassButton from '@/components/ui/GlassButton';
import { mainCategories } from '@/data/categories';
import { Wand2, Image as ImageIcon, X } from 'lucide-react';
import Image from 'next/image';

export default function NewProductPage() {
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [discountPrice, setDiscountPrice] = useState<number | "">("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState<string[]>([]);

    const handleDiscount = (percent: number) => {
        if (!price || typeof price !== 'number') return;
        const discountAmount = price * (percent / 100);
        const newPrice = price - discountAmount;
        setDiscountPrice(Math.round(newPrice)); // Round to nearest integer
    };

    const generateAiDescription = () => {
        // Mock AI Generation with Templates - HTML Format
        const templates = [
            "Oyun dünyasının sınırlarını zorlamak isteyenler için tasarlandı.",
            "Profesyonel e-sporcuların tercihi olan bu ürün, performansınızı zirveye taşıyacak.",
            "Şık tasarımı ve üstün performansı ile masanızın en göz alıcı parçası olmaya aday.",
            "Rakipsiz tepki süresi ve dayanıklılığı ile oyunlarda asla geride kalmayın.",
            "RGB aydınlatması ve ergonomik yapısı ile uzun oyun maratonlarının vazgeçilmezi."
        ];
        const randomTemplate = templates[Math.floor(Math.random() * templates.length)];

        const generatedText = `
<p><strong>${selectedCategory ? selectedCategory.toUpperCase() : 'YENİ ÜRÜN'}</strong>: ${randomTemplate}</p>
<br>
<ul class="list-disc pl-5 space-y-2">
    <li><strong>Yüksek Performans:</strong> En yoğun anlarda bile takılmadan akıcı bir deneyim sunar.</li>
    <li><strong>Premium Malzeme:</strong> Uzun ömürlü kullanım için dayanıklı materyallerden üretilmiştir.</li>
    <li><strong>Ergonomik Tasarım:</strong> Saatlerce süren kullanımlarda bile konforunuzdan ödün vermeyin.</li>
    <li><strong>Yeni Nesil Teknoloji:</strong> Sektördeki en son yeniliklerle donatılmıştır.</li>
</ul>
<br>
<p>Hemen sipariş verin ve oyun deneyiminizi bir üst seviyeye taşıyın! 🚀</p>`;

        setDescription(generatedText.trim());
    };

    const discountRates = [10, 15, 20, 25, 30, 35];

    // In a real app, use React Hook Form + Zod
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Find the category object to get the slug name properly if needed, but value is slug
        const categoryObj = mainCategories.find(c => c.slug === data.category);
        const categoryName = categoryObj ? categoryObj.name : data.category;

        // Process images
        if (images.length === 0) {
            alert("Lütfen en az bir ürün görseli ekleyin.");
            setLoading(false);
            return;
        }

        const mainImage = images[0];
        const gallery = images; // Full array including main image is fine, or slice(1) if preferred. Our logic handles gallery having main image too usually.

        // Add calculated fields or structure
        const enhancedData = {
            ...data,
            image: mainImage,
            gallery: gallery,
            description: description, // Use state instead of form data for description
            categorySlug: data.category, // sending slug as categorySlug
            category: categoryName,      // sending name as category
        };

        try {
            const res = await fetch('/api/products', { // We'll update the main products route or create admin specific
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(enhancedData),
            });

            if (res.ok) {
                alert('Ürün başarıyla eklendi!');
                (e.target as HTMLFormElement).reset();
                setSelectedCategory("");
                setPrice("");
                setDiscountPrice("");
                setDescription("");
                setImages([]);
            } else {
                const errorData = await res.text();
                console.error("Server Error:", errorData);
                alert(`Hata oluştu: ${errorData}`);
            }
        } catch (error) {
            console.error(error);
            alert(`Sunucu hatası: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-black mb-8">Yeni Ürün Ekle</h1>

            <GlassCard className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <NeonInput
                            label="Ürün Adı"
                            name="name"
                            placeholder="Örn: Cyberpunk Klavye"
                            required
                        />
                        <div className="space-y-2">
                            <NeonInput
                                label="Fiyat (TL)"
                                name="price"
                                type="number"
                                placeholder="4999"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
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
                                    placeholder="4499"
                                    value={discountPrice}
                                    onChange={(e) => setDiscountPrice(Number(e.target.value))}
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
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors"
                                >
                                    <option value="true" className="bg-black text-white">Stokta Var</option>
                                    <option value="false" className="bg-black text-white">Tükendi</option>
                                </select>
                            </div>
                        </div>

                        {/* Smart Discount Buttons */}
                        {price && (
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <p className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">Otomatik İndirim Uygula (Kâr Marjı Analizi)</p>
                                <div className="flex flex-wrap gap-2">
                                    {discountRates.map((rate) => (
                                        <button
                                            key={rate}
                                            type="button"
                                            onClick={() => handleDiscount(rate)}
                                            className="px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold border border-primary/20 transition-all hover:scale-105 active:scale-95"
                                        >
                                            %{rate} İndirim
                                            <span className="block text-[10px] opacity-60">
                                                {Math.round(Number(price) * (1 - rate / 100))} TL
                                            </span>
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
                                <option value="" className="bg-black text-white">Bir Kategori Seçin</option>
                                {mainCategories.map((cat) => (
                                    <option key={cat.slug} value={cat.slug} className="bg-black text-white">{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 ml-1">Alt Kategori</label>
                            <select
                                name="subCategorySlug"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors"
                                disabled={!selectedCategory}
                            >
                                <option value="" className="bg-black text-white">Alt Kategori Seçin (Opsiyonel)</option>
                                {selectedCategory && mainCategories.find(c => c.slug === selectedCategory)?.subCategories.map((sub) => (
                                    <option key={sub.slug} value={sub.slug} className="bg-black text-white">{sub.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-bold text-gray-400 ml-1">Ürün Görselleri</label>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-4">

                            {/* File Input */}
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer bg-primary/20 hover:bg-primary/30 text-primary transition-colors px-6 py-3 rounded-xl font-bold border border-primary/20">
                                    <ImageIcon size={20} />
                                    <span>Fotoğrafları Seç (Çoklu)</span>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/png, image/jpeg, image/webp"
                                        className="hidden"
                                        onChange={(e) => {
                                            const files = Array.from(e.target.files || []);
                                            if (files.length === 0) return;

                                            files.forEach(file => {
                                                // 1. Size Validation (Max 2MB)
                                                if (file.size > 2 * 1024 * 1024) {
                                                    alert(`"${file.name}" çok büyük! (Maks 2MB)`);
                                                    return;
                                                }

                                                // 2. Type Validation
                                                if (!file.type.startsWith("image/")) {
                                                    alert(`"${file.name}" bir resim dosyası değil.`);
                                                    return;
                                                }

                                                // 3. Convert to Base64
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    const base64 = reader.result as string;
                                                    setImages(prev => [...prev, base64]);
                                                };
                                                reader.readAsDataURL(file);
                                            });

                                            // Reset input
                                            e.target.value = "";
                                        }}
                                    />
                                </label>
                                <span className="text-xs text-gray-500">
                                    * İlk yüklenen görsel <b>ana resim</b> olur.<br />
                                    * Maksimum 2MB/görsel.
                                </span>
                            </div>

                            {/* Image Previews */}
                            {images.length > 0 ? (
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-4">
                                    {images.map((img, idx) => (
                                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group border border-white/10 bg-black/50">
                                            <Image src={img} alt={`Preview ${idx}`} fill className="object-cover" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                {idx === 0 && <span className="text-[10px] font-bold text-green-400 absolute top-2 left-2 bg-black/60 px-1 rounded">ANA</span>}
                                                <button
                                                    type="button"
                                                    onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}
                                                    className="p-1 bg-red-500/80 text-white rounded hover:bg-red-500 transition-colors"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-600/50 border-2 border-dashed border-white/5 rounded-xl">
                                    Henüz fotoğraf seçilmedi.
                                </div>
                            )}

                            {/* Legacy Textarea Fallback (Hidden or Removed) - keeping mostly for understanding if needed, but intended to replace */}
                        </div>
                    </div>

                    <div className="space-y-2">
                        {/* AI Writer Button */}
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold text-gray-400 ml-1">Açıklama</label>
                            <button
                                type="button"
                                onClick={generateAiDescription}
                                className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-xs font-bold rounded-lg border border-purple-500/20 transition-all hover:scale-105 group"
                            >
                                <Wand2 size={14} className="group-hover:rotate-12 transition-transform" />
                                AI ile Yaz
                            </button>
                        </div>
                        <textarea
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors"
                            placeholder="Ürün özelliklerini detaylıca yazın..."
                        ></textarea>
                    </div>

                    <div className="pt-4">
                        <GlassButton
                            variant="primary"
                            className="w-full py-4 text-lg font-bold"
                            disabled={loading}
                        >
                            {loading ? 'Ekleniyor...' : 'KAYDET VE YAYINLA'}
                        </GlassButton>
                    </div>
                </form>
            </GlassCard>
        </div >
    );
}
