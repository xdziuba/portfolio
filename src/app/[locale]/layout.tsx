import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { inter, jetbrainsMono, spaceGrotesk } from "../fonts";
import { SITE } from "@/lib/site";
import { LOCALES, LOCALE_META, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { MotionProvider } from "@/components/motion-provider";
import "../globals.css";

/**
 * This is the root layout — it owns <html> — because the lang attribute depends on
 * the locale segment. Next allows the root layout to live inside a dynamic segment
 * for exactly this case; `/` is redirected to the default locale in next.config.
 */

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

type LayoutParams = { params: Promise<{ locale: string }> };

/** In Next 16 params is a Promise in every layout, page and route. */
export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = getDictionary(locale);
  const meta = LOCALE_META[locale];

  return {
    metadataBase: new URL(SITE.url),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: SITE.name,
    authors: [{ name: SITE.name, url: "https://github.com/xdziuba" }],
    creator: SITE.name,
    keywords: [...dict.meta.keywords],
    alternates: {
      canonical: `/${locale}`,
      // hreflang, so each language is indexed as its own page rather than a duplicate.
      languages: Object.fromEntries(
        LOCALES.map((l) => [LOCALE_META[l].htmlLang, `/${l}`]),
      ),
    },
    openGraph: {
      type: "website",
      url: `${SITE.url}/${locale}`,
      siteName: SITE.name,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: meta.ogLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

/** themeColor belongs on the viewport export; it is no longer valid in Metadata. */
export const viewport: Viewport = {
  themeColor: "#080a11",
  colorScheme: "dark",
};

export default async function LocaleLayout({
  children,
  params,
}: LayoutParams & { children: React.ReactNode }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={LOCALE_META[locale].htmlLang}
      /* Next 16 stops suppressing smooth scroll during navigation unless this opt-in
         is present; the CSS rule alone is not enough. */
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full`}
    >
      <head>
        {/* Entry animations are server-rendered with their initial (hidden) styles.
            Without this override the whole page would stay invisible for anyone
            browsing with JavaScript off. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

/** Only the two known locales exist; anything else is a 404 rather than a render. */
export const dynamicParams = false;
