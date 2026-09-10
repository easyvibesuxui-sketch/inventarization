import type { Dictionary } from '@/lib/i18n/dictionaries';

/** Uses <details> so the accordion works before any JavaScript loads. */
export default function Faq({ dict }: { dict: Dictionary }) {
  return (
    <div className="divide-y divide-ink-700/60 border-y border-ink-700/60">
      {dict.faq.items.map((item) => (
        <details key={item.q} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left marker:content-none">
            <span className="font-medium">{item.q}</span>
            <span
              aria-hidden
              className="shrink-0 text-lg leading-none text-ink-400 transition group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-400">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
