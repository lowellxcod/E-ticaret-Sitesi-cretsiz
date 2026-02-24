import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import db from "@/lib/db";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const user = await db.user.findUnique({
            where: { email: session.user.email },
            select: {
                points: true,
                loyaltyTransactions: {
                    orderBy: { createdAt: 'desc' },
                    take: 10
                }
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        return new NextResponse("Error fetching loyalty data", { status: 500 });
    }
}
