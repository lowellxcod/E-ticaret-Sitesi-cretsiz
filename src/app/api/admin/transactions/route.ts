import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

// const prisma = new PrismaClient(); removed to use local instance

export async function GET(req: Request) {
    try {
        const prisma = new PrismaClient();
        const session = await getServerSession(authOptions);
        const adminEmail = process.env.ADMIN_EMAIL;

        // if (!session || session.user?.email !== adminEmail) {
        //     return new NextResponse("Unauthorized", { status: 401 });
        // }

        const transactions = await prisma.paymentTransaction.findMany({
            include: {
                order: {
                    select: {
                        id: true,
                        customerName: true,
                        customerEmail: true,
                        customerPhone: true,
                        shippingAddress: true,
                        status: true,
                        total: true,
                        paymentId: true,
                        createdAt: true,
                        items: {
                            include: {
                                product: {
                                    select: { name: true, image: true }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        console.log(`[ADMIN_TRANSACTIONS] Fetched ${transactions.length} transactions`);
        return NextResponse.json(transactions);
    } catch (error) {
        console.error("[ADMIN_TRANSACTIONS_GET]", error);
        return new NextResponse("Internal error: " + (error as Error).message, { status: 500 });
    }
}
