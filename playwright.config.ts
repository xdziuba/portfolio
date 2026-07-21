import { defineConfig, devices } from "@playwright/test";

/**
 * Tests run against the production build, as the Next testing guide recommends —
 * dev-only behaviour (unminified output, HMR client, dev overlays) would make the
 * console-error assertions unreliable.
 *
 * Run `npm run build` first; an already-running server on :3000 is reused locally.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
