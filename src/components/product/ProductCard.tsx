import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Product } from "../../types/product";
import { discountedPrice, formatPrice } from "../../utils/format";
import StockBadge from "./StockBadge";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

function ProductCard({ product, onAdd }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const finalPrice = discountedPrice(product.price, product.discountPercentage);
  const hasDiscount = product.discountPercentage >= 1;
  const outOfStock = product.stock === 0;

  // "Added ✓" 1.5 წამის შემდეგ ისევ "Add to cart" ხდება
  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 1500);
    return () => window.clearTimeout(timer);
  }, [added]);

  function handleAdd() {
    onAdd(product);
    setAdded(true);
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/products/${product.id}`} className="bg-gray-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          width={300}
          height={300}
          className="aspect-square w-full object-contain p-4"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs uppercase tracking-wide text-gray-500">
          {product.category}
          {product.brand && ` · ${product.brand}`}
        </p>

        <Link
          to={`/products/${product.id}`}
          className="line-clamp-2 font-semibold text-gray-900 hover:text-emerald-700"
        >
          {product.title}
        </Link>

        <p className="text-sm text-amber-500">★ {product.rating.toFixed(1)}</p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <span className="text-lg font-bold text-emerald-700">{formatPrice(finalPrice)}</span>
          {hasDiscount && (
            <>
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.price)}
              </span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                −{Math.round(product.discountPercentage)}%
              </span>
            </>
          )}
        </div>

        <StockBadge stock={product.stock} />

        <button
          type="button"
          onClick={handleAdd}
          disabled={outOfStock}
          className={`mt-3 rounded-lg px-4 py-2 text-sm font-medium text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 ${
            added ? "bg-emerald-800" : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {outOfStock ? "Out of stock" : added ? "Added ✓" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;