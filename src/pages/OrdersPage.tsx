import { useState } from "react";
import { Link } from "react-router";
import Container from "../components/Container";
import OrderStatusBadge from "../components/orders/OrderStatusBadge";
import { useNow } from "../hooks/useNow";
import { formatPrice } from "../utils/format";
import { getOrderStatus, loadOrders } from "../utils/orders";

function OrdersPage() {
  const [orders] = useState(loadOrders);
  const now = useNow(30000);

  if (orders.length === 0) {
    return (
      <Container>
        <div className="py-16 text-center">
          <div aria-hidden="true" className="mb-3 text-5xl">
            📦
          </div>
          <h1 className="text-2xl font-bold">You have no orders yet.</h1>
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
      <h1 className="mb-6 text-2xl font-bold">My orders</h1>

      <ul className="flex flex-col gap-4">
        {orders.map((order) => {
          const itemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
          return (
            <li key={order.id}>
              <Link
                to={`/orders/${order.id}`}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-sm"
              >
                <div>
                  <p className="font-semibold text-gray-900">Order #{order.number}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.placedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    · {itemsCount} item(s)
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold">{formatPrice(order.total)}</span>
                  <OrderStatusBadge status={getOrderStatus(order, now)} />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

export default OrdersPage;