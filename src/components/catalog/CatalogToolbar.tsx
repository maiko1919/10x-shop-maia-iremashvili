import type { Category } from "../../types/product";
import { PAGE_SIZES, SORT_OPTIONS } from "../../utils/catalog";

interface CatalogToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  categories: Category[];
  onCategoryChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  limit: number;
  onLimitChange: (value: number) => void;
}

const fieldClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200";

function CatalogToolbar({
  search,
  onSearchChange,
  category,
  categories,
  onCategoryChange,
  sort,
  onSortChange,
  limit,
  onLimitChange,
}: CatalogToolbarProps) {
  return (
    <div className="mb-6 grid gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <label htmlFor="search" className="mb-1 block text-xs font-medium text-gray-500">
          Search
        </label>
        <input
          id="search"
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="category" className="mb-1 block text-xs font-medium text-gray-500">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className={fieldClass}
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sort" className="mb-1 block text-xs font-medium text-gray-500">
          Sort by
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          className={fieldClass}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="limit" className="mb-1 block text-xs font-medium text-gray-500">
          Per page
        </label>
        <select
          id="limit"
          value={limit}
          onChange={(event) => onLimitChange(Number(event.target.value))}
          className={fieldClass}
        >
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CatalogToolbar;