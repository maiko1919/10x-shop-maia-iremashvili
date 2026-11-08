import type { Review } from "../types/product";
import { reviewsStore } from "./storage";

export function loadReviews(productId: number): Review[] {
  return reviewsStore.get()?.[productId] ?? [];
}

export function saveReview(productId: number, review: Review): void {
  const store = reviewsStore.get() ?? {};
  const current = store[productId] ?? [];
  reviewsStore.set({ ...store, [productId]: [review, ...current] });
}