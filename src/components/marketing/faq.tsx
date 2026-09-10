import type { Dictionary } from '@/lib/i18n/dictionaries';

/** Uses <details> so the list works before any JavaScript loads. */
export default function Faq({ dict }: { dict: Dictionary }) {
  return (
    <div className="border-t border-ink">
      {dict.faq.items.map((item) => (
        <details key={item.q} className="group border-b border-rule">
          <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-4 marker:content-none">
            <span>{item.q}</span>
            <span
              aria-hidden
              className="shrink-0 text-ink-faint transition group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-2xl pb-5 text-sm leading-relaxed text-ink-soft">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
