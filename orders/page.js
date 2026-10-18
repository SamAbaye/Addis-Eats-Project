import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrdersFor } from "@/lib/orders";
import { cancelOrder } from "./actions";
import AuthNav from "@/app/component/AuthNav";

export default async function OrdersPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/orders");

  
  const orders = getOrdersFor(user.id);

  return (
    <main>
      <AuthNav />
      <h1>My orders</h1>
      {orders.length === 0 && <p>No orders yet. Try the checkout.</p>}
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <Link href={`/orders/${order.id}`}>Order #{order.id}</Link> ·{" "}
            {order.items.map((i) => i.name).join(", ")} · {order.totalETB} ETB ·{" "}
            {order.status}
            {order.status !== "Delivered" && order.status !== "Cancelled" && (
              <form action={cancelOrder.bind(null, order.id)} style={{ display: "inline" }}>
                {" "}
                <button type="submit">Cancel</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
