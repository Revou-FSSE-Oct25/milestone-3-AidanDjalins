export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
};

export type Category = {
  id: number;
  name: string;
  image: string;
  slug: string;
};


export type CartItemType = Product & {
  quantity: number;
};

export type CartItemsType = CartItemType[];

// Zustand
export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
};

export type CartStoreActionsType = {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  setHasHydrated: (state: boolean) => void;
};