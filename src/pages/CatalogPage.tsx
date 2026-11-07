import { useEffect, useState } from "react";
import Container from "../components/Container";
import ProductGrid from "../components/product/ProductGrid";
import { getProducts } from "../api/products.api";
import type { Product } from "../types/product";

const LIMIT = 12;

function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    getProducts(LIMIT, 0)
      .then((data) => {
        if (!ignore) {
          setProducts(data.products);
          setTotal(data.total);
        }
      })
      .catch((err: unknown) => {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Container>
      <div className="mb-6 flex items-end justify-between">
        <h1 className="text-2xl font-bold">Catalog</h1>
        {!loading && !error && <p className="text-sm text-gray-500">{total} products</p>}
      </div>

      {loading && <p className="py-16 text-center text-gray-500">Loading products...</p>}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
          <p className="font-semibold">Could not load products.</p>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="py-16 text-center text-gray-500">No products found.</p>
      )}

      {!loading && !error && products.length > 0 && <ProductGrid products={products} />}
    </Container>
  );
}

export default CatalogPage;