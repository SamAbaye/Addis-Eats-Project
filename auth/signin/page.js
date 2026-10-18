import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, safeNext } from "@/app/lib/session";
import SignInForm from "./SignInForm";

export default async function SignInPage({ searchParams }) {
  const { next } = await searchParams;
  const destination = safeNext(next); 

  const user = await getSession();
  if (user) redirect(destination);

  return (
    <main className="mx-auto mt-16 w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Sign in</h1>
      <SignInForm next={destination} />
      <p className="mt-4 text-center text-sm text-gray-600">
        New here?{" "}
        <Link
          href={`/auth/signup?next=${encodeURIComponent(destination)}`}
          className="font-medium text-amber-700 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </main>
  );
}
