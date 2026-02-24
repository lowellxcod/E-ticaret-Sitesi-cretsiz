import { NextResponse } from 'next/server';
import { getPayTRToken } from '@/lib/paytr';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/db";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { totalAmount, basket, cartItems, user_address, user_phone, billingAddress, taxNumber, taxOffice, isCorporate } = body;

        // 1. Find User
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        // 2. Create Order in Database (PENDING)
        const order = await prisma.order.create({
            data: {
                userId: user.id,
                total: parseFloat(totalAmount),
                status: "PENDING",
                invoiceStatus: "PENDING",
                shippingAddress: user_address,
                billingAddress: billingAddress || user_address,
                customerPhone: user_phone,
                customerEmail: user.email,
                customerName: user.name,
                isCorporate: isCorporate || false,
                taxNumber: isCorporate ? taxNumber : null,
                taxOffice: isCorporate ? taxOffice : null,
                items: {
                    create: cartItems.map((item: any) => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        });

        // 3. Get User IP (Placeholder for localhost)
        const user_ip = '127.0.0.1';

        // 4. Get PayTR Token using the REAL Order ID from DB
        const result = await getPayTRToken(
            user_ip,
            order.id, // Use Prisma Order ID
            parseFloat(totalAmount),
            basket,
            user.email,
            user.name || "Müşteri",
            user_address,
            user_phone,
            billingAddress || user_address,
            taxNumber || "",
            taxOffice || "",
            isCorporate || false
        );

        if (result.success) {
            return NextResponse.json({ token: result.token, orderId: order.id });
        } else {
            return NextResponse.json({ error: result.reason }, { status: 400 });
        }

    } catch (error) {
        console.error("PayTR Route Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
