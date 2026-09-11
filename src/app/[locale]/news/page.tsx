import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { pageMetadata } from '@/lib/i18n/page-meta';
import Reveal from '@/components/marketing/reveal';
import { Band, PageHeader } from '@/components/marketing/page-shell';
import identicalVariants from '@/images/identical-variants.webp';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/news'>): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'news', (meta) => ({
    title: meta.newsTitle,
    description: meta.newsDescription,
  }));
}

export default async function NewsPage({ params }: PageProps<'/[locale]/news'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader eyebrow={dict.nav.news} title={dict.news.title} intro={dict.news.intro} />

      <Band>
        <div className="border-t border-ink">
          {dict.news.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 80} className="border-b border-rule py-8">
              <article className="grid gap-x-10 gap-y-4 md:grid-cols-[18rem_1fr]">
                <div>
                  <p className="label">
                    {item.badge} · {item.year}
                  </p>
                </div>
                <div>
                  <h2 className="font-display text-2xl">{item.title}</h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">{item.body}</p>
                  {item.points.length > 0 && (
                    <ul className="mt-5 space-y-1.5 text-sm text-ink-soft">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span aria-hidden className="text-ink-faint">
                            —
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* The photograph belongs to the first item: two products a
                      camera cannot tell apart without a barcode. */}
                  {index === 0 && (
                    <Image
                      src={identicalVariants}
                      alt=""
                      placeholder="blur"
                      sizes="(min-width: 768px) 34rem, 100vw"
                      className="mt-8 w-full max-w-xl"
                    />
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>
    </>
  );
}
