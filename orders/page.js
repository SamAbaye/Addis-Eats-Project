import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/session";
import { getOrdersFor } from "@/app/lib/orders";
import { cancelOrder } from "./actions";
import AuthNav from "@/app/component/AuthNav";
export default async function OrdersPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/orders");

  
  const orders = getOrdersFor(user.id);
  
  


  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <AuthNav />
      <div className="mt-8 mb-6 border-b border-gray-100 pb-4">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          My Orders
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          View your order details and delivery tracks.
        </p>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12 bg-gray-50 border border-dashed rounded-xl mt-6">
          <p className="text-gray-500 font-medium">No orders found yet.</p>
          <Link
            href="/checkout"
            className="mt-3 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
          >
            Go to checkout &rarr;
          </Link>
        </div>
      )}
      <ul className="space-y-4 mt-6">
        {orders.map((order) => {
          const isDelivered = order.status === "Delivered";
          const isCancelled = order.status === "Cancelled";
          const canCancel = !isDelivered && !isCancelled;

          return (
            <li
              key={order.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <Link
                    href={`/orders/${order.id}`}
                    className="text-lg font-bold text-blue-600 hover:text-blue-700 transition underline-offset-2 hover:underline"
                  >
                    Order #{order.id}
                  </Link>
                  <span
                    className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                      isDelivered
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : isCancelled
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 font-normal leading-relaxed">
                  <span className="font-medium text-gray-800">Items: </span>
                  {order.items.map((i) => i.name).join(", ")}
                </p>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    Total Amount
                  </p>
                  <p className="text-lg font-black text-gray-900 font-mono">
                    {order.totalETB.toLocaleString()}{" "}
                    <span className="text-xs font-bold text-gray-500">ETB</span>
                  </p>
                </div>
                {canCancel && (
                  <form
                    action={cancelOrder.bind(null, order.id)}
                    className="inline-block"
                  >
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 rounded-lg transition-all focus:ring-2 focus:ring-red-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </form>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </main>
);
}
