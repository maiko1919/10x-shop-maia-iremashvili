import type { ProductsResponse } from "../types/product";

const BASE_URL = "https://dummyjson.com";

export async function getProducts(limit: number, skip: number): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<ProductsResponse>;
}