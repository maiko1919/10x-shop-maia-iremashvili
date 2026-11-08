import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import Container from "../components/Container";
import ProductGrid from "../components/product/ProductGrid";
import ProductGridSkeleton from "../components/product/ProductGridSkeleton";
import CatalogToolbar from "../components/catalog/CatalogToolbar";
import CategoryNav from "../components/catalog/CategoryNav";
import QuickFilters from "../components/catalog/QuickFilters";
import SaleMarquee from "../components/catalog/SaleMarquee";
import Pagination from "../components/catalog/Pagination";
import { getCategories, getProducts } from "../api/products.api";
import { useCart } from "../hooks/useCart";
import { useDebounce } from "../hooks/useDebounce";
import { DEFAULT_PAGE_SIZE, PAGE_SIZES, SORT_OPTIONS } from "../utils/catalog";
import type { Category, ProductsResponse } from "../types/product";

interface CatalogResult {
  key: string;
  data: ProductsResponse | null;
  error: string | null;
}

function CatalogPage() {
  const { addItem } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. ყველა ფილტრი URL-დან იკითხება
  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const sortParam = searchParams.get("sort") ?? "";
  const sort = SORT_OPTIONS.some((option) => option.value === sortParam) ? sortParam : "";
  const page = Math.max(1, Math.floor(Number(searchParams.get("page")) || 1));
  const limitParam = Number(searchParams.get("limit"));
  const limit = PAGE_SIZES.includes(limitParam) ? limitParam : DEFAULT_PAGE_SIZE;

  const [searchInput, setSearchInput] = useState(q);
  const debouncedSearch = useDebounce(searchInput, 400);
  const lastSearch = useRef(q);

  const [categories, setCategories] = useState<Category[]>([]);
  const [result, setResult] = useState<CatalogResult | null>(null);
  const [retry, setRetry] = useState(0);

  // 2. კატეგორიები ერთხელ იტვირთება
  useEffect(() => {
    const controller = new AbortController();
    getCategories(controller.signal)
      .then(setCategories)
      .catch(() => {
        // თუ კატეგორიები ვერ ჩაიტვირთა, სიაში მხოლოდ "All categories" დარჩება
      });
    return () => controller.abort();
  }, []);

  // 3. ძებნის ტექსტი URL-ში იწერება 400ms დაყოვნებით
  useEffect(() => {
    const value = debouncedSearch.trim();
    if (value === lastSearch.current) return;
    lastSearch.current = value;

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) {
        next.set("q", value);
        next.delete("category");
      } else {
        next.delete("q");
      }
      next.delete("page");
      return next;
    });
  }, [debouncedSearch, setSearchParams]);

  // 4. პროდუქტები იტვირთება, როცა URL-ის რომელიმე პარამეტრი იცვლება
  const requestKey = `${q}|${category}|${sort}|${page}|${limit}|${retry}`;

  useEffect(() => {
    const controller = new AbortController();

    getProducts({ search: q, category, sort, page, limit }, controller.signal)
      .then((data) => setResult({ key: requestKey, data, error: null }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        const message = err instanceof Error ? err.message : "Something went wrong";
        setResult({ key: requestKey, data: null, error: message });
      });

    return () => controller.abort();
  }, [requestKey, q, category, sort, page, limit]);

  // URL-ის პარამეტრების შეცვლა ერთი ფუნქციით
  function updateParams(changes: Record<string, string | null>) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      for (const [key, value] of Object.entries(changes)) {
        if (value === null || value === "") {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      }
      return next;
    });
  }

  function handleCategoryChange(value: string) {
    setSearchInput("");
    lastSearch.current = "";
    updateParams({ category: value, q: null, page: null });
  }

  function handleSortChange(value: string) {
    updateParams({ sort: value, page: null });
  }

  function handleLimitChange(value: number) {
    updateParams({ limit: value === DEFAULT_PAGE_SIZE ? null : String(value), page: null });
  }

  function handlePageChange(newPage: number) {
    updateParams({ page: newPage === 1 ? null : String(newPage) });
    window.scrollTo(0, 0);
  }

  function handleClearFilters() {
    setSearchInput("");
    lastSearch.current = "";
    setSearchParams({});
  }

  const loading = result === null || result.key !== requestKey;
  const data = !loading ? result.data : null;
  const error = !loading ? result.error : null;
  const totalPages = data ? Math.ceil(data.total / limit) : 0;
  const from = (page - 1) * limit + 1;
  const to = data ? Math.min(page * limit, data.total) : 0;

  return (
    <Container>
      <h1 className="sr-only">Catalog</h1>

      <SaleMarquee />

      <CategoryNav
        variant="bar"
        categories={categories}
        active={category}
        onSelect={handleCategoryChange}
      />

      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-8">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <CategoryNav
            variant="sidebar"
            categories={categories}
            active={category}
            onSelect={handleCategoryChange}
          />
        </aside>

        <div className="min-w-0">
          <QuickFilters active={sort} onSelect={handleSortChange} />

          <CatalogToolbar
            search={searchInput}
            onSearchChange={setSearchInput}
            category={category}
            categories={categories}
            onCategoryChange={handleCategoryChange}
            sort={sort}
            onSortChange={handleSortChange}
            limit={limit}
            onLimitChange={handleLimitChange}
          />

          {data && data.total > 0 && (
            <p className="mb-4 text-sm text-gray-500">
              Showing {from}–{to} of {data.total} products
            </p>
          )}

          {loading && <ProductGridSkeleton count={Math.min(limit, 12)} />}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
              <p className="font-semibold">Could not load products.</p>
              <p className="mt-1 text-sm">{error}</p>
              <button
                type="button"
                onClick={() => setRetry((value) => value + 1)}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          )}

          {data && data.products.length === 0 && (
            <div className="py-16 text-center">
              <div aria-hidden="true" className="mb-3 text-5xl">
                🙁
              </div>
              <p className="text-gray-500">No products found.</p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-3 font-medium text-emerald-700 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

          {data && data.products.length > 0 && (
            <>
              <ProductGrid products={data.products} onAdd={(product) => addItem(product, 1)} />
              <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
            </>
          )}
        </div>
      </div>
    </Container>
  );
}

export default CatalogPage;