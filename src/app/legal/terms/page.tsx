import React from 'react';
import Container from '@/components/ui/Container';

export default function TermsPage() {
    return (
        <Container className="pt-32 pb-20">
            <div className="max-w-4xl mx-auto prose prose-invert">
                <h1 className="text-4xl font-black text-white mb-8 neon-text">Kullanım Şartları</h1>
                <p className="text-gray-300 mb-6">
                    Lütfen sitemizi kullanmadan önce bu kullanım şartlarını dikkatlice okuyunuz. Bu siteyi kullanan ve alışveriş yapan müşterilerimiz,
                    aşağıdaki şartları kabul etmiş varsayılmaktadır.
                </p>

                <h3 className="text-xl font-bold text-primary mt-8 mb-4">1. Genel Hükümler</h3>
                <p className="text-gray-400">
                    Sitemizdeki web sayfaları ve ona bağlı tüm sayfalar ('site') ElectroNova firmasının malıdır ve onun tarafından işletilir.
                    Sizler ('Kullanıcı') sitede sunulan tüm hizmetleri kullanırken aşağıdaki şartlara tabi olduğunuzu, sitedeki hizmetten yararlanmakla
                    ve kullanmaya devam etmekle; Bağlı olduğunuz yasalar önünde sözleşme imzalama hakkına, yetkisine ve hukuki ehliyetine sahip ve
                    18 yaşın üzerinde olduğunuzu, bu sözleşmeyi okuduğunuzu, anladığınızı ve sözleşmede yazan şartlarla bağlı olduğunuzu kabul etmiş sayılırsınız.
                </p>

                <h3 className="text-xl font-bold text-primary mt-8 mb-4">2. Hizmet Kapsamı</h3>
                <p className="text-gray-400">
                    ElectroNova, kullanıcılarına internet ortamında e-ticaret hizmeti sunmaktadır. Site üzerinden yapılan alışverişlerde,
                    kullanıcı tarafından sipariş edilen ürünler, stok durumuna göre kargo firması aracılığıyla kullanıcıya teslim edilir.
                </p>

                <h3 className="text-xl font-bold text-primary mt-8 mb-4">3. Fikri Mülkiyet Hakları</h3>
                <p className="text-gray-400">
                    İşbu Site'de yer alan unvan, işletme adı, marka, patent, logo, tasarım, bilgi ve yöntem gibi tescilli veya tescilsiz tüm fikri mülkiyet hakları
                    site işleteni ve sahibi firmaya veya belirtilen ilgilisine ait olup, ulusal ve uluslararası hukuk koruması altındadır.
                </p>

                <div className="mt-12 p-6 border border-white/10 rounded-xl bg-white/5">
                    <p className="text-sm text-gray-500">Son Güncelleme: 16 Şubat 2026</p>
                </div>
            </div>
        </Container>
    );
}
