const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const products = await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            slug: true
        }
    })

    console.log('--- Product List ---')
    products.forEach((p: any) => {
        console.log(`${p.id} | ${p.name} | ${p.slug}`)
    })
    console.log('--------------------')
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

export { }
