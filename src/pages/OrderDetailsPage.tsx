import { Link, useLocation, useNavigate, useParams } from "react-router";
import Container from "../components/Container";
import OrderStatusBadge from "../components/orders/OrderStatusBadge";
import NotFoundPage from "./NotFoundPage";
import { useCart } from "../hooks/useCart";
import { useNow } from "../hooks/useNow";
import { discountedPrice, formatPrice } from "../utils/format";
import { ORDER_STATUSES, getOrderStatus, loadOrders } from "../utils/orders";

// state-ში justPlaced: true მოდის მხოლოდ Checkout-იდან
function isJustPlaced(state: unknown): boolean {
  return typeof state === "object" && state !== null && "justPlaced" in state && state.justPlaced === true;
}

function OrderDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addItems } = useCart();
  const now = useNow(30000);

  const order = loadOrders().find((item) => String(item.id) === id);

  if (!order) {
    return <NotFoundPage />;
  }

  const status = getOrderStatus(order, now);
  const statusIndex = ORDER_STATUSES.indexOf(status);

  function handleReorder() {
    if (!order) return;
    addItems(order.items);
    navigate("/cart");
  }

  return (
    <Container>
      {isJustPlaced(location.state) && (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800">
          <p className="text-lg font-semibold">✓ Thank you! Your order has been placed.</p>
          <p className="mt-1 text-sm">We sent the details to {order.shipping.email}.</p>
        </div>
      )}

      <Link to="/orders" className="text-sm font-medium text-gray-600 hover:text-emerald-700">
        ← My orders
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Order #{order.number}</h1>
          <p className="text-sm text-gray-500">{new Date(order.placedAt).toLocaleString("en-US")}</p>
        </div>
        <OrderStatusBadge status={status} />
      </div>

      <ol className="mt-6 flex flex-wrap gap-2 rounded-2xl border border-gray-200 bg-white p-4">
        {ORDER_STATUSES.map((step, index) => (
          <li
            key={step}
            className={`flex items-center gap-2 text-sm font-medium ${
              index <= statusIndex ? "text-emerald-700" : "text-gray-400"
            }`}
          >
            <span aria-hidden="true">{index <= statusIndex ? "✓" : "○"}</span>
            {step}
            {index < ORDER_STATUSES.length - 1 && (
              <span aria-hidden="true" className="mx-2 text-gray-300">
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold">Items</h2>
          <ul className="mt-4 divide-y divide-gray-100">
            {order.items.map((item) => {
              const unitPrice = discountedPrice(item.price, item.discountPercentage);
              return (
                <li key={item.productId} className="flex items-center gap-4 py-3">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    width={56}
                    height={56}
                    loading="lazy"
                    className="h-14 w-14 rounded-lg bg-gray-100 object-contain"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} × {formatPrice(unitPrice)}
                    </p>
                  </div>
                  <span className="font-semibold">{formatPrice(unitPrice * item.quantity)}</span>
                </li>
              );
            })}
          </ul>
        </section>

        <aside className="flex h-fit flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6">
          <div>
            <h2 className="text-lg font-semibold">Shipping to</h2>
            <p className="mt-2 text-sm text-gray-700">
              {order.shipping.fullName}
              <br />
              {order.shipping.address}, {order.shipping.city}
              <br />
              {order.shipping.email}
            </p>
          </div>

          <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount</span>
                <span>−{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>{order.shippingCost === 0 ? "Free" : formatPrice(order.shippingCost)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReorder}
            className="rounded-lg bg-emerald-600 px-4 py-2.5 font-medium text-white hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            Reorder
          </button>
        </aside>
      </div>
    </Container>
  );
}

export default OrderDetailsPage;