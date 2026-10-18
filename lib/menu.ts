
import fs from "fs/promises";
import path from "path";

export type { Dish, Category, MenuData }; 

type Dish = {
    id: string;
    slug: string;
    nameEn: string;
    nameAm?: string;
    priceETB: number;
    foodImage: string;
    spiceLevel?: string;
    isFasting?: boolean;
    isSpecial?: boolean;
    secondaryBadge?: { label: string; className: string };
};

type Category = {
    category: string;
    items: Dish[];
};

type MenuData = {
    categories: Category[];
};
export async function getMenuData(): Promise<MenuData> {
    const filePath = path.join(process.cwd(), "public", "menu.json");
    return JSON.parse(await fs.readFile(filePath, "utf-8"));
}
