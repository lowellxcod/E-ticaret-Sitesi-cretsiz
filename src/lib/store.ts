import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    coupon: { code: string; type: 'PERCENT' | 'AMOUNT'; value: number } | null;
    applyCoupon: (coupon: { code: string; type: 'PERCENT' | 'AMOUNT'; value: number }) => void;
    removeCoupon: () => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    getSubtotal: () => number; // Original total without discount
    getItemCount: () => number;
    openCart: () => void;
    closeCart: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            coupon: null,
            addItem: (item) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((i) => i.id === item.id);

                if (existingItem) {
                    set({
                        items: currentItems.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                        ),
                    });
                } else {
                    set({ items: [...currentItems, item] });
                }
                // Automatically open cart when item is added
                set({ isOpen: true });
            },
            removeItem: (id) => {
                set({ items: get().items.filter((i) => i.id !== id) });
            },
            applyCoupon: (coupon) => {
                set({ coupon });
            },
            removeCoupon: () => {
                set({ coupon: null });
            },
            updateQuantity: (id, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(id);
                    return;
                }
                set({
                    items: get().items.map((i) =>
                        i.id === id ? { ...i, quantity } : i
                    ),
                });
            },
            clearCart: () => set({ items: [], coupon: null }),
            getSubtotal: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
            getTotal: () => {
                const subtotal = get().items.reduce((total, item) => total + item.price * item.quantity, 0);
                const coupon = get().coupon;
                if (!coupon) return subtotal;

                if (coupon.type === 'PERCENT') {
                    return subtotal * (1 - coupon.value / 100);
                } else {
                    return Math.max(0, subtotal - coupon.value);
                }
            },
            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            },
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
        }),
        {
            name: 'electronova-cart',
            skipHydration: true,
        }
    )
);

interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image: string;
    slug: string; // added slug for linking back
}

interface WishlistStore {
    items: WishlistItem[];
    addItem: (item: WishlistItem) => void;
    removeItem: (id: string) => void;
    hasItem: (id: string) => boolean;
    clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((i) => i.id === item.id);
                if (!existingItem) {
                    set({ items: [...currentItems, item] });
                }
            },
            removeItem: (id) => {
                set({ items: get().items.filter((i) => i.id !== id) });
            },
            hasItem: (id) => {
                return get().items.some((i) => i.id === id);
            },
            clearWishlist: () => set({ items: [] }),
        }),
        {
            name: 'electronova-wishlist',
            skipHydration: true,
        }
    )
);
