'use client';

import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import { Star, MessageSquare, Trash2, Image as ImageIcon, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Review {
    id: string;
    rating: number;
    comment: string;
    images: string[];
    user: {
        name: string;
    };
    createdAt: string;
}

interface ProductReviewsProps {
    productId: string;
    reviews: Review[];
}

export default function ProductReviews({ productId, reviews: initialReviews }: ProductReviewsProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [imageInput, setImageInput] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    // @ts-ignore
    const isAdmin = session?.user?.email === "admin@electronova.com" || session?.user?.role === "ADMIN"; // Replace with env check if possible but client side env is tricky without NEXT_PUBLIC

    const handleAddImage = () => {
        if (!imageInput) return;
        setImages([...images, imageInput]);
        setImageInput("");
    };

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error("Lütfen bir puan seçin.");
            return;
        }
        setLoading(true);

        try {
            const res = await fetch(`/api/products/${productId}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating, comment, images }),
            });

            if (res.ok) {
                const newReview = await res.json();
                setReviews([newReview, ...reviews]);
                setRating(0);
                setComment("");
                setImages([]);
                toast.success("Yorumunuz başarıyla gönderildi!");
                router.refresh();
            } else {
                toast.error("Yorum gönderilemedi.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (reviewId: string) => {
        if (!confirm("Bu yorumu silmek istediğinize emin misiniz?")) return;

        try {
            const res = await fetch(`/api/products/${productId}/reviews?reviewId=${reviewId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setReviews(reviews.filter(r => r.id !== reviewId));
                toast.success("Yorum silindi.");
                router.refresh();
            } else {
                toast.error("Silme işlemi başarısız.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Hata oluştu.");
        }
    };

    return (
        <div className="space-y-8 mt-12">
            <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <MessageSquare className="text-primary" /> Değerlendirmeler ({reviews.length})
            </h2>

            {/* Review Form */}
            {session ? (
                <GlassCard className="p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Ürünü Değerlendir</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className={`transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-400/50'}`}
                                >
                                    <Star size={24} fill={star <= rating ? "currentColor" : "none"} />
                                </button>
                            ))}
                        </div>

                        <textarea
                            className="w-full bg-black/40 border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"
                            rows={3}
                            placeholder="Düşüncelerinizi paylaşın..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />

                        {/* Image Upload */}
                        <div className="space-y-4">
                            <div className="flex gap-2 items-center">
                                <label className="flex items-center gap-2 cursor-pointer bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-xl text-white text-sm">
                                    <ImageIcon size={20} />
                                    <span>Fotoğraf Seç</span>
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg, image/webp"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;

                                            // 1. Size Validation (Max 1MB)
                                            if (file.size > 1024 * 1024) {
                                                toast.error("Dosya boyutu 1MB'dan küçük olmalıdır.");
                                                return;
                                            }

                                            // 2. Type Validation
                                            if (!file.type.startsWith("image/")) {
                                                toast.error("Sadece resim dosyaları yüklenebilir.");
                                                return;
                                            }

                                            // 3. Convert to Base64
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                const base64 = reader.result as string;
                                                setImages((prev) => [...prev, base64]);
                                            };
                                            reader.readAsDataURL(file);

                                            // Reset input
                                            e.target.value = "";
                                        }}
                                    />
                                </label>
                                <span className="text-xs text-gray-500">Maks. 1MB (JPG, PNG)</span>
                            </div>

                            {images.length > 0 && (
                                <div className="flex gap-2 overflow-x-auto py-2">
                                    {images.map((img, idx) => (
                                        <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden group border border-white/10">
                                            <Image src={img} alt="Preview" fill className="object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(idx)}
                                                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-500"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <GlassButton type="submit" variant="primary" className="py-2 px-6 text-sm" disabled={loading}>
                                {loading ? 'Gönderiliyor...' : 'Yorum Yap'}
                            </GlassButton>
                        </div>
                    </form>
                </GlassCard>
            ) : (
                <div className="bg-white/5 rounded-xl p-6 text-center text-gray-400">
                    Yorum yapmak için lütfen <a href="/auth/login" className="text-primary underline">giriş yapın</a>.
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
                {reviews.length === 0 ? (
                    <p className="text-gray-500 italic">Henüz yorum yapılmamış. İlk yorumu sen yap!</p>
                ) : (
                    reviews.map((review) => (
                        <GlassCard key={review.id} className="p-6 relative group">
                            {isAdmin && (
                                <button
                                    onClick={() => handleDelete(review.id)}
                                    className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                    title="Yorumu Sil"
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}

                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white">
                                        {review.user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-sm">{review.user.name}</p>
                                        <div className="flex text-yellow-500 h-3">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-700"} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500 mr-8">
                                    {new Date(review.createdAt).toLocaleDateString('tr-TR')}
                                </span>
                            </div>
                            <p className="text-gray-300 text-sm pl-12 mb-3">{review.comment}</p>

                            {/* Review Images */}
                            {review.images && review.images.length > 0 && (
                                <div className="pl-12 flex gap-2">
                                    {review.images.map((img, i) => (
                                        <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10 cursor-pointer hover:scale-105 transition-transform">
                                            <Image src={img} alt="User Review" fill className="object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </GlassCard>
                    ))
                )}
            </div>
        </div>
    );
}
