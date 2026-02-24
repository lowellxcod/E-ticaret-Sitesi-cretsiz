import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const transactions = await prisma.paymentTransaction.findMany({
        include: { order: true }
    })

    console.log('--- DB Transaction Check ---')
    console.log(`Total Transactions: ${transactions.length}`)
    transactions.forEach(t => {
        console.log(`ID: ${t.id} | Amount: ${t.totalAmount} | Status: ${t.status} | Order: ${t.order?.customerName}`)
    })
    console.log('----------------------------')
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
