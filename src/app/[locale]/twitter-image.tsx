import { LOCALES, isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

/**
 * Declared explicitly rather than relying on opengraph-image to cover it: the Next
 * docs never state that og:image also emits twitter:image, so this guarantees the
 * card renders on X/Twitter.
 */
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateImageMetadata({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  return [{ id: "twitter", size: OG_SIZE, contentType: OG_CONTENT_TYPE, alt: getDictionary(locale).meta.description }];
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return renderOgImage(isLocale(locale) ? locale : DEFAULT_LOCALE);
}
