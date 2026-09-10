'use client';

import { useMemo, useState } from 'react';
import {
  ANNUAL_DISCOUNT,
  formatMoney,
  quote,
  type Usage,
} from '@/lib/pricing';

const SLIDERS: {
  key: keyof Usage;
  label: string;
  max: number;
  step: number;
  hint: string;
}[] = [
  { key: 'skus', label: 'Products (SKUs)', max: 15_000, step: 50, hint: 'Distinct items you track' },
  { key: 'locations', label: 'Locations', max: 30, step: 1, hint: 'Warehouses, shops, racks' },
  { key: 'users', label: 'Users', max: 40, step: 1, hint: 'People with a login' },
  {
    key: 'checks',
    label: 'AI verifications / month',
    max: 3_000,
    step: 10,
    hint: 'One photo analysed = one check',
  },
];

const DEFAULT_USAGE: Usage = { skus: 800, locations: 3, users: 4, checks: 240 };

export default function PricingCalculator() {
  const [usage, setUsage] = useState<Usage>(DEFAULT_USAGE);
  const [annual, setAnnual] = useState(false);

  const result = useMemo(() => quote(usage), [usage]);
  const isCustom = result.plan.monthly === null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="rounded-xl border border-ink-700/70 bg-ink-900/60 p-6">
        <div className="space-y-6">
          {SLIDERS.map(({ key, label, max, step, hint }) => (
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
            onClick={() => setAnnual((value) => !value)}
            className={`relative h-6 w-11 rounded-full transition ${
              annual ? 'bg-accent-600' : 'bg-ink-700'
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-ink-100 transition ${
                annual ? 'left-5.5' : 'left-0.5'
              }`}
            />
          </button>
          <span className="text-sm">
            Pay yearly
            <span className="ml-2 text-xs text-match-500">
              save {Math.round(ANNUAL_DISCOUNT * 100)}%
            </span>
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-accent-600/40 bg-ink-900/80 p-6">
        <p className="text-xs uppercase tracking-wider text-ink-400">Recommended</p>
        <p className="mt-1 text-2xl font-semibold">{result.plan.name}</p>

        {isCustom ? (
          <>
            <p className="mt-4 text-3xl font-semibold">Let&apos;s talk</p>
            <p className="mt-2 text-sm text-ink-400">
              At this volume the pricing is worth a conversation rather than a slider.
            </p>
          </>
        ) : (
          <>
            <p className="mt-4 text-4xl font-semibold tabular-nums">
              {formatMoney(annual ? result.annualTotal / 12 : result.monthlyTotal)}
              <span className="text-sm font-normal text-ink-400"> /mo</span>
            </p>
            {annual && (
              <p className="mt-1 text-sm text-ink-400">
                {formatMoney(result.annualTotal)} billed yearly ·{' '}
                <span className="text-match-500">
                  saves {formatMoney(result.annualSaving)}
                </span>
              </p>
            )}

            <dl className="mt-5 space-y-1.5 border-t border-ink-700/70 pt-5 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-ink-400">Plan</dt>
                <dd className="tabular-nums">{formatMoney(result.basePrice)}</dd>
              </div>
              {result.overageChecks > 0 && (
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-400">
                    {result.overageChecks.toLocaleString()} extra checks
                  </dt>
                  <dd className="tabular-nums">{formatMoney(result.overageCost)}</dd>
                </div>
              )}
            </dl>
          </>
        )}

        <ul className="mt-5 space-y-2 border-t border-ink-700/70 pt-5 text-sm text-ink-400">
          {result.reasons.map((reason) => (
            <li key={reason} className="flex gap-2">
              <span className="text-accent-500">·</span>
              {reason}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
