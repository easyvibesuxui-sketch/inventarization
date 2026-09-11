import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { pageMetadata } from '@/lib/i18n/page-meta';
import Reveal from '@/components/marketing/reveal';
import { Band, PageHeader } from '@/components/marketing/page-shell';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/team'>): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'team', (meta) => ({
    title: meta.teamTitle,
    description: meta.teamDescription,
  }));
}

export default async function TeamPage({ params }: PageProps<'/[locale]/team'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader eyebrow={dict.nav.team} title={dict.team.title} intro={dict.team.intro} />

      <Band>
        <Reveal className="grid gap-x-10 gap-y-4 border-t border-ink py-8 md:grid-cols-[18rem_1fr]">
          <div>
            <h2 className="font-display text-2xl">{dict.team.founderName}</h2>
            <p className="label mt-2">{dict.team.founderRole}</p>
          </div>
          <p className="max-w-xl leading-relaxed text-ink-soft">{dict.team.founderBody}</p>
        </Reveal>
      </Band>

      <Band label={dict.team.growingTitle}>
        <ul className="border-t border-ink">
          {dict.team.growing.map((line, index) => (
            <Reveal as="li" key={line} delay={index * 70} className="border-b border-rule py-4">
              <p className="max-w-2xl text-ink-soft">{line}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={140} className="mt-10">
          <Link
            href={`/${locale}/careers`}
            className="text-sm underline underline-offset-4 decoration-rule-strong transition hover:decoration-ink"
          >
            {dict.nav.careers}
          </Link>
        </Reveal>
      </Band>
    </>
  );
}
