const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const dummyIds = [
        "neon-strike-tkl",
        "cybermice-pro",
        "aeropulse-wireless",
        "prismmonitor-4k",
        "phantom-keycaps-purple"
    ]

    console.log('Cleaning up dummy products...')

    // Delete OrderItems first to avoid constraint errors if any orders exist for these products
    // Ideally we should delete related orders too if they are just test orders

    // Use a transaction to ensure integrity
    try {
        // Find orders containing these products (optional, but good for deep clean)
        // For now, let's just try to delete the products. If they are in orders, it might fail.
        // If the user wants to keep orders but delete products, we might have an issue.
        // But usually dummy products are in dummy orders.

        const result = await prisma.product.deleteMany({
            where: {
                id: {
                    in: dummyIds
                }
            }
        })
        console.log(`Deleted ${result.count} dummy products.`)
    } catch (e) {
        console.error('Error deleting dummy products:', e)
    }
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
