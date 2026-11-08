import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getProducts } from "../../api/products.api";
import { discountedPrice, formatPrice } from "../../utils/format";
import type { Product } from "../../types/product";

function SaleMarquee() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    getProducts(
      { search: "", category: "", sort: "discount-desc", page: 1, limit: 10 },
      controller.signal
    )
      .then((data) => setProducts(data.products))
      .catch(() => {
        // თუ ვერ ჩაიტვირთა, ზოლი უბრალოდ ცარიელი დარჩება
      });
    return () => controller.abort();
  }, []);

  // ერთი და იგივე სია ორჯერ — ასე ზოლი "უწყვეტად" ტრიალებს
  function renderList(hidden: boolean) {
    return (
      <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-4 pr-4">
        {products.map((product) => (
          <li key={product.id}>
            <Link
              to={`/products/${product.id}`}
              tabIndex={hidden ? -1 : undefined}
              className="flex w-64 items-center gap-3 rounded-xl border border-amber-200 bg-white p-2 hover:border-amber-400"
            >
              <img
                src={product.thumbnail}
                alt={hidden ? "" : product.title}
                width={56}
                height={56}
                loading="lazy"
                className="h-14 w-14 shrink-0 rounded-lg bg-gray-100 object-contain"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">{product.title}</p>
                <p className="text-sm">
                  <span className="font-bold text-emerald-700">
                    {formatPrice(discountedPrice(product.price, product.discountPercentage))}
                  </span>{" "}
                  <span className="rounded-full bg-red-100 px-1.5 text-xs font-semibold text-red-600">
                    −{Math.round(product.discountPercentage)}%
                  </span>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section aria-label="Hot deals" className="mb-6 h-32 overflow-hidden rounded-2xl bg-amber-50 py-3">
      <p className="mb-2 px-4 text-sm font-bold text-amber-900">🔥 Hot deals</p>
      {products.length > 0 && (
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
          {renderList(false)}
          {renderList(true)}
        </div>
      )}
    </section>
  );
}

export default SaleMarquee;