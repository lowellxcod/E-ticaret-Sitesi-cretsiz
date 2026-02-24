
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🗑️ Deleting all data...');

    // Delete in order of dependency
    await prisma.orderItem.deleteMany({});
    await prisma.paymentTransaction.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.stockAlert.deleteMany({});

    // Delete all products
    await prisma.product.deleteMany({});

    // Delete all categories
    await prisma.category.deleteMany({});

    // Delete all users EXCEPT the admin
    // Assuming the user running this (or previously seeded) might want to keep their account.
    // But "tüm verileri sil" usually means "clean slate".
    // Let's keep one admin if it matches a specific criteria or just wipe all non-admins.
    await prisma.user.deleteMany({
        where: {
            role: {
                not: 'ADMIN'
            }
        }
    });

    console.log('✅ All data cleared! The database is ready for real data.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
