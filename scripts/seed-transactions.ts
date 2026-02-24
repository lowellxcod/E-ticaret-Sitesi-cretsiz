const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding dummy transactions...')

    // 1. Get an existing order or create a dummy one if none exists
    let order = await prisma.order.findFirst()

    if (!order) {
        console.log('No order found, creating a dummy order for transaction...');
        // Create a dummy user if needed
        let user = await prisma.user.findFirst();
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: 'demo@electronova.com',
                    password: 'demo',
                    name: 'Demo User'
                }
            });
        }

        order = await prisma.order.create({
            data: {
                userId: user.id,
                total: 15499.90,
                status: 'PENDING',
                customerName: 'Demo Kullanıcı',
                customerEmail: 'demo@electronova.com',
                items: {
                    create: [] // Empty items for this specific dummy purpose
                }
            }
        });
    }

    // 2. Create Dummy Transactions
    const transactions = [
        {
            orderId: order.id,
            merchantOid: `ORD-${Math.floor(Math.random() * 100000)}`,
            status: 'success',
            totalAmount: '1549990', // PayTR sends amount * 100
            details: {
                status: 'success',
                merchant_oid: `ORD-${Math.floor(Math.random() * 100000)}`,
                total_amount: '1549990',
                hash: 'dummy_hash',
                payment_type: 'card',
                currency: 'TL',
                payment_amount: '1549990'
            },
            createdAt: new Date() // Now
        },
        {
            orderId: order.id,
            merchantOid: `ORD-${Math.floor(Math.random() * 100000)}`,
            status: 'failed',
            totalAmount: '249900',
            details: {
                status: 'failed',
                merchant_oid: `ORD-${Math.floor(Math.random() * 100000)}`,
                fail_message: 'Yetersiz bakiye',
                error_code: '51',
                total_amount: '249900'
            },
            createdAt: new Date(Date.now() - 3600 * 1000) // 1 hour ago
        },
        {
            orderId: order.id,
            merchantOid: `ORD-${Math.floor(Math.random() * 100000)}`,
            status: 'success',
            totalAmount: '89000',
            details: {
                status: 'success',
                merchant_oid: `ORD-${Math.floor(Math.random() * 100000)}`,
                total_amount: '89000',
                payment_type: 'card',
                installment_count: '3'
            },
            createdAt: new Date(Date.now() - 86400 * 1000 * 2) // 2 days ago
        }
    ]

    for (const t of transactions) {
        await prisma.paymentTransaction.create({
            data: t
        })
    }

    console.log('Dummy transactions seeded!')
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
