import { ImageResponse } from "next/og";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

/**
 * Shared social card, used by both opengraph-image and twitter-image, per locale.
 *
 * ImageResponse supports only flexbox and a subset of CSS — no grid, no external
 * fonts unless they are ttf/otf/woff. This is built entirely from flex boxes and
 * borders so it needs no font loading and no network access at build time.
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function renderOgImage(locale: Locale): ImageResponse {
  const dict = getDictionary(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080a11",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Cold wash, matching the site's carrier haze.
            Explicit stop positions rather than `closest-side`: Satori renders that
            keyword as a flat rectangle, which left a hard vertical seam across the
            card. Fading to zero at 62% keeps the falloff inside the element box. */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 300,
            width: 1000,
            height: 900,
            display: "flex",
            background:
              "radial-gradient(circle at 50% 50%, rgba(47,211,245,0.22) 0%, rgba(47,211,245,0.07) 38%, rgba(8,10,17,0) 62%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 13, height: 13, borderRadius: 13, background: "#2fd3f5", display: "flex" }} />
          <div
            style={{
              display: "flex",
              fontSize: 21,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#95a2ba",
            }}
          >
            {dict.hero.eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, color: "#e8edf7", letterSpacing: -3.5, lineHeight: 1.04 }}>
            {dict.hero.headline[0]}
          </div>
          <div style={{ display: "flex", fontSize: 96, color: "#2fd3f5", letterSpacing: -3.5, lineHeight: 1.04 }}>
            {dict.hero.headline[1]}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 27, color: "#95a2ba" }}>
            Paweł Dziuba
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(232,237,247,0.12)",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex", fontSize: 24, color: "#78859e" }}>github.com/xdziuba</div>
          {/* structured-output ticks */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", width: 4, height: 34, background: "#7fe9ff" }} />
            <div style={{ display: "flex", width: 4, height: 24, background: "#2fd3f5" }} />
            <div style={{ display: "flex", width: 4, height: 16, background: "#5b85ff" }} />
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
