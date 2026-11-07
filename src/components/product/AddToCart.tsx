import { useState } from "react";
import { Link } from "react-router";
import QuantityStepper from "../ui/QuantityStepper";
import { useCart } from "../../hooks/useCart";
import type { Product } from "../../types/product";

interface AddToCartProps {
  product: Product;
}

function AddToCart({ product }: AddToCartProps) {
  const { items, addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // რამდენი ცალი უკვე დევს კალათაში
  const inCart = items.find((item) => item.productId === product.id)?.quantity ?? 0;
  const available = product.stock - inCart;

  function handleChange(value: number) {
    setQuantity(value);
    setAdded(false);
  }

  function handleAdd() {
    addItem(product, quantity);
    setQuantity(1);
    setAdded(true);
  }

  if (product.stock === 0) {
    return (
      <button
        type="button"
        disabled
        className="w-full rounded-lg bg-gray-300 px-6 py-3 font-medium text-white sm:w-auto"
      >
        Out of stock
      </button>
    );
  }

  if (available <= 0) {
    return (
      <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
        All available items are already in your cart.{" "}
        <Link to="/cart" className="font-medium underline">
          View cart
        </Link>
      </p>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <QuantityStepper
          value={Math.min(quantity, available)}
          max={available}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-lg bg-emerald-600 px-6 py-2.5 font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          Add to cart
        </button>
      </div>

      {added && (
        <p className="mt-3 text-sm text-emerald-700">
          Added to cart ✓{" "}
          <Link to="/cart" className="font-medium underline">
            View cart
          </Link>
        </p>
      )}
    </div>
  );
}

export default AddToCart;