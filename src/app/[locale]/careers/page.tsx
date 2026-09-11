import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { pageMetadata } from '@/lib/i18n/page-meta';
import Reveal from '@/components/marketing/reveal';
import { Band, PageHeader, RuledItem } from '@/components/marketing/page-shell';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/careers'>): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'careers', (meta) => ({
    title: meta.careersTitle,
    description: meta.careersDescription,
  }));
}

export default async function CareersPage({ params }: PageProps<'/[locale]/careers'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader
        eyebrow={dict.nav.careers}
        title={dict.careers.title}
        intro={dict.careers.intro}
      />

      <Band label={dict.careers.openTitle}>
        <div className="border-t border-ink">
          {dict.careers.roles.map((role, index) => (
            <RuledItem
              key={role.title}
              title={role.title}
              body={role.body}
              aside={dict.careers.openNote}
              delay={index * 70}
            />
          ))}
        </div>

        <Reveal delay={140} className="mt-10">
          <Link
            href={`/${locale}/contact`}
            className="inline-block bg-ink px-6 py-2.5 text-sm text-paper transition hover:bg-ink-soft"
          >
            {dict.nav.contact}
          </Link>
        </Reveal>
      </Band>

      <Band label={dict.careers.whyTitle}>
        <div className="grid gap-x-10 gap-y-10 md:grid-cols-3">
          {dict.careers.why.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <h3 className="border-t border-ink pt-3 text-base">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </Band>
    </>
  );
}
