import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, Navigate } from "react-router";
import Container from "../components/Container";
import FormField from "../components/ui/FormField";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { discountedPrice, formatPrice } from "../utils/format";
import type { ShippingInfo } from "../types/order";

type ShippingErrors = Partial<Record<keyof ShippingInfo, string>>;

interface PlacedOrder {
  fullName: string;
  itemsCount: number;
  total: number;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: ShippingInfo): ShippingErrors {
  const errors: ShippingErrors = {};

  if (values.fullName.trim().length < 3) {
    errors.fullName = "Full name must be at least 3 characters";
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address";
  }
  if (values.address.trim().length < 5) {
    errors.address = "Address must be at least 5 characters";
  }
  if (values.city.trim() === "") {
    errors.city = "City is required";
  }

  return errors;
}

function CheckoutPage() {
  const { user } = useAuth();
  const { items, totalQuantity, subtotal, clearCart } = useCart();

  const [values, setValues] = useState<ShippingInfo>({
    fullName: user.username,
    email: "",
    address: "",
    city: "",
  });
  const [errors, setErrors] = useState<ShippingErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const newErrors = validate(values);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    setPlacedOrder({
      fullName: values.fullName.trim(),
      itemsCount: totalQuantity,
      total: subtotal,
    });
    clearCart();
  }

  // შეკვეთა გაფორმდა — დადასტურება
  if (placedOrder) {
    return (
      <Container>
        <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
            ✓
          </div>
          <h1 className="mt-4 text-2xl font-bold">Thank you! Your order has been placed.</h1>
          <p className="mt-2 text-gray-600">
            {placedOrder.fullName}, we received your order of {placedOrder.itemsCount} item(s).
          </p>
          <p className="mt-4 text-lg">
            Total: <span className="font-bold text-emerald-700">{formatPrice(placedOrder.total)}</span>
          </p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700"
          >
            Continue shopping
          </Link>
        </div>
      </Container>
    );
  }

  // ცარიელი კალათით Checkout-ზე არაფერი გვესაქმება
  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <Container>
      <h1 className="mb-6 text-2xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-2"
        >
          <h2 className="text-lg font-semibold">Shipping details</h2>

          <FormField
            id="fullName"
            label="Full name"
            value={values.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />
          <FormField
            id="email"
            label="Email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />
          <FormField
            id="address"
            label="Address"
            value={values.address}
            onChange={handleChange}
            error={errors.address}
          />
          <FormField
            id="city"
            label="City"
            value={values.city}
            onChange={handleChange}
            error={errors.city}
          />

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-lg bg-emerald-600 px-4 py-3 font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Place order
          </button>
        </form>

        <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Order summary</h2>

          <ul className="mt-4 space-y-3 text-sm">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between gap-4">
                <span className="text-gray-700">
                  {item.title} × {item.quantity}
                </span>
                <span className="shrink-0 font-medium">
                  {formatPrice(discountedPrice(item.price, item.discountPercentage) * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </aside>
      </div>
    </Container>
  );
}

export default CheckoutPage;