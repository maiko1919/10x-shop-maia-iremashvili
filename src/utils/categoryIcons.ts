const CATEGORY_ICONS: Partial<Record<string, string>> = {
  "": "🏬",
  beauty: "💄",
  fragrances: "🌸",
  furniture: "🛋️",
  groceries: "🛒",
  "home-decoration": "🏺",
  "kitchen-accessories": "🍳",
  laptops: "💻",
  "mens-shirts": "👔",
  "mens-shoes": "👞",
  "mens-watches": "⌚",
  "mobile-accessories": "🎧",
  motorcycle: "🏍️",
  "skin-care": "🧴",
  smartphones: "📱",
  "sports-accessories": "⚽",
  sunglasses: "🕶️",
  tablets: "📲",
  tops: "👚",
  vehicle: "🚗",
  "womens-bags": "👜",
  "womens-dresses": "👗",
  "womens-jewellery": "💍",
  "womens-shoes": "👠",
  "womens-watches": "⌚",
};

export function getCategoryIcon(slug: string): string {
  return CATEGORY_ICONS[slug] ?? "🛍️";
}