import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const orderId = searchParams.get('orderId');
        const email = searchParams.get('email');

        if (!orderId || !email) {
            return new NextResponse("Sipariş numarası ve e-posta gereklidir.", { status: 400 });
        }

        const prisma = new PrismaClient();

        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            },
            include: {
                user: true, // Fetch user to check email if needed
                items: {
                    include: {
                        product: {
                            select: { name: true, image: true }
                        }
                    }
                }
            }
        });

        if (!order) {
            return new NextResponse("Sipariş bulunamadı veya bilgiler eşleşmiyor.", { status: 404 });
        }

        // Logic to verify email
        let isAuthorized = false;

        // 1. Check direct customer email
        if (order.customerEmail && order.customerEmail.toLowerCase() === email.toLowerCase()) {
            isAuthorized = true;
        }

        // 2. Check linked user email
        if (!isAuthorized && order.user && order.user.email.toLowerCase() === email.toLowerCase()) {
            isAuthorized = true;
        }

        if (!isAuthorized) {
            return new NextResponse("Sipariş bulunamadı veya bilgiler eşleşmiyor.", { status: 404 });
        }

        // Return safe public data
        return NextResponse.json({
            id: order.id,
            status: order.status,
            total: order.total,
            createdAt: order.createdAt,
            items: order.items,
        });

    } catch (error) {
        console.error("Tracking API Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
