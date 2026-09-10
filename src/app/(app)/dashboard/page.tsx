import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireSession } from '@/lib/session';
import {
  ButtonLink,
  Card,
  CheckBadge,
  EmptyState,
  Stat,
} from '@/components/ui';
import type { CheckSummary, Location, ProductStock } from '@/types/database';

export const metadata = { title: 'Dashboard' };

function formatDate(value: string) {
  return new Date(value).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function DashboardPage() {
  const { company } = await requireSession();
  const supabase = await createClient();

  const [{ data: stock }, { data: checks }, { data: locations }] = await Promise.all([
    supabase
      .from('product_stock')
      .select('*')
      .eq('active', true)
      .order('total_quantity', { ascending: true })
      .returns<ProductStock[]>(),
    supabase
      .from('check_summary')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(6)
      .returns<CheckSummary[]>(),
    supabase.from('locations').select('id').returns<Pick<Location, 'id'>[]>(),
  ]);

  const products = stock ?? [];
  const lowStock = products.filter((p) => p.is_low_stock);
  const units = products.reduce((sum, p) => sum + p.total_quantity, 0);
  const recentChecks = checks ?? [];
  const openIssues = recentChecks.reduce(
    (sum, c) => sum + c.mismatch_count + c.partial_count,
    0,
  );

  if (products.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">{company.name}</h1>
        <EmptyState
          title="No products yet"
          description="Add your catalogue and the locations it sits in, then run an AI verification against a shelf photo. You can also load a small demo catalogue from Settings to see the flow end to end."
          action={
            <div className="flex gap-3">
              <ButtonLink href="/products">Add products</ButtonLink>
              <ButtonLink href="/settings" variant="secondary">
                Load demo data
              </ButtonLink>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{company.name}</h1>
          <p className="mt-1 text-sm text-ink-400">
            {products.length} active products across {locations?.length ?? 0} locations
          </p>
        </div>
        <ButtonLink href="/verify">Run a verification</ButtonLink>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Units on record" value={units.toLocaleString()} />
        <Stat label="Active products" value={products.length} />
        <Stat
          label="Low stock"
          value={lowStock.length}
          tone={lowStock.length > 0 ? 'partial' : 'match'}
          hint="At or below reorder point"
        />
        <Stat
          label="Flagged in recent checks"
          value={openIssues}
          tone={openIssues > 0 ? 'mismatch' : 'match'}
          hint="Mismatches and items needing review"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card
          title="Low stock alerts"
          action={
            <Link href="/products" className="text-xs text-accent-500 hover:text-accent-400">
              All products
            </Link>
          }
        >
          {lowStock.length === 0 ? (
            <p className="text-sm text-ink-400">
              Every product is above its reorder point.
            </p>
          ) : (
            <ul className="divide-y divide-ink-700/70">
              {lowStock.slice(0, 8).map((product) => (
                <li key={product.product_id} className="flex items-center gap-4 py-2.5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {[product.brand, product.name].filter(Boolean).join(' ')}
                    </p>
                    <p className="font-mono text-xs text-ink-400">{product.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold tabular-nums text-partial-500">
                      {product.total_quantity} {product.unit}
                    </p>
                    <p className="text-xs text-ink-400">
                      reorder at {product.reorder_point}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card
          title="Recent verifications"
          action={
            <Link href="/checks" className="text-xs text-accent-500 hover:text-accent-400">
              All checks
            </Link>
          }
        >
          {recentChecks.length === 0 ? (
            <p className="text-sm text-ink-400">
              No verifications yet. Photograph a shelf and Inverse will count it against
              the record.
            </p>
          ) : (
            <ul className="divide-y divide-ink-700/70">
              {recentChecks.map((check) => (
                <li key={check.id}>
                  <Link
                    href={`/checks/${check.id}`}
                    className="-mx-2 flex items-center gap-4 rounded-lg px-2 py-2.5 transition hover:bg-ink-800/60"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {check.location_code} — {check.location_name}
                      </p>
                      <p className="text-xs text-ink-400">{formatDate(check.started_at)}</p>
                    </div>
                    {check.status === 'completed' ? (
                      <p className="text-xs tabular-nums text-ink-300">
                        <span className="text-match-500">{check.match_count}</span>
                        {' / '}
                        <span className="text-partial-500">{check.partial_count}</span>
                        {' / '}
                        <span className="text-mismatch-500">{check.mismatch_count}</span>
                      </p>
                    ) : (
                      <CheckBadge status={check.status} />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
