import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { code } = await req.json();

        if (!code) {
            return new NextResponse("Code Required", { status: 400 });
        }

        const coupon = await db.coupon.findUnique({
            where: { code: code.toUpperCase() }
        });

        if (!coupon) {
            return new NextResponse("Geçersiz Kupon", { status: 404 });
        }

        if (!coupon.isActive) {
            return new NextResponse("Kupon Aktif Değil", { status: 400 });
        }

        if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
            return new NextResponse("Kupon Süresi Dolmuş", { status: 400 });
        }

        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
            return new NextResponse("Kupon Kullanım Limiti Dolmuş", { status: 400 });
        }

        return NextResponse.json(coupon);
    } catch (error) {
        console.error("[COUPON_VALIDATE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
