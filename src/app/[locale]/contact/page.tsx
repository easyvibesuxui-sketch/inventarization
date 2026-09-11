import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { pageMetadata } from '@/lib/i18n/page-meta';
import Reveal from '@/components/marketing/reveal';
import { Band, PageHeader } from '@/components/marketing/page-shell';
import ContactForm from '@/components/marketing/contact-form';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/contact'>): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'contact', (meta) => ({
    title: meta.contactTitle,
    description: meta.contactDescription,
  }));
}

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader
        eyebrow={dict.nav.contact}
        title={dict.contact.title}
        intro={dict.contact.intro}
      />

      <Band>
        <dl className="grid gap-x-10 gap-y-6 border-t border-ink pt-6 sm:grid-cols-3">
          <Reveal>
            <dt className="label">{dict.contact.emailLabel}</dt>
            <dd className="mt-2">
              <a
                href={`mailto:${dict.contact.email}`}
                className="underline underline-offset-4 decoration-rule-strong transition hover:decoration-ink"
              >
                {dict.contact.email}
              </a>
            </dd>
          </Reveal>
          <Reveal delay={70}>
            <dt className="label">{dict.contact.locationLabel}</dt>
            <dd className="mt-2">{dict.contact.location}</dd>
          </Reveal>
          <Reveal delay={140}>
            <dt className="label">{dict.contact.responseLabel}</dt>
            <dd className="mt-2">{dict.contact.response}</dd>
          </Reveal>
        </dl>
      </Band>

      <Band label={dict.contact.formTitle}>
        <Reveal>
          <ContactForm locale={locale} dict={dict} />
        </Reveal>
      </Band>
    </>
  );
}
