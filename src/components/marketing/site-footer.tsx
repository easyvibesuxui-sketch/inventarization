import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { navLinks } from './site-header';

export default function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <nav className="grid gap-x-10 gap-y-2 sm:grid-cols-3 lg:grid-cols-6">
          {navLinks(locale, dict).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-soft transition hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-rule pt-6 text-sm text-ink-faint">
          <p>{dict.footer.tagline}</p>
          <p>
            © {new Date().getFullYear()} Inverse. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
