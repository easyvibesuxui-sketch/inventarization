import Link from 'next/link';
import PricingCalculator from './pricing-calculator';
import { CURRENCY, formatLimit, formatMoney, PLANS } from '@/lib/pricing';

export const metadata = {
  title: 'Pricing',
  description: 'Work out what Inverse costs for your catalogue, sites and check volume.',
};

export default function PricingPage() {
  return (
    <main className="grid-wash flex-1">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Inverse
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-ink-600 px-3 py-1.5 text-sm text-ink-300 transition hover:border-ink-400 hover:text-ink-100"
          >
            Sign in
          </Link>
        </header>

        <div className="mt-16 max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight">Pricing</h1>
          <p className="mt-3 text-ink-400">
            Priced in {CURRENCY} for the Georgian market. Tell the calculator how much you
            actually count and it will pick the cheapest plan that covers it — including
            when paying per-check overage beats moving up a tier.
          </p>
        </div>

        <div className="mt-10">
          <PricingCalculator />
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className="flex flex-col rounded-xl border border-ink-700/70 bg-ink-900/60 p-6"
            >
              <h2 className="text-sm font-semibold uppercase tracking-wider text-accent-500">
                {plan.name}
              </h2>
              <p className="mt-3 text-3xl font-semibold tabular-nums">
                {plan.monthly === null ? 'Custom' : formatMoney(plan.monthly)}
                {plan.monthly !== null && plan.monthly > 0 && (
                  <span className="text-sm font-normal text-ink-400"> /mo</span>
                )}
              </p>
              <p className="mt-2 text-sm text-ink-400">{plan.blurb}</p>

              <dl className="mt-5 space-y-1.5 border-t border-ink-700/70 pt-5 text-sm">
                {(
                  [
                    ['Products', plan.limits.skus],
                    ['Locations', plan.limits.locations],
                    ['Users', plan.limits.users],
                    ['AI checks / mo', plan.limits.checks],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-3">
                    <dt className="text-ink-400">{label}</dt>
                    <dd className="tabular-nums">{formatLimit(value)}</dd>
                  </div>
                ))}
              </dl>

              <ul className="mt-5 space-y-1.5 border-t border-ink-700/70 pt-5 text-sm text-ink-300">
                {plan.features.map((feature) => (
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
          Prices on this page are placeholders pending commercial sign-off. They live in
          one file — <code className="font-mono">src/lib/pricing.ts</code> — so changing
          them updates the calculator and this table together.
        </p>
      </div>
    </main>
  );
}
