// ფასდაკლებული ფასი: price × (1 − discount / 100), 2 ათწილადამდე
export function discountedPrice(price: number, discountPercentage: number): number {
  return Math.round(price * (1 - discountPercentage / 100) * 100) / 100;
}

// ფასის ფორმატი: 1299 -> "$1,299.00"
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}