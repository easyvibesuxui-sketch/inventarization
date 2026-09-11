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

  const limitRows = [
    { label: dict.pricing.limitProducts, key: 'skus' },
    { label: dict.pricing.limitLocations, key: 'locations' },
    { label: dict.pricing.limitUsers, key: 'users' },
    { label: dict.pricing.limitChecks, key: 'checks' },
  ] as const;

  return (
    <>
      <section>
        <div className="mx-auto max-w-5xl px-6 pb-16 pt-20">
          <h1 className="font-display text-5xl sm:text-6xl">{dict.pricingTeaser.title}</h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-ink-soft">
            {dict.pricing.intro}
          </p>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <PricingCalculator dict={dict} />
        </div>
      </section>

      {/* Plans, as one comparison table rather than four cards. */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <p className="label mb-8">{dict.pricingTeaser.title}</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[44rem] border-t border-ink text-sm">
              <thead>
                <tr className="border-b border-ink text-left align-bottom">
                  <th className="w-40 py-4 pr-6 font-normal" />
                  {PLANS.map((plan) => (
                    <th key={plan.id} className="py-4 pr-6 font-normal">
                      <span className="label block">{dict.plans[plan.id].name}</span>
                      <span className="mt-2 block text-2xl tabular-nums text-ink">
                        {plan.monthly === null
                          ? dict.pricingTeaser.custom
                          : formatMoney(plan.monthly)}
                        {plan.monthly !== null && plan.monthly > 0 && (
                          <span className="text-xs text-ink-faint">
                            {dict.pricingTeaser.perMonth}
                          </span>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {limitRows.map((row) => (
                  <tr key={row.key} className="border-b border-rule">
                    <th scope="row" className="py-3 pr-6 text-left font-normal text-ink-faint">
                      {row.label}
                    </th>
                    {PLANS.map((plan) => {
                      const value = plan.limits[row.key];
                      return (
                        <td key={plan.id} className="py-3 pr-6 tabular-nums">
                          {Number.isFinite(value)
                            ? formatLimit(value)
                            : dict.pricing.unlimited}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr className="align-top">
                  <th scope="row" className="py-4 pr-6 text-left font-normal text-ink-faint">
                    &nbsp;
                  </th>
                  {PLANS.map((plan) => (
                    <td key={plan.id} className="py-4 pr-6">
                      <ul className="space-y-1.5 text-ink-soft">
                        {dict.plans[plan.id].features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-10 max-w-2xl text-sm text-ink-faint">
            {dict.pricing.disclaimer}
          </p>
        </div>
      </section>
    </>
  );
}
