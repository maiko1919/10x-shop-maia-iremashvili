export interface CategoryGroup {
  label: string;
  icon: string;
  slugs: string[];
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    label: "Women",
    icon: "👩",
    slugs: ["womens-dresses", "tops", "womens-bags", "womens-shoes", "womens-watches", "womens-jewellery"],
  },
  {
    label: "Men",
    icon: "👨",
    slugs: ["mens-shirts", "mens-shoes", "mens-watches"],
  },
  {
    label: "Beauty",
    icon: "💄",
    slugs: ["beauty", "fragrances", "skin-care"],
  },
  {
    label: "Home",
    icon: "🏠",
    slugs: ["furniture", "home-decoration", "kitchen-accessories", "groceries"],
  },
  {
    label: "Tech",
    icon: "💻",
    slugs: ["smartphones", "laptops", "tablets", "mobile-accessories"],
  },
  {
    label: "Sport & Outdoor",
    icon: "⚽",
    slugs: ["sports-accessories", "sunglasses", "motorcycle", "vehicle"],
  },
];