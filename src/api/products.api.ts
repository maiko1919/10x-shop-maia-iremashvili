import type { Category, Product, ProductsResponse } from "../types/product";

const BASE_URL = "https://dummyjson.com";

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

export async function getProducts(
  query: ProductQuery,
  signal?: AbortSignal
): Promise<ProductsResponse> {
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

  const response = await fetch(`${BASE_URL}${path}?${params.toString()}`, { signal });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<ProductsResponse>;
}

export async function getCategories(signal?: AbortSignal): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/products/categories`, { signal });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<Category[]>;
}

// ერთი პროდუქტი id-ით. თუ ასეთი არ არსებობს, აბრუნებს null-ს
export async function getProductById(id: number): Promise<Product | null> {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<Product>;
}