
import menu from "@/public/menu.json";

const DISHES = menu.categories.flatMap((group) =>
  group.items.map((item) => ({
    ...item,
    name: item.nameEn,
    category: group.category,
  }))
);

export const PAGE_SIZE = 6;

export function allDishes() {
  return DISHES;
}

export function getDish(id) {
  const dish = DISHES.find((d) => d.id === id);
  return dish ? { id: dish.id, name: dish.nameEn, priceETB: dish.priceETB } : null;
}

export function searchDishes(q = "") {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  return DISHES.filter((d) =>
    [d.nameEn, d.nameAm, d.category, ...(d.ingredients ?? [])]
      .join(" ")
      .toLowerCase()
      .includes(term)
  );
}

export function pageDishes(page = 1) {
  const totalPages = Math.max(1, Math.ceil(DISHES.length / PAGE_SIZE));
  const p = Math.min(totalPages, Math.max(1, Number(page) || 1));
  const start = (p - 1) * PAGE_SIZE;
  return {
    page: p,
    totalPages,
    dishes: DISHES.slice(start, start + PAGE_SIZE),
  };
}
