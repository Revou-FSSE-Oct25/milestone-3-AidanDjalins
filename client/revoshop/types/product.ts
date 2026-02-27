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

// Users for Login

export type User = {
  id: number,
  email: string,
  password: string,
  name: string,
  role: "admin" | "customer",
  avatar: string,
  creationAt: string,
  updatedAt: string
}

// type for user session
export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "customer";
  image: string;
};