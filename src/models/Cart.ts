import type { CartItem } from "../types/cart";
import { discountedPrice } from "../utils/format";
import {
  FREE_SHIPPING_FROM,
  PROMO_PERCENT,
  SHIPPING_COST,
  roundMoney,
} from "../utils/cartRules";

export interface ICart {
  subtotal(): number;
  discount(): number;
  shipping(): number;
  total(): number;
}

// კალათის ყველა გამოთვლა — React-ის გარეშე
export class Cart implements ICart {
  private readonly items: CartItem[];
  private readonly promoCode: string | null;

  constructor(items: CartItem[], promoCode: string | null) {
    this.items = items;
    this.promoCode = promoCode;
  }

  get itemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  subtotal(): number {
    return roundMoney(
      this.items.reduce(
        (sum, item) => sum + discountedPrice(item.price, item.discountPercentage) * item.quantity,
        0
      )
    );
  }

  discount(): number {
    return this.promoCode ? roundMoney((this.subtotal() * PROMO_PERCENT) / 100) : 0;
  }

  shipping(): number {
    if (this.items.length === 0) return 0;
    return this.subtotal() - this.discount() >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
  }

  total(): number {
    return roundMoney(this.subtotal() - this.discount() + this.shipping());
  }
}