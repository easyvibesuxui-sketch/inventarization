import Link from 'next/link';
import { ButtonLink } from '@/components/ui';

const STEPS = [
  {
    title: 'Record what should be there',
    body: 'Products, folders, locations down to the individual shelf. Multi-tenant from the first row — every table is scoped by company and enforced in the database, not the app.',
  },
  {
    title: 'Photograph what is there',
    body: 'Phone, tablet or a head-worn camera. Freeze one frame; Claude reads static images, so the flow is capture-then-analyze rather than a live stream that never settles.',
  },
  {
    title: 'Get a verdict per SKU',
    body: 'Green where the count matches, amber where the model is unsure or two variants look identical, red where the record is wrong. Apply the counts in one click when you agree.',
  },
];

export default function HomePage() {
  return (
    <main className="grid-wash flex-1">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <header className="flex items-center justify-between">
          <span className="text-lg font-semibold tracking-tight">Inverse</span>
          <nav className="flex items-center gap-2">
            <Link
              href="/pricing"
              className="rounded-lg px-3 py-1.5 text-sm text-ink-300 transition hover:text-ink-100"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-ink-600 px-3 py-1.5 text-sm text-ink-300 transition hover:border-ink-400 hover:text-ink-100"
            >
              Sign in
            </Link>
          </nav>
        </header>

        <section className="py-24 sm:py-32">
          <p className="text-sm font-medium uppercase tracking-wider text-accent-500">
            Inventory verification, Tbilisi
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Your records say 12. The shelf says 9.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-400">
            Inverse is inventory management for SMBs in Georgia and the Caucasus, with an
            AI verification step built in: photograph a shelf and it counts what is
            actually on it against what your records claim.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/login">Start free</ButtonLink>
            <ButtonLink href="/pricing" variant="secondary">
              See pricing
            </ButtonLink>
          </div>
        </section>

        <section className="grid gap-6 border-t border-ink-700/70 py-16 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <div key={step.title}>
              <span className="font-mono text-xs text-accent-500">
                0{index + 1}
              </span>
              <h2 className="mt-2 text-lg font-medium">{step.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">{step.body}</p>
            </div>
          ))}
        </section>

        <section className="border-t border-ink-700/70 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">
            Where vision alone is not enough
          </h2>
          <p className="mt-3 max-w-3xl text-ink-400">
            Two hairbrushes from the same line can be identical from a metre away and
            differ only in size. Inverse does not guess at those. It marks them for a
            barcode scan and tells you which SKUs are in play, so a confident-looking
            count is never quietly wrong.
          </p>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-ink-700/70 py-8 text-sm text-ink-400">
          <p>Inverse — a Novora product.</p>
          <Link href="/pricing" className="hover:text-ink-100">
            Pricing
          </Link>
        </footer>
      </div>
    </main>
  );
}
