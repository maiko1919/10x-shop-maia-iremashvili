import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { CartContext } from "./CartContext";
import type { CartContextValue } from "./CartContext";
import type { CartItem, CartState } from "../types/cart";
import type { Product } from "../types/product";
import { discountedPrice } from "../utils/format";

const STORAGE_KEY = "shop_cart";

// გვერდის გახსნისას კალათას localStorage-დან ვკითხულობთ
function loadCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved) as CartState;
    return Array.isArray(parsed.items) ? parsed.items : [];
  } catch {
    return [];
  }
}

interface CartProviderProps {
  children: ReactNode;
}

function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  // ყოველი ცვლილებისას კალათას ვინახავთ
  useEffect(() => {
    const state: CartState = { items };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [items]);

  function addItem(product: Product, quantity: number) {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);

      if (existing) {
        const newQuantity = Math.min(existing.quantity + quantity, product.stock);
        return prev.map((item) =>
          item.productId === product.id ? { ...item, quantity: newQuantity } : item
        );
      }

      const newItem: CartItem = {
        productId: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        discountPercentage: product.discountPercentage,
        stock: product.stock,
        quantity: Math.min(quantity, product.stock),
      };

      return [...prev, newItem];
    });
  }

  function removeItem(productId: number) {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }

  function setQuantity(productId: number, quantity: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) }
          : item
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + discountedPrice(item.price, item.discountPercentage) * item.quantity,
    0
  );

  const value: CartContextValue = {
    items,
    totalQuantity,
    subtotal,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;