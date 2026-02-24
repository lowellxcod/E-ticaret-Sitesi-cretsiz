import { sendInvoiceEmail } from './mail';

export const sendEmail = async (to: string, template: string, data: any) => {
    if (template === 'OrderConfirmation') {
        const orderData = {
            orderId: data.orderNumber,
            date: new Date().toLocaleDateString('tr-TR'),
            customerName: data.customerName,
            items: data.items,
            totalAmount: data.totalAmount,
            shippingAddress: data.shippingAddress || 'Adres bilgisi girilmemiş.'
        };
        return await sendInvoiceEmail(to, orderData);
    }
    console.log(`[Email Automation] Sending ${template} to ${to}`, data);
};

/* export const sendSMS = async (phone: string, message: string) => {
    console.log(`[SMS Automation] Sending to ${phone}: ${message}`);
    // Abandoned due to cost
}; */

export const sendWhatsApp = async (phone: string, message: string) => {
    console.log(`[WhatsApp Automation] Sending to ${phone}: ${message}`);
    // Future integration: WhatsApp Business API (Twilio/360dialog)
};

export const trackInventory = (productId: string, currentStock: number) => {
    if (currentStock < 5) {
        console.log(`[Inventory Alert] Product ${productId} is low on stock: ${currentStock}`);
        // Trigger admin notification
    }
};
