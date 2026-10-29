import Link from "next/link";
import { getSession } from "@/app/lib/session";
import { signOut } from "@/app/auth/signin/actions";

export const instant = false;
export default async function AuthNav() {
  const user = await getSession();

  return (
    <nav
      aria-label="Account"
      className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-gray-600 divide-x divide-gray-200">
          <Link
            href="/checkout"
            className="pl-4 hover:text-blue-600 transition-colors"
          >
            Checkout
          </Link>

          <Link
            href="/orders"
            className="pl-4 hover:text-blue-600 transition-colors"
          >
            My orders
          </Link>

          {user?.role === "staff" && (
            <Link
              href="/kitchen"
              className="pl-4 text-purple-600 hover:text-purple-700 transition-colors font-semibold"
            >
              Kitchen
            </Link>
          )}
        </div>

        <div className="text-sm font-medium text-gray-700">
          {user ? (
            <form action={signOut} className="flex items-center gap-3">
              <span className="mr-2">
                Signed in as {" "}
                <strong className="text-gray-900 font-semibold m-2">
                  {user.name}
                </strong>
              </span>
              <button
                type="submit"
                className="px-3 py-1.5 text-xs text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-md transition-all font-semibold"
              >
                Sign out
              </button>
            </form>
          ): (
            null
          )}
        </div>
      </div>
    </nav>
  );
}
