import type { ArchiveSlug, ProjectSlug, VisualKind } from "@/content/projects";
import type { ContactErrorKey, ContactMessageKey } from "@/lib/contact-state";

/**
 * The shape every locale must fill.
 *
 * Keying project copy by slug means TypeScript refuses to compile a locale that
 * forgets a project, and the locale files cannot drift apart in structure — only
 * in language.
 */

export type ProjectCopy = {
  /** One factual line. No marketing verbs. */
  readonly tagline: string;
  readonly summary: string;
  readonly chain: { readonly input: string; readonly transform: string; readonly output: string };
  readonly detail: { readonly label: string; readonly body: string };
  /** Honest provenance: thesis, coursework, collaborators. Omitted when there is none. */
  readonly context?: string;
};

export type ArchiveCopy = {
  readonly name: string;
  readonly note: string;
};

export type CapabilityCopy = {
  readonly id: string;
  readonly title: string;
  readonly note: string;
  readonly items: readonly string[];
  /** Project slugs that demonstrate it. */
  readonly evidence: readonly string[];
};

export type Dictionary = {
  readonly meta: {
    readonly title: string;
    readonly description: string;
    readonly keywords: readonly string[];
    /** Used as the Person description in structured data. */
    readonly role: string;
  };

  readonly nav: {
    readonly ariaLabel: string;
    readonly links: readonly { readonly href: string; readonly label: string }[];
    readonly github: string;
    readonly openMenu: string;
    readonly closeMenu: string;
    readonly backToTop: string;
    readonly skipToContent: string;
    readonly newTab: string;
    readonly languageLabel: string;
  };

  readonly hero: {
    readonly eyebrow: string;
    readonly headline: readonly [string, string];
    readonly lede: string;
    readonly primaryCta: string;
    readonly status: { readonly label: string; readonly value: string; readonly detail: string };
    readonly chain: readonly { readonly k: string; readonly t: string; readonly d: string }[];
  };

  readonly work: {
    readonly index: string;
    readonly label: string;
    readonly title: string;
    readonly intro: string;
    readonly featured: string;
    readonly oneDetail: string;
    /**
     * Template with a {project} placeholder, not a function: the dictionary crosses
     * the server/client boundary and functions are not serializable.
     */
    readonly viewOn: string;
    readonly liveDemo: string;
    readonly updated: string;
    readonly srLanguage: string;
    readonly srUpdated: string;
    readonly srStars: string;
    readonly chainIn: string;
    readonly chainTransform: string;
    readonly chainOut: string;
  };

  readonly stack: {
    readonly index: string;
    readonly label: string;
    readonly title: string;
    readonly intro: string;
    readonly seenIn: string;
    readonly repoNewTab: string;
    readonly capabilities: readonly CapabilityCopy[];
  };

  readonly about: {
    readonly index: string;
    readonly label: string;
    readonly title: string;
    readonly paragraphs: readonly string[];
    readonly interests: {
      readonly label: string;
      readonly note: string;
      readonly items: readonly string[];
    };
    readonly education: string;
  };

  readonly repositories: {
    readonly index: string;
    readonly label: string;
    readonly title: string;
    readonly intro: string;
    readonly publicRepos: string;
    readonly original: string;
    readonly forks: string;
    readonly firstRepo: string;
    readonly chartCaption: string;
    readonly languageNote: string;
    readonly other: string;
    readonly otherLabel: string;
    readonly coursework: string;
    readonly exclusionNote: string;
  };

  readonly contact: {
    readonly index: string;
    readonly label: string;
    readonly title: string;
    readonly lede: string;
    readonly name: string;
    readonly email: string;
    readonly message: string;
    readonly company: string;
    readonly send: string;
    readonly sending: string;
    readonly elsewhere: string;
    /** Per-field validation text, keyed by what the Server Action returns. */
    readonly errors: Record<ContactErrorKey, string>;
    /** Form-level status text, keyed by what the Server Action returns. */
    readonly messages: Record<ContactMessageKey, string>;
  };

  readonly footer: {
    readonly stackNote: string;
    readonly live: string;
    readonly snapshot: string;
  };

  /** Accessible descriptions for the procedural diagrams. */
  readonly visuals: Record<VisualKind, string> & { readonly hero: string };

  readonly projects: Record<ProjectSlug, ProjectCopy>;
  readonly archive: Record<ArchiveSlug, ArchiveCopy>;
};
