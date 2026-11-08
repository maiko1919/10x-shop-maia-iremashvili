import type { Category } from "../../types/product";
import { getCategoryIcon } from "../../utils/categoryIcons";

interface CategoryNavProps {
  categories: Category[];
  active: string;
  onSelect: (slug: string) => void;
  variant: "sidebar" | "bar";
}

function CategoryNav({ categories, active, onSelect, variant }: CategoryNavProps) {
  const items = [{ slug: "", name: "All products" }, ...categories];
  const isSidebar = variant === "sidebar";

  return (
    <nav
      aria-label="Categories"
      className={isSidebar ? "hidden lg:block" : "-mx-4 mb-6 overflow-x-auto px-4 pb-2"}
    >
      {isSidebar && (
        <h2 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Shop by category
        </h2>
      )}

      <ul className={isSidebar ? "flex flex-col gap-1" : "flex w-max gap-2"}>
        {items.map((item) => {
          const isActive = item.slug === active;

          const sidebarClass = `flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
            isActive
              ? "bg-emerald-600 font-medium text-white"
              : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
          }`;

          const barClass = `flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
            isActive
              ? "border-emerald-600 bg-emerald-600 text-white"
              : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:text-emerald-700"
          }`;

          return (
            <li key={item.slug || "all"}>
              <button
                type="button"
                onClick={() => onSelect(item.slug)}
                aria-current={isActive ? "true" : undefined}
                className={`${isSidebar ? sidebarClass : barClass} focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500`}
              >
                <span aria-hidden="true">{getCategoryIcon(item.slug)}</span>
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default CategoryNav;