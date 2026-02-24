import { Resend } from 'resend';
import { InvoiceEmail } from '../components/emails/InvoiceEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendInvoiceEmail = async (
    email: string,
    orderData: any
) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'ElectroNova <onboarding@resend.dev>', // Replace with your domain in production
            to: [email],
            subject: `ElectroNova - Sipariş Onay # ${orderData.orderId}`,
            react: InvoiceEmail({ orderData }),
        });

        if (error) {
            console.error('Mail Error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Mail Error:', error);
        return { success: false, error };
    }
};
