import menu from "@/public/menu.json";

const DISHES = menu.categories.flatMap((group) =>
  group.items.map((item) => ({
    ...item,
    name: item.nameEn,
    summary: item.description,
    category: group.category,
  }))
);

export const PAGE_SIZE = 6;

export function allDishes() {
  return DISHES;
}

export function getDish(id) {
  return DISHES.find((dish) => dish.id === id) ?? null;
}

export function searchDishes(q = "") {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  return DISHES.filter((dish) =>
    [dish.nameEn, dish.nameAm, dish.category, ...(dish.ingredients ?? [])]
      .join(" ")
      .toLowerCase()
      .includes(term)
  );
}

export function pageDishes(page = 1) {
  const totalPages = Math.max(1, Math.ceil(DISHES.length / PAGE_SIZE));
  const currentPage = Math.min(totalPages, Math.max(1, Number(page) || 1));
  const start = (currentPage - 1) * PAGE_SIZE;
  return {
    page: currentPage,
    totalPages,
    dishes: DISHES.slice(start, start + PAGE_SIZE),
  };
}
