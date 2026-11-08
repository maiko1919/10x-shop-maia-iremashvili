import type { Review } from "../types/product";

const STORAGE_KEY = "shop_reviews";

// { "5": [review, review], "12": [review] } — პროდუქტის id -> რევიუები
type ReviewsStore = Partial<Record<string, Review[]>>;

function readStore(): ReviewsStore {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return {};
    const parsed: unknown = JSON.parse(saved);
    return typeof parsed === "object" && parsed !== null ? (parsed as ReviewsStore) : {};
  } catch {
    return {};
  }
}

export function loadReviews(productId: number): Review[] {
  return readStore()[productId] ?? [];
}

export function saveReview(productId: number, review: Review): void {
  const store = readStore();
  const current = store[productId] ?? [];
  const next: ReviewsStore = { ...store, [productId]: [review, ...current] };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}