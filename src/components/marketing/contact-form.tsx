'use client';

import { useActionState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { submitContact, type ContactState } from '@/app/[locale]/actions';

const INITIAL: ContactState = { status: 'idle' };

const FIELD =
  'mt-1 w-full border-b border-rule-strong bg-transparent py-2 text-sm focus:border-ink focus:outline-none';

export default function ContactForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [state, action, pending] = useActionState(submitContact, INITIAL);

  if (state.status === 'success') {
    return <p className="border-t border-ink py-5">{dict.contact.success}</p>;
  }

  const error = state.status === 'error' ? dict.contact[state.message ?? 'fallback'] : null;

  return (
    <form action={action} className="max-w-2xl">
      <input type="hidden" name="locale" value={locale} />

      <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
        <label className="block">
          <span className="label">{dict.contact.name}</span>
          <input name="name" required autoComplete="name" className={FIELD} />
        </label>

        <label className="block">
          <span className="label">{dict.contact.company}</span>
          <input name="company" autoComplete="organization" className={FIELD} />
        </label>

        <label className="block">
          <span className="label">{dict.contact.emailField}</span>
          <input name="email" type="email" required autoComplete="email" className={FIELD} />
        </label>

        <label className="block">
          <span className="label">{dict.contact.phone}</span>
          <input name="phone" type="tel" autoComplete="tel" className={FIELD} />
        </label>

        <label className="block sm:col-span-2">
          <span className="label">{dict.contact.topic}</span>
          <select name="topic" defaultValue="service" className={FIELD}>
            <option value="service">{dict.contact.topics.service}</option>
            <option value="question">{dict.contact.topics.question}</option>
            <option value="career">{dict.contact.topics.career}</option>
            <option value="other">{dict.contact.topics.other}</option>
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="label">{dict.contact.message}</span>
          <textarea name="message" required rows={5} className={`${FIELD} resize-y`} />
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-8 bg-ink px-6 py-2.5 text-sm text-paper transition hover:bg-ink-soft disabled:opacity-50"
      >
        {pending ? dict.contact.sending : dict.contact.submit}
      </button>

      {error && <p className="mt-4 max-w-xl text-sm text-mismatch">{error}</p>}
    </form>
  );
}
