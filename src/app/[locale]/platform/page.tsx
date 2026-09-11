import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/page-meta";
import Reveal from "@/components/marketing/reveal";
import { Band, PageHeader, RuledItem } from "@/components/marketing/page-shell";
import identicalVariants from "@/images/identical-variants.webp";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/platform">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "platform", (meta) => ({
    title: meta.platformTitle,
    description: meta.platformDescription,
  }));
}

export default async function PlatformPage({
  params,
}: PageProps<"/[locale]/platform">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader
        eyebrow={dict.nav.platform}
        title={dict.platform.title}
        intro={dict.platform.intro}
      />

      <Band>
        <div className="border-t border-ink">
          {dict.platform.sections.map((section, index) => (
            <RuledItem
              key={section.title}
              title={section.title}
              body={section.body}
              aside={String(index + 1).padStart(2, "0")}
              delay={index * 60}
            />
          ))}
        </div>

        {/* The photograph belongs to the last section: two products a camera
            cannot separate without a barcode. */}
        <Reveal delay={120} className="mt-12">
          <Image
            src={identicalVariants}
            alt=""
            placeholder="blur"
            sizes="(min-width: 768px) 34rem, 100vw"
            className="w-full max-w-xl rounded-media"
          />
        </Reveal>
      </Band>

      <Band label={dict.platform.dashboardTitle}>
        <ul className="border-t border-ink">
          {dict.platform.dashboard.map((line, index) => (
            <Reveal
              as="li"
              key={line}
              delay={index * 60}
              className="border-b border-rule py-4 text-ink-soft"
            >
              {line}
            </Reveal>
          ))}
        </ul>
      </Band>

      <Band label={dict.platform.statusTitle}>
        <Reveal>
          <p className="max-w-xl text-lg font-light leading-relaxed">
            {dict.platform.statusBody}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              href={`/${locale}/pricing`}
              className="text-sm underline underline-offset-4 decoration-rule-strong transition hover:decoration-ink"
            >
              {dict.nav.pricing}
            </Link>
            <Link
              href={`/${locale}/news`}
              className="text-sm underline underline-offset-4 decoration-rule-strong transition hover:decoration-ink"
            >
              {dict.nav.news}
            </Link>
          </div>
        </Reveal>
      </Band>
    </>
  );
}
