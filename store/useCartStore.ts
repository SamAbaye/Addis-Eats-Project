// store/useCartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  nameEn: string;
  nameAm?: string;
  priceETB: number;
  spiceLevel?: string;
  isFasting?: boolean;
  isSpecial?: boolean;
  category?: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  addItem: (dish: Omit<CartItem, "qty">) => void;
  decrementItem: (id: string) => void;
  removeCartItem: (id: string) => void;
  clearCart: () => void;
  totalCount: () => number;
  totalPrice: () => number;
};

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (dish) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === dish.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === dish.id ? { ...i, qty: i.qty + 1 } : i,
              ),
            };
          }
          return { items: [...state.items, { ...dish, qty: 1 }] };
        }),

      decrementItem: (id) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === id);
          if (existing && existing.qty > 1) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, qty: i.qty - 1 } : i,
              ),
            };
          }
          return { items: state.items.filter((i) => i.id !== id) };
        }),

      removeCartItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      clearCart: () => set({ items: [] }),

      totalCount: () => get().items.reduce((sum, i) => sum + i.qty, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.priceETB * i.qty, 0),
    }),
    { name: "cart-storage" },
  ),
);

export default useCartStore;