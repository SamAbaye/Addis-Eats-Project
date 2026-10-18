"use client";                                   // new, first line
import Link from "next/link";                   // was react-router-dom
import useCartStore from "@/app/store/useCartStore"; // adjust to your real path
import { placeOrder } from "@/app/orders/actions";
import { checkoutSchema } from "@/app/lib/checkoutSchema"; // moved, see step 3
// ...the rest of your imports stay

function Checkout({ user }) {                   // receives the signed-in user
  // your existing hooks...
  const [serverError, setServerError] = useState("");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);        // also import useEffect

  // in useForm defaultValues:  fullName: user.name,

  const onSubmit = async (data) => {
    setServerError("");
    const result = await placeOrder(
      items.map(({ id, qty }) => ({ id, qty })), // ids and quantities only, no prices
      data
    );
    if (result.error) return setServerError(result.error);
    setPlacedOrder({ ...data, id: result.orderId });
    setOrderPlaced(true);
    clearCart();
  };

  if (!mounted) return null;                    // put this just before `if (orderPlaced)`
}