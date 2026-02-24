export interface SubCategory {
    name: string;
    slug: string;
}

export interface Category {
    name: string;
    slug: string;
    icon?: string;
    subCategories: SubCategory[];
    description?: string;
    color?: string;
}

export const mainCategories: Category[] = [
    {
        name: "Klavyeler",
        slug: "keyboards",
        subCategories: [
            { name: "Mekanik Klavyeler", slug: "mechanical-keyboards" },
            { name: "Kablosuz Klavyeler", slug: "wireless-keyboards" },
            { name: "RGB Klavyeler", slug: "rgb-keyboards" },
            { name: "60% Klavyeler (Compact)", slug: "sixty-percent-keyboards" },
            { name: "TKL Klavyeler (Tenkeyless)", slug: "tkl-keyboards" },
            { name: "Full Size Klavyeler", slug: "full-size-keyboards" },
            { name: "Oyuncu Klavyeleri", slug: "gaming-keyboards" },
            { name: "Ofis Klavyeleri", slug: "office-keyboards" },
            { name: "Beyaz/Pembe/Pastel Klavyeler", slug: "aesthetic-keyboards" },
        ],
    },
    {
        name: "Fareler",
        slug: "mice",
        subCategories: [
            { name: "Gaming Mouse", slug: "gaming-mice" },
            { name: "Kablosuz Mouse", slug: "wireless-mice" },
            { name: "RGB Mouse", slug: "rgb-mice" },
            { name: "Ergonomik Mouse", slug: "ergonomic-mice" },
            { name: "Hafif Mouse (Under 80g)", slug: "lightweight-mice" },
            { name: "MMO Mouse (Çok Tuşlu)", slug: "mmo-mice" },
            { name: "FPS Mouse", slug: "fps-mice" },
            { name: "Beyaz/Pembe Mouse", slug: "aesthetic-mice" },
            { name: "Mouse Bungee", slug: "mouse-bungee" },
        ],
    },
    {
        name: "Kulaklıklar",
        slug: "headsets",
        subCategories: [
            { name: "Gaming Kulaklık", slug: "gaming-headsets" },
            { name: "Kablosuz Kulaklık", slug: "wireless-headsets" },
            { name: "RGB Kulaklık", slug: "rgb-headsets" },
            { name: "Kedi Kulaklı Headset 🐱", slug: "cat-ear-headsets" },
            { name: "7.1 Surround Kulaklık", slug: "surround-headsets" },
            { name: "Earbuds / TWS", slug: "earbuds" },
            { name: "Mikrofonlu Kulaklık", slug: "headsets-with-mic" },
            { name: "Gürültü Önleyici", slug: "noise-cancelling" },
        ],
    },
    {
        name: "Monitörler",
        slug: "monitors",
        subCategories: [
            { name: "Gaming Monitör (144Hz+)", slug: "gaming-monitors" },
            { name: "4K Monitör", slug: "four-k-monitors" },
            { name: "Ultrawide Monitör", slug: "ultrawide-monitors" },
            { name: "Portable Monitör", slug: "portable-monitors" },
            { name: "Curved Monitör", slug: "curved-monitors" },
            { name: "Monitör Kolları", slug: "monitor-arms" },
        ],
    },
    {
        name: "Keycaps",
        slug: "keycaps",
        subCategories: [
            { name: "Spider/Örümcek Keycaps 🕷️", slug: "spider-keycaps" },
            { name: "Artisan Keycaps (Reçine)", slug: "artisan-keycaps" },
            { name: "Anime Keycaps", slug: "anime-keycaps" },
            { name: "Kawaii Keycaps (Ayıcık, Tavşan)", slug: "kawaii-keycaps" },
            { name: "PBT Keycap Setleri", slug: "pbt-keycaps" },
            { name: "ABS Keycap Setleri", slug: "abs-keycaps" },
            { name: "Pastel Keycaps", slug: "pastel-keycaps" },
            { name: "Neon Keycaps", slug: "neon-keycaps" },
            { name: "Custom Keycaps", slug: "custom-keycaps" },
        ],
    },
    {
        name: "Mousepad",
        slug: "mousepads",
        subCategories: [
            { name: "XXL Desk Mat", slug: "xxl-desk-mats" },
            { name: "RGB Mousepad", slug: "rgb-mousepads" },
            { name: "Anime Desk Mat", slug: "anime-desk-mats" },
            { name: "Pastel Desk Mat", slug: "pastel-desk-mats" },
            { name: "Gaming Mousepad", slug: "gaming-mousepads" },
            { name: "Sert Yüzey Mousepad", slug: "hard-surface-mousepads" },
            { name: "Yumuşak Yüzey Mousepad", slug: "soft-surface-mousepads" },
            { name: "Custom Baskılı Mousepad", slug: "custom-printed-mousepads" },
        ],
    },
    {
        name: "Aydınlatma",
        slug: "lighting",
        subCategories: [
            { name: "Neon LED Tabelalar (Ay, Bulut, Kalp)", slug: "neon-signs" },
            { name: "RGB LED Şerit", slug: "rgb-led-strips" },
            { name: "Desk Lambaları", slug: "desk-lamps" },
            { name: "Ring Light (Yayıncılar için)", slug: "ring-lights" },
            { name: "Mini USB LED Lambalar", slug: "usb-led-lights" },
            { name: "Smart LED Ampuller", slug: "smart-led-bulbs" },
            { name: "LED Neon Flex", slug: "led-neon-flex" },
            { name: "Akıllı Işık Sistemleri", slug: "smart-lighting" },
        ],
    },
    {
        name: "Mikrofonlar",
        slug: "microphones",
        subCategories: [
            { name: "USB Kondenser Mikrofon", slug: "usb-condenser-mics" },
            { name: "XLR Mikrofon", slug: "xlr-mics" },
            { name: "Kablosuz Mikrofon", slug: "wireless-mics" },
            { name: "Yaka Mikrofonu", slug: "lapel-mics" },
            { name: "Boom Arm Mikrofon Standı", slug: "boom-arms" },
            { name: "Pop Filter", slug: "pop-filters" },
            { name: "Shock Mount", slug: "shock-mounts" },
            { name: "Mikrofon Aksesuarları", slug: "mic-accessories" },
        ],
    },
    {
        name: "Aksesuarlar",
        slug: "accessories",
        subCategories: [
            { name: "Kulaklık Standı (RGB)", slug: "headset-stands" },
            { name: "Kablo Düzenleyici", slug: "cable-management" },
            { name: "Controller Stand", slug: "controller-stands" },
            { name: "Bilek Desteği (Wrist Rest)", slug: "wrist-rests" },
            { name: "Klavye Taşıma Çantası", slug: "keyboard-cases" },
            { name: "Mouse Grip Tape", slug: "mouse-grip-tape" },
            { name: "Mousepad Kenar Bantları", slug: "mousepad-edge-tapes" },
            { name: "Temizlik Kitleri", slug: "cleaning-kits" },
            { name: "Ekran Temizleyici", slug: "screen-cleaners" },
            { name: "Switch Puller (Anahtar Sökücü)", slug: "switch-pullers" },
            { name: "Keycap Puller", slug: "keycap-pullers" },
        ],
    },
    {
        name: "Elektronik",
        slug: "electronics",
        subCategories: [
            { name: "Arduino Kitleri", slug: "arduino-kits" },
            { name: "Raspberry Pi", slug: "raspberry-pi" },
            { name: "ESP32 / ESP8266", slug: "esp-modules" },
            { name: "Sensörler (Sıcaklık, Nem, Hareket)", slug: "sensors" },
            { name: "LED'ler ve LED Şeritler", slug: "electronic-leds" },
            { name: "Direnç/Kapasitör Setleri", slug: "resistor-capacitor-sets" },
            { name: "Breadboard", slug: "breadboards" },
            { name: "Jumper Kablolar", slug: "jumper-cables" },
            { name: "Güç Kaynakları", slug: "power-supplies" },
            { name: "Motor ve Servo", slug: "motors-servos" },
            { name: "Robotik Kitleri", slug: "robotics-kits" },
            { name: "Lehim Kitleri", slug: "soldering-kits" },
        ],
    },
    {
        name: "Yayıncı",
        slug: "streamer-gear",
        subCategories: [
            { name: "Webcam", slug: "webcams" },
            { name: "Green Screen", slug: "green-screens" },
            { name: "Softbox Işıklar", slug: "softbox-lighting" },
            { name: "Tripod ve Standlar", slug: "tripods-stands" },
            { name: "Stream Deck", slug: "stream-decks" },
            { name: "Capture Card", slug: "capture-cards" },
            { name: "Ses Kartları", slug: "sound-cards" },
            { name: "Akustik Panel", slug: "acoustic-panels" },
        ],
    },
    {
        name: "Dekorasyon",
        slug: "setup-decoration",
        subCategories: [
            { name: "Estetik Posterler", slug: "aesthetic-posters" },
            { name: "Mini Figürler / Funko Pop", slug: "mini-figures" },
            { name: "Peluş Oyuncaklar", slug: "plushies" },
            { name: "LED Ayna", slug: "led-mirrors" },
            { name: "Masa Organizeri", slug: "desk-organizers" },
            { name: "Kablo Kutuları", slug: "cable-boxes" },
            { name: "RGB Controller", slug: "rgb-controllers" },
            { name: "Akıllı Priz", slug: "smart-plugs" },
        ],
    },
    {
        name: "Oyun",
        slug: "gaming-accessories",
        subCategories: [
            { name: "Gaming Chair (Oyuncu Koltuğu)", slug: "gaming-chairs" },
            { name: "Ayarlanabilir Masa", slug: "adjustable-desks" },
            { name: "Footrest (Ayak Desteği)", slug: "footrests" },
            { name: "Controller Aksesuarları", slug: "controller-accessories" },
            { name: "Joystick", slug: "joysticks" },
            { name: "Racing Wheel (Direksiyon)", slug: "racing-wheels" },
            { name: "VR Aksesuarları", slug: "vr-accessories" },
            { name: "Gaming Gözlük", slug: "gaming-glasses" },
        ],
    },
    {
        name: "Kampanyalar",
        slug: "deals",
        subCategories: [
            { name: "İndirimli Ürünler", slug: "discounted-products" },
            { name: "Yeni Gelenler", slug: "new-arrivals" },
            { name: "En Çok Satanlar", slug: "best-sellers" },
            { name: "Çok Satanlar", slug: "trending-now" },
            { name: "Kombine Setler", slug: "bundle-sets" },
            { name: "Bundle (Paket) Ürünler", slug: "bundles" },
            { name: "Sınırlı Stok", slug: "limited-stock" },
        ],
    },
];
