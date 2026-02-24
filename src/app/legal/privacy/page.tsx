import React from 'react';
import Container from '@/components/ui/Container';

export default function PrivacyPage() {
    return (
        <Container className="pt-32 pb-20">
            <div className="max-w-4xl mx-auto prose prose-invert">
                <h1 className="text-4xl font-black text-white mb-8 neon-text">Gizlilik Politikası (KVKK)</h1>
                <p className="text-gray-300 mb-6">
                    ElectroNova Sistemleri ("Şirket") olarak, kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz.
                    Bu bilinçle, Şirket olarak ürün ve hizmetlerimizden faydalanan kişiler dahil, Şirket ile ilişkili tüm şahıslara ait her türlü kişisel verilerin
                    6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVK Kanunu")'na uygun olarak işlenerek, muhafaza edilmesine büyük önem atfetmekteyiz.
                </p>

                <h3 className="text-xl font-bold text-primary mt-8 mb-4">1. Kişisel Verilerin Toplanması ve İşlenmesi</h3>
                <p className="text-gray-400">
                    Kişisel verileriniz, Şirketimiz tarafından verilen hizmet, ürün ya da ticari faaliyete bağlı olarak değişkenlik gösterebilmekle birlikte;
                    otomatik ya da otomatik olmayan yöntemlerle, ofisler, internet sitesi, sosyal medya mecraları, mobil uygulamalar ve benzeri vasıtalarla sözlü,
                    yazılı ya da elektronik olarak toplanabilecektir.
                </p>

                <h3 className="text-xl font-bold text-primary mt-8 mb-4">2. Kişisel Verilerin İşlenme Amaçları</h3>
                <p className="text-gray-400">
                    Toplanan kişisel verileriniz, Şirketimiz tarafından sunulan ürün ve hizmetlerden sizleri faydalandırmak için gerekli çalışmaların iş birimlerimiz
                    tarafından yapılması, Şirketimizin ve Şirketimizle iş ilişkisi içerisinde olan kişilerin hukuki ve ticari güvenliğinin temini amacıyla işlenmektedir.
                </p>

                <h3 className="text-xl font-bold text-primary mt-8 mb-4">3. Haklarınız</h3>
                <p className="text-gray-400">
                    KVK Kanunu'nun 11. maddesi uyarınca, veri sahipleri olarak; kişisel veri işlenip işlenmediğini öğrenme, kişisel verileri işlenmişse buna ilişkin
                    bilgi talep etme, kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme haklarına sahipsiniz.
                </p>

                <div className="mt-12 p-6 border border-white/10 rounded-xl bg-white/5">
                    <p className="text-sm text-gray-500">Son Güncelleme: 16 Şubat 2026</p>
                </div>
            </div>
        </Container>
    );
}
