import React from 'react';

interface ShippingNotificationProps {
    orderNumber: string;
    customerName: string;
    trackingNumber: string;
    trackingLink: string;
}

export const ShippingNotification: React.FC<ShippingNotificationProps> = ({
    orderNumber,
    customerName,
    trackingNumber,
    trackingLink
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
        </div>

        <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 10px 0' }}>PAKETİN YOLA ÇIKTI! 🚚</h2>
            <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.5' }}>
                Harika haber {customerName}! #{orderNumber} nolu siparişin kargoya verildi. Çok yakında elinde olacak.
            </p>
        </div>

        <div style={{ backgroundColor: '#111', padding: '24px', borderRadius: '16px', marginBottom: '40px' }}>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 10px 0', fontWeight: 'bold' }}>TAKİP NUMARASI:</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#a855f7', margin: 0 }}>{trackingNumber}</p>
        </div>

        <div style={{ textAlign: 'center' }}>
            <a href={trackingLink} style={{
                backgroundColor: '#a855f7',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: 'bold',
                display: 'inline-block'
            }}>Kargomu Takip Et</a>
        </div>
    </div>
);
