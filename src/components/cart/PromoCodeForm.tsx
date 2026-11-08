import { useState } from "react";
import type { FormEvent } from "react";
import { useCart } from "../../hooks/useCart";

function PromoCodeForm() {
  const { promoCode, applyPromo, removePromo } = useCart();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (applyPromo(code)) {
      setCode("");
      setError(null);
    } else {
      setError("Invalid promo code");
    }
  }

  if (promoCode) {
    return (
      <div className="mt-4 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 text-sm">
        <span>
          Promo <span className="font-semibold">{promoCode}</span> applied
        </span>
        <button
          type="button"
          onClick={removePromo}
          className="font-medium text-red-600 hover:underline"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-4">
      <label htmlFor="promo" className="mb-1 block text-sm font-medium text-gray-700">
        Promo code
      </label>
      <div className="flex gap-2">
        <input
          id="promo"
          value={code}
          onChange={(event) => {
            setCode(event.target.value);
            setError(null);
          }}
          aria-invalid={error ? true : undefined}
          className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 aria-invalid:border-red-500"
        />
        <button
          type="submit"
          className="rounded-lg border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
        >
          Apply
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      <p className="mt-1 text-xs text-gray-500">Try 10X10 for 10% off</p>
    </form>
  );
}

export default PromoCodeForm;