import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return [{ url: base.toString(), changeFrequency: "monthly", priority: 1 }];
}
