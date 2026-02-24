import React from 'react';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import { CreditCard, ShieldCheck, Banknote } from 'lucide-react';

export default function PaymentOptionsPage() {
    return (
        <Container className="pt-32 pb-20">
            <h1 className="text-4xl font-black text-white mb-8 neon-text text-center">Ödeme Seçenekleri</h1>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
                Alışverişlerinizi güvenle tamamlamanız için çeşitli ödeme yöntemleri sunuyoruz.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                <GlassCard className="p-8 text-center border-primary/30">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                        <CreditCard size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Kredi Kartı</h3>
                    <p className="text-gray-400 text-sm">
                        Tüm Visa, Mastercard ve Troy logolu kredi kartları ile peşin veya taksitli ödeme yapabilirsiniz.
                        PayTR altyapısı ile kart bilgileriniz güvendedir.
                    </p>
                </GlassCard>

                <GlassCard className="p-8 text-center">
                    <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center text-secondary mx-auto mb-6">
                        <ShieldCheck size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">3D Secure Güvenlik</h3>
                    <p className="text-gray-400 text-sm">
                        Tüm işlemleriniz 256-bit SSL sertifikası ve 3D Secure güvenliği ile şifrelenir.
                        Onayınız olmadan hiçbir işlem gerçekleşmez.
                    </p>
                </GlassCard>

                <GlassCard className="p-8 text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 mx-auto mb-6">
                        <Banknote size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Havale / EFT</h3>
                    <p className="text-gray-400 text-sm">
                        Dilerseniz sipariş tutarını banka hesaplarımıza Havale veya EFT yoluyla gönderebilirsiniz.
                        Sipariş açıklama kısmına sipariş numarasını yazmayı unutmayın.
                    </p>
                </GlassCard>
            </div>

            <div className="max-w-4xl mx-auto text-center border-t border-white/10 pt-12">
                <p className="text-gray-500 text-sm">
                    Taksit seçenekleri ödeme sayfasında kart bilgilerinizi girdikten sonra görüntülenir.
                    Bankanızın uyguladığı taksit prosedürleri geçerlidir.
                </p>
            </div>
        </Container>
    );
}
