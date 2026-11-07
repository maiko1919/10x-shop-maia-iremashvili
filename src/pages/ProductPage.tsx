import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Container from "../components/Container";
import ProductGallery from "../components/product/ProductGallery";
import StockBadge from "../components/product/StockBadge";
import NotFoundPage from "./NotFoundPage";
import { getProductById } from "../api/products.api";
import { discountedPrice, formatPrice } from "../utils/format";
import type { Product } from "../types/product";

interface LoadResult {
  id: number;
  product: Product | null;
  error: string | null;
}

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const productId = Number(id);
  const isValidId = Number.isInteger(productId) && productId > 0;

  const [result, setResult] = useState<LoadResult | null>(null);

  useEffect(() => {
    if (!isValidId) return;

    let ignore = false;

    getProductById(productId)
      .then((data) => {
        if (!ignore) {
          setResult({ id: productId, product: data, error: null });
        }
      })
      .catch((err: unknown) => {
        if (!ignore) {
          const message = err instanceof Error ? err.message : "Something went wrong";
          setResult({ id: productId, product: null, error: message });
        }
      });

    return () => {
      ignore = true;
    };
  }, [productId, isValidId]);

  // არასწორი id (მაგ. /products/abc) — რექვესთის გარეშე
  if (!isValidId) {
    return <NotFoundPage />;
  }

  // ჯერ იტვირთება
  if (result === null || result.id !== productId) {
    return (
      <Container>
        <p className="py-16 text-center text-gray-500">Loading product...</p>
      </Container>
    );
  }

  // შეცდომა
  if (result.error) {
    return (
      <Container>
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
          <p className="font-semibold">Could not load product.</p>
          <p className="mt-1 text-sm">{result.error}</p>
        </div>
      </Container>
    );
  }

  // პროდუქტი არ არსებობს (404)
  if (result.product === null) {
    return <NotFoundPage />;
  }

  const product = result.product;
  const finalPrice = discountedPrice(product.price, product.discountPercentage);
  const hasDiscount = product.discountPercentage >= 1;

  return (
    <Container>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 text-sm font-medium text-gray-600 hover:text-emerald-700"
      >
        ← Back to catalog
      </button>

      <div className="grid gap-10 md:grid-cols-2">
        <ProductGallery key={product.id} images={product.images} title={product.title} />

        <div className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-wide text-gray-500">
            {product.category}
            {product.brand && ` · ${product.brand}`}
          </p>

          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

          <p className="text-amber-500">★ {product.rating.toFixed(1)}</p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-3xl font-bold text-emerald-700">{formatPrice(finalPrice)}</span>
            {hasDiscount && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                  −{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <StockBadge stock={product.stock} />

          <p className="leading-relaxed text-gray-700">{product.description}</p>
        </div>
      </div>
    </Container>
  );
}

export default ProductPage;