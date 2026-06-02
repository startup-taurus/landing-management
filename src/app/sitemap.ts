import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const anchors = [
    { hash: "#caracteristicas", priority: 0.8 },
    { hash: "#vistas", priority: 0.8 },
    { hash: "#como-funciona", priority: 0.7 },
    { hash: "#planes", priority: 0.9 },
    { hash: "#faq", priority: 0.6 },
    { hash: "#contacto", priority: 0.9 },
  ];

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...anchors.map((a) => ({
      url: `${SITE_URL}/${a.hash}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: a.priority,
    })),
  ];
}
