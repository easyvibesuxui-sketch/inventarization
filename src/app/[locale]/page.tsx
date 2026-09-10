import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { formatMoney, PLANS } from '@/lib/pricing';
import Faq from '@/components/marketing/faq';
import LeadForm from '@/components/marketing/lead-form';
import Reveal from '@/components/marketing/reveal';
import Rise from '@/components/marketing/rise';
import { ResultTable } from '@/components/marketing/mockups';
import identicalVariants from '@/images/identical-variants.webp';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    // The landing title is the whole brand line already — the root template
    // would append a second "· Inverse" to it.
    title: { absolute: dict.meta.title },
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { ka: '/ka', en: '/en' },
    },
  };
}

/** One column width, one rhythm, for every band on the page. */
function Band({
  id,
  label,
  children,
}: {
  id?: string;
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-rule">
      <div className="mx-auto max-w-5xl px-6 py-20">
        {label && <p className="label mb-10">{label}</p>}
        {children}
      </div>
    </section>
  );
}

export default async function LandingPage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const teaserPlans = PLANS.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-5xl px-6 pb-24 pt-20 sm:pt-28">
          <Rise>
            <p className="label">{dict.hero.eyebrow}</p>
          </Rise>

          <Rise delay={60}>
            <h1 className="font-display mt-8 max-w-3xl text-5xl sm:text-7xl">
              {dict.hero.title}
            </h1>
          </Rise>

          <Rise delay={120}>
            <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-ink-soft">
              {dict.hero.body}
            </p>
          </Rise>

          <Rise delay={180}>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/login"
                className="bg-ink px-6 py-2.5 text-sm text-paper transition hover:bg-ink-soft"
              >
                {dict.hero.primary}
              </Link>
              <Link
                href={`/${locale}#how`}
                className="text-sm underline underline-offset-4 decoration-rule-strong transition hover:decoration-ink"
              >
                {dict.hero.secondary}
              </Link>
            </div>
            <p className="mt-5 text-sm text-ink-faint">{dict.hero.note}</p>
          </Rise>
        </div>
      </section>

      {/* Why records drift */}
      <Band id="problem" label={dict.problem.title}>
        <Reveal>
          <p className="max-w-xl text-lg font-light leading-relaxed">{dict.problem.body}</p>
        </Reveal>
        <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {dict.problem.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <h3 className="border-t border-ink pt-3 text-base">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* How it works */}
      <Band id="how" label={dict.how.title}>
        <Reveal>
          <p className="max-w-xl text-lg font-light leading-relaxed">{dict.how.body}</p>
        </Reveal>

        <ol className="mt-12 border-t border-ink">
          {dict.how.steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 60}
              className="grid gap-x-10 gap-y-2 border-b border-rule py-6 md:grid-cols-[3rem_18rem_1fr]"
            >
              <span className="text-sm tabular-nums text-ink-faint">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-base">{step.title}</h3>
              <p className="max-w-xl text-sm leading-relaxed text-ink-soft">{step.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={100} className="mt-16">
          <ResultTable dict={dict} />
        </Reveal>
      </Band>

      {/* What vision alone cannot settle */}
      <Band id="limits">
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl">{dict.honesty.title}</h2>
            <p className="mt-6 text-lg font-light leading-relaxed">{dict.honesty.body}</p>
            <p className="mt-5 leading-relaxed text-ink-soft">{dict.honesty.detail}</p>
            <ul className="mt-8 border-t border-ink">
              {dict.honesty.points.map((point) => (
                <li key={point} className="border-b border-rule py-3 text-sm">
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <Image
              src={identicalVariants}
              alt={dict.honesty.body}
              placeholder="blur"
              sizes="(min-width: 768px) 32rem, 100vw"
              className="w-full"
            />
          </Reveal>
        </div>
      </Band>

      {/* Pricing */}
      <Band id="pricing" label={dict.pricingTeaser.title}>
        <Reveal>
          <p className="max-w-xl text-lg font-light leading-relaxed">
            {dict.pricingTeaser.body}
          </p>
        </Reveal>

        <div className="mt-12 grid border-t border-ink md:grid-cols-3">
          {teaserPlans.map((plan, index) => (
            <Reveal
              key={plan.id}
              delay={index * 80}
              className="border-b border-rule py-6 md:border-b-0 md:pr-8"
            >
              <h3 className="label">{dict.plans[plan.id].name}</h3>
              {/* Prices stay in the body face: the display face has no ₾. */}
              <p className="mt-3 text-3xl tabular-nums">
                {plan.monthly === null
                  ? dict.pricingTeaser.custom
                  : formatMoney(plan.monthly)}
                {plan.monthly !== null && plan.monthly > 0 && (
                  <span className="text-sm text-ink-faint">
                    {dict.pricingTeaser.perMonth}
                  </span>
                )}
              </p>
              <p className="mt-3 max-w-xs text-sm text-ink-soft">
                {dict.plans[plan.id].blurb}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140} className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3">
          <Link
            href={`/${locale}/pricing`}
            className="text-sm underline underline-offset-4 decoration-rule-strong transition hover:decoration-ink"
          >
            {dict.pricingTeaser.cta}
          </Link>
          <p className="text-sm text-ink-faint">{dict.pricingTeaser.placeholder}</p>
        </Reveal>
      </Band>

      {/* Questions */}
      <Band id="faq" label={dict.faq.title}>
        <Reveal>
          <Faq dict={dict} />
        </Reveal>
      </Band>

      {/* Contact */}
      <Band id="cta">
        <Reveal>
          <h2 className="font-display max-w-2xl text-3xl sm:text-4xl">{dict.cta.title}</h2>
          <p className="mt-5 max-w-lg text-ink-soft">{dict.cta.body}</p>
          <div className="mt-10">
            <LeadForm locale={locale} dict={dict} />
          </div>
        </Reveal>
      </Band>
    </>
  );
}
