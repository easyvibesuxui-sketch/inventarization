import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import LangSwitcher from './lang-switcher';

export default function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const links = [
    { href: `/${locale}#how`, label: dict.nav.how },
    { href: `/${locale}#product`, label: dict.nav.product },
    { href: `/${locale}/pricing`, label: dict.nav.pricing },
    { href: `/${locale}#faq`, label: dict.nav.faq },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-ink-700/60 bg-ink-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3.5">
        <Link href={`/${locale}`} className="text-lg font-semibold tracking-tight">
          Inverse
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-sm text-ink-400 transition hover:text-ink-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <LangSwitcher locale={locale} />
          <Link
            href="/login"
            className="rounded-lg px-3 py-1.5 text-sm text-ink-300 transition hover:text-ink-100"
          >
            {dict.nav.signIn}
          </Link>
          <Link
            href="/login"
            className="rounded-lg bg-accent-600 px-3 py-1.5 text-sm font-medium text-ink-950 transition hover:bg-accent-500"
          >
            {dict.nav.start}
          </Link>
        </div>
      </div>
    </header>
  );
}
