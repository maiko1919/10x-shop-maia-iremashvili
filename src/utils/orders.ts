import type { Order, OrderStatus } from "../types/order";
import { ordersStorage } from "./storage";

export const ORDER_STATUSES: OrderStatus[] = ["Processing", "Shipped", "Delivered"];

export function loadOrders(): Order[] {
  return ordersStorage.get() ?? [];
}

// ახალი შეკვეთა: id, ნომერი და თარიღი აქ ემატება
export function createOrder(data: Omit<Order, "id" | "number" | "placedAt">): Order {
  const count = loadOrders().length + 1;
  return {
    ...data,
    id: Date.now(),
    number: `10X-${String(count).padStart(5, "0")}`,
    placedAt: new Date().toISOString(),
  };
}

export function saveOrder(order: Order): void {
  ordersStorage.set([order, ...loadOrders()]);
}

// სტატუსი არ ინახება — ყოველ ჯერზე დროიდან ითვლება
export function getOrderStatus(order: Order, now: number): OrderStatus {
  const minutes = (now - new Date(order.placedAt).getTime()) / 60000;
  if (minutes < 1) return "Processing";
  if (minutes < 3) return "Shipped";
  return "Delivered";
}