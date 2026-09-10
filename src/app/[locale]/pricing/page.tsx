import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { formatLimit, formatMoney, PLANS } from '@/lib/pricing';
import PricingCalculator from './pricing-calculator';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/pricing'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.meta.pricingTitle,
    description: dict.meta.pricingDescription,
    alternates: {
      canonical: `/${locale}/pricing`,
      languages: { ka: '/ka/pricing', en: '/en/pricing' },
    },
  };
}

export default async function PricingPage({ params }: PageProps<'/[locale]/pricing'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <div className="grid-wash">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight">
            {dict.pricingTeaser.title}
          </h1>
          <p className="mt-3 text-ink-400">{dict.pricing.intro}</p>
        </div>

        <div className="mt-10">
          <PricingCalculator dict={dict} />
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className="flex flex-col rounded-xl border border-ink-700/70 bg-ink-900/60 p-6"
            >
              <h2 className="text-sm font-semibold uppercase tracking-wider text-accent-500">
                {dict.plans[plan.id].name}
              </h2>
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

              <dl className="mt-5 space-y-1.5 border-t border-ink-700/70 pt-5 text-sm">
                {(
                  [
                    [dict.pricing.limitProducts, plan.limits.skus],
                    [dict.pricing.limitLocations, plan.limits.locations],
                    [dict.pricing.limitUsers, plan.limits.users],
                    [dict.pricing.limitChecks, plan.limits.checks],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-3">
                    <dt className="text-ink-400">{label}</dt>
                    <dd className="tabular-nums">
                      {Number.isFinite(value)
                        ? formatLimit(value)
                        : dict.pricing.unlimited}
                    </dd>
                  </div>
                ))}
              </dl>

              <ul className="mt-5 space-y-1.5 border-t border-ink-700/70 pt-5 text-sm text-ink-300">
                {dict.plans[plan.id].features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="text-accent-500">·</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 rounded-lg border border-partial-500/30 bg-partial-500/5 px-4 py-3 text-sm text-partial-500">
          {dict.pricing.disclaimer}
        </p>
      </div>
    </div>
  );
}
