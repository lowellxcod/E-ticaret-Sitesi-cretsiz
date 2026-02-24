import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';

interface InvoiceEmailProps {
    orderData: {
        orderId: string;
        date: string;
        customerName: string;
        items: Array<{
            name: string;
            price: string;
            quantity: number;
            image: string;
        }>;
        totalAmount: string;
        shippingAddress: string;
    };
}

export const InvoiceEmail = ({
    orderData,
}: InvoiceEmailProps) => {
    const { orderId, date, customerName, items, totalAmount, shippingAddress } = orderData;

    return (
        <Html>
            <Head />
            <Preview>ElectroNova Sipariş Onayı - #{orderId}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={header}>
                        <Heading style={heading}>ELEKTRONOVA</Heading>
                        <Text style={subheading}>NEXUS OS // FATURA DETAYI</Text>
                    </Section>

                    <Section style={content}>
                        <Text style={paragraph}>Merhaba {customerName},</Text>
                        <Text style={paragraph}>
                            Siparişiniz başarıyla alındı ve Nexus sistemlerimize kaydedildi. Oyun dünyasına adım atmanız için hazırlıklara başladık!
                        </Text>

                        <Section style={orderInfoSection}>
                            <Row>
                                <Column>
                                    <Text style={infoLabel}>SİPARİŞ NO</Text>
                                    <Text style={infoValue}>#{orderId}</Text>
                                </Column>
                                <Column>
                                    <Text style={infoLabel}>TARİH</Text>
                                    <Text style={infoValue}>{date}</Text>
                                </Column>
                            </Row>
                        </Section>

                        <Hr style={hr} />

                        <Section style={itemsSection}>
                            {items.map((item, index) => (
                                <Row key={index} style={itemRow}>
                                    <Column style={{ width: '60px' }}>
                                        <Img
                                            src={item.image}
                                            width="50"
                                            height="50"
                                            alt={item.name}
                                            style={itemImage}
                                        />
                                    </Column>
                                    <Column>
                                        <Text style={itemName}>{item.name}</Text>
                                        <Text style={itemDetails}>{item.quantity} Adet</Text>
                                    </Column>
                                    <Column align="right">
                                        <Text style={itemPrice}>{item.price} TL</Text>
                                    </Column>
                                </Row>
                            ))}
                        </Section>

                        <Hr style={hr} />

                        <Section style={totalSection}>
                            <Row>
                                <Column>
                                    <Text style={totalLabel}>TOPLAM TUTAR</Text>
                                </Column>
                                <Column align="right">
                                    <Text style={totalValue}>{totalAmount} TL</Text>
                                </Column>
                            </Row>
                        </Section>

                        <Section style={shippingSection}>
                            <Text style={infoLabel}>TESLİMAT ADRESİ</Text>
                            <Text style={shippingValue}>{shippingAddress}</Text>
                        </Section>

                        <Text style={footerText}>
                            Sorularınız için bizimle <Link href="https://wa.me/905000000000" style={link}>WhatsApp Destek</Link> üzerinden iletişime geçebilirsiniz.
                        </Text>
                    </Section>

                    <Section style={bottom}>
                        <Text style={legalText}>
                            © 2024 ElectroNova. Tüm hakları saklıdır. Nexus Gaming Ecosystem v2.4
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

const main = {
    backgroundColor: '#050505',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '40px 20px',
    width: '600px',
    border: '1px solid #1a1a1a',
    borderRadius: '24px',
    backgroundColor: '#0a0a0a',
};

const header = {
    textAlign: 'center' as const,
    paddingBottom: '40px',
};

const heading = {
    color: '#a855f7',
    fontSize: '32px',
    fontWeight: '900',
    letterSpacing: '-0.05em',
    margin: '0',
};

const subheading = {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '10px',
    fontWeight: '900',
    letterSpacing: '0.2em',
    margin: '8px 0 0',
};

const content = {
    padding: '0 20px',
};

const paragraph = {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '14px',
    lineHeight: '24px',
};

const orderInfoSection = {
    marginTop: '32px',
    backgroundColor: 'rgba(168, 85, 247, 0.05)',
    padding: '16px',
    borderRadius: '16px',
    border: '1px solid rgba(168, 85, 247, 0.1)',
};

const infoLabel = {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '10px',
    fontWeight: '800',
    letterSpacing: '0.1em',
    margin: '0',
};

const infoValue = {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '700',
    margin: '4px 0 0',
};

const hr = {
    borderTop: '1px solid #1a1a1a',
    margin: '32px 0',
};

const itemsSection = {
    marginTop: '0',
};

const itemRow = {
    marginBottom: '16px',
};

const itemImage = {
    borderRadius: '12px',
    border: '1px solid #1a1a1a',
};

const itemName = {
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '700',
    margin: '0',
};

const itemDetails = {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '12px',
    margin: '4px 0 0',
};

const itemPrice = {
    color: '#a855f7',
    fontSize: '14px',
    fontWeight: '700',
    margin: '0',
};

const totalSection = {
    marginTop: '0',
};

const totalLabel = {
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: '800',
    margin: '0',
};

const totalValue = {
    color: '#a855f7',
    fontSize: '24px',
    fontWeight: '900',
    margin: '0',
};

const shippingSection = {
    marginTop: '32px',
    padding: '16px',
    backgroundColor: '#050505',
    borderRadius: '16px',
    border: '1px solid #1a1a1a',
};

const shippingValue = {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '12px',
    lineHeight: '20px',
    margin: '8px 0 0',
};

const footerText = {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: '12px',
    textAlign: 'center' as const,
    marginTop: '64px',
};

const link = {
    color: '#a855f7',
    textDecoration: 'none',
};

const bottom = {
    textAlign: 'center' as const,
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '1px solid #1a1a1a',
};

const legalText = {
    color: 'rgba(255, 255, 255, 0.2)',
    fontSize: '10px',
    letterSpacing: '0.05em',
};
