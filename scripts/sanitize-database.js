const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('--- Veritabanı Temizliği Başlatıldı ---');

    // Admin hesabı - buna dokunmuyoruz
    const adminEmail = 'eklc67841z@gmail.com';

    try {
        // 1. Tüm işlemleri ve logları sil
        console.log('Ödeme işlemleri temizleniyor...');
        await prisma.paymentTransaction.deleteMany();

        console.log('Sadakat puanı işlemleri temizleniyor...');
        await prisma.loyaltyTransaction.deleteMany();

        console.log('Stok uyarıları temizleniyor...');
        await prisma.stockAlert.deleteMany();

        // 2. Yorumları sil
        console.log('Yorumlar temizleniyor...');
        await prisma.review.deleteMany();

        // 3. Siparişleri ve ürünlerini sil
        console.log('Sipariş içerikleri temizleniyor...');
        await prisma.orderItem.deleteMany();

        console.log('Siparişler temizleniyor...');
        await prisma.order.deleteMany();

        // 4. Kuponları sil
        console.log('Kuponlar temizleniyor...');
        await prisma.coupon.deleteMany();

        // 5. Admin hariç kullanıcıları sil
        console.log(`Kullanıcılar temizleniyor (Sadece ${adminEmail} kalacak)...`);
        const { count } = await prisma.user.deleteMany({
            where: {
                email: {
                    not: adminEmail
                }
            }
        });
        console.log(`${count} kullanıcı silindi.`);

        console.log('--- Veritabanı Temizliği Başarıyla Tamamlandı ---');
    } catch (error) {
        console.error('Temizlik sırasında bir hata oluştu:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
