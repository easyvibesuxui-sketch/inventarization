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
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-5xl flex-wrap items-baseline justify-between gap-x-8 gap-y-3 px-6 py-8 text-sm text-ink-faint">
        <p>{dict.footer.tagline}</p>
        <nav className="flex flex-wrap items-baseline gap-6">
          <Link href={`/${locale}#how`} className="transition hover:text-ink">
            {dict.nav.how}
          </Link>
          <Link href={`/${locale}/pricing`} className="transition hover:text-ink">
            {dict.nav.pricing}
          </Link>
          <Link href="/login" className="transition hover:text-ink">
            {dict.nav.signIn}
          </Link>
        </nav>
        <p>© {new Date().getFullYear()} Novora</p>
      </div>
    </footer>
  );
}
