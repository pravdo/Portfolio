import { expect, test } from "@playwright/test";

test.describe("contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#contact");
  });

  test("shows field errors and focuses the first invalid field", async ({ page }) => {
    await page.getByRole("button", { name: "Send message" }).click();

    const name = page.getByLabel("Name");
    await expect(name).toHaveAttribute("aria-invalid", "true");
    await expect(name).toBeFocused();
    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
    await expect(page.locator("#contact").getByRole("alert")).toHaveText(
      "Please fix the highlighted fields.",
    );
  });

  test("keeps typed values after a validation error", async ({ page }) => {
    await page.getByLabel("Name").fill("Ada");
    await page.getByLabel("Email").fill("not-an-email");
    await page.getByLabel("Message").fill("Hello there, testing.");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByLabel("Email")).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByLabel("Name")).toHaveValue("Ada");
    await expect(page.getByLabel("Message")).toHaveValue("Hello there, testing.");
  });

  test("sends a valid message", async ({ page }) => {
    await page.getByLabel("Name").fill("Test Recruiter");
    await page.getByLabel("Email").fill("recruiter@example.com");
    await page.getByLabel("Message").fill("Hi! Testing the contact form end to end.");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByRole("status")).toContainText("Thanks, your message is on its way.");
  });

  test("offers a direct email link", async ({ page }) => {
    await expect(page.locator("#contact a[href^='mailto:']")).toBeVisible();
  });
});
