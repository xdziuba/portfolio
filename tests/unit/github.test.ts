import { afterEach, describe, expect, it, vi } from "vitest";
import { findRepo, getGithubData } from "@/lib/github";

/**
 * The data layer's whole job is to never leave the page empty. These tests pin the
 * failure behaviour, because every one of these paths is silent by design — a
 * regression here would not throw, it would just quietly blank out the site.
 */

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
  delete process.env.GITHUB_TOKEN;
  vi.restoreAllMocks();
});

describe("getGithubData", () => {
  it("returns the checked-in snapshot when no token is configured", async () => {
    const data = await getGithubData();

    expect(data.isLive).toBe(false);
    expect(data.profile.login).toBe("xdziuba");
    expect(data.repos.length).toBeGreaterThan(0);
  });

  it("never calls the network without a token", async () => {
    const fetchSpy = vi.fn();
    globalThis.fetch = fetchSpy as unknown as typeof fetch;

    await getGithubData();

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("falls back to the snapshot when the API errors, without throwing", async () => {
    process.env.GITHUB_TOKEN = "test-token";
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("network down")) as unknown as typeof fetch;

    const data = await getGithubData();

    expect(data.isLive).toBe(false);
    expect(data.repos.length).toBeGreaterThan(0);
  });

  it("falls back to the snapshot on a rate-limit response", async () => {
    process.env.GITHUB_TOKEN = "test-token";
    globalThis.fetch = vi
      .fn()
      .mockResolvedValue({ ok: false, status: 403, json: async () => ({}) }) as unknown as typeof fetch;

    const data = await getGithubData();

    expect(data.isLive).toBe(false);
  });

  it("falls back when the API returns a shape it does not expect", async () => {
    process.env.GITHUB_TOKEN = "test-token";
    globalThis.fetch = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ message: "nope" }) }) as unknown as typeof fetch;

    const data = await getGithubData();

    expect(data.isLive).toBe(false);
  });

  it("merges live star counts over the snapshot and marks the result live", async () => {
    process.env.GITHUB_TOKEN = "test-token";
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ name: "LumaShell", stargazers_count: 42, pushed_at: "2026-07-20T10:00:00Z" }],
    }) as unknown as typeof fetch;

    const data = await getGithubData();
    const luma = findRepo(data, "LumaShell");

    expect(data.isLive).toBe(true);
    expect(luma?.stars).toBe(42);
    expect(luma?.updatedAt).toBe("2026-07-20");
  });

  it("drops malformed entries instead of rendering undefined values", async () => {
    process.env.GITHUB_TOKEN = "test-token";
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        { name: "LumaShell", stargazers_count: "not-a-number", pushed_at: "2026-07-20T10:00:00Z" },
        null,
      ],
    }) as unknown as typeof fetch;

    const data = await getGithubData();

    // The bad entry is skipped, so LumaShell keeps its snapshot value rather than NaN.
    expect(typeof findRepo(data, "LumaShell")?.stars).toBe("number");
  });
});

describe("findRepo", () => {
  it("returns undefined for a repository that is not in the snapshot", async () => {
    const data = await getGithubData();
    expect(findRepo(data, "does-not-exist")).toBeUndefined();
  });
});
