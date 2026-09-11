import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { pageMetadata } from '@/lib/i18n/page-meta';
import Reveal from '@/components/marketing/reveal';
import Rise from '@/components/marketing/rise';
import { Band } from '@/components/marketing/page-shell';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, '', (meta) => ({
    title: meta.homeTitle,
    description: meta.homeDescription,
  }));
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  const pages = [
    { href: `/${locale}/about`, label: dict.nav.about, body: dict.home.pages.about },
    { href: `/${locale}/services`, label: dict.nav.services, body: dict.home.pages.services },
    { href: `/${locale}/team`, label: dict.nav.team, body: dict.home.pages.team },
    { href: `/${locale}/careers`, label: dict.nav.careers, body: dict.home.pages.careers },
    { href: `/${locale}/news`, label: dict.nav.news, body: dict.home.pages.news },
    { href: `/${locale}/contact`, label: dict.nav.contact, body: dict.home.pages.contact },
  ];

  return (
    <>
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-5xl px-6 pb-24 pt-20 sm:pt-28">
          <Rise>
            <p className="label">{dict.home.tag}</p>
          </Rise>

          <Rise delay={60}>
            <h1 className="font-display mt-8 max-w-3xl text-4xl sm:text-6xl md:text-7xl">
              {dict.home.title}
            </h1>
          </Rise>

          <Rise delay={120}>
            <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-ink-soft">
              {dict.home.subtitle}
            </p>
          </Rise>

          <Rise delay={180}>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href={`/${locale}/contact`}
                className="bg-ink px-6 py-2.5 text-sm text-paper transition hover:bg-ink-soft"
              >
                {dict.home.ctaPrimary}
              </Link>
              <Link
                href={`/${locale}/services`}
                className="text-sm underline underline-offset-4 decoration-rule-strong transition hover:decoration-ink"
              >
                {dict.home.ctaSecondary}
              </Link>
            </div>
          </Rise>
        </div>
      </section>

      {/* Where to go next */}
      <Band label={dict.home.pagesTitle}>
        <nav className="border-t border-ink">
          {pages.map((page, index) => (
            <Reveal key={page.href} delay={index * 60}>
              <Link
                href={page.href}
                className="group grid gap-x-10 gap-y-1 border-b border-rule py-5 transition md:grid-cols-[18rem_1fr]"
              >
                <span className="underline-offset-4 group-hover:underline">
                  {page.label}
                </span>
                <span className="text-sm text-ink-soft">{page.body}</span>
              </Link>
            </Reveal>
          ))}
        </nav>
      </Band>

      {/* Closing call */}
      <Band>
        <Reveal>
          <h2 className="font-display max-w-2xl text-2xl sm:text-3xl md:text-4xl">
            {dict.home.finalTitle}
          </h2>
          <p className="mt-5 max-w-lg text-ink-soft">{dict.home.finalBody}</p>
          <Link
            href={`/${locale}/contact`}
            className="mt-8 inline-block bg-ink px-6 py-2.5 text-sm text-paper transition hover:bg-ink-soft"
          >
            {dict.home.finalCta}
          </Link>
        </Reveal>
      </Band>
    </>
  );
}
