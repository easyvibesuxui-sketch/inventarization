'use server';

import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/env';
import { isLocale } from '@/lib/i18n/config';

export type LeadState = { status: 'idle' | 'success' | 'error'; message?: string };

// Deliberately loose: the database constraint is the real check, and a stricter
// pattern here would reject valid addresses for no gain.
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function submitLead(
  _prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const company = String(formData.get('company') ?? '').trim();
  const localeValue = String(formData.get('locale') ?? 'ka');
  const locale = isLocale(localeValue) ? localeValue : 'ka';

  if (!EMAIL.test(email) || email.length > 320) {
    return { status: 'error', message: 'invalidEmail' };
  }

  if (!isSupabaseConfigured()) {
    return { status: 'error', message: 'fallback' };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('leads').insert({
    email,
    company: company.slice(0, 200) || null,
    locale,
    source: 'landing',
  });

  if (error) {
    return { status: 'error', message: 'fallback' };
  }

  return { status: 'success' };
}
