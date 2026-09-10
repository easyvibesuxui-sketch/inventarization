/**
 * PLACEHOLDER PRICING — these numbers have not been signed off commercially.
 * They exist so the calculator is real and testable; replace the figures here
 * (one file, no other changes needed) once pricing is decided.
 */

export type Plan = {
  id: 'free' | 'starter' | 'growth' | 'enterprise';
  name: string;
  monthly: number | null; // null = talk to sales
  blurb: string;
  limits: {
    skus: number;
    locations: number;
    users: number;
    checks: number;
  };
  features: string[];
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
    name: 'Free',
    monthly: 0,
    blurb: 'One shelf, one person, no card.',
    limits: { skus: 100, locations: 1, users: 2, checks: 20 },
    features: ['AI shelf verification', 'Low-stock alerts', 'Community support'],
  },
  {
    id: 'starter',
    name: 'Starter',
    monthly: 79,
    blurb: 'A single shop or small warehouse.',
    limits: { skus: 1_000, locations: 3, users: 5, checks: 200 },
    features: [
      'Everything in Free',
      'Product folders and categories',
      'Verification history and export',
      'Email support',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    monthly: 249,
    blurb: 'Multiple sites and a real counting routine.',
    limits: { skus: 10_000, locations: 15, users: 25, checks: 1_500 },
    features: [
      'Everything in Starter',
      'Barcode confirmation workflow',
      'Role-based access',
      'Priority support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthly: null,
    blurb: 'Distribution-scale inventory.',
    limits: { skus: UNLIMITED, locations: UNLIMITED, users: UNLIMITED, checks: UNLIMITED },
    features: [
      'Everything in Growth',
      'SSO and audit logs',
      'Custom integrations',
      'Onboarding and SLA',
    ],
  },
];

export type Usage = {
  skus: number;
  locations: number;
  users: number;
  checks: number;
};

export type Quote = {
  plan: Plan;
  /** Why this plan and not the cheaper one below it. */
  reasons: string[];
  basePrice: number;
  overageChecks: number;
  overageCost: number;
  monthlyTotal: number;
  annualTotal: number;
  annualSaving: number;
};

const LIMIT_LABELS: Record<keyof Usage, string> = {
  skus: 'products',
  locations: 'locations',
  users: 'users',
  checks: 'AI checks per month',
};

function fits(plan: Plan, usage: Usage): boolean {
  return (Object.keys(LIMIT_LABELS) as (keyof Usage)[]).every(
    (key) => usage[key] <= plan.limits[key],
  );
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
      reasons: ['Your volume is past the self-serve tiers.'],
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

  const reasons: string[] = [];
  const cheaper = paid.filter(
    (plan) => (plan.monthly ?? 0) < (best.plan.monthly ?? 0),
  );
  for (const key of ['skus', 'locations', 'users'] as const) {
    if (cheaper.some((plan) => usage[key] > plan.limits[key])) {
      reasons.push(
        `${usage[key].toLocaleString()} ${LIMIT_LABELS[key]} exceeds the tier below.`,
      );
    }
  }
  if (best.overageChecks > 0) {
    reasons.push(
      `${best.overageChecks.toLocaleString()} checks over the ${best.plan.limits.checks.toLocaleString()} included, billed at ${CURRENCY_SYMBOL}${OVERAGE_PER_CHECK.toFixed(2)} each.`,
    );
  }
  if (reasons.length === 0) {
    reasons.push('Your usage fits inside this plan with room to spare.');
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
