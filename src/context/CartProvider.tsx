import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { CartContext } from "./CartContext";
import type { CartContextValue } from "./CartContext";
import type { CartItem, CartState } from "../types/cart";
import type { Product } from "../types/product";
import { discountedPrice } from "../utils/format";
import { useToast } from "../hooks/useToast";
import {
  FREE_SHIPPING_FROM,
  PROMO_CODE,
  PROMO_PERCENT,
  SHIPPING_COST,
  roundMoney,
} from "../utils/cartRules";

const STORAGE_KEY = "shop_cart";
const EMPTY_CART: CartState = { items: [], promoCode: null };

// გვერდის გახსნისას კალათას localStorage-დან ვკითხულობთ
function loadCart(): CartState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return EMPTY_CART;
    const parsed = JSON.parse(saved) as Partial<CartState>;
    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      promoCode: typeof parsed.promoCode === "string" ? parsed.promoCode : null,
    };
  } catch {
    return EMPTY_CART;
  }
}

interface CartProviderProps {
  children: ReactNode;
}

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartState>(loadCart);
  const { showToast } = useToast();

  // ყოველი ცვლილებისას კალათას ვინახავთ
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // მხოლოდ items-ის შეცვლა, promoCode უცვლელი რჩება
  function updateItems(update: (items: CartItem[]) => CartItem[]) {
    setCart((prev) => ({ ...prev, items: update(prev.items) }));
  }

  function addItem(product: Product, quantity: number) {
    const inCart = cart.items.find((item) => item.productId === product.id)?.quantity ?? 0;
    if (inCart >= product.stock) {
      showToast("No more items in stock", "error");
      return;
    }

    updateItems((items) => {
      const existing = items.find((item) => item.productId === product.id);

      if (existing) {
        const newQuantity = Math.min(existing.quantity + quantity, product.stock);
        return items.map((item) =>
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

      return [...items, newItem];
    });

    showToast(`${product.title} added to cart ✓`);
  }

  // რამდენიმე ნივთის ერთად დამატება (Reorder)
  function addItems(newItems: CartItem[]) {
    updateItems((items) => {
      let result = items;
      for (const newItem of newItems) {
        const existing = result.find((item) => item.productId === newItem.productId);
        result = existing
          ? result.map((item) =>
              item.productId === newItem.productId
                ? { ...item, quantity: Math.min(item.quantity + newItem.quantity, item.stock) }
                : item
            )
          : [...result, { ...newItem, quantity: Math.min(newItem.quantity, newItem.stock) }];
      }
      return result;
    });

    showToast("Items added to cart ✓");
  }

  function removeItem(productId: number) {
    updateItems((items) => items.filter((item) => item.productId !== productId));
  }

  function setQuantity(productId: number, quantity: number) {
    updateItems((items) =>
      items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) }
          : item
      )
    );
  }

  function clearCart() {
    setCart(EMPTY_CART);
  }

  function applyPromo(code: string): boolean {
    if (code.trim().toUpperCase() !== PROMO_CODE) {
      return false;
    }
    setCart((prev) => ({ ...prev, promoCode: PROMO_CODE }));
    return true;
  }

  function removePromo() {
    setCart((prev) => ({ ...prev, promoCode: null }));
  }

  const items = cart.items;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = roundMoney(
    items.reduce(
      (sum, item) => sum + discountedPrice(item.price, item.discountPercentage) * item.quantity,
      0
    )
  );
  const discount = cart.promoCode ? roundMoney((subtotal * PROMO_PERCENT) / 100) : 0;
  const afterDiscount = subtotal - discount;
  const shipping = items.length === 0 || afterDiscount >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
  const total = roundMoney(afterDiscount + shipping);

  const value: CartContextValue = {
    items,
    promoCode: cart.promoCode,
    totalQuantity,
    subtotal,
    discount,
    shipping,
    total,
    addItem,
    addItems,
    removeItem,
    setQuantity,
    clearCart,
    applyPromo,
    removePromo,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;