const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('🗑️ Veritabanı temizliği başlıyor...');

        // Delete in order to avoid foreign key constraints

        // 1. Delete Order Items (depend on Order and Product)
        console.log('Deleting OrderItems...');
        await prisma.orderItem.deleteMany({});

        // 2. Delete Payment Transactions (depend on Order)
        console.log('Deleting PaymentTransactions...');
        await prisma.paymentTransaction.deleteMany({});

        // 3. Delete Orders (depend on User)
        console.log('Deleting Orders...');
        await prisma.order.deleteMany({});

        // 4. Delete Products (depend on Category - if relation exists, but here purely Category string usually)
        // Note: If you have a separate Category model, delete that too if needed. 
        // Based on schema, Category might be just a string in Product or separate. 
        // Checking schema... Product has categoryId? No, usually string in this project.
        console.log('Deleting Products...');
        await prisma.product.deleteMany({});

        // 5. Delete Coupons
        console.log('Deleting Coupons...');
        await prisma.coupon.deleteMany({});

        console.log('✅ Temizlik tamamlandı! Sadece Kullanıcılar (Users) kaldı.');
    } catch (error) {
        console.error('❌ Hata:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
