'use client';

import { useMemo, useState } from 'react';
import {
  ANNUAL_DISCOUNT,
  CURRENCY_SYMBOL,
  formatMoney,
  quote,
  type Reason,
  type Usage,
} from '@/lib/pricing';
import type { Dictionary } from '@/lib/i18n/dictionaries';

const DEFAULT_USAGE: Usage = { skus: 800, locations: 3, users: 4, checks: 240 };

export default function PricingCalculator({ dict }: { dict: Dictionary }) {
  const [usage, setUsage] = useState<Usage>(DEFAULT_USAGE);
  const [annual, setAnnual] = useState(false);

  const result = useMemo(() => quote(usage), [usage]);
  const isCustom = result.plan.monthly === null;

  const sliders: { key: keyof Usage; label: string; hint: string; max: number; step: number }[] =
    [
      { key: 'skus', label: dict.pricing.skus, hint: dict.pricing.skusHint, max: 15_000, step: 50 },
      {
        key: 'locations',
        label: dict.pricing.locations,
        hint: dict.pricing.locationsHint,
        max: 30,
        step: 1,
      },
      { key: 'users', label: dict.pricing.users, hint: dict.pricing.usersHint, max: 40, step: 1 },
      {
        key: 'checks',
        label: dict.pricing.checks,
        hint: dict.pricing.checksHint,
        max: 3_000,
        step: 10,
      },
    ];

  /** Turns a reason code from the pricing rule into a sentence in this locale. */
  function describe(reason: Reason): string {
    switch (reason.kind) {
      case 'exceeds': {
        const noun = {
          skus: dict.pricing.limitProducts,
          locations: dict.pricing.limitLocations,
          users: dict.pricing.limitUsers,
        }[reason.field];
        return `${reason.value.toLocaleString()} ${noun.toLowerCase()} — ${dict.pricing.reasonExceeds}`;
      }
      case 'overage':
        return `${reason.count.toLocaleString()} ${dict.pricing.reasonOverage} ${CURRENCY_SYMBOL}${reason.rate.toFixed(2)} ${dict.pricing.each}.`;
      case 'fits':
        return dict.pricing.reasonFits;
      case 'enterprise':
        return dict.pricing.reasonEnterprise;
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="rounded-xl border border-ink-700/70 bg-ink-900/60 p-6">
        <div className="space-y-6">
          {sliders.map(({ key, label, hint, max, step }) => (
            <div key={key}>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor={`usage-${key}`} className="text-sm font-medium">
                  {label}
                </label>
                <span className="font-mono text-sm tabular-nums text-accent-500">
                  {usage[key].toLocaleString()}
                  {usage[key] === max && '+'}
                </span>
              </div>
              <input
                id={`usage-${key}`}
                type="range"
                min={0}
                max={max}
                step={step}
                value={usage[key]}
                onChange={(event) =>
                  setUsage((current) => ({ ...current, [key]: Number(event.target.value) }))
                }
                className="mt-2 w-full accent-[var(--color-accent-600)]"
              />
              <p className="mt-1 text-xs text-ink-400">{hint}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 border-t border-ink-700/70 pt-5">
          <button
            type="button"
            role="switch"
            aria-checked={annual}
            aria-label={dict.pricing.payYearly}
            onClick={() => setAnnual((value) => !value)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${
              annual ? 'bg-accent-600' : 'bg-ink-700'
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-ink-100 transition-all ${
                annual ? 'left-[1.375rem]' : 'left-0.5'
              }`}
            />
          </button>
          <span className="text-sm">
            {dict.pricing.payYearly}
            <span className="ml-2 text-xs text-match-500">
              {dict.pricing.save} {Math.round(ANNUAL_DISCOUNT * 100)}%
            </span>
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-accent-600/40 bg-ink-900/80 p-6">
        <p className="text-xs uppercase tracking-wider text-ink-400">
          {dict.pricing.recommended}
        </p>
        <p className="mt-1 text-2xl font-semibold">{dict.plans[result.plan.id].name}</p>

        {isCustom ? (
          <>
            <p className="mt-4 text-3xl font-semibold">{dict.pricing.letsTalk}</p>
            <p className="mt-2 text-sm text-ink-400">{dict.pricing.letsTalkBody}</p>
          </>
        ) : (
          <>
            <p className="mt-4 text-4xl font-semibold tabular-nums">
              {formatMoney(annual ? result.annualTotal / 12 : result.monthlyTotal)}
              <span className="text-sm font-normal text-ink-400">
                {dict.pricingTeaser.perMonth}
              </span>
            </p>
            {annual && (
              <p className="mt-1 text-sm text-ink-400">
                {formatMoney(result.annualTotal)} {dict.pricing.billedYearly} ·{' '}
                <span className="text-match-500">
                  {dict.pricing.saves} {formatMoney(result.annualSaving)}
                </span>
              </p>
            )}

            <dl className="mt-5 space-y-1.5 border-t border-ink-700/70 pt-5 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-ink-400">{dict.pricing.plan}</dt>
                <dd className="tabular-nums">{formatMoney(result.basePrice)}</dd>
              </div>
              {result.overageChecks > 0 && (
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-400">
                    {result.overageChecks.toLocaleString()} {dict.pricing.extraChecks}
                  </dt>
                  <dd className="tabular-nums">{formatMoney(result.overageCost)}</dd>
                </div>
              )}
            </dl>
          </>
        )}

        <ul className="mt-5 space-y-2 border-t border-ink-700/70 pt-5 text-sm text-ink-400">
          {result.reasons.map((reason, index) => (
            <li key={index} className="flex gap-2">
              <span className="text-accent-500">·</span>
              {describe(reason)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
