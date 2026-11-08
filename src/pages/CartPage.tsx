import { Link, useNavigate } from "react-router";
import Container from "../components/Container";
import CartItemRow from "../components/cart/CartItemRow";
import PromoCodeForm from "../components/cart/PromoCodeForm";
import SummaryLines from "../components/cart/SummaryLines";
import { useCart } from "../hooks/useCart";

function CartPage() {
  const { items, totalQuantity, setQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  function handleClear() {
    if (window.confirm("Clear the cart? This cannot be undone.")) {
      clearCart();
    }
  }

  if (items.length === 0) {
    return (
      <Container>
        <div className="py-16 text-center">
          <div aria-hidden="true" className="mb-3 text-5xl">
            🛒
          </div>
          <h1 className="text-2xl font-bold">Your cart is empty.</h1>
          <p className="mt-2 text-gray-600">Looks like you have not added anything yet.</p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700"
          >
            Browse products
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="mb-6 text-2xl font-bold">Your cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <CartItemRow
                key={item.productId}
                item={item}
                onQuantityChange={(quantity) => setQuantity(item.productId, quantity)}
                onRemove={() => removeItem(item.productId)}
              />
            ))}
          </ul>

          <button
            type="button"
            onClick={handleClear}
            className="mt-4 text-sm font-medium text-red-600 hover:text-red-700"
          >
            Clear cart
          </button>
        </div>

        <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <p className="mt-1 text-sm text-gray-500">{totalQuantity} item(s)</p>

          <PromoCodeForm />
          <SummaryLines />

          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="mt-6 w-full rounded-lg bg-emerald-600 px-4 py-3 font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            Proceed to checkout
          </button>
        </aside>
      </div>
    </Container>
  );
}

export default CartPage;