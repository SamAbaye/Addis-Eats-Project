import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/session";
import CheckoutForm from "./CheckoutForm";

export const metadata = {
  title: "Checkout",
  description: "Confirm your delivery details and place your Addis Eats order securely.",
};

async function CheckoutGate() {
  const user = await getSession();
  if (!user) redirect("/auth/signin?next=/checkout");
  return <CheckoutForm user={user} />;
}

export default function CheckoutPage() {
  return <Suspense fallback={<p>Loading checkout…</p>}><CheckoutGate /></Suspense>;
}
