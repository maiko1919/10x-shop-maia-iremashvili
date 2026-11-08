export const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating-desc", label: "Rating: high to low" },
  { value: "title-asc", label: "Name A→Z" },
  { value: "newest", label: "Newest" },
  { value: "discount-desc", label: "Biggest discount" },
];

export const QUICK_FILTERS = [
  { value: "rating-desc", label: "Top rated", icon: "⭐" },
  { value: "newest", label: "New arrivals", icon: "✨" },
  { value: "discount-desc", label: "Sale", icon: "🔥" },
];

export const PAGE_SIZES = [12, 24, 48];

export const DEFAULT_PAGE_SIZE = 12;