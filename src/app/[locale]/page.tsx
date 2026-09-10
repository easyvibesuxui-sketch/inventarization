import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { formatMoney, PLANS } from '@/lib/pricing';
import FlowDiagram from '@/components/marketing/flow-diagram';
import Faq from '@/components/marketing/faq';
import LeadForm from '@/components/marketing/lead-form';
import Reveal from '@/components/marketing/reveal';
import Rise from '@/components/marketing/rise';
import Parallax from '@/components/marketing/parallax';
import {
  DashboardMockup,
  ResultMockup,
  VerifyMockup,
} from '@/components/marketing/mockups';
import warehouseAisle from '@/images/warehouse-aisle.webp';
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
      <div className="mx-auto max-w-6xl px-6 py-24">{children}</div>
    </section>
  );
}

function SectionHead({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <Reveal className="max-w-2xl">
      <p className="font-mono text-xs text-accent-500">{index}</p>
      <h2 className="font-display mt-3 text-4xl sm:text-5xl">{title}</h2>
      <p className="mt-4 text-ink-400">{body}</p>
    </Reveal>
  );
}

export default async function LandingPage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const teaserPlans = PLANS.slice(0, 3);

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        {/* Photographic backdrop, held well behind the type by a scrim that
            fades it into the page background at both edges. */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={warehouseAisle}
            alt=""
            priority
            placeholder="blur"
            sizes="100vw"
            className="h-full w-full object-cover object-center opacity-80"
          />
          {/* Two scrims: one darkens the left third so the headline always has
              contrast, the other fades the photograph into the page below it. */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/55 to-ink-950/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-transparent to-ink-950" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-24 pt-24 sm:pt-32">
          <Rise>
            <p className="font-display text-sm tracking-[0.18em] text-accent-500">
              {dict.hero.eyebrow}
            </p>
          </Rise>

          <Rise delay={90}>
            <h1 className="font-display mt-5 max-w-4xl text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
              {dict.hero.title}
            </h1>
          </Rise>

          <Rise delay={180}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-300">
              {dict.hero.body}
            </p>
          </Rise>

          <Rise delay={260}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/login"
                className="font-display rounded-lg bg-accent-600 px-6 py-3 text-sm tracking-[0.06em] text-ink-950 transition hover:bg-accent-500"
              >
                {dict.hero.primary}
              </Link>
              <Link
                href={`/${locale}#how`}
                className="font-display rounded-lg border border-ink-600 bg-ink-900/60 px-6 py-3 text-sm tracking-[0.06em] backdrop-blur transition hover:border-ink-400"
              >
                {dict.hero.secondary}
              </Link>
            </div>
            <p className="mt-4 text-xs text-ink-400">{dict.hero.note}</p>
          </Rise>

          <Rise delay={340}>
            <Parallax speed={0.06} className="mt-20">
              <div className="grid min-w-0 gap-5 lg:grid-cols-[1.35fr_1fr]">
                <DashboardMockup dict={dict} />
                <VerifyMockup dict={dict} />
              </div>
            </Parallax>
          </Rise>
        </div>
      </section>

      {/* ------------------------------------------------------------- Problem */}
      <Section id="problem">
        <SectionHead index="01" title={dict.problem.title} body={dict.problem.body} />
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {dict.problem.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 110}>
              <span className="font-mono text-xs text-mismatch-500">
                0{index + 1}
              </span>
              <div className="rule-draw mt-3 h-px w-full bg-ink-700" />
              <h3 className="font-display mt-4 text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-400">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------ How it works */}
      <Section id="how">
        <SectionHead index="02" title={dict.how.title} body={dict.how.body} />
        <Reveal className="mt-14">
          <FlowDiagram dict={dict} />
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------- Product */}
      <Section id="product">
        <SectionHead index="03" title={dict.product.title} body={dict.product.body} />
        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          <div className="min-w-0 space-y-10">
            {dict.product.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 110}>
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-400">{item.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={140} className="min-w-0 lg:col-span-2">
            <ResultMockup dict={dict} />
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------------- Honesty */}
      <Section id="honesty">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="font-mono text-xs text-partial-500">04</p>
            <h2 className="font-display mt-3 text-4xl sm:text-5xl">
              {dict.honesty.title}
            </h2>
            <p className="mt-5 text-lg text-ink-300">{dict.honesty.body}</p>
            <p className="mt-4 leading-relaxed text-ink-400">{dict.honesty.detail}</p>
            <ul className="mt-8 space-y-3">
              {dict.honesty.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 border-l-2 border-partial-500/40 pl-4 text-sm"
                >
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <Parallax speed={0.05}>
              <div className="relative overflow-hidden rounded-2xl border border-ink-700/70">
                <Image
                  src={identicalVariants}
                  alt={dict.honesty.body}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 42rem, 100vw"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
              </div>
            </Parallax>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------------ Features */}
      <Section id="features">
        <SectionHead index="05" title={dict.features.title} body={dict.features.body} />
        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {dict.features.items.map((item, index) => (
            <Reveal key={item.title} delay={(index % 3) * 100}>
              <h3 className="font-display text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------- Pricing */}
      <Section id="pricing">
        <SectionHead
          index="06"
          title={dict.pricingTeaser.title}
          body={dict.pricingTeaser.body}
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {teaserPlans.map((plan, index) => (
            <Reveal
              key={plan.id}
              delay={index * 110}
              className="rounded-xl border border-ink-700/70 bg-ink-900/60 p-6"
            >
              <h3 className="font-display text-lg tracking-[0.08em] text-accent-500">
                {dict.plans[plan.id].name}
              </h3>
              {/* Prices stay in the body face: the display face has no ₾. */}
              <p className="font-body mt-3 text-3xl font-semibold tabular-nums">
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
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href={`/${locale}/pricing`}
            className="font-display rounded-lg border border-ink-600 bg-ink-800 px-6 py-3 text-sm tracking-[0.06em] transition hover:border-ink-400"
          >
            {dict.pricingTeaser.cta}
          </Link>
          <p className="text-xs text-partial-500">{dict.pricingTeaser.placeholder}</p>
        </Reveal>
      </Section>

      {/* ----------------------------------------------------------------- FAQ */}
      <Section id="faq">
        <Reveal>
          <p className="font-mono text-xs text-accent-500">07</p>
          <h2 className="font-display mt-3 text-4xl sm:text-5xl">{dict.faq.title}</h2>
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <Faq dict={dict} />
        </Reveal>
      </Section>

      {/* ----------------------------------------------------------------- CTA */}
      <Section id="cta">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-accent-600/30 bg-gradient-to-b from-accent-500/10 to-transparent p-8 sm:p-14">
            <h2 className="font-display max-w-2xl text-4xl sm:text-5xl">
              {dict.cta.title}
            </h2>
            <p className="mt-4 max-w-xl text-ink-400">{dict.cta.body}</p>
            <div className="mt-8 max-w-2xl">
              <LeadForm locale={locale} dict={dict} />
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
