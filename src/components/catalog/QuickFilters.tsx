import { QUICK_FILTERS } from "../../utils/catalog";

interface QuickFiltersProps {
  active: string;
  onSelect: (value: string) => void;
}

function QuickFilters({ active, onSelect }: QuickFiltersProps) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {QUICK_FILTERS.map((filter) => {
        const isActive = filter.value === active;
        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onSelect(isActive ? "" : filter.value)}
            aria-pressed={isActive}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
              isActive
                ? "bg-amber-400 text-gray-900 shadow-sm"
                : "bg-amber-50 text-amber-900 hover:bg-amber-100"
            }`}
          >
            <span aria-hidden="true">{filter.icon}</span>
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

export default QuickFilters;