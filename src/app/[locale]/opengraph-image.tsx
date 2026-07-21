import { LOCALES, isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/** The alt text is locale-aware, so it is generated rather than exported as a constant. */
export async function generateImageMetadata({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  return [{ id: "og", size: OG_SIZE, contentType: OG_CONTENT_TYPE, alt: getDictionary(locale).meta.description }];
}

/** In Next 16 both params and id arrive as Promises in image conventions. */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return renderOgImage(isLocale(locale) ? locale : DEFAULT_LOCALE);
}
