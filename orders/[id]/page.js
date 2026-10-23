import { notFound, redirect } from "next/navigation";
import { getSession } from "@/app/lib/session";
import { getOrder } from "@/app/lib/orders";
import AuthNav from "@/app/component/AuthNav";
import OrderStatus from "./OrderStatus";

export default async function OrderPage({ params }) {
  const { id } = await params;

  const user = await getSession();
  if (!user) redirect(`/signin?next=${encodeURIComponent(`/orders/${id}`)}`);

  const order = getOrder(id);
  
  if (!order || (order.userId !== user.id && user.role !== "staff")) notFound();

  return (
    <main>
      <AuthNav />
      <h1>Order #{id}</h1>
      <OrderStatus id={id} initial={{ id: order.id, status: order.status }} />
    </main>
  );
}
