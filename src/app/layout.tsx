import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { DEFAULT_LOCALE, HTML_LANG } from '@/lib/i18n/config';

/*
  Body face: Helvetica Neue LT Georgian, licensed by the client. Full mkhedruli
  and the lari sign, in three weights.
*/
const body = localFont({
  src: [
    { path: './fonts/helvetica-neue-geo-45.woff2', weight: '300', style: 'normal' },
    { path: './fonts/helvetica-neue-geo-55.woff2', weight: '400', style: 'normal' },
    { path: './fonts/helvetica-neue-geo-75.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-body-loaded',
  display: 'swap',
});

/*
  Display face for headings and labels: condensed caps, Latin and Georgian.
  It carries no lari sign, so prices are set in the body face.
*/
const display = localFont({
  src: './fonts/bpg-paata-cond-caps.woff2',
  variable: '--font-display-loaded',
  display: 'swap',
  // The face is condensed; synthesised fallback metrics from a normal-width
  // font make the pre-swap text jump noticeably wider.
  adjustFontFallback: false,
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
      className={`${body.variable} ${display.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
