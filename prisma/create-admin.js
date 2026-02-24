const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    const adminEmail = 'admin@electronova.com';
    const adminPassword = 'admin123'; // Default password for initial setup

    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail }
    });

    if (existingAdmin) {
        console.log(`Admin user with email ${adminEmail} already exists.`);
        if (existingAdmin.role !== 'ADMIN') {
            await prisma.user.update({
                where: { email: adminEmail },
                data: { role: 'ADMIN' }
            });
            console.log(`Role updated to ADMIN for ${adminEmail}.`);
        }
    } else {
        console.log(`Creating admin user: ${adminEmail}`);
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await prisma.user.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
                name: 'ElectroNova Admin',
                role: 'ADMIN',
            }
        });
        console.log(`Admin user created! Password: ${adminPassword}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
