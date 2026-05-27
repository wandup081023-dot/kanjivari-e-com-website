'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/data';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedMetal?: string;
  selectedSize?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, qty?: number, metal?: string, size?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getCount: () => number;
  appliedCoupon: string | null;
  discount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      appliedCoupon: null,
      discount: 0,

      addItem: (product, qty = 1, metal, size) => {
        set(state => {
          const existing = state.items.find(i => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map(i =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
            };
          }
          return {
            items: [...state.items, { product, quantity: qty, selectedMetal: metal, selectedSize: size }],
          };
        });
      },

      removeItem: (productId) => {
        set(state => ({ items: state.items.filter(i => i.product.id !== productId) }));
      },

      updateQuantity: (productId, qty) => {
        if (qty <= 0) {
          get().removeItem(productId);
          return;
        }
        set(state => ({
          items: state.items.map(i =>
            i.product.id === productId ? { ...i, quantity: qty } : i
          ),
        }));
      },

      clearCart: () => set({ items: [], appliedCoupon: null, discount: 0 }),

      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().discount;
        const shipping = subtotal > 999 ? 0 : 99;
        return subtotal - discount + shipping;
      },

      getCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      applyCoupon: (code) => {
        const coupons: Record<string, number> = {
          'KANJIVARAM10': 0.10,
          'FIRST15': 0.15,
          'BRIDE20': 0.20,
          'FESTIVE25': 0.25,
        };
        const upperCode = code.toUpperCase();
        if (coupons[upperCode]) {
          const subtotal = get().getSubtotal();
          const discountAmount = Math.round(subtotal * coupons[upperCode]);
          set({ appliedCoupon: upperCode, discount: discountAmount });
          return { success: true, message: `${Math.round(coupons[upperCode] * 100)}% discount applied!` };
        }
        return { success: false, message: 'Invalid coupon code' };
      },

      removeCoupon: () => set({ appliedCoupon: null, discount: 0 }),
    }),
    {
      name: 'kanjivaram-cart',
    }
  )
);
