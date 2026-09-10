import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries';

export default function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className="border-t border-ink-700/60">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-ink-400">
        <p>{dict.footer.tagline}</p>
        <nav className="flex flex-wrap items-center gap-4">
          <Link href={`/${locale}#how`} className="transition hover:text-ink-100">
            {dict.nav.how}
          </Link>
          <Link href={`/${locale}/pricing`} className="transition hover:text-ink-100">
            {dict.nav.pricing}
          </Link>
          <Link href={`/${locale}#faq`} className="transition hover:text-ink-100">
            {dict.nav.faq}
          </Link>
          <Link href="/login" className="transition hover:text-ink-100">
            {dict.nav.signIn}
          </Link>
        </nav>
        <p className="text-xs">
          © {new Date().getFullYear()} Novora. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
