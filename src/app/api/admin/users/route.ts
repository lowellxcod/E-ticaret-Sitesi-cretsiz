import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const adminEmail = process.env.ADMIN_EMAIL;

        if (!session || session.user?.email !== adminEmail) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const users = await db.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                // Do not select password
            }
        });

        // Manual count to safely handle potential Prisma Client sync issues
        // Since we know the Order model has a userId field
        const orderCounts = await db.order.groupBy({
            by: ['userId'],
            _count: {
                id: true
            },
            where: {
                userId: { not: null }
            }
        });

        // Create a map for O(1) lookup
        const countMap: Record<string, number> = {};
        orderCounts.forEach((item: any) => {
            if (item.userId) {
                countMap[item.userId] = item._count.id;
            }
        });

        // Merge count into user objects
        const usersWithCount = users.map((user: any) => ({
            ...user,
            _count: {
                orders: countMap[user.id] || 0
            }
        }));

        return NextResponse.json(usersWithCount);
    } catch (error) {
        console.error("[ADMIN_USERS_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
