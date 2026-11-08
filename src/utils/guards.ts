import type { CartItem, CartState } from "../types/cart";
import type { Order } from "../types/order";
import type { Review } from "../types/product";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isCartItem(value: unknown): value is CartItem {
  return (
    isObject(value) &&
    typeof value.productId === "number" &&
    typeof value.title === "string" &&
    typeof value.thumbnail === "string" &&
    typeof value.price === "number" &&
    typeof value.discountPercentage === "number" &&
    typeof value.stock === "number" &&
    typeof value.quantity === "number"
  );
}

export function isCartState(value: unknown): value is CartState {
  return (
    isObject(value) &&
    Array.isArray(value.items) &&
    value.items.every(isCartItem) &&
    (value.promoCode === null || typeof value.promoCode === "string")
  );
}

export function isOrder(value: unknown): value is Order {
  return (
    isObject(value) &&
    typeof value.id === "number" &&
    typeof value.number === "string" &&
    Array.isArray(value.items) &&
    value.items.every(isCartItem) &&
    typeof value.total === "number" &&
    typeof value.placedAt === "string"
  );
}

export function isOrderList(value: unknown): value is Order[] {
  return Array.isArray(value) && value.every(isOrder);
}

export function isReview(value: unknown): value is Review {
  return (
    isObject(value) &&
    typeof value.rating === "number" &&
    typeof value.comment === "string" &&
    typeof value.date === "string" &&
    typeof value.reviewerName === "string"
  );
}

export function isReviewsStore(value: unknown): value is Partial<Record<string, Review[]>> {
  return (
    isObject(value) &&
    Object.values(value).every((list) => Array.isArray(list) && list.every(isReview))
  );
}