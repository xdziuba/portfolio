import { describe, expect, it } from "vitest";
import { ARCHIVE, FEATURED, PROFILE, resolveProjectUrl } from "@/content/projects";
import snapshot from "@/content/github-snapshot.json";
import { LOCALES } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { en } from "@/i18n/en";
import { pl } from "@/i18n/pl";
import { CONTACT_ERROR_KEYS, CONTACT_MESSAGE_KEYS } from "@/lib/contact-state";

/**
 * Content integrity.
 *
 * The largest risk in a portfolio assembled from repository research is not a
 * broken layout — it is a confident sentence that is not true. These tests guard
 * the invariants that keep the copy honest, and they run over every locale so a
 * translation cannot quietly drop a hedge or a project.
 */

const repoNames = new Set(snapshot.repos.map((r) => r.name));

describe("project facts", () => {
  it("points every project at a repository that actually exists on the profile", () => {
    for (const project of FEATURED) {
      expect(repoNames, `${project.name} -> ${project.repo}`).toContain(project.repo);
    }
    for (const entry of ARCHIVE) {
      expect(repoNames, `${entry.slug} -> ${entry.repo}`).toContain(entry.repo);
    }
  });

  it("builds every GitHub URL from the owner and the repo name", () => {
    for (const project of [...FEATURED, ...ARCHIVE]) {
      expect(project.url).toBe(`https://github.com/${PROFILE.handle}/${project.repo}`);
    }
  });

  it("uses unique slugs across both lists so evidence links cannot collide", () => {
    const slugs = [...FEATURED.map((p) => p.slug), ...ARCHIVE.map((p) => p.slug)];
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("cites a checkable source file for every technical detail", () => {
    for (const project of FEATURED) {
      expect(project.detailSource, project.name).toMatch(/\.(ts|tsx|js|py|cs|pyw|vue|json|sql)$/);
    }
  });

  it("uses exactly one feature layout so the page has a single focal project", () => {
    expect(FEATURED.filter((p) => p.layout === "feature")).toHaveLength(1);
  });
});

describe.each(LOCALES)("locale: %s", (locale) => {
  const dict = getDictionary(locale);

  it("has copy for every featured project", () => {
    for (const project of FEATURED) {
      const copy = dict.projects[project.slug];
      expect(copy, project.slug).toBeDefined();
      expect(copy.tagline.length, project.slug).toBeGreaterThan(10);
      expect(copy.summary.length, project.slug).toBeGreaterThan(40);
      expect(copy.detail.body.length, project.slug).toBeGreaterThan(40);
    }
  });

  it("has copy for every archived repository", () => {
    for (const entry of ARCHIVE) {
      const copy = dict.archive[entry.slug];
      expect(copy, entry.slug).toBeDefined();
      expect(copy.note.length, entry.slug).toBeGreaterThan(20);
    }
  });

  it("gives every project a complete signal chain", () => {
    for (const project of FEATURED) {
      const { chain } = dict.projects[project.slug];
      expect(chain.input.length, project.slug).toBeGreaterThan(0);
      expect(chain.transform.length, project.slug).toBeGreaterThan(0);
      expect(chain.output.length, project.slug).toBeGreaterThan(0);
    }
  });

  it("keeps taglines short enough to stay one factual line", () => {
    for (const project of FEATURED) {
      expect(dict.projects[project.slug].tagline.length, project.slug).toBeLessThanOrEqual(150);
    }
  });

  it("resolves every capability evidence slug to a real project", () => {
    for (const capability of dict.stack.capabilities) {
      expect(capability.evidence.length, capability.id).toBeGreaterThan(0);
      for (const slug of capability.evidence) {
        expect(resolveProjectUrl(slug), `${capability.id} cites "${slug}"`).toBeDefined();
      }
    }
  });

  it("covers every contact error and status key the Server Action can return", () => {
    for (const key of CONTACT_ERROR_KEYS) {
      expect(dict.contact.errors[key], key).toBeTruthy();
    }
    for (const key of CONTACT_MESSAGE_KEYS) {
      // "idle" is intentionally empty — there is nothing to announce yet.
      if (key === "idle") continue;
      expect(dict.contact.messages[key], key).toBeTruthy();
    }
  });

  it("uses a two-line headline", () => {
    expect(dict.hero.headline).toHaveLength(2);
    for (const line of dict.hero.headline) expect(line.length).toBeLessThan(40);
  });
});

describe("structural parity between locales", () => {
  it("keeps evidence slugs identical — they are lookup keys, not prose", () => {
    for (const [i, cap] of en.stack.capabilities.entries()) {
      const other = pl.stack.capabilities[i];
      expect(other?.id, `capability ${i}`).toBe(cap.id);
      expect(other?.evidence, cap.id).toEqual(cap.evidence);
    }
  });

  it("keeps navigation anchors identical", () => {
    expect(pl.nav.links.map((l) => l.href)).toEqual(en.nav.links.map((l) => l.href));
  });

  it("keeps section index numbers identical", () => {
    expect([pl.work.index, pl.stack.index, pl.about.index, pl.repositories.index, pl.contact.index]).toEqual([
      en.work.index,
      en.stack.index,
      en.about.index,
      en.repositories.index,
      en.contact.index,
    ]);
  });

  it("keeps the hero chain keys and the release version identical", () => {
    expect(pl.hero.chain.map((c) => c.k)).toEqual(en.hero.chain.map((c) => c.k));
    expect(pl.hero.status.value).toBe(en.hero.status.value);
  });

  it("produces a different translation rather than copied English", () => {
    expect(pl.hero.lede).not.toBe(en.hero.lede);
    expect(pl.about.title).not.toBe(en.about.title);
    expect(pl.work.title).not.toBe(en.work.title);
  });
});

describe("copy discipline", () => {
  const BANNED_EN = [
    "turn ideas into reality",
    "crafting digital experiences",
    "passionate developer",
    "building the future",
    "let's create something amazing",
    "cutting-edge",
    "seamless",
    "rockstar",
    "10x",
    "world-class",
    "game-changing",
  ];

  const BANNED_PL = [
    "pasjonat",
    "z pasją",
    "kompleksowe rozwiązania",
    "przekuwam pomysły",
    "cyfrowe doświadczenia",
    "najwyższej jakości",
    "światowej klasy",
    "przełomowe",
  ];

  const corpusFor = (locale: (typeof LOCALES)[number]) => {
    const dict = getDictionary(locale);
    return [
      dict.hero.lede,
      dict.hero.headline.join(" "),
      dict.about.paragraphs.join(" "),
      dict.meta.description,
      ...Object.values(dict.projects).flatMap((p) => [p.tagline, p.summary, p.detail.body, p.detail.label]),
      ...Object.values(dict.archive).map((a) => a.note),
      ...dict.stack.capabilities.map((c) => c.note),
    ]
      .join(" ")
      .toLowerCase();
  };

  it("avoids English marketing clichés", () => {
    const corpus = corpusFor("en");
    for (const phrase of BANNED_EN) expect(corpus, phrase).not.toContain(phrase);
  });

  it("avoids Polish marketing clichés", () => {
    const corpus = corpusFor("pl");
    for (const phrase of BANNED_PL) expect(corpus, phrase).not.toContain(phrase);
  });

  it("never claims employment, availability or years of experience", () => {
    expect(corpusFor("en")).not.toMatch(/years of experience|available for hire|open to work/);
    expect(corpusFor("pl")).not.toMatch(/lat doświadczenia|otwarty na oferty|szukam pracy/);
  });

  it("keeps the coursework and thesis hedges in every locale", () => {
    // These provenance notes are the honesty backbone; a translation must not drop them.
    expect(getDictionary("en").projects.what2buy.context).toMatch(/thesis/i);
    expect(getDictionary("pl").projects.what2buy.context).toMatch(/licencjack|dyplom|inżyniersk/i);
    // Match the stem, not the nominative: Polish declines the surname
    // ("z Mikołajem Bębenkiem"), so an exact-form check would fail on a correct
    // translation rather than on a missing credit.
    for (const locale of LOCALES) {
      expect(getDictionary(locale).projects.geopic.context, locale).toMatch(/Bębenk|Bębenek/);
    }
  });
});

describe("github snapshot", () => {
  it("reports language shares that sum to roughly 100%", () => {
    const total = snapshot.languages.reduce((sum, l) => sum + l.share, 0);
    expect(total).toBeGreaterThan(95);
    expect(total).toBeLessThanOrEqual(100.5);
  });

  it("explains the language measurement in every locale", () => {
    for (const locale of LOCALES) {
      expect(getDictionary(locale).repositories.languageNote, locale).toContain("PanTadeusz");
    }
  });

  it("keeps original and forked counts consistent with the public total", () => {
    expect(snapshot.profile.ownedRepos + snapshot.profile.forkedRepos).toBe(snapshot.profile.publicRepos);
  });
});
