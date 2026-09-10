import type { Dictionary } from '@/lib/i18n/dictionaries';

/**
 * The verification pipeline, drawn to make one point: the model reports what it
 * sees, and a rule you can read turns that into the verdict. Labels come from
 * the dictionary so the diagram translates with the page.
 */
export default function FlowDiagram({ dict }: { dict: Dictionary }) {
  const steps = dict.how.steps;

  return (
    <ol className="grid gap-px overflow-hidden rounded-xl border border-ink-700/70 bg-ink-700/70 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="relative bg-ink-900/80 p-5">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-accent-600/50 bg-accent-500/10 font-mono text-[11px] text-accent-500">
              {index + 1}
            </span>
            {index < steps.length - 1 && (
              <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-accent-600/40 to-transparent" />
            )}
          </div>
          <h3 className="mt-3 text-base font-medium">{step.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-400">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
