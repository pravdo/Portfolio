/**
 * Canonical site URL, used for metadata, sitemap and structured data.
 * NEXT_PUBLIC_SITE_URL wins (custom domain); on Vercel fall back to the production
 * domain it provides; locally, localhost.
 */
export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("http://localhost:3000");
}
