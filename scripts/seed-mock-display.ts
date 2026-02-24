import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding specific mock data for UI visualization...')

    // 1. Create a Test User
    const user = await prisma.user.upsert({
        where: { email: 'mock_view@electronova.com' },
        update: {},
        create: {
            email: 'mock_view@electronova.com',
            name: 'Görsel Test Müşterisi',
            password: 'hashed_dummy_pass',
        }
    });

    // 2. Scenario A: Successful Payment (Bought 10 mins ago)
    const successOrder = await prisma.order.create({
        data: {
            userId: user.id,
            total: 24999.90,
            status: 'PAID', // Order status reflects success
            customerName: user.name,
            customerEmail: user.email,
            paymentId: 'PAYTR_123456_SUCCESS',
            items: { create: [] }
        }
    });

    await prisma.paymentTransaction.create({
        data: {
            orderId: successOrder.id,
            merchantOid: successOrder.id, // Usually same as order ID in our logic
            status: 'success',
            totalAmount: '2499990', // 24,999.90 TL * 100
            details: {
                status: 'success',
                merchant_oid: successOrder.id,
                payment_amount: '2499990',
                currency: 'TL',
                payment_type: 'card',
                test_mode: '1'
            },
            createdAt: new Date(Date.now() - 10 * 60 * 1000) // 10 mins ago
        }
    });

    // 3. Scenario B: Failed Payment (Tried 2 hours ago - Insufficient Funds)
    const failedOrder = await prisma.order.create({
        data: {
            userId: user.id,
            total: 4500.00,
            status: 'CANCELLED', // Order status reflects failure
            customerName: user.name,
            customerEmail: user.email,
            items: { create: [] }
        }
    });

    await prisma.paymentTransaction.create({
        data: {
            orderId: failedOrder.id,
            merchantOid: failedOrder.id,
            status: 'failed',
            totalAmount: '450000',
            details: {
                status: 'failed',
                merchant_oid: failedOrder.id,
                fail_message: 'Yetersiz Bakiye (51)',
                error_code: '51',
                test_mode: '1'
            },
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
        }
    });

    console.log('Mock display data seeded!');
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

export { }
