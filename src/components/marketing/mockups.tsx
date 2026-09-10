import type { Dictionary } from '@/lib/i18n/dictionaries';

/*
  One illustration only: the result of a check, drawn as a plain table.

  It is the single screen worth showing, because it is the thing the product
  actually produces. Decorative dashboards were removed — they filled space
  without telling the reader anything.

  aria-hidden: the numbers are invented, and the prose beside it carries the
  meaning.
*/
export function ResultTable({ dict }: { dict: Dictionary }) {
  const rows = [
    {
      name: 'Rhode · Peptide lip',
      expected: 24,
      counted: 24,
      confidence: 96,
      verdict: 'match' as const,
    },
    {
      name: 'Rhode · Glazing milk',
      expected: 12,
      counted: 9,
      confidence: 91,
      verdict: 'mismatch' as const,
    },
    {
      name: 'Janeke · 1362 / 1363',
      expected: 12,
      counted: 12,
      confidence: 44,
      verdict: 'review' as const,
      note: dict.mockup.barcodeNote,
    },
    {
      name: 'Spazzola · Paddle brush',
      expected: 15,
      counted: 15,
      confidence: 93,
      verdict: 'match' as const,
    },
  ];

  const verdicts = {
    match: { label: dict.mockup.match, className: 'text-match' },
    review: { label: dict.mockup.review, className: 'text-review' },
    mismatch: { label: dict.mockup.mismatch, className: 'text-mismatch' },
  };

  return (
    <figure aria-hidden className="border-t border-ink">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] text-sm">
          <caption className="label border-b border-rule py-2 text-left">
            {dict.mockup.results} — R-2
          </caption>
          <thead>
            <tr className="border-b border-rule text-left align-bottom">
              <th className="py-2 pr-4 font-normal text-ink-faint">SKU</th>
              <th className="py-2 pr-4 text-right font-normal text-ink-faint">
                {dict.mockup.expected}
              </th>
              <th className="py-2 pr-4 text-right font-normal text-ink-faint">
                {dict.mockup.counted}
              </th>
              <th className="py-2 pr-4 text-right font-normal text-ink-faint">
                {dict.mockup.confidence}
              </th>
              <th className="py-2 font-normal text-ink-faint">{dict.mockup.verdict}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-b border-rule align-top">
                <td className="py-3 pr-4">
                  {row.name}
                  {row.note && (
                    <span className="mt-1 block text-xs text-review">{row.note}</span>
                  )}
                </td>
                <td className="py-3 pr-4 text-right tabular-nums text-ink-soft">
                  {row.expected}
                </td>
                <td className="py-3 pr-4 text-right tabular-nums">{row.counted}</td>
                <td className="py-3 pr-4 text-right tabular-nums text-ink-faint">
                  {row.confidence}%
                </td>
                <td className={`py-3 ${verdicts[row.verdict].className}`}>
                  {verdicts[row.verdict].label}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
