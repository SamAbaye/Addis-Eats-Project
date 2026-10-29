"use client";

import { useActionState } from "react";
import { signUp } from "./actions";

const input =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40";
const label = "mb-1 block text-sm font-medium text-gray-700";

export default function SignUpForm({ next }) {
  const [state, formAction, pending] = useActionState(signUp, null);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next} />

      <div>
        <label htmlFor="name" className={label}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={60}
          defaultValue={state?.values?.name ?? ""}
          className={input}
        />
      </div>

      <div>
        <label htmlFor="phone" className={label}>
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="0911 234 567"
          required
          defaultValue={state?.values?.phone ?? ""}
          className={input}
        />
      </div>

      <div>
        <label htmlFor="password" className={label}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className={input}
        />
        <p className="mt-1 text-xs text-gray-500">At least 8 characters.</p>
      </div>

      <div>
        <label htmlFor="confirm" className={label}>
          Confirm password
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className={input}
        />
      </div>

      {state?.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}
