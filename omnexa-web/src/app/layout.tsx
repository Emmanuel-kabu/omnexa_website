import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { SiteFooter } from "@/components/navigation/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import { SkipLink } from "@/components/navigation/skip-link";
import { site } from "@/lib/site";

import "./globals.css";

/**
 * Fonts are SELF-HOSTED, not fetched from Google at build time.
 *
 * `next/font/google` downloads faces during the build. On this network that
 * request times out (the proxy blocks fonts.googleapis.com), which meant
 * `next dev` could not start at all and every clean build depended on
 * reaching a third party. A CI runner behind the same proxy would fail the
 * same way.
 *
 * These are the exact latin-subset variable faces next/font had already
 * fetched, vendored into src/fonts. Same files, same subset, now committed to
 * the repo. Builds are hermetic and no request leaves the origin at runtime.
 *
 * `adjustFontFallback` keeps the zero-layout-shift property: Next derives a
 * size-adjusted fallback so the swap from system font to webfont does not
 * reflow the page (Stage 1 §39.11, Stage 7 §12).
 */

/** Display: modern grotesk, neutral rather than futuristic (Stage 1 §8.1) */
const display = localFont({
  src: "../fonts/inter-tight-latin-variable.woff2",
  variable: "--font-omx-display",
  display: "swap",
  weight: "300 700",
  style: "normal",
  adjustFontFallback: "Arial",
});

/** Interface + editorial: strong small-size rendering (Stage 1 §8.2) */
const sans = localFont({
  src: "../fonts/inter-latin-variable.woff2",
  variable: "--font-omx-sans",
  display: "swap",
  weight: "100 900",
  style: "normal",
  adjustFontFallback: "Arial",
});

/** Technical metadata only (Stage 1 §8.3) */
const mono = localFont({
  src: "../fonts/jetbrains-mono-latin-variable.woff2",
  variable: "--font-omx-mono",
  display: "swap",
  weight: "400 500",
  style: "normal",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Never block zoom: Stage 3 §57 requires 200% zoom to remain usable.
  maximumScale: 5,
  // Browser chrome follows the scheme too, so the surrounding UI does not
  // flash light while the page renders dark.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0d" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={site.locale}
      data-tone="light"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        {/* First in the body so it is the first stop for keyboard users */}
        <SkipLink />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
