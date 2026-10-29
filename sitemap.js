import { allDishes } from "@/app/lib/dishes";

const SITE_URL = "https://addiseats.et";

export default function sitemap() {
    const staticRoutes = [
        { path: "", changeFrequency: "weekly", priority: 1 },
        { path: "/menu", changeFrequency: "daily", priority: 0.9 },
    ];

    return [
        ...staticRoutes.map(({ path, changeFrequency, priority }) => ({
        url: `${SITE_URL}${path}`,
        changeFrequency,
        priority,
        })),
        ...allDishes().map((dish) => ({
        url: `${SITE_URL}/menu/${dish.id}`,
        changeFrequency: "weekly",
        priority: 0.7,
        })),
    ];
}

