import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import LangSwitcher from './lang-switcher';
import MobileNav from './mobile-nav';

/** The six content pages, in the order the home page lists them. */
export function navLinks(locale: Locale, dict: Dictionary) {
  return [
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/team`, label: dict.nav.team },
    { href: `/${locale}/careers`, label: dict.nav.careers },
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];
}

export default function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const links = navLinks(locale, dict);

  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-5xl items-baseline gap-6 px-6 py-5">
        <Link href={`/${locale}`} className="font-display text-lg tracking-[0.08em]">
          INVERSE
        </Link>

        <nav className="hidden items-baseline gap-5 lg:flex">
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
          <div className="lg:hidden">
            <MobileNav links={links} />
          </div>
        </div>
      </div>
    </header>
  );
}
