import Link from "next/link";
import { getSession } from "@/app/lib/session";
import { signOut } from "@/app/auth/signin/actions";

export const instant = false;
export default async function AuthNav() {
  const user = await getSession();

  return (
    <nav aria-label="Account">
      <Link href="/menu">Menu</Link> · <Link href="/checkout">Checkout</Link> ·{" "}
      <Link href="/orders">My orders</Link>
      {user?.role === "staff" && (
        <>
          {" "}
          · <Link href="/kitchen">Kitchen</Link>
        </>
      )}
      {" "}·{" "}
      {user ? (
        <form action={signOut} style={{ display: "inline" }}>
          Signed in as {user.name} <button type="submit">Sign out</button>
        </form>
      ) : (
        <Link href="/signin">Sign in</Link>
      )}
    </nav>
  );
}
