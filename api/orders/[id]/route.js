import { getSession } from "@/app/lib/session";
import { getOrder } from "@/app/lib/orders";

export async function GET(_request, { params }) {
  const { id } = await params;

  const user = await getSession();
  if (!user) return Response.json({ error: "Not signed in" }, { status: 401 });

  const order = getOrder(id);
  if (!order) return Response.json({ error: "No such order" }, { status: 404 });
  if (order.userId !== user.id && user.role !== "staff") {
    return Response.json({ error: "Not yours" }, { status: 403 });
  }

  return Response.json({ id: order.id, status: order.status });
}
