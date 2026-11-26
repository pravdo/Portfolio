import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("renders every section with its heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    for (const id of ["projects", "experience", "skills", "certifications", "contact"]) {
      await expect(page.locator(`section#${id} h2`)).toBeVisible();
    }
    await expect(page.locator("article[id^='project-']").first()).toBeVisible();
  });

  test("has no detectable accessibility violations (light and dark)", async ({ page }) => {
    for (const scheme of ["light", "dark"] as const) {
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto("/");
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations, `${scheme} theme`).toEqual([]);
    }
  });

  test("hero fits the first screen on a phone", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile only");
    await page.goto("/");
    const viewport = page.viewportSize()!;
    const cta = page.getByRole("link", { name: "View projects" });
    const box = await cta.boundingBox();
    expect(box!.y + box!.height).toBeLessThanOrEqual(viewport.height);
  });

  test("theme toggle switches and persists across reloads", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    const html = page.locator("html");
    const toggle = page.getByRole("button", { name: "Dark theme" });

    await expect(html).toHaveAttribute("data-theme", "light");
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await toggle.click();
    await expect(html).toHaveAttribute("data-theme", "dark");
    await expect(toggle).toHaveAttribute("aria-pressed", "true");

    await page.reload();
    await expect(html).toHaveAttribute("data-theme", "dark");
  });

  test("keyboard: first Tab reveals the skip link and it moves focus to main", async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== "chromium");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press("Enter");
    await expect(page.locator("main#main")).toBeFocused();
  });

  test("skill 'used in' links point at real anchors on the page", async ({ page }) => {
    await page.goto("/");
    const hrefs = await page
      .locator("#skills a[href^='#']")
      .evaluateAll((links) => [...new Set(links.map((a) => a.getAttribute("href")!))]);
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      await expect(page.locator(href), href).toHaveCount(1);
    }
  });

  test("CV download, metadata routes and OG image respond", async ({ request }) => {
    for (const [path, type] of [
      ["/cv.pdf", "application/pdf"],
      ["/opengraph-image", "image/png"],
      ["/sitemap.xml", "application/xml"],
      ["/robots.txt", "text/plain"],
    ] as const) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
      expect(res.headers()["content-type"], path).toContain(type);
    }
  });

  test("unknown routes show the 404 page", async ({ page }) => {
    const res = await page.goto("/does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("link", { name: "Back to the homepage" })).toBeVisible();
  });

  test("structured data is valid JSON with a Person", async ({ page }) => {
    await page.goto("/");
    const json = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(json!) as { "@graph": { "@type": string }[] };
    expect(data["@graph"].some((node) => node["@type"] === "Person")).toBe(true);
  });
});
