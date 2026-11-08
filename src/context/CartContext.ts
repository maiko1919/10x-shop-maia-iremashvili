import { createContext } from "react";
import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";

export interface CartContextValue {
  items: CartItem[];
  promoCode: string | null;
  totalQuantity: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);