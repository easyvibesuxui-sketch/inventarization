'use server';

import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/env';
import { isLocale } from '@/lib/i18n/config';

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  /** A dictionary key, so the view renders the message in the reader's language. */
  message?: 'invalidEmail' | 'missingMessage' | 'fallback';
};

// Deliberately loose: the database constraint is the real check, and a stricter
// pattern here would reject valid addresses for no gain.
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const TOPICS = ['service', 'question', 'career', 'other'] as const;
type Topic = (typeof TOPICS)[number];

function field(formData: FormData, key: string, max: number): string {
  return String(formData.get(key) ?? '')
    .trim()
    .slice(0, max);
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = field(formData, 'name', 200);
  const company = field(formData, 'company', 200);
  const email = field(formData, 'email', 320).toLowerCase();
  const phone = field(formData, 'phone', 40);
  const message = field(formData, 'message', 5000);

  const topicValue = String(formData.get('topic') ?? 'service');
  const topic: Topic = (TOPICS as readonly string[]).includes(topicValue)
    ? (topicValue as Topic)
    : 'service';

  const localeValue = String(formData.get('locale') ?? 'ka');
  const locale = isLocale(localeValue) ? localeValue : 'ka';

  if (!EMAIL.test(email)) return { status: 'error', message: 'invalidEmail' };
  if (!name || !message) return { status: 'error', message: 'missingMessage' };

  if (!isSupabaseConfigured()) {
    return { status: 'error', message: 'fallback' };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('contact_requests').insert({
    name,
    company: company || null,
    email,
    phone: phone || null,
    topic,
    message,
    locale,
  });

  if (error) return { status: 'error', message: 'fallback' };

  return { status: 'success' };
}
