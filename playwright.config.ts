import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: isCI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
    // Locally, use the installed Chrome; CI installs Playwright's Chromium.
    ...(isCI ? {} : { channel: "chrome" }),
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    // Test the production build. CI builds in an earlier step; locally we build here.
    command: isCI ? `pnpm start -p ${PORT}` : `pnpm build && pnpm start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !isCI,
    timeout: 180_000,
    // Console mailer, no captcha: the contact form works without any cloud accounts.
    env: { MAILER: "console", NEXT_PUBLIC_TURNSTILE_SITE_KEY: "", TURNSTILE_SECRET_KEY: "" },
  },
});
