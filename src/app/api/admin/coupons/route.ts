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

        const coupons = await db.coupon.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(coupons);
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const adminEmail = process.env.ADMIN_EMAIL;

        if (!session || session.user?.email !== adminEmail) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { code, type, value, minAmount, usageLimit } = body;

        // Validations
        if (!code || !type || !value) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        const coupon = await db.coupon.create({
            data: {
                code: code.toUpperCase(),
                type,
                value: parseFloat(value),
                minAmount: minAmount ? parseFloat(minAmount) : null,
                usageLimit: usageLimit ? parseInt(usageLimit) : null,
                isActive: true
            }
        });

        return NextResponse.json(coupon);

    } catch (error) {
        console.error("[COUPONS_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const adminEmail = process.env.ADMIN_EMAIL;

        if (!session || session.user?.email !== adminEmail) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return new NextResponse("Missing ID", { status: 400 });
        }

        await db.coupon.delete({
            where: { id }
        });

        return new NextResponse("Deleted", { status: 200 });

    } catch (error) {
        console.error("[COUPONS_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
