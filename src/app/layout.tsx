import type { Metadata } from 'next';
import { Noto_Sans_Georgian } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { DEFAULT_LOCALE, HTML_LANG } from '@/lib/i18n/config';

/*
  Display face for headings and labels. It is a caps-only design covering Latin
  and Georgian mkhedruli, and it has no lari sign (₾) — so prices stay in the
  body face rather than falling back mid-number.
*/
const display = localFont({
  src: './fonts/bpg-paata-cond-caps.woff2',
  variable: '--font-display-loaded',
  display: 'swap',
  // The face is condensed caps; letting Next synthesise fallback metrics from a
  // normal-width font makes the pre-swap text jump noticeably wider.
  adjustFontFallback: false,
});

// Body face: covers both Georgian and Latin, so the two languages sit at the
// same weight and rhythm.
const sans = Noto_Sans_Georgian({
  subsets: ['georgian', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans-loaded',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Inverse — AI inventory verification',
    template: '%s · Inverse',
  },
  description:
    'Multi-tenant inventory management with AI-assisted physical stock verification, built for SMBs in Georgia and the Caucasus.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    // The marketing pages re-declare `lang` per locale; this is the site default.
    <html
      lang={HTML_LANG[DEFAULT_LOCALE]}
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
