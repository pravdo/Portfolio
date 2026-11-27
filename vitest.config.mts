import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      // `server-only` throws outside Next's server bundle; tests run server code directly.
      "server-only": path.resolve(import.meta.dirname, "tests/stubs/empty.ts"),
    },
  },
  test: {
    // Unit tests cover pure logic (schemas, actions, mailer). UI is covered by Playwright E2E.
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
  },
});
