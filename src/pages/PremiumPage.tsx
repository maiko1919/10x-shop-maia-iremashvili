import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getProducts } from "../api/products.api";
import { discountedPrice, formatPrice } from "../utils/format";
import type { Product } from "../types/product";

const PREMIUM_CATEGORIES = [
  "mens-watches",
  "womens-watches",
  "womens-jewellery",
  "fragrances",
  "womens-bags",
];

function PremiumPage() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    // 5 კატეგორია ერთდროულად — ყველას პასუხს ერთად ველოდებით
    Promise.all(
      PREMIUM_CATEGORIES.map((category) =>
        getProducts(
          { search: "", category, sort: "price-desc", page: 1, limit: 5 },
          controller.signal
        )
      )
    )
      .then((responses) => {
        const all = responses.flatMap((response) => response.products);
        setProducts(all.sort((a, b) => b.price - a.price).slice(0, 12));
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-[70vh] bg-neutral-950 text-neutral-100">
      <section className="mx-auto max-w-7xl px-4 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">10X Shop</p>
        <h1 className="mt-4 font-serif text-5xl tracking-[0.25em] sm:text-7xl">PREMIUM</h1>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-neutral-400">
          Watches, jewellery, fragrances and bags — our most exclusive pieces in one place.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20">
        {error && (
          <p className="text-center text-neutral-400">Could not load premium products.</p>
        )}

        {!error && products === null && (
          <p className="text-center text-neutral-500">Loading...</p>
        )}

        {products && (
          <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <li key={product.id}>
                <Link
                  to={`/products/${product.id}`}
                  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <div className="overflow-hidden bg-neutral-900">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      loading="lazy"
                      width={300}
                      height={400}
                      className="aspect-[3/4] w-full object-contain p-6 transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                    {product.brand ?? product.category}
                  </p>
                  <h2 className="mt-1 text-sm uppercase tracking-wider text-neutral-100">
                    {product.title}
                  </h2>
                  <p className="mt-2 text-sm text-neutral-300">
                    {formatPrice(discountedPrice(product.price, product.discountPercentage))}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default PremiumPage;