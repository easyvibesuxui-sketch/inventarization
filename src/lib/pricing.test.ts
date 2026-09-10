import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ANNUAL_DISCOUNT, OVERAGE_PER_CHECK, PLANS, quote } from './pricing.ts';

const plan = (id: string) => PLANS.find((p) => p.id === id)!;

test('a tiny workspace lands on the free plan', () => {
  const result = quote({ skus: 40, locations: 1, users: 2, checks: 10 });
  assert.equal(result.plan.id, 'free');
  assert.equal(result.monthlyTotal, 0);
});

test('exceeding a structural limit moves up a tier, and says which one', () => {
  const result = quote({ skus: 40, locations: 2, users: 2, checks: 10 });
  assert.equal(result.plan.id, 'starter');
  assert.deepEqual(
    result.reasons.filter((r) => r.kind === 'exceeds'),
    [{ kind: 'exceeds', field: 'locations', value: 2 }],
  );
});

test('a comfortable fit reports no blocking limit', () => {
  const result = quote({ skus: 40, locations: 1, users: 2, checks: 10 });
  assert.deepEqual(result.reasons, [{ kind: 'fits' }]);
});

test('overage is reported as data the view can translate', () => {
  const result = quote({ skus: 500, locations: 2, users: 3, checks: 210 });
  const overage = result.reasons.find((r) => r.kind === 'overage');
  assert.deepEqual(overage, {
    kind: 'overage',
    count: 10,
    rate: OVERAGE_PER_CHECK,
    included: 200,
  });
});

test('past the self-serve tiers the only reason given is enterprise', () => {
  const result = quote({ skus: 500_000, locations: 400, users: 900, checks: 90_000 });
  assert.deepEqual(result.reasons, [{ kind: 'enterprise' }]);
});

test('the free plan never carries overage', () => {
  const result = quote({ skus: 40, locations: 1, users: 2, checks: 60 });
  assert.notEqual(result.plan.id, 'free');
});

test('overage is preferred while it is cheaper than the next tier', () => {
  const starter = plan('starter');
  // Ten checks past the Starter allowance: 10 × 0.35 is far below the Growth step-up.
  const result = quote({
    skus: 500,
    locations: 2,
    users: 3,
    checks: starter.limits.checks + 10,
  });
  assert.equal(result.plan.id, 'starter');
  assert.equal(result.overageChecks, 10);
  assert.equal(result.overageCost, 10 * OVERAGE_PER_CHECK);
  assert.equal(result.monthlyTotal, starter.monthly! + 10 * OVERAGE_PER_CHECK);
});

test('a tier upgrade wins once the overage costs more than the difference', () => {
  const starter = plan('starter');
  const growth = plan('growth');
  const gap = growth.monthly! - starter.monthly!;
  const breakEven = Math.ceil(gap / OVERAGE_PER_CHECK);
  const result = quote({
    skus: 500,
    locations: 2,
    users: 3,
    checks: starter.limits.checks + breakEven + 1,
  });
  assert.equal(result.plan.id, 'growth');
  assert.equal(result.overageChecks, 0);
});

test('past every self-serve limit the answer is enterprise', () => {
  const result = quote({ skus: 500_000, locations: 400, users: 900, checks: 90_000 });
  assert.equal(result.plan.id, 'enterprise');
  assert.equal(result.plan.monthly, null);
});

test('the annual total applies the discount to twelve months', () => {
  const result = quote({ skus: 500, locations: 2, users: 3, checks: 100 });
  const expected = result.monthlyTotal * 12 * (1 - ANNUAL_DISCOUNT);
  assert.equal(result.annualTotal, expected);
  assert.equal(result.annualSaving, result.monthlyTotal * 12 - expected);
});
