import snapshot from "@/content/github-snapshot.json";

/**
 * GitHub data layer.
 *
 * The checked-in snapshot is the source of truth, so the site renders complete
 * content with no network access, no token, and no rate limit to hit. If a
 * GITHUB_TOKEN is present at build time we opportunistically refresh only the two
 * fields that actually drift — star count and last push date — and fall back to the
 * snapshot on any failure. The site can never render empty because GitHub is down.
 */

export type LanguageShare = {
  readonly name: string;
  readonly bytes: number;
  readonly share: number;
};

export type RepoStat = {
  readonly name: string;
  readonly url: string;
  readonly language: string | null;
  readonly stars: number;
  readonly forks: number;
  readonly isFork: boolean;
  readonly defaultBranch: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly topics: readonly string[];
};

export type GithubSnapshot = {
  readonly capturedAt: string;
  readonly source: string;
  readonly profile: {
    readonly login: string;
    readonly name: string;
    readonly url: string;
    readonly createdAt: string;
    readonly publicRepos: number;
    readonly ownedRepos: number;
    readonly forkedRepos: number;
  };
  readonly languages: readonly LanguageShare[];
  readonly languageNote: string;
  readonly repos: readonly RepoStat[];
};

const SNAPSHOT = snapshot as GithubSnapshot;

/** Shape of the single GitHub REST field set we refresh. Everything else is editorial. */
type LiveRepo = { name: string; stargazers_count: number; pushed_at: string };

const REQUEST_TIMEOUT_MS = 4000;

/**
 * Fetch live repo stats. Returns null on any problem — a missing token, a timeout,
 * a rate limit, a non-200, or a malformed body. Callers must treat null as "use the
 * snapshot", never as an error worth surfacing to a visitor.
 */
async function fetchLiveRepos(): Promise<readonly LiveRepo[] | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch(
      `https://api.github.com/users/${SNAPSHOT.profile.login}/repos?per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "User-Agent": `${SNAPSHOT.profile.login}-portfolio`,
        },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        // Revalidate hourly; the snapshot means a stale value is never a broken page.
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return null;

    const body: unknown = await res.json();
    if (!Array.isArray(body)) return null;

    return body.flatMap((entry): LiveRepo[] => {
      if (typeof entry !== "object" || entry === null) return [];
      const { name, stargazers_count, pushed_at } = entry as Record<string, unknown>;
      if (typeof name !== "string" || typeof stargazers_count !== "number" || typeof pushed_at !== "string") {
        return [];
      }
      return [{ name, stargazers_count, pushed_at }];
    });
  } catch {
    // Network error, timeout, or invalid JSON. The snapshot covers us.
    return null;
  }
}

export type GithubData = GithubSnapshot & {
  /** True when the numbers below came from the live API rather than the snapshot. */
  readonly isLive: boolean;
};

/** Snapshot merged with live values where available. Never throws. */
export async function getGithubData(): Promise<GithubData> {
  const live = await fetchLiveRepos();
  if (!live) return { ...SNAPSHOT, isLive: false };

  const byName = new Map(live.map((r) => [r.name, r]));
  const repos = SNAPSHOT.repos.map((repo) => {
    const fresh = byName.get(repo.name);
    if (!fresh) return repo;
    return { ...repo, stars: fresh.stargazers_count, updatedAt: fresh.pushed_at.slice(0, 10) };
  });

  return { ...SNAPSHOT, repos, isLive: true };
}

/** Look up one repository's stats by name. Undefined when it is not in the snapshot. */
export function findRepo(data: GithubData, name: string): RepoStat | undefined {
  return data.repos.find((r) => r.name === name);
}
