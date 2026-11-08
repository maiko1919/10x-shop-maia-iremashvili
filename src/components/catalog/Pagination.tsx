interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

// მაგ: page=5, total=17 -> [1, "...", 4, 5, 6, "...", 17]
function getPageNumbers(page: number, totalPages: number): (number | "...")[] {
  const pages: (number | "...")[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return pages;
}

const buttonClass =
  "flex h-11 min-w-11 items-center justify-center rounded-lg border px-3 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-40";

function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={`${buttonClass} border-gray-300 bg-white hover:bg-gray-50`}
      >
        ‹
      </button>

      {getPageNumbers(page, totalPages).map((item, index) =>
        item === "..." ? (
          <span key={`dots-${index}`} className="px-2 text-gray-400">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-current={item === page ? "page" : undefined}
            className={`${buttonClass} ${
              item === page
                ? "border-emerald-600 bg-emerald-600 text-white"
                : "border-gray-300 bg-white hover:bg-gray-50"
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className={`${buttonClass} border-gray-300 bg-white hover:bg-gray-50`}
      >
        ›
      </button>
    </nav>
  );
}

export default Pagination;