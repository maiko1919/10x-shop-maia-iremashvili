import type { Category } from "../../types/product";
import { getCategoryIcon } from "../../utils/categoryIcons";
import { CATEGORY_GROUPS } from "../../utils/categoryGroups";

interface CategoryNavProps {
  categories: Category[];
  active: string;
  onSelect: (slug: string) => void;
  variant: "sidebar" | "bar";
}

interface ItemButtonProps {
  slug: string;
  name: string;
  active: string;
  onSelect: (slug: string) => void;
  variant: "sidebar" | "bar";
}

function ItemButton({ slug, name, active, onSelect, variant }: ItemButtonProps) {
  const isActive = slug === active;

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
    <button
      type="button"
      onClick={() => onSelect(slug)}
      aria-current={isActive ? "true" : undefined}
      className={`${variant === "sidebar" ? sidebarClass : barClass} focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500`}
    >
      <span aria-hidden="true">{getCategoryIcon(slug)}</span>
      {name}
    </button>
  );
}

function CategoryNav({ categories, active, onSelect, variant }: CategoryNavProps) {
  // ზედა ზოლი — ყველა კატეგორია ერთ რიგში
  if (variant === "bar") {
    const items = [{ slug: "", name: "All products" }, ...categories];
    return (
      <nav aria-label="Categories" className="-mx-4 mb-6 overflow-x-auto px-4 pb-2">
        <ul className="flex w-max gap-2">
          {items.map((item) => (
            <li key={item.slug || "all"}>
              <ItemButton {...item} active={active} onSelect={onSelect} variant="bar" />
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  // გვერდითა მენიუ — ჯგუფებად: Women, Men, Beauty...
  const groupedSlugs = CATEGORY_GROUPS.flatMap((group) => group.slugs);
  const otherCategories = categories.filter((item) => !groupedSlugs.includes(item.slug));

  return (
    <nav aria-label="Categories" className="hidden lg:block">
      <h2 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
        Shop by category
      </h2>

      <ItemButton slug="" name="All products" active={active} onSelect={onSelect} variant="sidebar" />

      {CATEGORY_GROUPS.map((group) => {
        const groupCategories = categories.filter((item) => group.slugs.includes(item.slug));
        if (groupCategories.length === 0) return null;

        return (
          <div key={group.label} className="mt-5">
            <h3 className="mb-1 flex items-center gap-2 px-3 text-sm font-bold text-gray-900">
              <span aria-hidden="true">{group.icon}</span>
              {group.label}
            </h3>
            <ul className="flex flex-col gap-0.5">
              {groupCategories.map((item) => (
                <li key={item.slug}>
                  <ItemButton {...item} active={active} onSelect={onSelect} variant="sidebar" />
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      {otherCategories.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-1 px-3 text-sm font-bold text-gray-900">More</h3>
          <ul className="flex flex-col gap-0.5">
            {otherCategories.map((item) => (
              <li key={item.slug}>
                <ItemButton {...item} active={active} onSelect={onSelect} variant="sidebar" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default CategoryNav;