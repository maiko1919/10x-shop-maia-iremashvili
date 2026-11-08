// ერთი რევიუ
export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

// ერთი პროდუქტი, როგორც DummyJSON აბრუნებს
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  brand?: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
  reviews: Review[];
}

// პასუხი სიისთვის: /products, /products/search, /products/category/...
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// კატეგორია, როგორც /products/categories აბრუნებს
export interface Category {
  slug: string;
  name: string;
  url: string;
}