import crypto from 'crypto';

interface PayTRConfig {
    merchant_id: string;
    merchant_key: string;
    merchant_salt: string;
    debug_on: number;
    no_installment: number;
    max_installment: number;
    timeout_limit: number;
    test_mode: number;
}

const paytrConfig: PayTRConfig = {
    merchant_id: process.env.PAYTR_MERCHANT_ID || '',
    merchant_key: process.env.PAYTR_MERCHANT_KEY || '',
    merchant_salt: process.env.PAYTR_MERCHANT_SALT || '',
    debug_on: 1,
    no_installment: 0,
    max_installment: 0,
    timeout_limit: 30,
    test_mode: 1 // 1 for Test Mode, 0 for Production
};

export const getPayTRToken = async (
    user_ip: string,
    orderId: string,
    paymentAmount: number, // In standard units (e.g. 100.00 TL)
    basket: any[],
    user_email: string,
    user_name: string,
    user_address: string,
    user_phone: string,
    billingAddress: string,
    taxNumber: string,
    taxOffice: string,
    isCorporate: boolean
) => {
    try {
        const { merchant_id, merchant_key, merchant_salt, debug_on, no_installment, max_installment, timeout_limit, test_mode } = paytrConfig;

        const currency = 'TL';
        // PayTR expects amount multiplied by 100 (e.g. 9.99 -> 999)
        const payment_amount = paymentAmount * 100;
        const merchant_oid = orderId;
        const user_basket = JSON.stringify(basket);
        const merchant_ok_url = `${process.env.NEXTAUTH_URL}/api/payment/paytr/callback?status=success`;
        const merchant_fail_url = `${process.env.NEXTAUTH_URL}/api/payment/paytr/callback?status=fail`;

        // Generate PayTR Token
        const concatString = `${merchant_id}${user_ip}${merchant_oid}${user_email}${payment_amount}${user_basket}${no_installment}${max_installment}${currency}${test_mode}`;

        const token = crypto.createHmac('sha256', merchant_key).update(concatString + merchant_salt).digest('base64');

        const params = new URLSearchParams();
        params.append('merchant_id', merchant_id);
        params.append('user_ip', user_ip);
        params.append('merchant_oid', merchant_oid);
        params.append('email', user_email);
        params.append('payment_amount', payment_amount.toString());
        params.append('paytr_token', token);
        params.append('user_basket', user_basket);
        params.append('debug_on', debug_on.toString());
        params.append('no_installment', no_installment.toString());
        params.append('max_installment', max_installment.toString());
        params.append('user_name', user_name);
        params.append('user_address', user_address);
        params.append('user_phone', user_phone);
        params.append('merchant_ok_url', merchant_ok_url);
        params.append('merchant_fail_url', merchant_fail_url);
        params.append('timeout_limit', timeout_limit.toString());
        params.append('currency', currency);
        params.append('test_mode', test_mode.toString());

        const response = await fetch('https://www.paytr.com/odeme/api/get-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        const data = await response.json();

        if (data.status === 'success') {
            return { success: true, token: data.token };
        } else {
            return { success: false, reason: data.reason };
        }

    } catch (error) {
        console.error('PayTR Token Error:', error);
        return { success: false, error };
    }
};
