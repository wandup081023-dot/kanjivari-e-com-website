'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  items: string[]; // product IDs
  recentlyViewed: string[]; // product IDs
  toggle: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  addRecentlyViewed: (id: string) => void;
  clear: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      recentlyViewed: [],
      toggle: (id) => {
        set(state => ({
          items: state.items.includes(id)
            ? state.items.filter(i => i !== id)
            : [...state.items, id],
        }));
      },
      isWishlisted: (id) => get().items.includes(id),
      addRecentlyViewed: (id) => {
        set(state => {
          const filtered = state.recentlyViewed.filter(i => i !== id);
          return { recentlyViewed: [id, ...filtered].slice(0, 4) }; // Keep top 4
        });
      },
      clear: () => set({ items: [], recentlyViewed: [] }),
    }),
    { name: 'kanjivaram-wishlist' }
  )
);

// ─────────────────────────────────────────────
// Checkout Store
// ─────────────────────────────────────────────

export interface Address {
  id: string;
  name: string;
  phone: string;
  pincode: string;
  state: string;
  city: string;
  houseNo: string;
  area: string;
  landmark?: string;
  type: 'Home' | 'Work';
  isDefault: boolean;
}

interface CheckoutStore {
  step: number;
  isGuest: boolean;
  guestEmail: string;
  guestPhone: string;
  addresses: Address[];
  selectedAddressId: string | null;
  paymentMethod: string | null;
  orderPlaced: boolean;
  orderId: string | null;
  
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setIsGuest: (v: boolean) => void;
  setGuestEmail: (email: string) => void;
  setGuestPhone: (phone: string) => void;
  addAddress: (addr: Omit<Address, 'id'>) => void;
  selectAddress: (id: string) => void;
  setPaymentMethod: (method: string) => void;
  placeOrder: () => string;
  reset: () => void;
}

const defaultAddresses: Address[] = [
  {
    id: 'addr1',
    name: 'Priya Sharma',
    phone: '9876543210',
    pincode: '400001',
    state: 'Maharashtra',
    city: 'Mumbai',
    houseNo: 'Flat 302, Lotus Heights',
    area: 'Bandra West',
    landmark: 'Near Hill Road',
    type: 'Home',
    isDefault: true,
  },
];

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set, get) => ({
      step: 1,
      isGuest: false,
      guestEmail: '',
      guestPhone: '',
      addresses: defaultAddresses,
      selectedAddressId: 'addr1',
      paymentMethod: null,
      orderPlaced: false,
      orderId: null,

      setStep: (step) => set({ step }),
      nextStep: () => set(s => ({ step: Math.min(s.step + 1, 4) })),
      prevStep: () => set(s => ({ step: Math.max(s.step - 1, 1) })),
      setIsGuest: (v) => set({ isGuest: v }),
      setGuestEmail: (email) => set({ guestEmail: email }),
      setGuestPhone: (phone) => set({ guestPhone: phone }),
      
      addAddress: (addr) => {
        const newAddr: Address = { ...addr, id: `addr${Date.now()}` };
        set(s => ({
          addresses: [...s.addresses, newAddr],
          selectedAddressId: newAddr.id,
        }));
      },
      
      selectAddress: (id) => set({ selectedAddressId: id }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      
      placeOrder: () => {
        const orderId = `KNJ${Date.now().toString().slice(-8)}`;
        set({ orderPlaced: true, orderId });
        return orderId;
      },
      
      reset: () => set({
        step: 1,
        paymentMethod: null,
        orderPlaced: false,
        orderId: null,
      }),
    }),
    { name: 'kanjivaram-checkout' }
  )
);
