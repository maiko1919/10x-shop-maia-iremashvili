import { Link } from "react-router";
import QuantityStepper from "../ui/QuantityStepper";
import { discountedPrice, formatPrice } from "../../utils/format";
import type { CartItem } from "../../types/cart";

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
  const unitPrice = discountedPrice(item.price, item.discountPercentage);

  return (
    <li className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4">
      <Link to={`/products/${item.productId}`} className="shrink-0">
        <img
          src={item.thumbnail}
          alt={item.title}
          width={96}
          height={96}
          className="h-20 w-20 rounded-xl bg-gray-100 object-contain p-2 sm:h-24 sm:w-24"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <Link
            to={`/products/${item.productId}`}
            className="font-semibold text-gray-900 hover:text-emerald-700"
          >
            {item.title}
          </Link>
          <p className="text-sm text-gray-500">{formatPrice(unitPrice)} each</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <QuantityStepper value={item.quantity} max={item.stock} onChange={onQuantityChange} />
          <span className="font-semibold sm:w-20 sm:text-right">
            {formatPrice(unitPrice * item.quantity)}
          </span>
          <button
            type="button"
            onClick={onRemove}
            className="py-2 text-sm font-medium text-red-600 hover:text-red-700 focus:outline-none focus-visible:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}

export default CartItemRow;