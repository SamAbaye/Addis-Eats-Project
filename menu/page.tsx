import { Suspense } from "react";
import fs from "fs/promises";
import path from "path";
import FilterShell from "./dish/FilterShell";


type Item = Record<string, unknown>;
type Category = { category: string; items: Item[] };

async function getMenuData(): Promise<{ categories: Category[] }> {
  const filePath = path.join(process.cwd(), "public", "menu.json");
  const fileContents = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContents);
}

export default async function MenuPage() {
  const data = await getMenuData();

  const dishes = data.categories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.category })),
  );

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
        <FilterShell dishes={dishes} />
      </Suspense>
    </main>
  );
}
