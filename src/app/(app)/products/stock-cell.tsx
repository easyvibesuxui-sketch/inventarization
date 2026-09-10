'use client';

import { useState } from 'react';
import type { Location } from '@/types/database';
import { setStockLevel } from './actions';

type Level = { location_id: string; quantity: number };

/** Per-location quantities, editable inline by anyone who is not a viewer. */
export default function StockCell({
  productId,
  locations,
  levels,
  canWrite,
}: {
  productId: string;
  locations: Location[];
  levels: Level[];
  canWrite: boolean;
}) {
  const [adding, setAdding] = useState(false);
  const byId = new Map(locations.map((location) => [location.id, location]));
  const unused = locations.filter(
    (location) => !levels.some((level) => level.location_id === location.id),
  );

  if (levels.length === 0 && !canWrite) {
    return <span className="text-xs text-ink-400">Not placed</span>;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {levels.map((level) => {
        const location = byId.get(level.location_id);
        return (
          <form
            key={level.location_id}
            action={setStockLevel}
            className="flex items-center gap-1 rounded-lg border border-ink-700 bg-ink-850 px-2 py-1"
          >
            <input type="hidden" name="product_id" value={productId} />
            <input type="hidden" name="location_id" value={level.location_id} />
            <span className="font-mono text-xs text-ink-400">
              {location?.code ?? 'unknown'}
            </span>
            <input
              name="quantity"
              type="number"
              min={0}
              defaultValue={level.quantity}
              disabled={!canWrite}
              aria-label={`Quantity at ${location?.code ?? 'location'}`}
              className="w-14 bg-transparent text-right text-xs tabular-nums text-ink-100 focus:outline-none disabled:text-ink-400"
            />
            {canWrite && (
              <button
                type="submit"
                className="text-xs text-accent-500 transition hover:text-accent-400"
              >
                save
              </button>
            )}
          </form>
        );
      })}

      {canWrite && unused.length > 0 && !adding && (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="rounded-lg border border-dashed border-ink-600 px-2 py-1 text-xs text-ink-400 transition hover:border-ink-400 hover:text-ink-100"
        >
          + location
        </button>
      )}

      {canWrite && adding && (
        <form
          action={setStockLevel}
          onSubmit={() => setAdding(false)}
          className="flex items-center gap-1 rounded-lg border border-ink-600 bg-ink-850 px-2 py-1"
        >
          <input type="hidden" name="product_id" value={productId} />
          <select
            name="location_id"
            aria-label="Location"
            className="bg-transparent text-xs text-ink-100 focus:outline-none"
          >
            {unused.map((location) => (
              <option key={location.id} value={location.id} className="bg-ink-850">
                {location.code}
              </option>
            ))}
          </select>
          <input
            name="quantity"
            type="number"
            min={0}
            defaultValue={0}
            aria-label="Quantity"
            className="w-14 bg-transparent text-right text-xs tabular-nums focus:outline-none"
          />
          <button type="submit" className="text-xs text-accent-500 hover:text-accent-400">
            add
          </button>
        </form>
      )}
    </div>
  );
}
