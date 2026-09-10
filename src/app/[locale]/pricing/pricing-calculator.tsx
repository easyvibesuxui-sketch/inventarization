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

  const sliders: {
    key: keyof Usage;
    label: string;
    hint: string;
    max: number;
    step: number;
  }[] = [
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
    <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[1fr_18rem]">
      <div>
        {sliders.map(({ key, label, hint, max, step }) => (
          <div key={key} className="border-b border-rule py-5 first:border-t first:border-ink">
            <div className="flex items-baseline justify-between gap-6">
              <label htmlFor={`usage-${key}`} className="text-sm">
                {label}
              </label>
              <span className="text-sm tabular-nums">
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
              className="mt-3 w-full accent-[var(--color-ink)]"
            />
            <p className="mt-2 text-xs text-ink-faint">{hint}</p>
          </div>
        ))}

        <label className="mt-6 flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={annual}
            onChange={(event) => setAnnual(event.target.checked)}
            className="h-4 w-4 accent-[var(--color-ink)]"
          />
          {dict.pricing.payYearly}
          <span className="text-ink-faint">
            {dict.pricing.save} {Math.round(ANNUAL_DISCOUNT * 100)}%
          </span>
        </label>
      </div>

      <aside className="border-t border-ink pt-5">
        <p className="label">{dict.pricing.recommended}</p>
        <p className="font-display mt-3 text-3xl">{dict.plans[result.plan.id].name}</p>

        {isCustom ? (
          <>
            <p className="mt-6 text-2xl">{dict.pricing.letsTalk}</p>
            <p className="mt-3 text-sm text-ink-soft">{dict.pricing.letsTalkBody}</p>
          </>
        ) : (
          <>
            <p className="mt-6 text-4xl tabular-nums">
              {formatMoney(annual ? result.annualTotal / 12 : result.monthlyTotal)}
              <span className="text-sm text-ink-faint">{dict.pricingTeaser.perMonth}</span>
            </p>
            {annual && (
              <p className="mt-2 text-sm text-ink-soft">
                {formatMoney(result.annualTotal)} {dict.pricing.billedYearly} ·{' '}
                {dict.pricing.saves} {formatMoney(result.annualSaving)}
              </p>
            )}

            <dl className="mt-6 border-t border-rule pt-4 text-sm">
              <div className="flex justify-between gap-4 py-1">
                <dt className="text-ink-faint">{dict.pricing.plan}</dt>
                <dd className="tabular-nums">{formatMoney(result.basePrice)}</dd>
              </div>
              {result.overageChecks > 0 && (
                <div className="flex justify-between gap-4 py-1">
                  <dt className="text-ink-faint">
                    {result.overageChecks.toLocaleString()} {dict.pricing.extraChecks}
                  </dt>
                  <dd className="tabular-nums">{formatMoney(result.overageCost)}</dd>
                </div>
              )}
            </dl>
          </>
        )}

        <ul className="mt-6 space-y-2 border-t border-rule pt-4 text-sm text-ink-soft">
          {result.reasons.map((reason, index) => (
            <li key={index}>{describe(reason)}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
