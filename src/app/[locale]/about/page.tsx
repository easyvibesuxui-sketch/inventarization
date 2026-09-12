import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { pageMetadata } from '@/lib/i18n/page-meta';
import Reveal from '@/components/marketing/reveal';
import { Band, PageHeader } from '@/components/marketing/page-shell';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/about'>): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'about', (meta) => ({
    title: meta.aboutTitle,
    description: meta.aboutDescription,
  }));
}

export default async function AboutPage({ params }: PageProps<'/[locale]/about'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader tone="sunk"
        eyebrow={dict.nav.about}
        title={dict.about.title}
        intro={dict.about.intro}
      />

      <Band label={dict.about.storyTitle}>
        <Reveal>
          {dict.about.story.map((paragraph) => (
            <p key={paragraph} className="mb-5 max-w-2xl leading-relaxed last:mb-0">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <dl className="mt-16 grid grid-cols-2 border-t border-ink md:grid-cols-4">
          {dict.about.stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 70}
              className="border-b border-rule py-6 pr-6 md:border-b-0"
            >
              <dt className="label">{stat.label}</dt>
              <dd className="font-display mt-3 text-4xl">{stat.value}</dd>
            </Reveal>
          ))}
        </dl>
      </Band>

      <Band label={dict.about.principlesTitle} tone="ink">
        <div className="grid gap-x-10 gap-y-10 md:grid-cols-3">
          {dict.about.principles.map((item, index) => (
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
