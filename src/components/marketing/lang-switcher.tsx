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
    <div className="flex items-center rounded-lg border border-ink-700 bg-ink-900/70 p-0.5 text-xs">
      {LOCALES.map((value) => {
        const active = value === locale;
        return (
          <Link
            key={value}
            href={swapLocale(pathname, value)}
            hrefLang={value}
            aria-current={active ? 'true' : undefined}
            className={`rounded-md px-2 py-1 font-medium transition ${
              active ? 'bg-ink-700 text-ink-100' : 'text-ink-400 hover:text-ink-100'
            }`}
          >
            {LOCALE_NAMES[value]}
          </Link>
        );
      })}
    </div>
  );
}
