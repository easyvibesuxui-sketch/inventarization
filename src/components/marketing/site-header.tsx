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
    { href: `/${locale}/pricing`, label: dict.nav.pricing },
    { href: `/${locale}#faq`, label: dict.nav.faq },
  ];

  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-5xl items-baseline gap-8 px-6 py-5">
        <Link href={`/${locale}`} className="font-display text-lg tracking-[0.08em]">
          INVERSE
        </Link>

        <nav className="hidden items-baseline gap-6 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-soft underline-offset-4 transition hover:text-ink hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-baseline gap-5">
          <LangSwitcher locale={locale} />
          <Link
            href="/login"
            className="text-sm text-ink underline underline-offset-4 decoration-rule-strong transition hover:decoration-ink"
          >
            {dict.nav.signIn}
          </Link>
        </div>
      </div>
    </header>
  );
}
