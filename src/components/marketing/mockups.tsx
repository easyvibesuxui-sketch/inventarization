import type { Dictionary } from '@/lib/i18n/dictionaries';

/*
  Illustrated product screens, drawn in HTML rather than screenshotted, so they
  stay sharp at any width, translate with the rest of the page, and never drift
  out of date with the real UI's colour system.

  They are decorative: aria-hidden keeps the invented numbers out of the
  accessibility tree, and each one is introduced by real prose beside it.
*/

function Frame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-ink-700/70 bg-ink-900/70 shadow-xl shadow-ink-950/40">
      <div className="flex items-center gap-1.5 border-b border-ink-700/70 bg-ink-850 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-ink-600" />
        <span className="h-2 w-2 rounded-full bg-ink-600" />
        <span className="h-2 w-2 rounded-full bg-ink-600" />
        <span className="ml-2 truncate text-[11px] text-ink-400">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Tile({
  label,
  value,
  tone = 'default',
}: {
  label: string;
  value: string;
  tone?: 'default' | 'partial' | 'mismatch';
}) {
  const toneClass = {
    default: 'text-ink-100',
    partial: 'text-partial-500',
    mismatch: 'text-mismatch-500',
  }[tone];

  return (
    <div className="rounded-lg border border-ink-700/70 bg-ink-850/60 px-3 py-2.5">
      <p className="text-[10px] uppercase tracking-wider text-ink-400">{label}</p>
      <p className={`mt-1 text-lg font-semibold tabular-nums ${toneClass}`}>{value}</p>
    </div>
  );
}

export function DashboardMockup({ dict }: { dict: Dictionary }) {
  const rows = [
    { name: 'Rhode · Barrier butter', sku: 'RHD-BP03', qty: 0, reorder: 4 },
    { name: 'Spazzola · Round brush', sku: 'SPZ-0042', qty: 4, reorder: 5 },
    { name: 'Rhode · Glazing milk', sku: 'RHD-GB02', qty: 9, reorder: 10 },
  ];

  return (
    <Frame title="inverse.ge/dashboard">
      <div aria-hidden className="space-y-3">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Tile label={dict.mockup.unitsOnRecord} value="1,284" />
          <Tile label={dict.mockup.activeProducts} value="216" />
          <Tile label={dict.mockup.lowStock} value="7" tone="partial" />
          <Tile label={dict.mockup.flagged} value="3" tone="mismatch" />
        </div>

        <div className="rounded-lg border border-ink-700/70">
          <p className="border-b border-ink-700/70 px-3 py-2 text-xs font-semibold">
            {dict.mockup.lowStockAlerts}
          </p>
          <ul className="divide-y divide-ink-700/50">
            {rows.map((row) => (
              <li key={row.sku} className="flex items-center gap-3 px-3 py-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs">{row.name}</p>
                  <p className="font-mono text-[10px] text-ink-400">{row.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold tabular-nums text-partial-500">
                    {row.qty}
                  </p>
                  <p className="text-[10px] text-ink-400">
                    {dict.mockup.reorderAt} {row.reorder}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Frame>
  );
}

export function VerifyMockup({ dict }: { dict: Dictionary }) {
  return (
    <Frame title="inverse.ge/verify">
      <div aria-hidden className="space-y-3">
        <div className="relative aspect-video overflow-hidden rounded-lg border border-ink-700 bg-ink-950">
          {/* Suggestion of a lit shelf with three rows of stock. */}
          <div className="absolute inset-0 opacity-70">
            {[18, 45, 72].map((top) => (
              <div
                key={top}
                className="absolute left-[8%] right-[8%] h-px bg-ink-600"
                style={{ top: `${top}%` }}
              />
            ))}
            {[
              { left: 14, top: 22, w: 7, h: 20 },
              { left: 24, top: 24, w: 6, h: 18 },
              { left: 33, top: 21, w: 8, h: 21 },
              { left: 46, top: 23, w: 6, h: 19 },
              { left: 16, top: 49, w: 9, h: 20 },
              { left: 28, top: 50, w: 7, h: 19 },
              { left: 39, top: 48, w: 8, h: 21 },
              { left: 55, top: 50, w: 6, h: 19 },
              { left: 20, top: 76, w: 8, h: 16 },
              { left: 32, top: 75, w: 9, h: 17 },
            ].map((box, index) => (
              <div
                key={index}
                className="absolute rounded-sm bg-ink-700/80"
                style={{
                  left: `${box.left}%`,
                  top: `${box.top}%`,
                  width: `${box.w}%`,
                  height: `${box.h}%`,
                }}
              />
            ))}
          </div>

          {/* Focus reticle */}
          <div className="absolute inset-[12%] rounded-lg border border-accent-500/40" />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-ink-950 to-transparent px-3 pb-2.5 pt-8">
            <span className="text-[10px] text-ink-300">{dict.mockup.holdSteady}</span>
            <span className="rounded-md bg-accent-600 px-2 py-1 text-[10px] font-medium text-ink-950">
              {dict.mockup.captureFrame}
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-ink-700/70 px-3 py-2">
          <p className="text-[10px] uppercase tracking-wider text-ink-400">
            {dict.mockup.verifyAgainst}
          </p>
          <p className="mt-0.5 text-xs">
            <span className="font-mono text-ink-300">R-2</span> — Rack 2
          </p>
        </div>
      </div>
    </Frame>
  );
}

export function ResultMockup({ dict }: { dict: Dictionary }) {
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
    },
  ];

  const styles = {
    match: { label: dict.mockup.match, className: 'bg-match-500/15 text-match-500' },
    review: { label: dict.mockup.review, className: 'bg-partial-500/15 text-partial-500' },
    mismatch: {
      label: dict.mockup.mismatch,
      className: 'bg-mismatch-500/15 text-mismatch-500',
    },
  };

  return (
    <Frame title="inverse.ge/checks">
      <div aria-hidden>
        <p className="mb-2 text-xs font-semibold">{dict.mockup.results}</p>
        {/* A table's min-content width would otherwise stretch its grid column
            past the viewport on a phone. */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[19rem] text-[11px]">
          <thead>
            <tr className="border-b border-ink-700/70 text-left text-[9px] uppercase tracking-wider text-ink-400">
              <th className="pb-1.5 pr-2 font-medium">SKU</th>
              <th className="pb-1.5 pr-2 text-right font-medium">
                {dict.mockup.expected}
              </th>
              <th className="pb-1.5 pr-2 text-right font-medium">{dict.mockup.counted}</th>
              <th className="pb-1.5 pr-2 text-right font-medium">
                {dict.mockup.confidence}
              </th>
              <th className="pb-1.5 font-medium">{dict.mockup.verdict}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-700/50">
            {rows.map((row) => (
              <tr key={row.name} className="align-top">
                <td className="py-2 pr-2">
                  <p>{row.name}</p>
                  {row.verdict === 'review' && (
                    <p className="mt-0.5 text-[10px] text-partial-500">
                      {dict.mockup.barcodeNote}
                    </p>
                  )}
                </td>
                <td className="py-2 pr-2 text-right tabular-nums text-ink-300">
                  {row.expected}
                </td>
                <td className="py-2 pr-2 text-right font-semibold tabular-nums">
                  {row.counted}
                </td>
                <td className="py-2 pr-2 text-right tabular-nums text-ink-400">
                  {row.confidence}%
                </td>
                <td className="py-2">
                  <span
                    className={`inline-flex rounded-full px-1.5 py-0.5 text-[10px] font-medium ${styles[row.verdict].className}`}
                  >
                    {styles[row.verdict].label}
                  </span>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </Frame>
  );
}
