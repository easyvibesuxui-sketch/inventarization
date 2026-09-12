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
}: PageProps<'/[locale]/services'>): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'services', (meta) => ({
    title: meta.servicesTitle,
    description: meta.servicesDescription,
  }));
}

export default async function ServicesPage({ params }: PageProps<'/[locale]/services'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader tone="paper" video="racks"
        eyebrow={dict.nav.services}
        title={dict.services.title}
        intro={dict.services.intro}
      />

      <Band tone="ink">
        <div className="border-t border-ink">
          {dict.services.items.map((item, index) => (
            <RuledItem
              key={item.title}
              title={item.title}
              body={item.body}
              points={item.points}
              aside={String(index + 1).padStart(2, '0')}
              delay={index * 60}
            />
          ))}
        </div>

        <Reveal delay={120} className="mt-12">
          <Link
            href={`/${locale}/contact`}
            className="btn btn-solid"
          >
            {dict.home.ctaPrimary}
          </Link>
        </Reveal>
      </Band>
    </>
  );
}
