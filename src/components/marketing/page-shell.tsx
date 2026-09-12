import type { ReactNode } from 'react';
import Reveal from './reveal';
import Section, { type Tone } from './section';
import Rise from './rise';

/** One column width and one vertical rhythm for every page. */
export function Band({
  id,
  label,
  tone = 'paper',
  video,
  children,
}: {
  id?: string;
  label?: string;
  tone?: Tone;
  video?: string;
  children: ReactNode;
}) {
  return (
    <Section id={id} tone={tone} video={video}>
      {label && <p className="eyebrow mb-12">{label}</p>}
      {children}
    </Section>
  );
}

/** The masthead every inner page opens with. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  tone = 'paper',
  video,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: Tone;
  video?: string;
}) {
  return (
    <Section tone={tone} video={video} className="border-t-0">
      {eyebrow && (
        <Rise>
          <p className="eyebrow">{eyebrow}</p>
        </Rise>
      )}
      <Rise delay={eyebrow ? 60 : 0}>
        <h1 className="font-display mt-8 max-w-3xl text-[2.75rem] leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
          {title}
        </h1>
      </Rise>
      {intro && (
        <Rise delay={120}>
          <p className="mt-10 max-w-xl text-lg font-light leading-relaxed text-ink-soft">{intro}</p>
        </Rise>
      )}
    </Section>
  );
}

/** A titled item on a hairline rule — the page's one repeated block. */
export function RuledItem({
  title,
  body,
  points,
  aside,
  index,
  delay = 0,
}: {
  title: string;
  body?: string;
  points?: readonly string[];
  aside?: string;
  /** Position in the list, counted in the accent beside the title. */
  index?: number;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="border-b border-rule py-9">
      <div className="grid gap-x-10 gap-y-4 md:grid-cols-[3rem_20rem_1fr]">
        <p className="index hidden md:block">
          {index === undefined ? '' : String(index).padStart(2, '0')}
        </p>
        <div>
          <h3 className="font-display text-xl leading-tight tracking-wide sm:text-2xl">{title}</h3>
          {aside && <p className="label mt-3">{aside}</p>}
        </div>
        <div>
          {body && <p className="max-w-xl leading-relaxed text-ink-soft">{body}</p>}
          {points && points.length > 0 && (
            <ul className="mt-4 space-y-1.5 text-sm text-ink-soft">
              {points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden className="text-accent">
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
