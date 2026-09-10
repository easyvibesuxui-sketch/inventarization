'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES, LOCALE_NAMES, type Locale } from '@/lib/i18n/config';

/** Swaps the leading locale segment, keeping the reader on the same page. */
function swapLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  segments[0] = locale;
  return `/${segments.join('/')}`;
}

export default function LangSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <div className="flex items-baseline gap-2 text-sm">
      {LOCALES.map((value, index) => {
        const active = value === locale;
        return (
          <span key={value} className="flex items-baseline gap-2">
            {index > 0 && <span className="text-rule-strong">/</span>}
            <Link
              href={swapLocale(pathname, value)}
              hrefLang={value}
              aria-current={active ? 'true' : undefined}
              className={active ? 'text-ink' : 'text-ink-faint transition hover:text-ink'}
            >
              {LOCALE_NAMES[value]}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
