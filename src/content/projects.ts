/**
 * Locale-invariant project facts.
 *
 * Everything here is language-neutral — repository names, URLs, dependency lists,
 * dates, layout choices. Prose lives in the locale dictionaries instead, so a
 * translation can never silently change a URL, a stack entry or a date.
 *
 * Every fact was verified by reading the actual repository source, not the README.
 * Where a README contradicted the code, the code won: LumaShell's README still says
 * "design phase" while the repo ships v1.0.0 with 109 TypeScript files.
 */

/** Layout treatment. Deliberately varied so no two projects render as the same card. */
export type ProjectLayout = "feature" | "case" | "compact";

export type VisualKind = "transport" | "agent" | "geo" | "ledger" | "waveform";

export type ProjectSlug = "lumashell" | "what2buy" | "geopic" | "carpartseshop" | "pyradio";

export type ProjectFacts = {
  readonly slug: ProjectSlug;
  /** Proper noun — identical in every language. */
  readonly name: string;
  readonly repo: string;
  readonly url: string;
  readonly demoUrl?: string;
  readonly stack: readonly string[];
  /** File the technical detail was read from, shown as provenance. */
  readonly detailSource: string;
  readonly language: string;
  readonly updated: string;
  readonly layout: ProjectLayout;
  readonly visual: VisualKind;
};

export const FEATURED: readonly ProjectFacts[] = [
  {
    slug: "lumashell",
    name: "LumaShell",
    repo: "LumaShell",
    url: "https://github.com/xdziuba/LumaShell",
    stack: [
      "Electron 43",
      "TypeScript",
      "React 19",
      "Vite 7",
      "Zustand",
      "xterm.js 6 (WebGL)",
      "node-pty",
      "ssh2",
      "serialport",
      "SCSS",
      "electron-builder",
    ],
    detailSource: "src/main/plugins/plugin-manager.ts",
    language: "TypeScript",
    updated: "2026-07-19",
    layout: "feature",
    visual: "transport",
  },
  {
    slug: "what2buy",
    name: "What2Buy",
    repo: "what2buy",
    url: "https://github.com/xdziuba/what2buy",
    stack: [
      "FastAPI",
      "LangChain / LangGraph",
      "OpenAI gpt-4o",
      "MCP (BrightData)",
      "Pydantic 2",
      "Vue 3",
      "Quasar",
      "Pinia",
      "Docker Compose",
      "nginx",
    ],
    detailSource: "backend/app/core/agent.py",
    language: "Python / Vue",
    updated: "2026-05-18",
    layout: "case",
    visual: "agent",
  },
  {
    slug: "geopic",
    name: "GeoPic",
    repo: "GeoPic",
    url: "https://github.com/xdziuba/GeoPic",
    demoUrl: "https://xdziuba.github.io/GeoPic/",
    stack: [
      "Vue 3 (CDN)",
      "Firebase (Firestore, Storage, Auth)",
      "Leaflet",
      "OpenStreetMap",
      "Nominatim",
      "Bootstrap 5",
      "Service Worker",
    ],
    detailSource: "src/js/app.js",
    language: "JavaScript",
    updated: "2026-05-09",
    layout: "compact",
    visual: "geo",
  },
  {
    slug: "carpartseshop",
    name: "CarPartsEShop",
    repo: "CarPartsEShop",
    url: "https://github.com/xdziuba/CarPartsEShop",
    stack: [
      ".NET 8",
      "ASP.NET Core",
      "Entity Framework Core 9",
      "JWT Bearer",
      "Swashbuckle",
      "xUnit",
      "WebApplicationFactory",
      "Docker",
    ],
    detailSource: "CarPartsEShop/Services/CartService.cs",
    language: "C#",
    updated: "2025-06-20",
    layout: "case",
    visual: "ledger",
  },
  {
    slug: "pyradio",
    name: "PyRadio",
    repo: "PyRadio",
    url: "https://github.com/xdziuba/PyRadio",
    stack: ["Python", "DearPyGui", "miniaudio", "pycaw", "pywin32", "Pillow", "requests"],
    detailSource: "main.pyw",
    language: "Python",
    updated: "2024-06-08",
    layout: "compact",
    visual: "waveform",
  },
] as const;

export type ArchiveSlug =
  | "simple-mrp"
  | "60-tka"
  | "advanced-databases"
  | "ceneoscrapern11"
  | "eshopservice"
  | "pp-simulator"
  | "pantadeusz";

export type ArchiveFacts = {
  readonly slug: ArchiveSlug;
  readonly repo: string;
  readonly url: string;
  readonly language: string;
  readonly updated: string;
  readonly kind: "coursework" | "tool" | "data";
};

/**
 * Smaller repositories, listed plainly. Forks and a repository that follows a
 * published Microsoft tutorial line for line are left out; the totals in the
 * repository overview still state the full public count.
 */
export const ARCHIVE: readonly ArchiveFacts[] = [
  {
    slug: "simple-mrp",
    repo: "Simple-MRP-System",
    url: "https://github.com/xdziuba/Simple-MRP-System",
    language: "Python",
    updated: "2025-11-05",
    kind: "tool",
  },
  {
    slug: "60-tka",
    repo: "PWA",
    url: "https://github.com/xdziuba/PWA",
    language: "JavaScript",
    updated: "2026-04-19",
    kind: "coursework",
  },
  {
    slug: "advanced-databases",
    repo: "zaawansowane-bazy-danych",
    url: "https://github.com/xdziuba/zaawansowane-bazy-danych",
    language: "T-SQL",
    updated: "2026-01-22",
    kind: "data",
  },
  {
    slug: "ceneoscrapern11",
    repo: "CeneoScraperN11",
    url: "https://github.com/xdziuba/CeneoScraperN11",
    language: "Jupyter Notebook",
    updated: "2024-06-09",
    kind: "data",
  },
  {
    slug: "eshopservice",
    repo: "EShopService",
    url: "https://github.com/xdziuba/EShopService",
    language: "C#",
    updated: "2025-05-28",
    kind: "coursework",
  },
  {
    slug: "pp-simulator",
    repo: "PP-Simulator",
    url: "https://github.com/xdziuba/PP-Simulator",
    language: "C#",
    updated: "2025-01-15",
    kind: "coursework",
  },
  {
    slug: "pantadeusz",
    repo: "PanTadeusz",
    url: "https://github.com/xdziuba/PanTadeusz",
    language: "HTML",
    updated: "2024-03-01",
    kind: "coursework",
  },
] as const;

export const PROFILE = {
  name: "Paweł Dziuba",
  handle: "xdziuba",
  githubUrl: "https://github.com/xdziuba",
  /** The only social link present on the GitHub profile. */
  instagramUrl: "https://instagram.com/dziubahere",
  instagramHandle: "dziubahere",
} as const;

export type ProjectRef = { readonly name: string; readonly url: string };

/** Resolve a slug to a linkable reference so the capability map can cite any project. */
export function resolveProjectUrl(slug: string): ProjectRef | undefined {
  const featured = FEATURED.find((p) => p.slug === slug);
  if (featured) return { name: featured.name, url: featured.url };

  const archived = ARCHIVE.find((p) => p.slug === slug);
  if (archived) return { name: archived.repo, url: archived.url };

  return undefined;
}
