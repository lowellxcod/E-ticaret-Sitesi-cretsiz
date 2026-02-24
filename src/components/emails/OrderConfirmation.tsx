import React from 'react';

interface OrderConfirmationProps {
    orderNumber: string;
    customerName: string;
    totalAmount: string;
    items: { name: string; price: string }[];
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
    orderNumber,
    customerName,
    totalAmount,
    items
}) => (
    <div style={{
        backgroundColor: '#050505',
        color: '#ffffff',
        fontFamily: 'sans-serif',
        padding: '40px',
        maxWidth: '600px',
        margin: '0 auto',
        borderRadius: '24px',
        border: '1px solid #1a1a1a'
    }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ color: '#a855f7', fontSize: '32px', margin: 0, fontWeight: '900', textTransform: 'uppercase' }}>ElectroNova</h1>
            <p style={{ color: '#94a3b8', fontSize: '12px', letterSpacing: '2px' }}>Geleceğin Teknolojisi, Bugün Seninle.</p>
        </div>

        <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 10px 0' }}>SİPARİŞİN ALINDI! 🚀</h2>
            <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.5' }}>
                Merhaba {customerName}, siparişin başarıyla oluşturuldu. Donanımların en kısa sürede cephaneliğinde olacak!
            </p>
        </div>

        <div style={{ backgroundColor: '#111', padding: '24px', borderRadius: '16px', marginBottom: '40px' }}>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 10px 0', fontWeight: 'bold' }}>SİPARİŞ NO: #{orderNumber}</p>
            <div style={{ borderTop: '1px solid #222', paddingTop: '10px' }}>
                {items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                        <span>{item.name}</span>
                        <span style={{ fontWeight: 'bold' }}>{item.price} TL</span>
                    </div>
                ))}
            </div>
            <div style={{ borderTop: '1px solid #a855f7', marginTop: '10px', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: '900', fontSize: '20px' }}>
                <span>TOPLAM</span>
                <span style={{ color: '#a855f7' }}>{totalAmount} TL</span>
            </div>
        </div>

        <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>
                Sipariş durumunu hesabından takip edebilirsin.
            </p>
            <a href="#" style={{
                backgroundColor: '#a855f7',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: 'bold',
                display: 'inline-block'
            }}>Sipariş Takibi</a>
        </div>
    </div>
);
