import { notFound } from "next/navigation";
import { getGithubData } from "@/lib/github";
import { FEATURED, PROFILE } from "@/content/projects";
import { SITE } from "@/lib/site";
import { LOCALES, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import type { Dictionary } from "@/i18n/types";
import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Stack } from "@/components/stack";
import { About } from "@/components/about";
import { Repositories } from "@/components/repositories";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";

/**
 * Single-page composition, rendered once per locale.
 *
 * A Server Component, so the content, the GitHub data and the structured data all
 * render on the server. The only client bundles are the nav, the reveal animations,
 * the contact form and the lazily-imported 3D scene.
 */

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/** JSON-LD emitted as a native script tag, which is what the Next docs prescribe. */
function StructuredData({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE.url}/#person`,
        name: PROFILE.name,
        url: `${SITE.url}/${locale}`,
        description: dict.meta.role,
        sameAs: [PROFILE.githubUrl, PROFILE.instagramUrl],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: `${SITE.url}/${locale}`,
        name: SITE.name,
        inLanguage: locale,
        publisher: { "@id": `${SITE.url}/#person` },
      },
      ...FEATURED.map((project) => ({
        "@type": "SoftwareSourceCode",
        name: project.name,
        description: dict.projects[project.slug].tagline,
        codeRepository: project.url,
        programmingLanguage: project.language,
        author: { "@id": `${SITE.url}/#person` },
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escaping `<` is the documented guard against breaking out of the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const github = await getGithubData();

  return (
    <>
      <StructuredData locale={locale} dict={dict} />

      {/* First stop for a keyboard user, ahead of the fixed navigation. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-[var(--r-sm)] focus:bg-text focus:px-4 focus:py-2.5 focus:text-[0.9rem] focus:text-[#06080e]"
      >
        {dict.nav.skipToContent}
      </a>

      <SiteNav dict={dict} locale={locale} />

      <main id="main">
        <Hero dict={dict} />
        <Work dict={dict} github={github} />
        <Stack dict={dict} />
        <About dict={dict} />
        <Repositories dict={dict} github={github} />
        <Contact dict={dict} />
      </main>

      <SiteFooter dict={dict} isLive={github.isLive} />
    </>
  );
}
