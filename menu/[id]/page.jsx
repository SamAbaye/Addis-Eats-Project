import { getMenuData } from "../../lib/menu";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import image from "@/public/assets/habesha_food.jpg";



export async function generateStaticParams() {
  const data = await getMenuData();
  const dishes = data.categories.flatMap((cat) => cat.items);
  return dishes.map((d) => ({ id: d.id }));
}

function getSpiceRating(spiceLevel) {
  if (!spiceLevel) return 0;
  const match = spiceLevel.match(/(\d)\/3/);
  return match ? Number(match[1]) : 0;
}

export default async function SingleDishPage({ params }) {
  const { id } = await params;
  const data = await getMenuData();
  const dishes = data.categories.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
      category: cat.category,
    })),
  );

  const dish = dishes.find((selectedDish) => selectedDish.id === id);

  const isSpicy = getSpiceRating(dish.spiceLevel) >= 2;

  if (!dish) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/menu"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-stone-600 transition hover:text-amber-600"
      >
        ← Back to menu
      </Link>

      <article className="overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={image}
            alt={`${dish.nameEn} (${dish.nameAm})`}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 p-6 md:p-8">
          <span className="text-xs font-medium uppercase tracking-wide text-stone-500">
            {dish.category}
          </span>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-stone-900">
              {dish.nameEn}
            </h1>
            <h2 className="mt-1 text-xl text-stone-600">{dish.nameAm}</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {dish.isSpecial && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                ⭐ Special
              </span>
            )}
            {dish.isFasting && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                Fasting
              </span>
            )}
            {!dish.isFasting && isSpicy && (
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
                🌶️ Spicy
              </span>
            )}
          </div>

          <p className="text-2xl font-bold text-amber-600">
            {dish.priceETB} ETB
          </p>

          {dish.tagline && (
            <p className="text-lg italic text-stone-600">{dish.tagline}</p>
          )}

          <p className="leading-relaxed text-stone-700">{dish.description}</p>

          {(dish.spiceLevel || dish.servings) && (
            <dl className="grid grid-cols-2 gap-4 rounded-xl bg-stone-50 p-4 text-sm">
              {dish.spiceLevel && (
                <div>
                  <dt className="font-semibold text-stone-900">Spice level</dt>
                  <dd className="text-stone-600">{dish.spiceLevel}</dd>
                </div>
              )}
              {dish.servings && (
                <div>
                  <dt className="font-semibold text-stone-900">Servings</dt>
                  <dd className="text-stone-600">{dish.servings}</dd>
                </div>
              )}
            </dl>
          )}

          {dish.ingredients?.length > 0 && (
            <div>
              <h3 className="mb-2 font-semibold text-stone-900">Ingredients</h3>
              <ul className="grid list-inside list-disc gap-1 text-stone-700 sm:grid-cols-2">
                {dish.ingredients.map((ing) => (
                  <li key={ing}>{ing}</li>
                ))}
              </ul>
            </div>
          )}

          <div>{/* <button onClick={handleAdd}>Add To Cart</button> */}</div>
        </div>
      </article>
    </main>
  );
}
