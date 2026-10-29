import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Addis Eats Ethiopian food delivery in Addis Ababa";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#0a1f3d", color: "#fff", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", color: "#fbbf24", fontSize: 30, fontWeight: 700 }}>ADDIS EATS</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", fontSize: 82, fontWeight: 700 }}>A taste of Ethiopia</div>
        <div style={{ display: "flex", color: "#dbeafe", fontSize: 38 }}>Freshly prepared favourites, delivered in Addis Ababa</div>
      </div>
      <div style={{ display: "flex", color: "#fbbf24", fontSize: 28 }}>ADDIS EATS · ETHIOPIAN KITCHEN</div>
    </div>,
    size
  );
}
