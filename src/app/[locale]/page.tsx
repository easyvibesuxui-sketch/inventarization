import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { formatMoney, PLANS } from '@/lib/pricing';
import FlowDiagram from '@/components/marketing/flow-diagram';
import Faq from '@/components/marketing/faq';
import LeadForm from '@/components/marketing/lead-form';
import {
  DashboardMockup,
  ResultMockup,
  VerifyMockup,
} from '@/components/marketing/mockups';

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

function Section({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`border-t border-ink-700/60 ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-20">{children}</div>
    </section>
  );
}

function SectionHead({ title, body }: { title: string; body: string }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-3 text-ink-400">{body}</p>
    </div>
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
      <section className="grid-wash">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-20 sm:pt-28">
          <p className="text-sm font-medium uppercase tracking-wider text-accent-500">
            {dict.hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
            {dict.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-400">
            {dict.hero.body}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-medium text-ink-950 transition hover:bg-accent-500"
            >
              {dict.hero.primary}
            </Link>
            <Link
              href={`/${locale}#how`}
              className="rounded-lg border border-ink-600 bg-ink-800 px-5 py-2.5 text-sm font-medium transition hover:border-ink-400"
            >
              {dict.hero.secondary}
            </Link>
          </div>
          <p className="mt-4 text-xs text-ink-400">{dict.hero.note}</p>

          <div className="mt-16 grid min-w-0 gap-5 lg:grid-cols-[1.35fr_1fr]">
            <DashboardMockup dict={dict} />
            <VerifyMockup dict={dict} />
          </div>
        </div>
      </section>

      {/* Problem */}
      <Section id="problem">
        <SectionHead title={dict.problem.title} body={dict.problem.body} />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {dict.problem.items.map((item, index) => (
            <div key={item.title}>
              <span className="font-mono text-xs text-mismatch-500">
                0{index + 1}
              </span>
              <h3 className="mt-2 text-lg font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section id="how">
        <SectionHead title={dict.how.title} body={dict.how.body} />
        <div className="mt-10">
          <FlowDiagram dict={dict} />
        </div>
      </Section>

      {/* Product */}
      <Section id="product">
        <SectionHead title={dict.product.title} body={dict.product.body} />
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="min-w-0 space-y-8">
            {dict.product.items.map((item) => (
              <div key={item.title}>
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="min-w-0 lg:col-span-2">
            <ResultMockup dict={dict} />
          </div>
        </div>
      </Section>

      {/* The honest bit */}
      <Section id="honesty">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {dict.honesty.title}
            </h2>
            <p className="mt-4 text-lg text-ink-300">{dict.honesty.body}</p>
            <p className="mt-4 leading-relaxed text-ink-400">{dict.honesty.detail}</p>
          </div>
          <ul className="space-y-3 self-center">
            {dict.honesty.points.map((point) => (
              <li
                key={point}
                className="flex gap-3 rounded-xl border border-ink-700/70 bg-ink-900/60 px-5 py-4"
              >
                <span aria-hidden className="text-partial-500">
                  ▸
                </span>
                <span className="text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Features */}
      <Section id="features">
        <SectionHead title={dict.features.title} body={dict.features.body} />
        <div className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {dict.features.items.map((item) => (
            <div key={item.title}>
              <h3 className="text-base font-medium">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-400">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing teaser */}
      <Section id="pricing">
        <SectionHead title={dict.pricingTeaser.title} body={dict.pricingTeaser.body} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {teaserPlans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-xl border border-ink-700/70 bg-ink-900/60 p-6"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-500">
                {dict.plans[plan.id].name}
              </h3>
              <p className="mt-3 text-3xl font-semibold tabular-nums">
                {plan.monthly === null
                  ? dict.pricingTeaser.custom
                  : formatMoney(plan.monthly)}
                {plan.monthly !== null && plan.monthly > 0 && (
                  <span className="text-sm font-normal text-ink-400">
                    {dict.pricingTeaser.perMonth}
                  </span>
                )}
              </p>
              <p className="mt-2 text-sm text-ink-400">{dict.plans[plan.id].blurb}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href={`/${locale}/pricing`}
            className="rounded-lg border border-ink-600 bg-ink-800 px-5 py-2.5 text-sm font-medium transition hover:border-ink-400"
          >
            {dict.pricingTeaser.cta}
          </Link>
          <p className="text-xs text-partial-500">{dict.pricingTeaser.placeholder}</p>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {dict.faq.title}
        </h2>
        <div className="mt-8">
          <Faq dict={dict} />
        </div>
      </Section>

      {/* CTA */}
      <Section id="cta">
        <div className="rounded-2xl border border-accent-600/30 bg-gradient-to-b from-accent-500/10 to-transparent p-8 sm:p-12">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {dict.cta.title}
          </h2>
          <p className="mt-3 max-w-xl text-ink-400">{dict.cta.body}</p>
          <div className="mt-7 max-w-2xl">
            <LeadForm locale={locale} dict={dict} />
          </div>
        </div>
      </Section>
    </>
  );
}
