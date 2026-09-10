'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/products', label: 'Products' },
  { href: '/locations', label: 'Locations' },
  { href: '/verify', label: 'Verify' },
  { href: '/checks', label: 'Checks' },
  { href: '/settings', label: 'Settings' },
] as const;

export default function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 overflow-x-auto">
      {LINKS.map(({ href, label }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              active
                ? 'bg-ink-800 text-ink-100'
                : 'text-ink-400 hover:bg-ink-800/60 hover:text-ink-100'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
