import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

/**
 * Font definitions live in one module so each family is instantiated exactly once,
 * as the Next font docs require. All three are variable fonts, so no `weight` is
 * declared. next/font self-hosts them, so there is no external request and no
 * layout shift from a late webfont swap.
 *
 * Roles: Space Grotesk carries the display voice, Inter does the reading, and
 * JetBrains Mono is reserved for technical metadata — never body copy.
 */

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});
