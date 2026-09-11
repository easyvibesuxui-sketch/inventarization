import type { ReactNode } from 'react';
import Reveal from './reveal';
import Rise from './rise';

/** One column width and one vertical rhythm for every page. */
export function Band({
  id,
  label,
  children,
}: {
  id?: string;
  label?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-rule">
      <div className="mx-auto max-w-5xl px-6 py-20">
        {label && <p className="label mb-10">{label}</p>}
        {children}
      </div>
    </section>
  );
}

/** The masthead every inner page opens with. */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-20">
        {eyebrow && (
          <Rise>
            <p className="label">{eyebrow}</p>
          </Rise>
        )}
        <Rise delay={eyebrow ? 60 : 0}>
          <h1 className="font-display mt-6 max-w-3xl text-4xl sm:text-5xl md:text-6xl">{title}</h1>
        </Rise>
        {intro && (
          <Rise delay={120}>
            <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-ink-soft">
              {intro}
            </p>
          </Rise>
        )}
      </div>
    </section>
  );
}

/** A titled item on a hairline rule — the page's one repeated block. */
export function RuledItem({
  title,
  body,
  points,
  aside,
  delay = 0,
}: {
  title: string;
  body?: string;
  points?: readonly string[];
  aside?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="border-b border-rule py-7">
      <div className="grid gap-x-10 gap-y-3 md:grid-cols-[18rem_1fr]">
        <div>
          <h3 className="text-base">{title}</h3>
          {aside && <p className="label mt-2">{aside}</p>}
        </div>
        <div>
          {body && <p className="max-w-xl leading-relaxed text-ink-soft">{body}</p>}
          {points && points.length > 0 && (
            <ul className="mt-4 space-y-1.5 text-sm text-ink-soft">
              {points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden className="text-ink-faint">
                    —
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Reveal>
  );
}
