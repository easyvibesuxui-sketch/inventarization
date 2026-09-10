'use client';

import { useActionState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { submitLead, type LeadState } from '@/app/[locale]/actions';

const INITIAL: LeadState = { status: 'idle' };

export default function LeadForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [state, action, pending] = useActionState(submitLead, INITIAL);

  if (state.status === 'success') {
    return (
      <p className="rounded-lg border border-match-500/40 bg-match-500/10 px-4 py-3 text-sm text-match-500">
        {dict.cta.success}
      </p>
    );
  }

  // The action returns a dictionary key, so the message is translated here
  // rather than being fixed to one language on the server.
  const error =
    state.status === 'error'
      ? state.message === 'invalidEmail'
        ? dict.cta.invalidEmail
        : dict.cta.fallback
      : null;

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="locale" value={locale} />
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          name="email"
          type="email"
          required
          placeholder={dict.cta.placeholder}
          aria-label={dict.cta.placeholder}
          className="w-full flex-1 rounded-lg border border-ink-600 bg-ink-850 px-3.5 py-2.5 text-sm text-ink-100 placeholder:text-ink-400 focus:border-accent-600 focus:outline-none focus:ring-1 focus:ring-accent-600"
        />
        <input
          name="company"
          placeholder={dict.cta.companyPlaceholder}
          aria-label={dict.cta.company}
          className="w-full rounded-lg border border-ink-600 bg-ink-850 px-3.5 py-2.5 text-sm text-ink-100 placeholder:text-ink-400 focus:border-accent-600 focus:outline-none focus:ring-1 focus:ring-accent-600 sm:w-48"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-medium text-ink-950 transition hover:bg-accent-500 disabled:opacity-50"
        >
          {pending ? dict.cta.sending : dict.cta.button}
        </button>
      </div>
      {error && (
        <p className="rounded-lg border border-partial-500/40 bg-partial-500/10 px-4 py-3 text-sm text-partial-500">
          {error}
        </p>
      )}
    </form>
  );
}
