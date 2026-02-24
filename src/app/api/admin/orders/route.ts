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

        // In a real app, check for ADMIN role here
        // if (session.user.role !== 'ADMIN') ...

        const orders = await db.order.findMany({
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error("[ADMIN_ORDERS_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const adminEmail = process.env.ADMIN_EMAIL;

        if (!session || session.user?.email !== adminEmail) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { orderId, status } = body;

        if (!orderId || !status) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        const order = await db.order.update({
            where: { id: orderId },
            data: { status }
        });

        // Send WhatsApp Notification
        if (order.customerPhone && order.customerName) {
            try {
                const { whatsappService } = await import('@/lib/whatsapp');
                await whatsappService.sendOrderNotification(
                    order.customerPhone,
                    order.customerName,
                    order.id,
                    status
                );
            } catch (err) {
                console.error("WhatsApp Notification Failed:", err);
            }
        }

        return NextResponse.json(order);
    } catch (error) {
        console.error("[ADMIN_ORDERS_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
