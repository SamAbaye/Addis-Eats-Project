const SITE_URL = "https://addiseats.et";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
