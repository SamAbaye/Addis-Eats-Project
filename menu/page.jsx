import { Suspense } from "react";
import FilterShell from "./dish/FilterShell";


export default async function MenuPage() {

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
          Our Menu
        </h1>
        <p className="mt-2 text-stone-600">
          Traditional Ethiopian dishes, made fresh daily.
        </p>
      </header>

      <Suspense
        fallback={
          <p className="animate-pulse py-20 text-center text-stone-500">
            Loading dishes…
          </p>
        }
      >
        <FilterShell />
      </Suspense>
    </main>
  );
}
