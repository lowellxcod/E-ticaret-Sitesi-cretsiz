const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mockProducts = [
    {
        id: "aura-link-pro", slug: "aura-link-pro-wireless", name: "Aura-Link Pro Wireless", price: 8499,
        category: "Kulaklıklar", categorySlug: "headsets", subCategorySlug: "wireless-headsets",
        description: "Hibrit Aktif Gürültü Engelleme (ANC) özellikli, 100 saat pil ömürlü ultra premium wireless kulaklık. Kristal netliğinde ses ve sıfır gecikme.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200",
        gallery: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200"],
        specs: [{ label: "Pil", value: "100 Saat" }, { label: "Bağlantı", value: "2.4GHz" }], stock: 50, featured: true
    },
    {
        id: "quantum-x-ultra", slug: "quantum-x-ultra-gaming-pc", name: "Quantum-X Ultra Gaming PC", price: 124999,
        category: "Oyun", categorySlug: "gaming-accessories",
        description: "RTX 5090 ve i9-15900K ile donatılmış, sıvı soğutmalı canavar.",
        image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=1200",
        gallery: ["https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=1200"],
        specs: [{ label: "GPU", value: "RTX 5090" }, { label: "CPU", value: "Core i9" }], stock: 5, featured: true
    },
    {
        id: "zenith-s7", slug: "zenith-surround-s7", name: "Zenith Surround S7", price: 6299,
        category: "Kulaklıklar", categorySlug: "headsets", subCategorySlug: "gaming-headsets",
        description: "7.1 Surround ses teknolojisi ile profesyonel oyun deneyimi.",
        image: "https://images.unsplash.com/photo-1546435770-a3e426da473b?auto=format&fit=crop&q=80&w=1200",
        gallery: ["https://images.unsplash.com/photo-1546435770-a3e426da473b?auto=format&fit=crop&q=80&w=1200"],
        specs: [{ label: "Ses", value: "7.1 Surround" }], stock: 75, featured: false
    }
];

const mockUsers = [
    { email: "mert@example.com", name: "Mert Yılmaz", points: 450 },
    { email: "selin@example.com", name: "Selin Kaya", points: 1200 },
    { email: "berk@example.com", name: "Berk Demir", points: 0 },
    { email: "ayse@example.com", name: "Ayşe Öz", points: 800 }
];

async function main() {
    console.log('--- Kapsamlı Mock Veri Oluşturma Başlatıldı ---');
    try {
        console.log('Eski veriler temizleniyor...');
        await prisma.paymentTransaction.deleteMany();
        await prisma.loyaltyTransaction.deleteMany();
        await prisma.stockAlert.deleteMany();
        await prisma.review.deleteMany();
        await prisma.orderItem.deleteMany();
        await prisma.order.deleteMany();
        await prisma.coupon.deleteMany();
        await prisma.product.deleteMany();
        await prisma.user.deleteMany({ where: { email: { not: 'eklc67841z@gmail.com' } } });

        console.log('Ürünler ekleniyor...');
        for (const p of mockProducts) { await prisma.product.create({ data: p }); }

        console.log('Kullanıcılar ekleniyor...');
        const createdUsers = [];
        for (const u of mockUsers) {
            const user = await prisma.user.create({ data: u });
            createdUsers.push(user);
        }

        console.log('Siparişler ve işlemler ekleniyor...');
        const statuses = ["PAID", "SHIPPED", "DELIVERED", "PENDING"];
        for (let i = 0; i < 15; i++) {
            const randomUser = createdUsers[i % createdUsers.length];
            const status = statuses[i % statuses.length];
            const total = 5000 + (Math.random() * 20000);

            const order = await prisma.order.create({
                data: {
                    userId: randomUser.id,
                    total: total,
                    status: status,
                    customerName: randomUser.name,
                    customerEmail: randomUser.email,
                    customerPhone: "0555" + Math.floor(1000000 + Math.random() * 9000000),
                    shippingAddress: "İstanbul, Türkiye",
                    billingAddress: "İstanbul, Türkiye",
                    invoiceStatus: status === "DELIVERED" ? "ISSUED" : "PENDING",
                }
            });

            await prisma.orderItem.create({
                data: {
                    orderId: order.id,
                    productId: mockProducts[i % mockProducts.length].id,
                    quantity: 1,
                    price: mockProducts[i % mockProducts.length].price
                }
            });

            if (status !== "PENDING") {
                await prisma.paymentTransaction.create({
                    data: {
                        orderId: order.id,
                        merchantOid: "PAYTR_" + order.id,
                        status: "success",
                        totalAmount: total.toString(),
                        details: { mock: true, gateway: "PayTR" }
                    }
                });
            }
        }

        console.log('Yorumlar ve kuponlar ekleniyor...');
        for (const user of createdUsers) {
            await prisma.review.create({
                data: { userId: user.id, productId: mockProducts[0].id, rating: 5, comment: "Tek kelimeyle mükemmel!" }
            });
        }

        await prisma.coupon.createMany({
            data: [
                { code: "OZEL_INDIRIM", type: "PERCENT", value: 30, isActive: true },
                { code: "BEDAVA_KARGO", type: "AMOUNT", value: 100, isActive: true }
            ]
        });

        console.log('--- Kapsamlı Mock Veri Oluşturma Başarıyla Tamamlandı ---');
    } catch (error) {
        console.error('Hata:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
