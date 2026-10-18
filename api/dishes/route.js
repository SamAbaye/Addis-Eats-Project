import { pageDishes, searchDishes } from "@/lib/dishes";

// ?q=tibs  -> search results
// ?page=2  -> one page of the full list
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (q !== null) {
    return Response.json({ dishes: searchDishes(q) });
  }
  return Response.json(pageDishes(searchParams.get("page")));
}
