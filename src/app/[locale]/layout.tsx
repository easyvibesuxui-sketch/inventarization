import { notFound } from 'next/navigation';
import { HTML_LANG, isLocale, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import SiteHeader from '@/components/marketing/site-header';
import SiteFooter from '@/components/marketing/site-footer';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    // The <html> element belongs to the root layout, which sits above this
    // segment and cannot see the locale, so the language is declared here.
    // Nested lang is valid HTML and assistive tech honours the nearest one.
    <div lang={HTML_LANG[locale]} className="flex min-h-full flex-1 flex-col">
      <SiteHeader locale={locale} dict={dict} />
      <main className="flex-1">{children}</main>
      <SiteFooter locale={locale} dict={dict} />
    </div>
  );
}
