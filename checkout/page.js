import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/session"; 
import CheckoutForm from "./CheckoutForm";


async function CheckoutGate() {
  const user = await getSession();
  if (!user) redirect("/auth/signin?next=/checkout");
  return <CheckoutForm user={user} />;
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<p>Loading checkout…</p>}>
      <CheckoutGate />
    </Suspense>
  );
}
