import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Keep Vercel preview deployments out of search results.
  const isProduction = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";
  return {
    rules: isProduction ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: new URL("/sitemap.xml", getSiteUrl()).toString(),
  };
}
