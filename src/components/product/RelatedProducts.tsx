import { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid";
import { getProducts } from "../../api/products.api";
import { useCart } from "../../hooks/useCart";
import type { Product } from "../../types/product";

interface RelatedProductsProps {
  product: Product;
}

function RelatedProducts({ product }: RelatedProductsProps) {
  const { addItem } = useCart();
  const [related, setRelated] = useState<Product[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    getProducts(
      { search: "", category: product.category, sort: "", page: 1, limit: 5 },
      controller.signal
    )
      .then((data) => {
        setRelated(data.products.filter((item) => item.id !== product.id).slice(0, 4));
      })
      .catch(() => {
        if (!controller.signal.aborted) setRelated([]);
      });

    return () => controller.abort();
  }, [product.id, product.category]);

  if (related !== null && related.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-6 text-2xl font-bold">Similar products</h2>
      {related === null ? (
        <p className="text-gray-500">Loading similar products...</p>
      ) : (
        <ProductGrid products={related} onAdd={(item) => addItem(item, 1)} />
      )}
    </section>
  );
}

export default RelatedProducts;