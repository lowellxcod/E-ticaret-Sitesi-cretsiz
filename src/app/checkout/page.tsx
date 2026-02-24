'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { useCartStore } from '@/lib/store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';

export default function CheckoutPage() {
    const { items, getTotal, clearCart } = useCartStore();
    const { data: session } = useSession();
    const router = useRouter();
    const [iframeToken, setIframeToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        fullName: session?.user?.name || '',
        phone: '',
        address: '',
        city: '',
        isCorporate: false,
        taxNumber: '',
        taxOffice: ''
    });

    useEffect(() => {
        if (items.length === 0) {
            router.push('/');
        }
    }, [items, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const initializePayment = async () => {
        // Validation
        if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
            alert('Lütfen tüm zorunlu alanları doldurunuz.');
            return;
        }
        if (formData.isCorporate && (!formData.taxNumber || !formData.taxOffice)) {
            alert('Kurumsal fatura için Vergi No ve Vergi Dairesi zorunludur.');
            return;
        }

        setLoading(true);
        try {
            // 2. Prepare Basket for PayTR (Name, Price, Qty)
            const basket = items.map(item => [item.name, item.price.toString(), item.quantity]);

            // 3. Get Token and Create Order
            const response = await fetch('/api/payment/paytr', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    totalAmount: getTotal(),
                    basket,
                    cartItems: items, // Send full items for DB
                    user_address: `${formData.address} - ${formData.city}`,
                    user_phone: formData.phone,
                    billingAddress: `${formData.address} - ${formData.city}`,
                    taxNumber: formData.taxNumber,
                    taxOffice: formData.taxOffice,
                    isCorporate: formData.isCorporate
                })
            });

            const data = await response.json();

            if (data.token) {
                setIframeToken(data.token);
            } else {
                alert('Ödeme başlatılamadı: ' + data.error);
            }
        } catch (error) {
            console.error(error);
            alert('Bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto pt-32 pb-20 px-4 min-h-screen">
            <h1 className="text-4xl font-black text-white mb-8 neon-text">GÜVENLİ ÖDEME</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side: Address Form */}
                <div className="space-y-6">
                    <GlassCard className="p-8">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-black border border-primary/30">1</span>
                            Teslimat ve Fatura
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Ad Soyad</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors"
                                    placeholder="Adınız Soyadınız"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Telefon</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors"
                                        placeholder="05XX XXX XX XX"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Şehir / İlçe</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors"
                                        placeholder="İstanbul / Kadıköy"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Adres</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors resize-none"
                                    placeholder="Mahalle, Cadde, Sokak, Kapı No..."
                                />
                            </div>

                            {/* Corporate Toggle */}
                            <div className="pt-4 border-t border-white/10">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.isCorporate ? 'bg-primary border-primary' : 'border-white/30 group-hover:border-white'}`}>
                                        {formData.isCorporate && <span className="text-black text-xs font-bold">✓</span>}
                                    </div>
                                    <input
                                        type="checkbox"
                                        name="isCorporate"
                                        checked={formData.isCorporate}
                                        onChange={handleInputChange}
                                        className="hidden"
                                    />
                                    <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">Kurumsal Fatura İstiyorum</span>
                                </label>
                            </div>

                            {formData.isCorporate && (
                                <div className="grid grid-cols-2 gap-4 pt-2 animate-in fade-in slide-in-from-top-2">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Vergi Numarası</label>
                                        <input
                                            type="text"
                                            name="taxNumber"
                                            value={formData.taxNumber}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors"
                                            placeholder="Vergi No veya TC Kimlik"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Vergi Dairesi</label>
                                        <input
                                            type="text"
                                            name="taxOffice"
                                            value={formData.taxOffice}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-colors"
                                            placeholder="Vergi Dairesi Adı"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </GlassCard>
                </div>

                {/* Right Side: Order Summary & Payment */}
                <div className="space-y-6">
                    <GlassCard className="p-8 h-fit sticky top-24">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-black border border-primary/30">2</span>
                            Ödeme
                        </h2>

                        {!iframeToken ? (
                            <>
                                <div className="space-y-4 mb-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center border-b border-white/10 pb-4">
                                            <div>
                                                <p className="text-white font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-400">{item.quantity} Adet</p>
                                            </div>
                                            <p className="text-primary font-bold">{item.price * item.quantity} TL</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center text-xl font-bold text-white border-t border-white/20 pt-4">
                                    <span>Toplam</span>
                                    <span className="text-primary neon-text">{getTotal()} TL</span>
                                </div>

                                <GlassButton
                                    onClick={initializePayment}
                                    className="w-full mt-8 py-4 text-base"
                                    disabled={loading}
                                >
                                    {loading ? 'Ödeme Sayfası Hazırlanıyor...' : 'Ödemeye Geç (PayTR)'}
                                </GlassButton>
                                <p className="text-xs text-center text-gray-500 mt-4">
                                    "Ödemeye Geç" butonuna tıkladığınızda PayTR güvenli ödeme sayfasına yönlendirileceksiniz.
                                </p>
                            </>
                        ) : (
                            <div className="w-full min-h-[600px] bg-white rounded-xl overflow-hidden relative">
                                <iframe
                                    src={`https://www.paytr.com/odeme/guvenli/${iframeToken}`}
                                    id="paytriframe"
                                    frameBorder="0"
                                    scrolling="no"
                                    style={{ width: '100%', height: '600px' }}
                                ></iframe>
                            </div>
                        )}
                    </GlassCard>
                </div>
            </div>

            {/* PayTR Resizer Script */}
            <Script src="https://www.paytr.com/js/iframeResizer.min.js" strategy="lazyOnload" />
        </div>
    );
}
