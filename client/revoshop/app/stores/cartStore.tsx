import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product';
import { CartStoreStateType, CartStoreActionsType } from '@/types/product';

type CartStore = CartStoreStateType & CartStoreActionsType;

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      hasHydrated: false,

      addToCart: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
          
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          
          return {
            cart: [...state.cart, { ...product, quantity }],
          };
        });
      },

      removeFromCart: (productId: number) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }));
      },

      updateQuantity: (productId: number, quantity: number) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      setHasHydrated: (state: boolean) => {
        set({ hasHydrated: state });
      },
    }),
    {
      name: 'cart-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useCartStore;