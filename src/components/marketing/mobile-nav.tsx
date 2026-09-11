'use client';

import Link from 'next/link';
import { useState } from 'react';

/**
 * Narrow-screen navigation. A <details>-style disclosure rather than an overlay:
 * six links do not need a full-screen menu.
 */
export default function MobileNav({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="text-sm underline underline-offset-4 decoration-rule-strong"
      >
        {open ? '×' : '☰'}
      </button>

      {open && (
        <nav className="absolute right-0 top-8 z-50 w-56 rounded-control border border-rule bg-paper p-4 shadow-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-rule py-2.5 text-sm last:border-b-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
