import { redirect } from 'next/navigation';
import { DEFAULT_LOCALE } from '@/lib/i18n/config';

/** Keeps the pre-i18n URL working for anyone who bookmarked or shared it. */
export default function LegacyPricingPage() {
  redirect(`/${DEFAULT_LOCALE}/pricing`);
}
