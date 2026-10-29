import { ImageResponse } from "next/og";
import { getDish } from "@/app/lib/dishes";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Addis Eats dish details";

export default async function OpenGraphImage({ params }) {
  const { id } = await params;
  const dish = getDish(id);
  const name = dish?.nameEn ?? "Ethiopian favourites";
  const price = dish ? `${dish.priceETB} ETB` : "Addis Eats";
  const description = dish?.summary ?? "Freshly prepared Ethiopian food in Addis Ababa.";

  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0a1f3d", color: "#fff", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", color: "#fbbf24", fontSize: 30, fontWeight: 700 }}>ADDIS EATS · ETHIOPIAN KITCHEN</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>{name}</div>
        <div style={{ display: "flex", maxWidth: 1000, color: "#dbeafe", fontSize: 30 }}>{description.slice(0, 140)}</div>
        <div style={{ display: "flex", color: "#fbbf24", fontSize: 38, fontWeight: 700 }}>{price}</div>
      </div>
      <div style={{ display: "flex", fontSize: 24, color: "#cbd5e1" }}>Freshly prepared in Addis Ababa</div>
    </div>,
    size
  );
}
