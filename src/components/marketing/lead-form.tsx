'use client';

import { useActionState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { submitLead, type LeadState } from '@/app/[locale]/actions';

const INITIAL: LeadState = { status: 'idle' };

const FIELD =
  'w-full border-b border-rule-strong bg-transparent py-2 text-sm placeholder:text-ink-faint focus:border-ink focus:outline-none';

export default function LeadForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [state, action, pending] = useActionState(submitLead, INITIAL);

  if (state.status === 'success') {
    return <p className="border-t border-ink py-4 text-sm">{dict.cta.success}</p>;
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
    <form action={action} className="max-w-xl">
      <input type="hidden" name="locale" value={locale} />
      <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
        <label className="block">
          <span className="label">{dict.cta.email}</span>
          <input
            name="email"
            type="email"
            required
            placeholder={dict.cta.placeholder}
            className={FIELD}
          />
        </label>
        <label className="block">
          <span className="label">{dict.cta.company}</span>
          <input name="company" placeholder={dict.cta.companyPlaceholder} className={FIELD} />
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 bg-ink px-6 py-2.5 text-sm text-paper transition hover:bg-ink-soft disabled:opacity-50"
      >
        {pending ? dict.cta.sending : dict.cta.button}
      </button>

      {error && <p className="mt-4 text-sm text-mismatch">{error}</p>}
    </form>
  );
}
