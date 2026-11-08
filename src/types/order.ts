import type { CartItem } from "./cart";

// Checkout ფორმის ველები
export interface ShippingInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
}

export type OrderStatus = "Processing" | "Shipped" | "Delivered";

export interface Order {
  id: number;
  number: string;
  items: CartItem[];
  shipping: ShippingInfo;
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  placedAt: string;
}