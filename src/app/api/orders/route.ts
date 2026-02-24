import { NextResponse } from 'next/server';
import { sendEmail, sendWhatsApp } from '@/lib/automations';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { items, customer, total } = body;

        // 1. Save to DB (Prisma placeholder)
        const orderId = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();

        // 2. Trigger Automations (Faz 1: Sipariş Onayı)
        await sendEmail(customer.email, 'OrderConfirmation', {
            orderNumber: orderId,
            customerName: customer.name,
            totalAmount: total,
            items: items.map((item: any) => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image || 'https://images.unsplash.com/photo-1542487354-feaf934a6acc?auto=format&fit=crop&q=80&w=800'
            })),
            shippingAddress: customer.address
        });

        await sendWhatsApp(customer.phone, `*ElectroNova:* Siparişiniz alındı! ✅\n\nSipariş No: #${orderId}\n\nDonanımlarınız hazırlanıyor. Destek hattımız: https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '905000000000'}`);

        return NextResponse.json({ success: true, orderId });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Order processing failed' }, { status: 500 });
    }
}
