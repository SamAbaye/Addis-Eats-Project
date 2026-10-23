import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession} from "@/app/lib/session";
import SignUpForm from "./SignUpForm";
import {getSafeNextPath} from '@/app/lib/redirects';


export default async function SignUpPage({ searchParams }) {
  const { next } = await searchParams;
  

  
  const user = await getSession();
  if (user) redirect(getSafeNextPath(next));

  return (
    <main className="mx-auto mt-16 w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Create account</h1>
      <SignUpForm next={next} />
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
      <Link href={next ? `/auth/signin?next=${encodeURIComponent(next)}` : "/auth/signin"}>
        Sign in
      </Link>
      </p>
    </main>
  );
}
