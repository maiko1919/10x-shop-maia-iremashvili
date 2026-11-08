import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Navigate, useNavigate } from "react-router";
import Container from "../components/Container";
import FormField from "../components/ui/FormField";
import SummaryLines from "../components/cart/SummaryLines";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { discountedPrice, formatPrice } from "../utils/format";
import { createOrder, saveOrder } from "../utils/orders";
import type { ShippingInfo } from "../types/order";

type ShippingErrors = Partial<Record<keyof ShippingInfo, string>>;

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
  const { items, subtotal, discount, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [values, setValues] = useState<ShippingInfo>({
    fullName: user.username,
    email: "",
    address: "",
    city: "",
  });
  const [errors, setErrors] = useState<ShippingErrors>({});
  const [submitting, setSubmitting] = useState(false);

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

    const order = createOrder({
      items,
      shipping: {
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        address: values.address.trim(),
        city: values.city.trim(),
      },
      subtotal,
      discount,
      shippingCost: shipping,
      total,
    });

    saveOrder(order);
    navigate(`/orders/${order.id}`, { state: { justPlaced: true } });
    clearCart();
  }

  // ცარიელი კალათით Checkout-ზე არაფერი გვესაქმება
  if (items.length === 0 && !submitting) {
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

          <p className="text-sm text-gray-500">
            This is a demo shop — no real payment will be taken.
          </p>

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

          <SummaryLines />
        </aside>
      </div>
    </Container>
  );
}

export default CheckoutPage;