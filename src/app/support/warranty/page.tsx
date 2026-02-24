import React from 'react';
import Container from '@/components/ui/Container';
import { ShieldCheck, Wrench, AlertTriangle } from 'lucide-react';

export default function WarrantyPage() {
    return (
        <Container className="pt-32 pb-20">
            <div className="max-w-4xl mx-auto prose prose-invert">
                <h1 className="text-4xl font-black text-white mb-8 neon-text">Garanti Koşulları</h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    ElectroNova'dan satın aldığınız tüm ürünler, üretim hatalarına karşı <span className="text-primary font-bold">2 YIL</span> resmi distribütör garantisi altındadır.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldCheck className="text-green-400" size={24} />
                            <h3 className="text-lg font-bold text-white m-0">Kapsam Dahilinde Olanlar</h3>
                        </div>
                        <ul className="list-disc pl-5 space-y-2 text-gray-400 text-sm">
                            <li>Cihazın üretiminden kaynaklı donanımsal arızalar</li>
                            <li>Kutu içeriğinde eksik çıkan parçalar</li>
                            <li>Yazılımsal hatalar (işletim sistemi hariç)</li>
                            <li>Normal kullanım koşullarında oluşan performans kayıpları</li>
                        </ul>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="text-red-400" size={24} />
                            <h3 className="text-lg font-bold text-white m-0">Garanti Dışı Durumlar</h3>
                        </div>
                        <ul className="list-disc pl-5 space-y-2 text-gray-400 text-sm">
                            <li>Düşürme, çarpma, sıvı teması gibi kullanıcı hataları</li>
                            <li>Yetkisiz kişilerce yapılan tamir ve müdahaleler</li>
                            <li>Orijinal olmayan yedek parça kullanımı</li>
                            <li>Voltaj dalgalanmalarından kaynaklanan arızalar</li>
                        </ul>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-primary mt-8 mb-4">Garanti Süreci Nasıl İşler?</h3>
                <ol className="list-decimal pl-5 space-y-3 text-gray-400">
                    <li>Arızalı ürün için Müşteri Hizmetlerimiz ile iletişime geçin.</li>
                    <li>Size verilecek ücretsiz kargo kodu ile ürünü teknik servise gönderin.</li>
                    <li>Teknik servisimiz 1-3 iş günü içerisinde arıza tespiti yapar.</li>
                    <li>Onarım veya değişim işlemi yapılarak ürün size geri gönderilir. Yasal onarım süresi maksimum 20 iş günüdür.</li>
                </ol>

                <div className="mt-12 p-6 bg-primary/10 border border-primary/20 rounded-xl">
                    <p className="text-primary font-bold m-0 flex items-center gap-2">
                        <Wrench size={20} />
                        Teknik Servis İletişim: <span className="text-white">destek@electronova.com</span>
                    </p>
                </div>
            </div>
        </Container>
    );
}
