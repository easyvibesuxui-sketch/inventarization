# Inverse

Two things live in this repository:

1. **The public site** — the marketing site for Inverse, an inventory counting
   and audit consultancy in Tbilisi. Nine pages, Georgian and English.
2. **The application** — the signed-in, multi-tenant inventory tool with its
   AI photo-verification step. The site's Platform and News pages describe it;
   it is in pilot preparation for 2026 and is used inside the service work
   until then.

Both come from the same product: the services brief describes what the company
sells today, the handoff brief describes the tool being built behind it. Neither
supersedes the other.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Server Actions) |
| Database & auth | Supabase (Postgres, RLS, Storage) |
| Vision | Claude (`claude-opus-5`) via `@anthropic-ai/sdk` |
| Styling | Tailwind CSS v4 |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Supabase URL/anon key and your Anthropic API key
npm run dev
```

Apply the database schema to a Supabase project, in order:

```bash
supabase link --project-ref <your-project-ref>
supabase db push            # runs supabase/migrations/*.sql
```

Then sign up in the app, name your workspace, and use **Settings → Load demo catalogue**
to get a shelf worth verifying without importing anything real.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Unit tests (pricing rules, verification grading) |
| `npm run test:rls` | Tenant-isolation test against `$DATABASE_URL` |

## Architecture

### Tenant isolation

Every tenant table carries `company_id` and is protected by Row Level Security, so
isolation is enforced by Postgres rather than by application code. Three things work
together:

1. **Policies** scope every read and write to `public.auth_company_id()` — a
   `SECURITY DEFINER` helper that resolves the caller's company from `user_profiles`
   without recursing into its own policy.
2. **Composite foreign keys** (`0002_tenant_integrity.sql`) mean a row cannot reference a
   parent belonging to another tenant, even if a writer tries.
3. **`FORCE ROW LEVEL SECURITY`** applies the policies to the table owner too.

`supabase/tests/rls_isolation.sql` proves this holds: two tenants, cross-tenant reads and
writes, a read-only viewer, and the "one company per user" rule. Run it against any
database with the migrations applied.

New tenants are created only through `create_company_for_current_user()` — `companies` has
no `INSERT` policy at all.

### The verification flow

```
capture a still  →  upload to private storage  →  Claude counts what it sees
                                                        ↓
       inventory_check_items  ←  grade()  ←  structured JSON observations
```

Two decisions are worth knowing about:

**Claude reads static images, not video.** The flow is deliberately capture-then-analyze:
the operator freezes one frame and that exact frame is analysed. The camera panel works
with a phone's rear camera or a head-worn camera; there is no continuous stream to keep in
sync.

**The model perceives; the code judges.** Claude returns only what it saw — a count, a
confidence, and whether the item was separable from its look-alikes — via a Zod-typed
structured output. `src/lib/verification/grade.ts` turns that into the green/amber/red
verdict. Keeping the rule in code means it is testable, explainable to a customer, and
changeable without re-prompting.

Because of that split, look-alike variants never get a confident wrong answer. Two
hairbrushes from the same line that differ only in size come back flagged for a barcode
scan, with the candidate SKUs named. Each product carries a `visual_notes` field that is
fed to the model precisely so it knows which items are easy to confuse.

Counts are never written back automatically — **Apply counts to stock** on a check is an
explicit human action, and it skips anything flagged for a barcode.

### Languages

The public site is Georgian and English, served from `/ka` and `/en`; `/`
redirects to Georgian. Every string lives in `src/lib/i18n/dictionaries.ts`,
where `en` is the shape of record and `ka` is typed against it — a missing or
misspelled key fails the build rather than rendering as blank space.

Page metadata is built once in `src/lib/i18n/page-meta.ts`, so every page gets
the same canonical/hreflang shape without repeating it seven times.

The signed-in app is English for now.

### Look and motion

The marketing site is set as ink on paper — a warm off-white ground, one neutral
ramp, hairline rules instead of cards, and no brand accent. Colour appears only
where it carries meaning: the three verification verdicts.

- **Two typefaces.** Noto Sans Georgian sets body text; BPG Paata Cond Caps
  (self-hosted woff2 in `src/app/fonts/`) sets headings and the small caps
  labels. Both are free for commercial use — Noto under the SIL Open Font
  License, BPG Paata released freely by its author. The display face has **no
  lari sign**, so prices are always set in the body face.

  Noto Sans Georgian is the only neutral grotesque on Google Fonts that carries
  Georgian; the paid Helvetica Neue Georgian it replaced was licensed for desktop
  use only, which does not cover webfont embedding.
- **Grain** is one fixed SVG turbulence tile at `mix-blend-mode: multiply` — on a
  light ground it should read as tooth in the paper, not as a glow. Deliberately
  static: an animated full-viewport blended layer forces the whole page to
  re-composite every frame and measurably starves the scroll transitions.
- **Motion is quiet** — a short fade and a few pixels of travel, no blur or
  scale. Above the fold uses `Rise`, a pure CSS animation that runs on first
  paint so the hero never waits for hydration. Below the fold uses `Reveal`, an
  IntersectionObserver that toggles one class and disconnects. Both are disabled
  under `prefers-reduced-motion`, and a `<noscript>` rule unhides everything when
  scripting is off.
- **One photograph**, black and white, in the section about look-alike variants —
  the one place an image does work that prose cannot.

### Layout

```
src/
  app/
    [locale]/         public site: home, services, about, platform, pricing,
                      team, careers, news, contact (ka + en)
    (app)/            signed-in shell: dashboard, products, locations, verify, checks, settings
    api/verify/       upload → analyze → persist, the one server route
    login/ onboarding/
  lib/
    i18n/             locales, the two dictionaries, shared page metadata
    pricing.ts        platform plan figures and the calculator's rule
    supabase/         browser, server and proxy clients
    verification/     prompt, schema, analysis call, grading
  components/
    marketing/        header, footer, language switcher, mobile nav, page shell,
                      contact form, grain, Rise/Reveal motion
  images/             photography (webp, black and white)
  app/fonts/          self-hosted body and display faces
supabase/
  migrations/         schema, integrity, RLS, storage, RPCs, views, grants,
                      contact requests
  tests/              tenant isolation
```

## Status against the project handoff

Done:

- The public site: nine pages in Georgian and English, with a contact form
- Platform page and pricing calculator, drawn from the product handoff brief
- Multi-tenant schema and RLS policies, with an isolation test
- Verification app on real backend storage — private Supabase Storage bucket plus
  `inventory_checks` / `inventory_check_items`, no `localStorage`
- Dashboard: stock table, low-stock alerts, location filter, verification status

Deliberately unfinished:

- **Platform pricing is provisional** pending commercial sign-off. The figures
  live in `src/lib/pricing.ts`, so changing them updates the calculator and the
  plan table together. Counting services are quoted per engagement and are not
  priced on the site.
- **Barcode reading** — the schema, the model contract and the UI all carry the
  `needs_barcode` flag, and products have a `barcode` column, but no scanner is wired up.
  Deciding the capture approach is still an open item.
- **Stripe** — `companies` reserves `stripe_customer_id` and `stripe_subscription_id`;
  no checkout, webhooks or plan enforcement yet.
- **Team invitations** — an owner or admin can see the team, but there is no invite flow.
- **The signed-in app has not had a design pass** on the current palette; its
  colour tokens were migrated mechanically so it stays coherent.
