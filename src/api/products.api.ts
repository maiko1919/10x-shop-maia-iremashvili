import { api } from "./ApiClient";
import { isApiError } from "./ApiError";
import type { Category, Product, ProductsResponse } from "../types/product";

export interface ProductQuery {
  search: string;
  category: string;
  sort: string;
  page: number;
  limit: number;
}

interface SortRule {
  sortBy: keyof Product;
  order: "asc" | "desc";
}

const SORT_RULES: Partial<Record<string, SortRule>> = {
  "price-asc": { sortBy: "price", order: "asc" },
  "price-desc": { sortBy: "price", order: "desc" },
  "rating-desc": { sortBy: "rating", order: "desc" },
  "title-asc": { sortBy: "title", order: "asc" },
  newest: { sortBy: "id", order: "desc" },
  "discount-desc": { sortBy: "discountPercentage", order: "desc" },
};

export function getProducts(query: ProductQuery, signal?: AbortSignal): Promise<ProductsResponse> {
  const params = new URLSearchParams({
    limit: String(query.limit),
    skip: String((query.page - 1) * query.limit),
  });

  let path = "/products";

  if (query.search) {
    path = "/products/search";
    params.set("q", query.search);
  } else if (query.category) {
    path = `/products/category/${encodeURIComponent(query.category)}`;
  }

  const rule = SORT_RULES[query.sort];
  if (rule) {
    params.set("sortBy", rule.sortBy);
    params.set("order", rule.order);
  }

  return api.get<ProductsResponse>(`${path}?${params.toString()}`, signal);
}

export function getCategories(signal?: AbortSignal): Promise<Category[]> {
  return api.get<Category[]>("/products/categories", signal);
}

// ერთი პროდუქტი id-ით. 404-ზე აბრუნებს null-ს, სხვა შეცდომას გადასცემს ზემოთ
export async function getProductById(id: number): Promise<Product | null> {
  try {
    return await api.get<Product>(`/products/${id}`);
  } catch (error: unknown) {
    if (isApiError(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}