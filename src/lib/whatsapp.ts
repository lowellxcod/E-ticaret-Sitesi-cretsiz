
interface WhatsAppMessage {
    phone: string;
    message: string;
}

export class WhatsAppService {
    private static instance: WhatsAppService;
    // In a real scenario, this would use an API like Twilio or Meta Business API
    // distinct from the "click to chat" links. 
    // Since we don't have credentials, we'll mock the 'sending' logic 
    // but structure it so it can be easily swapped.

    private constructor() { }

    public static getInstance(): WhatsAppService {
        if (!WhatsAppService.instance) {
            WhatsAppService.instance = new WhatsAppService();
        }
        return WhatsAppService.instance;
    }

    public async sendOrderNotification(phone: string, customerName: string, orderId: string, status: string) {
        // Format phone number (remove spaces, ensure country code)
        // Assuming TR numbers for this project context if not provided
        let formattedPhone = phone.replace(/\s+/g, '').replace(/[^0-9]/g, '');
        if (!formattedPhone.startsWith('90') && formattedPhone.length === 10) {
            formattedPhone = '90' + formattedPhone;
        }

        let message = '';
        const shopName = "ElectroNova";

        switch (status) {
            case 'PENDING':
                message = `Selam ${customerName}! 👋 ${shopName}'dan harika bir seçim yapmışsın. Siparişin (#${orderId}) şu an onay bekliyor. Her şey yolunda gittiğinde seni hemen haberdar edeceğiz, beklemede kal! ✨⏳`;
                break;
            case 'PAID':
                message = `Müjde ${customerName}! 🚀 Ödemen başarıyla onaylandı. Siparişin (#${orderId}) hazırlık aşamasına geçti bile! Ekibimiz ürünlerini sevgiyle paketlemek için sabırsızlanıyor. En kısa sürede yola çıkaracağız! 🛠️📦`;
                break;
            case 'SHIPPED':
                message = `Heyecanlı haber ${customerName}! 🚚 Siparişin (#${orderId}) yola çıktı, sana doğru hızla geliyor! Kargonun her adımını sitemizdeki takip panelinden izleyebilirsin. Şimdiden iyi günlerde kullan! 📦✨`;
                break;
            case 'DELIVERED':
                message = `Ve beklenen an geldi! 🎉 Siparişin (#${orderId}) sana ulaştı. Bizi tercih ettiğin için kocaman teşekkürler! ❤️ Ürününü çok seveceğinden eminiz. 

Eğer bir sorun olursa hiç çekinme, destek hattımız (0850 123 45 67) veya sitemizdeki destek merkezi üzerinden bize ulaşabilirsin. 💬 

Müsait olduğunda ürün sayfasından bir değerlendirme bırakırsan bizi çok mutlu edersin! ⭐ Ürünlerini güle güle kullan! ✨`;
                break;
            case 'CANCELLED':
                message = `Merhaba ${customerName}, siparişin (#${orderId}) ile ilgili üzücü bir güncelleme var: Siparişin maalesef iptal edildi. 😔 Bir yanlışlık olduğunu düşünüyorsan hemen bizimle iletişime geçebilirsin. Yardımcı olmak için buradayız! 🛡️`;
                break;
            default:
                message = `Merhaba! Siparişin (#${orderId}) durumu güncellendi: ${status}. Detaylar için sitemizi ziyaret edebilirsin. ✨`;
        }

        return this.sendMessage({ phone: formattedPhone, message });
    }

    private async sendMessage({ phone, message }: WhatsAppMessage) {
        // MOCK IMPLEMENTATION
        // In reality, you'd fetch("https://api.twilio.com/...") or similar.
        console.log(`[WHATSAPP_MOCK] Sending to ${phone}: ${message}`);

        // Simulating API latency
        await new Promise(resolve => setTimeout(resolve, 500));

        return { success: true, to: phone, message };
    }
}

export const whatsappService = WhatsAppService.getInstance();
