import { create } from "zustand";
import { CartItem, Product } from "../types";

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, notes?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  // Getters for derived state
  getTotals: () => { subtotal: number; tax: number; total: number };
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  addToCart: (product, quantity, notes = "") => {
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  notes: notes || item.notes,
                }
              : item
          ),
        };
      }

      return {
        cart: [...state.cart, { ...product, quantity, notes }],
      };
    });
  },

  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    }));
  },

  updateQuantity: (productId, delta) => {
    set((state) => {
      const updatedCart = state.cart
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity + delta;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0); // Remove items with quantity 0 or less

      return { cart: updatedCart };
    });
  },

  clearCart: () => set({ cart: [] }),

  getTotals: () => {
    const { cart } = get();
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const tax = subtotal * 0.1;

    const total = subtotal + tax;

    return {
      subtotal,
      tax,
      total,
    };
  },
}));
