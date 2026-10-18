import DishCard from "./DishCard";
import { getMenuData } from "../../lib/menu";

export default async function DishList() {
  const data = await getMenuData();

  const dishes = data.categories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.category })),
  );
  console.log(dishes)
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {dishes.map((d) => (
        <DishCard key={d.id} {...d} />
      ))}
    </div>
  );
}
