import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const prisma = new PrismaClient();

        // Find user by email to get ID
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        const orders = await prisma.order.findMany({
            where: {
                userId: user.id
            },
            include: {
                items: {
                    include: {
                        product: {
                            select: { name: true, image: true }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error("Error fetching user orders:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
