import { expect, test, type Page } from "@playwright/test";

/**
 * End-to-end checks for the localised single page.
 *
 * These cover the promises that are easy to break silently: the page must be
 * readable without motion, usable from the keyboard, free of horizontal scroll at
 * every target width, complete when the GitHub API is unreachable, and genuinely
 * translated rather than half-English.
 */

const WIDTHS = [320, 375, 768, 1024, 1440, 1920];
const LOCALES = ["en", "pl"] as const;

async function collectConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

test.describe("routing", () => {
  test("redirects the bare root to the default locale", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/en$/);
  });

  test("serves an unknown locale as a 404 rather than rendering it", async ({ page }) => {
    const response = await page.goto("/de");
    expect(response?.status()).toBe(404);
  });
});

for (const locale of LOCALES) {
  test.describe(`page shell (${locale})`, () => {
    test("renders every section with no console errors", async ({ page }) => {
      const errors = await collectConsoleErrors(page);

      await page.goto(`/${locale}`);

      await expect(page.getByRole("main")).toBeVisible();
      await expect(page.locator("h1")).toHaveCount(1);

      for (const id of ["work", "stack", "about", "repositories", "contact"]) {
        await expect(page.locator(`#${id}`)).toBeAttached();
      }

      expect(errors, `console errors: ${errors.join(" | ")}`).toEqual([]);
    });

    test("declares the right lang attribute and canonical alternates", async ({ page }) => {
      await page.goto(`/${locale}`);

      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/${locale}$`));
      // hreflang for both languages, so neither is treated as a duplicate.
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
      await expect(page.locator('link[rel="alternate"][hreflang="pl"]')).toHaveCount(1);
    });

    test("exposes real project content from the snapshot", async ({ page }) => {
      await page.goto(`/${locale}`);

      await expect(page.getByRole("heading", { name: "LumaShell", exact: true })).toBeVisible();
      await expect(page.getByRole("heading", { name: "What2Buy", exact: true })).toBeVisible();

      const repos = page.locator("#repositories");
      await expect(repos.getByText("18", { exact: true })).toBeVisible();
    });

    test("ships structured data in the right language", async ({ page }) => {
      await page.goto(`/${locale}`);

      const raw = await page.locator('script[type="application/ld+json"]').innerText();
      const data = JSON.parse(raw);
      const types = data["@graph"].map((n: { "@type": string }) => n["@type"]);

      expect(types).toContain("Person");
      expect(types).toContain("SoftwareSourceCode");

      const site = data["@graph"].find((n: { "@type": string }) => n["@type"] === "WebSite");
      expect(site.inLanguage).toBe(locale);
    });
  });
}

test.describe("language switch", () => {
  test("moves between locales and changes the content", async ({ page }) => {
    await page.goto("/en");
    const englishHeadline = await page.locator("h1").innerText();

    await page.getByRole("link", { name: /PL — Polski/i }).first().click();
    await expect(page).toHaveURL(/\/pl$/);

    const polishHeadline = await page.locator("h1").innerText();
    expect(polishHeadline).not.toBe(englishHeadline);
    await expect(page.locator("html")).toHaveAttribute("lang", "pl");

    // and back again
    await page.getByRole("link", { name: /EN — English/i }).first().click();
    await expect(page).toHaveURL(/\/en$/);
    expect(await page.locator("h1").innerText()).toBe(englishHeadline);
  });

  test("marks the active language for assistive technology", async ({ page }) => {
    await page.goto("/pl");
    const active = page.locator('[aria-current="true"]').first();
    await expect(active).toContainText("PL");
  });

  test("is a real link, so it works without client JavaScript", async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto("/en");

    await page.getByRole("link", { name: /PL — Polski/i }).first().click();
    await expect(page).toHaveURL(/\/pl$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "pl");

    await ctx.close();
  });

  test("does not leave English strings on the Polish page", async ({ page }) => {
    await page.goto("/pl");

    const body = await page.locator("main").innerText();
    // Section headings and labels that would betray an untranslated fragment.
    for (const leftover of ["Selected work", "Technical profile", "Get in touch", "Repository overview", "One detail"]) {
      expect(body, `untranslated: ${leftover}`).not.toContain(leftover);
    }
  });
});

test.describe("responsive layout", () => {
  for (const width of WIDTHS) {
    test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/pl");
      await page.waitForLoadState("networkidle");

      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth };
      });

      expect(overflow.scrollWidth, `overflow at ${width}px`).toBeLessThanOrEqual(overflow.clientWidth + 1);
    });
  }

  test("keeps the headline from collapsing into single-word lines on a narrow screen", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    // Polish is the longer headline, so it is the harder case.
    await page.goto("/pl");

    const box = await page.getByRole("heading", { level: 1 }).boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeLessThanOrEqual(320);
    expect(box!.height).toBeLessThan(460);
  });
});

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("opens, navigates and closes with Escape", async ({ page }) => {
    await page.goto("/en");

    const toggle = page.getByRole("button", { name: /open menu/i });
    await expect(toggle).toBeVisible();

    const box = await toggle.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);

    await toggle.click();
    await expect(page.getByRole("button", { name: /close menu/i })).toBeVisible();
    await expect(page.locator("#mobile-nav")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-nav")).toBeHidden();
    await expect(toggle).toBeFocused();
  });

  test("keeps the language switch reachable without opening the menu", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("link", { name: /PL — Polski/i }).first()).toBeVisible();
  });
});

test.describe("keyboard access", () => {
  test("reaches the skip link first and it targets main content", async ({ page }) => {
    await page.goto("/en");
    await page.keyboard.press("Tab");

    const skip = page.getByRole("link", { name: /skip to content/i });
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute("href", "#main");
  });

  test("gives every link and control an accessible name", async ({ page }) => {
    await page.goto("/pl");

    const unnamed = await page.evaluate(() => {
      const problems: string[] = [];
      for (const el of document.querySelectorAll("a, button, input, textarea")) {
        // Next injects hidden inputs to carry Server Action ids; they are framework
        // internals, are not focusable, and need no accessible name.
        if (el instanceof HTMLInputElement && el.type === "hidden") continue;
        if (el.getAttribute("aria-hidden") === "true" || (el as HTMLElement).tabIndex < 0) continue;
        const label =
          el.getAttribute("aria-label") ??
          el.getAttribute("aria-labelledby") ??
          (el.id ? document.querySelector(`label[for="${el.id}"]`)?.textContent : null) ??
          el.textContent;
        if (!label || !label.trim()) problems.push(el.outerHTML.slice(0, 90));
      }
      return problems;
    });

    expect(unnamed, `elements without an accessible name: ${unnamed.join(" | ")}`).toEqual([]);
  });
});

test.describe("reduced motion", () => {
  test("shows all content without waiting for any animation", async ({ page }) => {
    // emulateMedia rather than test.use: the describe-level option was silently
    // not applied, so the suite reported on a browser that had motion enabled.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "LumaShell", exact: true })).toBeVisible();

    // Regression guard for a measured bug: the JS reduced-motion branch alone left
    // 39 of 41 elements permanently invisible, so a CSS rule now enforces it.
    const report = await page.evaluate(() => {
      const els = [...document.querySelectorAll("[data-reveal]")];
      const faded = els.filter((el) => Number(getComputedStyle(el).opacity) < 0.99);
      return {
        total: els.length,
        faded: faded.length,
        prefersReduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        sample: faded.slice(0, 3).map((el) => (el.textContent ?? "").trim().slice(0, 40)),
      };
    });

    expect(report.prefersReduced, "browser did not emulate reduced motion").toBe(true);
    expect(
      report.faded,
      `${report.faded}/${report.total} elements stuck hidden: ${report.sample.join(" | ")}`,
    ).toBe(0);
  });
});

test.describe("without client JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("still renders readable content", async ({ page }) => {
    await page.goto("/en");

    // Prove JavaScript really is off before trusting the rest of this test:
    // the 3D scene is dynamically imported and cannot mount without it.
    await expect(page.locator("canvas")).toHaveCount(0);

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Signal in,");
    await expect(page.getByRole("heading", { name: "LumaShell", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: /View LumaShell on GitHub/i })).toBeVisible();
  });
});

test.describe("contact form", () => {
  test("reports validation errors next to the fields, in the page language", async ({ page }) => {
    await page.goto("/en");

    await page.getByLabel("Name").fill("A");
    await page.getByLabel("Email").fill("not-an-email");
    await page.getByLabel("Message").fill("too short");
    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByText(/valid email address/i)).toBeVisible();
    await expect(page.getByText(/at least 10 characters/i)).toBeVisible();
  });

  test("localises validation errors on the Polish page", async ({ page }) => {
    await page.goto("/pl");

    const form = page.locator("#contact form");
    await form.locator('input[name="email"]').fill("nie-email");
    await form.locator('textarea[name="message"]').fill("krótko");
    await form.locator('input[name="name"]').fill("A");
    await form.getByRole("button").click();

    // The Server Action is a round trip; wait for the field to be marked invalid
    // before reading the live region, otherwise this races the response.
    await expect(form.locator('input[name="email"]')).toHaveAttribute("aria-invalid", "true");

    // Located by role semantics rather than a utility class, so restyling cannot
    // silently disable this check. Whatever the wording, it must not be English.
    const announced = await page.locator('#contact form [aria-live="polite"]').allInnerTexts();
    const joined = announced.join(" ").trim();
    expect(joined.length, "no validation message was announced").toBeGreaterThan(0);
    expect(joined).not.toContain("valid email address");
    expect(joined).not.toContain("at least 10 characters");
  });
});
