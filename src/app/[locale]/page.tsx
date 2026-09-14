import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary, type Dictionary } from '@/lib/i18n/dictionaries';
import { pageMetadata } from '@/lib/i18n/page-meta';
import { formatMoney, PLANS } from '@/lib/pricing';
import Reveal from '@/components/marketing/reveal';
import Rise from '@/components/marketing/rise';
import BandVideo from '@/components/marketing/band-video';
import Section from '@/components/marketing/section';
import { Band } from '@/components/marketing/page-shell';

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, '', (meta) => ({
    title: meta.homeTitle,
    description: meta.homeDescription,
  }));
}

/** The link that closes each condensed section and leads to the full page. */
function More({ href, label, dict }: { href: string; label: string; dict: Dictionary }) {
  return (
    <Link
      href={href}
      className="mt-8 inline-block text-sm underline underline-offset-4 decoration-rule-strong transition hover:decoration-ink"
    >
      {label} — {dict.home.more}
    </Link>
  );
}

/**
 * The home page is an index of the whole site: every other page contributes a
 * short section here, composed from the same dictionary entries the full page
 * uses, so the two can never drift apart.
 */
export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const l = locale as Locale;
  const teaserPlans = PLANS.slice(0, 3);
  const latest = dict.news.items[0];

  return (
    <>
      {/* Hero. The accent graphic is the one clip on the site that starts on
          its own; everything below it waits to be scrolled to. */}
      <section className="tone-paper relative isolate overflow-hidden">
        <div aria-hidden className="grid-rules">
          <span />
          <span />
          <span />
          <span className="hidden md:block" />
          <span className="hidden md:block" />
          <span className="hidden md:block" />
        </div>

        {/* Not `relative`: the graphic inside it anchors to the section, so on a
            wide screen it can run full-bleed past this column's padding. */}
        <div className="mx-auto max-w-5xl px-6 pb-28 pt-28 md:pb-44 md:pt-36">
          <div className="relative z-10">
            <Rise>
              <p className="eyebrow">{dict.home.tag}</p>
            </Rise>

            <Rise delay={60}>
              <h1 className="font-display mt-10 max-w-3xl text-[2.75rem] leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
                {dict.home.title}
              </h1>
            </Rise>

            <Rise delay={120}>
              <p className="mt-10 max-w-xl text-lg font-light leading-relaxed text-ink-soft">
                {dict.home.subtitle}
              </p>
            </Rise>

            <Rise delay={180}>
              <div className="mt-12 flex flex-wrap items-center gap-5">
                <Link href={`/${l}/contact`} className="btn btn-solid">
                  {dict.home.ctaPrimary}
                </Link>
                <Link href={`/${l}/services`} className="btn btn-outline">
                  {dict.home.ctaSecondary}
                </Link>
              </div>
            </Rise>
          </div>

          {/* Backdrop on a wide screen, a figure under the copy on a narrow
              one — see .hero-art. Pinned to the landscape cut either way: the
              box it sits in is wide even when the screen is not. */}
          <div className="hero-art">
            <BandVideo name="ledger" autoplay orientation="landscape" />
          </div>
        </div>
      </section>

      {/* Clients. No logos were supplied, so the names are set as type rather
          than faked as marks — which is also how a credit list should read. */}
      <Section tone="sunk">
        <Reveal>
          <p className="eyebrow">{dict.clients.label}</p>
          <h2 className="font-display mt-12 max-w-2xl text-3xl leading-tight tracking-tight sm:text-4xl">
            {dict.clients.title}
          </h2>
          <p className="mt-5 max-w-xl text-ink-soft">{dict.clients.lead}</p>
        </Reveal>

        <ul className="mt-14 grid border-t border-ink sm:grid-cols-2 md:grid-cols-3">
          {dict.clients.items.map((name, index) => (
            <Reveal
              key={name}
              as="li"
              delay={index * 40}
              className="flex min-w-0 items-center gap-4 border-b border-rule py-6 pr-6"
            >
              <span aria-hidden className="index shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-display min-w-0 text-lg leading-tight tracking-wide">
                {name}
              </span>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Services */}
      <Band label={dict.nav.services} tone="ink">
        <Reveal>
          <h2 className="font-display max-w-2xl text-2xl sm:text-3xl">{dict.services.title}</h2>
          <p className="mt-4 max-w-xl text-ink-soft">{dict.home.servicesLead}</p>
        </Reveal>

        <div className="mt-10 border-t border-ink">
          {dict.services.items.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 60}
              className="grid gap-x-10 gap-y-1 border-b border-rule py-4 md:grid-cols-[3rem_18rem_1fr]"
            >
              <span className="index">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="text-base">{item.title}</h3>
              <p className="max-w-xl text-sm text-ink-soft">{item.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <More href={`/${l}/services`} label={dict.nav.services} dict={dict} />
        </Reveal>
      </Band>

      {/* About */}
      <Band label={dict.nav.about} tone="sunk">
        <Reveal>
          <h2 className="font-display max-w-2xl text-2xl sm:text-3xl">{dict.about.title}</h2>
          <p className="mt-4 max-w-xl text-ink-soft">{dict.home.aboutLead}</p>
        </Reveal>

        <dl className="mt-10 grid grid-cols-2 border-t border-ink md:grid-cols-4">
          {dict.about.stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 70}
              className="border-b border-rule py-6 pr-6 md:border-b-0"
            >
              <dt className="label">{stat.label}</dt>
              <dd className="font-display mt-3 text-4xl">{stat.value}</dd>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={140}>
          <More href={`/${l}/about`} label={dict.nav.about} dict={dict} />
        </Reveal>
      </Band>

      {/* Platform */}
      <Band label={dict.nav.platform} video="scan">
        <Reveal>
          <h2 className="font-display max-w-2xl text-2xl sm:text-3xl">{dict.platform.title}</h2>
          <p className="mt-4 max-w-xl text-ink-soft">{dict.home.platformLead}</p>
        </Reveal>

        <div className="mt-10 grid gap-x-10 gap-y-8 border-t border-ink pt-8 md:grid-cols-2">
          {dict.platform.sections.map((section, index) => (
            <Reveal key={section.title} delay={index * 70}>
              <h3 className="text-base">{section.title}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">{section.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <More href={`/${l}/platform`} label={dict.nav.platform} dict={dict} />
        </Reveal>
      </Band>

      {/* Pricing */}
      <Band label={dict.nav.pricing} tone="sunk">
        <Reveal>
          <h2 className="font-display max-w-2xl text-2xl sm:text-3xl">
            {dict.pricingTeaser.title}
          </h2>
          <p className="mt-4 max-w-xl text-ink-soft">{dict.home.pricingLead}</p>
        </Reveal>

        <div className="mt-10 grid border-t border-ink md:grid-cols-3">
          {teaserPlans.map((plan, index) => (
            <Reveal
              key={plan.id}
              delay={index * 70}
              className="border-b border-rule py-6 md:border-b-0 md:pr-8"
            >
              <h3 className="label">{dict.plans[plan.id].name}</h3>
              {/* Prices stay in the body face: the display face has no ₾. */}
              <p className="mt-3 text-3xl tabular-nums">
                {plan.monthly === null ? dict.pricingTeaser.custom : formatMoney(plan.monthly)}
                {plan.monthly !== null && plan.monthly > 0 && (
                  <span className="text-sm text-ink-faint">{dict.pricingTeaser.perMonth}</span>
                )}
              </p>
              <p className="mt-3 max-w-xs text-sm text-ink-soft">{dict.plans[plan.id].blurb}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140} className="flex flex-wrap items-baseline gap-x-8">
          <More href={`/${l}/pricing`} label={dict.pricingTeaser.cta} dict={dict} />
          <p className="text-sm text-ink-faint">{dict.pricingTeaser.placeholder}</p>
        </Reveal>
      </Band>

      {/* Team */}
      <Band label={dict.nav.team}>
        <Reveal className="grid gap-x-10 gap-y-4 md:grid-cols-[18rem_1fr]">
          <div>
            <h2 className="font-display text-2xl">{dict.team.founderName}</h2>
            <p className="label mt-2">{dict.team.founderRole}</p>
          </div>
          <div>
            <p className="max-w-xl leading-relaxed text-ink-soft">{dict.team.founderBody}</p>
            <More href={`/${l}/team`} label={dict.nav.team} dict={dict} />
          </div>
        </Reveal>
      </Band>

      {/* News */}
      <Band label={dict.nav.news} tone="ink">
        <Reveal>
          <p className="label">
            {latest.badge} · {latest.year}
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-2xl sm:text-3xl">{latest.title}</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">{latest.body}</p>
          <More href={`/${l}/news`} label={dict.nav.news} dict={dict} />
        </Reveal>
      </Band>

      {/* Careers */}
      <Band label={dict.nav.careers} video="racks">
        <Reveal>
          <h2 className="font-display max-w-2xl text-2xl sm:text-3xl">{dict.careers.title}</h2>
          <p className="mt-4 max-w-xl text-ink-soft">{dict.careers.intro}</p>
          <ul className="mt-8 border-t border-ink">
            {dict.careers.roles.map((role) => (
              <li key={role.title} className="border-b border-rule py-3 text-sm">
                {role.title}
              </li>
            ))}
          </ul>
          <More href={`/${l}/careers`} label={dict.nav.careers} dict={dict} />
        </Reveal>
      </Band>

      {/* Closing call */}
      <Band tone="sunk">
        <Reveal>
          <h2 className="font-display max-w-2xl text-2xl sm:text-3xl md:text-4xl">
            {dict.home.finalTitle}
          </h2>
          <p className="mt-5 max-w-lg text-ink-soft">{dict.home.finalBody}</p>
          <Link href={`/${l}/contact`} className="btn btn-solid mt-10">
            {dict.home.finalCta}
          </Link>
        </Reveal>
      </Band>
    </>
  );
}
