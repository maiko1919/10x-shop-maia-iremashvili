import { useEffect, useRef } from "react";
import { Link } from "react-router";
import AddToCart from "./AddToCart";
import StockBadge from "./StockBadge";
import { CloseIcon } from "../ui/Icons";
import { discountedPrice, formatPrice } from "../../utils/format";
import type { Product } from "../../types/product";

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // კომპონენტის გამოჩენისას ფანჯარა იხსნება
  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const finalPrice = discountedPrice(product.price, product.discountPercentage);
  const hasDiscount = product.discountPercentage >= 1;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        // ფონზე დაჭერა ხურავს ფანჯარას
        if (event.target === event.currentTarget) onClose();
      }}
      aria-labelledby="quick-view-title"
      className="m-auto w-[min(92vw,48rem)] rounded-2xl p-0 backdrop:bg-black/50"
    >
      <div className="relative grid gap-6 p-6 sm:grid-cols-2">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <CloseIcon />
        </button>

        <img
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={300}
          className="aspect-square w-full rounded-xl bg-gray-100 object-contain p-4"
        />

        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            {product.category}
            {product.brand && ` · ${product.brand}`}
          </p>
          <h2 id="quick-view-title" className="pr-10 text-2xl font-bold text-gray-900">
            {product.title}
          </h2>
          <p className="text-sm text-amber-500">★ {product.rating.toFixed(1)}</p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-2xl font-bold text-emerald-700">{formatPrice(finalPrice)}</span>
            {hasDiscount && (
              <span className="text-gray-400 line-through">{formatPrice(product.price)}</span>
            )}
          </div>

          <StockBadge stock={product.stock} />
          <p className="line-clamp-3 text-sm text-gray-600">{product.description}</p>

          <AddToCart product={product} />

          <Link
            to={`/products/${product.id}`}
            className="text-sm font-medium text-emerald-700 hover:underline"
          >
            View full details →
          </Link>
        </div>
      </div>
    </dialog>
  );
}

export default QuickViewModal;