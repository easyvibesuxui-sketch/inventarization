/**
 * PLACEHOLDER PRICING — these numbers have not been signed off commercially.
 * They exist so the calculator is real and testable; replace the figures here
 * (one file, no other changes needed) once pricing is decided.
 */

export type PlanId = 'free' | 'starter' | 'growth' | 'enterprise';

/**
 * A plan's numbers only. Its name, one-line description and feature list are
 * marketing copy and live in the dictionary, so both locales read the same
 * figures without the prose being duplicated per language.
 */
export type Plan = {
  id: PlanId;
  monthly: number | null; // null = talk to sales
  limits: {
    skus: number;
    locations: number;
    users: number;
    checks: number;
  };
};

export const CURRENCY = 'GEL';
export const CURRENCY_SYMBOL = '₾';

/** Charged per AI verification beyond a plan's monthly allowance. */
export const OVERAGE_PER_CHECK = 0.35;

/** Paying yearly takes this fraction off the annual total. */
export const ANNUAL_DISCOUNT = 0.2;

const UNLIMITED = Number.POSITIVE_INFINITY;

export const PLANS: Plan[] = [
  {
    id: 'free',
    monthly: 0,
    limits: { skus: 100, locations: 1, users: 2, checks: 20 },
  },
  {
    id: 'starter',
    monthly: 79,
    limits: { skus: 1_000, locations: 3, users: 5, checks: 200 },
  },
  {
    id: 'growth',
    monthly: 249,
    limits: { skus: 10_000, locations: 15, users: 25, checks: 1_500 },
  },
  {
    id: 'enterprise',
    monthly: null,
    limits: { skus: UNLIMITED, locations: UNLIMITED, users: UNLIMITED, checks: UNLIMITED },
  },
];

export type Usage = {
  skus: number;
  locations: number;
  users: number;
  checks: number;
};

/**
 * Why a plan was chosen, as data rather than prose.
 *
 * The calculator is rendered in two languages, so the rule cannot hand back a
 * finished English sentence — the view turns these into words.
 */
export type Reason =
  | { kind: 'exceeds'; field: 'skus' | 'locations' | 'users'; value: number }
  | { kind: 'overage'; count: number; rate: number; included: number }
  | { kind: 'fits' }
  | { kind: 'enterprise' };

export type Quote = {
  plan: Plan;
  /** Why this plan and not the cheaper one below it. */
  reasons: Reason[];
  basePrice: number;
  overageChecks: number;
  overageCost: number;
  monthlyTotal: number;
  annualTotal: number;
  annualSaving: number;
};

/** The limit keys, kept as a list so `fits` cannot silently miss one. */
const LIMIT_KEYS: (keyof Usage)[] = ['skus', 'locations', 'users', 'checks'];

function fits(plan: Plan, usage: Usage): boolean {
  return LIMIT_KEYS.every((key) => usage[key] <= plan.limits[key]);
}

/**
 * Picks the cheapest plan that covers the usage.
 *
 * Checks are the one limit that can be exceeded for a fee, so a plan that fits
 * on everything except check volume still wins if paying the overage is cheaper
 * than moving up a tier.
 */
export function quote(usage: Usage): Quote {
  const paid = PLANS.filter((plan) => plan.monthly !== null);

  const candidates = paid
    .map((plan) => {
      const structuralFit = (['skus', 'locations', 'users'] as const).every(
        (key) => usage[key] <= plan.limits[key],
      );
      if (!structuralFit) return null;

      const overageChecks = Math.max(0, usage.checks - plan.limits.checks);
      // The Free plan is a trial tier, not a metered one — no overage on it.
      if (overageChecks > 0 && plan.id === 'free') return null;

      const overageCost = overageChecks * OVERAGE_PER_CHECK;
      return {
        plan,
        overageChecks,
        overageCost,
        monthlyTotal: (plan.monthly ?? 0) + overageCost,
      };
    })
    .filter((candidate) => candidate !== null);

  const enterprise = PLANS[PLANS.length - 1];

  if (candidates.length === 0) {
    return {
      plan: enterprise,
      reasons: [{ kind: 'enterprise' }],
      basePrice: 0,
      overageChecks: 0,
      overageCost: 0,
      monthlyTotal: 0,
      annualTotal: 0,
      annualSaving: 0,
    };
  }

  const best = candidates.reduce((cheapest, candidate) =>
    candidate.monthlyTotal < cheapest.monthlyTotal ? candidate : cheapest,
  );

  const reasons: Reason[] = [];
  const cheaper = paid.filter(
    (plan) => (plan.monthly ?? 0) < (best.plan.monthly ?? 0),
  );
  for (const field of ['skus', 'locations', 'users'] as const) {
    if (cheaper.some((plan) => usage[field] > plan.limits[field])) {
      reasons.push({ kind: 'exceeds', field, value: usage[field] });
    }
  }
  if (best.overageChecks > 0) {
    reasons.push({
      kind: 'overage',
      count: best.overageChecks,
      rate: OVERAGE_PER_CHECK,
      included: best.plan.limits.checks,
    });
  }
  if (reasons.length === 0) {
    reasons.push({ kind: 'fits' });
  }

  const annualBeforeDiscount = best.monthlyTotal * 12;
  const annualTotal = annualBeforeDiscount * (1 - ANNUAL_DISCOUNT);

  return {
    plan: best.plan,
    reasons,
    basePrice: best.plan.monthly ?? 0,
    overageChecks: best.overageChecks,
    overageCost: best.overageCost,
    monthlyTotal: best.monthlyTotal,
    annualTotal,
    annualSaving: annualBeforeDiscount - annualTotal,
  };
}

export function formatLimit(value: number): string {
  return value === UNLIMITED ? 'Unlimited' : value.toLocaleString();
}

export function formatMoney(value: number): string {
  return `${CURRENCY_SYMBOL}${value.toLocaleString('en-GB', {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export { fits };
