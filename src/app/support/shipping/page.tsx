import React from 'react';
import Container from '@/components/ui/Container';
import { Truck, Clock, MapPin, Package } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function ShippingPage() {
    return (
        <Container className="pt-32 pb-20">
            <h1 className="text-4xl font-black text-white mb-8 neon-text text-center">Teslimat & Kargo</h1>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
                Siparişlerinizi en hızlı ve güvenli şekilde size ulaştırmak için premium kargo firmalarıyla çalışıyoruz.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {[
                    { icon: Clock, title: "Aynı Gün Kargo", desc: "Saat 15:00'e kadar verilen siparişler aynı gün kargoda." },
                    { icon: Truck, title: "Ücretsiz Kargo", desc: "1000 TL ve üzeri alışverişlerde kargo bedava." },
                    { icon: MapPin, title: "Tüm Türkiye", desc: "Türkiye'nin 81 iline sigortalı teslimat." },
                    { icon: Package, title: "Özenli Paketleme", desc: "Ürünleriniz darbelere karşı korumalı özel kutularda gönderilir." },
                ].map((item, i) => (
                    <GlassCard key={i} className="p-6 text-center">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                            <item.icon size={24} />
                        </div>
                        <h3 className="font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                    </GlassCard>
                ))}
            </div>

            <div className="max-w-4xl mx-auto prose prose-invert">
                <h3 className="text-xl font-bold text-primary mb-4">Sıkça Sorulan Sorular</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-bold text-white mb-2">Hangi kargo firması ile çalışıyorsunuz?</h4>
                        <p className="text-gray-400">Siparişleriniz Yurtiçi Kargo veya Aras Kargo güvencesi ile gönderilmektedir.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-2">Kargom nerede?</h4>
                        <p className="text-gray-400">Siparişiniz kargoya verildiğinde size SMS ve E-posta ile takip numarası iletilir. "Hesabım &gt; Siparişlerim" sayfasından da takip edebilirsiniz.</p>
                    </div>
                </div>
            </div>
        </Container>
    );
}
