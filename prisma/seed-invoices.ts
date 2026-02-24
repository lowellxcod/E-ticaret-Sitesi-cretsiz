
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding mock orders for invoicing...');

    // 1. Ensure user exists
    const user = await prisma.user.upsert({
        where: { email: 'mock@musteri.com' },
        update: {},
        create: {
            email: 'mock@musteri.com',
            name: 'Ahmet Yılmaz',
            role: 'USER',
            password: 'mockpassword123' // Add required field if necessary
        },
    });

    // 2. Ensure product exists (Crucial for Foreign Key)
    const product = await prisma.product.upsert({
        where: { slug: 'mock-product-test' },
        update: {},
        create: {
            name: "Mock Product for Testing",
            slug: "mock-product-test",
            description: "This is a test product.",
            price: 1250.00,
            image: "https://placehold.co/400",
            stock: 50,
            categorySlug: "klavyeler", // Must be a valid category!
            category: "Klavyeler"      // Just a string label usually
        }
    });

    // 3. Create Orders
    // Note: If 'invoiceStatus' is not in the generated client yet, we might need to omit it or ensure 'prisma generate' ran.
    // Using explicit types or ignoring TS errors if the field exists in DB but not client types.

    // Order 1: Individual
    await prisma.order.create({
        data: {
            userId: user.id,
            total: 1250.00,
            status: 'PAID',
            // @ts-ignore: Ignoring potential TS error if client isn't fully synced, but field likely exists in DB
            invoiceStatus: 'PENDING',
            customerName: 'Ahmet Yılmaz',
            customerEmail: 'ahmet@gmail.com',
            customerPhone: '0555 123 45 67',
            shippingAddress: 'Merkez Mah. Atatürk Cad. No:5 D:3, Kadıköy / İstanbul',
            billingAddress: 'Merkez Mah. Atatürk Cad. No:5 D:3, Kadıköy / İstanbul',
            isCorporate: false,
            items: {
                create: [
                    { productId: product.id, quantity: 1, price: 1250.00 }
                ]
            }
        }
    });

    // Order 2: Corporate
    await prisma.order.create({
        data: {
            userId: user.id,
            total: 25000.00,
            status: 'PAID',
            // @ts-ignore
            invoiceStatus: 'PENDING',
            customerName: 'Mehmet Öz',
            customerEmail: 'mehmet@sirket.com',
            customerPhone: '0532 987 65 43',
            shippingAddress: 'Organize Sanayi Bölgesi 1. Cadde No:10, Nilüfer / Bursa',
            billingAddress: 'Organize Sanayi Bölgesi 1. Cadde No:10, Nilüfer / Bursa',
            isCorporate: true,
            taxNumber: '1234567890',
            taxOffice: 'Çekirge Vergi Dairesi',
            items: {
                create: [
                    { productId: product.id, quantity: 2, price: 12500.00 }
                ]
            }
        }
    });

    console.log('✅ Mock orders created successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
