import DishCard from  '../../menu/dish/DishCard';
import fs from "fs/promises";
import path from "path";

async function getMenuData() {
  const filePath = path.join(process.cwd(), "public", "menu.json");
  const fileContents = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContents);
}
async function SpecialDisplay() {
  const data = await getMenuData();

  const dishes = data.categories.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
      category: cat.category,
    })),
  );
  

  const loading = false;
  const error = null;

  let content;
  if (loading) {
    content = <p>Loading the menu…</p>;
  } else if (error) {
    content = <p className="err">{error}</p>;
  } else if (!dishes.length === 0) {
    content = <p>No dishes yet.</p>;
  } else {
    content = dishes.map((d) =>  d.isSpecial && <DishCard key={d.id} {...d} />);
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {content}
    </div>
  );
}

export default SpecialDisplay;
