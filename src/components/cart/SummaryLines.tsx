import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/format";
import { FREE_SHIPPING_FROM, PROMO_PERCENT } from "../../utils/cartRules";

function SummaryLines() {
  const { subtotal, discount, shipping, total, promoCode } = useCart();
  const leftForFree = FREE_SHIPPING_FROM - (subtotal - discount);

  return (
    <>
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {promoCode && (
          <div className="flex justify-between text-emerald-700">
            <span>
              Discount ({promoCode} −{PROMO_PERCENT}%)
            </span>
            <span>−{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>
        {shipping > 0 && (
          <p className="text-xs text-gray-500">
            Add {formatPrice(leftForFree)} more for free shipping.
          </p>
        )}
      </div>

      <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-lg font-bold">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </>
  );
}

export default SummaryLines;