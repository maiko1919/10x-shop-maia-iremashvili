// ერთი ხაზი კალათაში
export interface CartItem {
  productId: number;
  title: string;
  thumbnail: string;
  price: number;
  discountPercentage: number;
  stock: number;
  quantity: number;
}

// მთელი კალათა
export interface CartState {
  items: CartItem[];
}