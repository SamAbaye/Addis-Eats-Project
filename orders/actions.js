"use server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/app/lib/session";
import { getDish } from "@/app/lib/dishes";
import { createOrder, getOrder, markCancelled } from "@/app/lib/orders";
import checkoutSchema  from "@/app/lib/checkoutSchema";

export async function placeOrder(cart, details) {
  const user = await getSession();
  if (!user) return { error: "Please sign in again." };

  const parsed = checkoutSchema.safeParse(details);
  if (!parsed.success) return { error: "Please check your delivery details." };

  const wanted = new Map();
  for (const line of Array.isArray(cart) ? cart.slice(0, 50) : []) {
    const dish = getDish(String(line?.id));
    if (!dish) continue; 
    const qty = Math.min(Math.max(Math.trunc(Number(line?.qty)) || 1, 1), 20);
    const prev = wanted.get(dish.id)?.qty ?? 0;
    wanted.set(dish.id, { ...dish, qty: Math.min(prev + qty, 20) });
  }
  const items = [...wanted.values()];
  if (items.length === 0) return { error: "Your cart is empty." };

  const order = createOrder(user.id, items, parsed.data); 
  return { ok: true, orderId: order.id };
}

export async function cancelOrder(orderId) {
  const user = await getSession();
  if (!user) throw new Error("Not signed in"); 

  const order = getOrder(orderId);
  if (!order) throw new Error("No such order"); 
  if (order.userId !== user.id) throw new Error("Not yours"); 
  if (order.status === "Delivered") throw new Error("Already delivered");

  markCancelled(orderId);
  revalidatePath("/orders");
  revalidatePath(`/orders/${orderId}`);
}
