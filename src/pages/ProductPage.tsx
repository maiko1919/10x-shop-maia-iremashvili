import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Container from "../components/Container";
import ProductDetails from "../components/product/ProductDetails";
import NotFoundPage from "./NotFoundPage";
import { getProductById } from "../api/products.api";
import type { Product } from "../types/product";

interface LoadResult {
  id: number;
  product: Product | null;
  error: string | null;
}

function ProductPage() {
  const { id } = useParams();

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

  return (
    <Container>
      <ProductDetails key={result.product.id} product={result.product} />
    </Container>
  );
}

export default ProductPage;