import React from 'react';
import Container from '@/components/ui/Container';

export default function CookiesPage() {
    return (
        <Container className="pt-32 pb-20">
            <div className="max-w-4xl mx-auto prose prose-invert">
                <h1 className="text-4xl font-black text-white mb-8 neon-text">Çerez Politikası</h1>
                <p className="text-gray-300 mb-6">
                    ElectroNova olarak, web sitemizden en verimli şekilde faydalanabilmeniz ve kullanıcı deneyiminizi geliştirebilmek için Çerez kullanıyoruz.
                    Çerez kullanılmasını tercih etmezseniz tarayıcınızın ayarlarından Çerezleri silebilir ya da engelleyebilirsiniz.
                </p>

                <h3 className="text-xl font-bold text-primary mt-8 mb-4">1. Çerez Nedir?</h3>
                <p className="text-gray-400">
                    Çerezler (Cookies), ziyaret ettiğiniz internet siteleri tarafından tarayıcılar aracılığıyla cihazınıza veya ağ sunucusuna depolanan küçük metin dosyalarıdır.
                </p>

                <h3 className="text-xl font-bold text-primary mt-8 mb-4">2. Hangi Tür Çerezleri Kullanıyoruz?</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-400">
                    <li><strong className="text-white">Zorunlu Çerezler:</strong> Sitenin düzgün çalışması için gereklidir. Örn: Sepetinizdeki ürünlerin tutulması.</li>
                    <li><strong className="text-white">Performans Çerezleri:</strong> Sitenin performansını analiz etmek için kullanılır. Örn: Sayfa yüklenme hızları.</li>
                    <li><strong className="text-white">İşlevsellik Çerezleri:</strong> Tercihlerinizi hatırlamak için kullanılır. Örn: Dil seçimi.</li>
                </ul>

                <h3 className="text-xl font-bold text-primary mt-8 mb-4">3. Çerezlerin Yönetimi</h3>
                <p className="text-gray-400">
                    Tarayıcınızın ayarlarını değiştirerek çerezlere ilişkin tercihlerinizi kişiselleştirme imkanına sahipsiniz.
                </p>

                <div className="mt-12 p-6 border border-white/10 rounded-xl bg-white/5">
                    <p className="text-sm text-gray-500">Son Güncelleme: 16 Şubat 2026</p>
                </div>
            </div>
        </Container>
    );
}
