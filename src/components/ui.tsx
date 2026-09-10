import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import type { CheckStatus, MatchStatus } from '@/types/database';

export function Card({
  title,
  action,
  children,
  className = '',
}: {
  title?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-ink-700/70 bg-ink-900/60 shadow-sm ${className}`}
    >
      {(title || action) && (
        <header className="flex items-center justify-between gap-4 border-b border-ink-700/70 px-5 py-3.5">
          <h2 className="text-sm font-semibold tracking-wide text-ink-100">{title}</h2>
          {action}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function Stat({
  label,
  value,
  hint,
  tone = 'default',
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: 'default' | 'match' | 'partial' | 'mismatch';
}) {
  const toneClass = {
    default: 'text-ink-100',
    match: 'text-match-500',
    partial: 'text-partial-500',
    mismatch: 'text-mismatch-500',
  }[tone];

  return (
    <div className="rounded-xl border border-ink-700/70 bg-ink-900/60 px-5 py-4">
      <p className="text-xs uppercase tracking-wider text-ink-400">{label}</p>
      <p className={`mt-1.5 text-2xl font-semibold tabular-nums ${toneClass}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
    </div>
  );
}

const MATCH_LABELS: Record<MatchStatus, { label: string; className: string }> = {
  match: { label: 'Match', className: 'bg-match-500/15 text-match-500 ring-match-500/30' },
  partial: { label: 'Check', className: 'bg-partial-500/15 text-partial-500 ring-partial-500/30' },
  mismatch: {
    label: 'Mismatch',
    className: 'bg-mismatch-500/15 text-mismatch-500 ring-mismatch-500/30',
  },
  unknown: { label: 'Unlisted', className: 'bg-ink-600/30 text-ink-300 ring-ink-600/50' },
};

export function MatchBadge({ status }: { status: MatchStatus }) {
  const { label, className } = MATCH_LABELS[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${className}`}
    >
      {label}
    </span>
  );
}

const CHECK_LABELS: Record<CheckStatus, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-ink-600/30 text-ink-300 ring-ink-600/50' },
  analyzing: {
    label: 'Analyzing',
    className: 'bg-accent-500/15 text-accent-500 ring-accent-500/30',
  },
  completed: { label: 'Completed', className: 'bg-match-500/15 text-match-500 ring-match-500/30' },
  failed: { label: 'Failed', className: 'bg-mismatch-500/15 text-mismatch-500 ring-mismatch-500/30' },
};

export function CheckBadge({ status }: { status: CheckStatus }) {
  const { label, className } = CHECK_LABELS[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${className}`}
    >
      {label}
    </span>
  );
}

const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50';

const BUTTON_VARIANTS = {
  primary: 'bg-accent-600 text-ink-950 hover:bg-accent-500',
  secondary: 'border border-ink-600 bg-ink-800 text-ink-100 hover:border-ink-400',
  ghost: 'text-ink-300 hover:bg-ink-800 hover:text-ink-100',
  danger: 'border border-mismatch-500/40 text-mismatch-500 hover:bg-mismatch-500/10',
} as const;

type Variant = keyof typeof BUTTON_VARIANTS;

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ComponentProps<'button'> & { variant?: Variant }) {
  return (
    <button
      {...props}
      className={`${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${className}`}
    />
  );
}

export function ButtonLink({
  variant = 'primary',
  className = '',
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link {...props} className={`${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${className}`} />
  );
}

export const inputClass =
  'w-full rounded-lg border border-ink-600 bg-ink-850 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-400 focus:border-accent-600 focus:outline-none focus:ring-1 focus:ring-accent-600';

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-300">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-400">{hint}</span>}
    </label>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-ink-600 px-6 py-12 text-center">
      <p className="text-sm font-medium text-ink-100">{title}</p>
      <p className="mx-auto mt-1.5 max-w-md text-sm text-ink-400">{description}</p>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

export function Alert({ tone = 'error', children }: { tone?: 'error' | 'info'; children: ReactNode }) {
  const className =
    tone === 'error'
      ? 'border-mismatch-500/40 bg-mismatch-500/10 text-mismatch-500'
      : 'border-accent-500/40 bg-accent-500/10 text-accent-500';
  return (
    <div className={`rounded-lg border px-4 py-3 text-sm ${className}`} role="alert">
      {children}
    </div>
  );
}
