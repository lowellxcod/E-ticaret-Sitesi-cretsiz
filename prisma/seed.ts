import { PrismaClient } from '@prisma/client'
import { products } from '../src/data/products'
import { mainCategories } from '../src/data/categories'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding started...')

    // Clear existing data
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()

    // Seed Categories
    console.log('Seeding categories...')
    for (const cat of mainCategories) {
        await prisma.category.create({
            data: {
                name: cat.name,
                slug: cat.slug,
                subCategories: cat.subCategories as any,
            },
        })
    }

    // Seed Products
    console.log('Seeding products...')
    for (const p of products) {
        await prisma.product.create({
            data: {
                id: p.id,
                slug: p.slug,
                name: p.name,
                description: p.description,
                price: p.price,
                image: p.image,
                gallery: p.gallery,
                category: p.category,
                categorySlug: p.categorySlug,
                subCategorySlug: p.subCategorySlug,
                specs: p.specs as any,
                stock: 100,
                featured: false,
            },
        })
    }

    console.log('Seeding finished successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
