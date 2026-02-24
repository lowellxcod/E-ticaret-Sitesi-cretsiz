import { NextResponse } from 'next/server';
import crypto from 'crypto';
import db from '@/lib/db';
import { sendEmail, sendWhatsApp } from '@/lib/automations';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const merchant_oid = formData.get('merchant_oid') as string;
        const status = formData.get('status') as string;
        const total_amount = formData.get('total_amount') as string;
        const hash = formData.get('hash') as string;

        // Verify Hash (Security Check)
        const paytrKey = process.env.PAYTR_MERCHANT_KEY || '';
        const paytrSalt = process.env.PAYTR_MERCHANT_SALT || '';

        // In pro, verify hash here using crypto

        // Find the order
        const order = await db.order.findUnique({
            where: { id: merchant_oid }
        });

        if (!order) {
            console.error(`[PayTR] Order not found for merchant_oid: ${merchant_oid}`);
            return new NextResponse("OK", { status: 200 }); // PayTR expects 200 OK even if logic fails
        }

        // Log the transaction
        await db.paymentTransaction.create({
            data: {
                orderId: order.id,
                merchantOid: merchant_oid,
                status: status,
                totalAmount: total_amount,
                details: Object.fromEntries(formData.entries()), // Log everything
            }
        });

        if (status === 'success') {
            console.log(`[PayTR] Payment Successful for Order #${merchant_oid}`);

            // 1. Update Order Status
            await db.order.update({
                where: { id: merchant_oid },
                data: {
                    status: 'PAID',
                    paymentId: merchant_oid
                }
            });

            // 2. Award Loyalty Points (if user is logged in)
            if (order.userId) {
                const pointsEarned = Math.floor(parseFloat(total_amount) / 10);
                if (pointsEarned > 0) {
                    await db.$transaction([
                        db.user.update({
                            where: { id: order.userId },
                            data: { points: { increment: pointsEarned } }
                        }),
                        db.loyaltyTransaction.create({
                            data: {
                                userId: order.userId,
                                amount: pointsEarned,
                                type: 'EARN',
                                orderId: order.id,
                                description: `Sipariş #${order.id} için kazanılan ödül puanı`
                            }
                        })
                    ]);
                    console.log(`[Loyalty] User ${order.userId} earned ${pointsEarned} points.`);
                }
            }

            // 3. Trigger Automations (Email, etc.)
            // await sendEmail(...)

            return new NextResponse("OK", { status: 200 });
        } else {
            console.log(`[PayTR] Payment Failed for Order #${merchant_oid}`);

            // Optional: Update order to CANCELLED or PAYMENT_FAILED
            await db.order.update({
                where: { id: merchant_oid },
                data: { status: 'CANCELLED' } // Or keep pending/failed
            });

            return new NextResponse("OK", { status: 200 });
        }
    } catch (error) {
        console.error("PayTR Callback Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
