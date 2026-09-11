import type { Metadata } from 'next';
import { isLocale, LOCALES, type Locale } from './config';
import { getDictionary, type Dictionary } from './dictionaries';

/**
 * Builds the metadata for one marketing page, including the hreflang pair.
 * Every page needs the same shape, so it is described once here.
 */
export function pageMetadata(
  locale: string,
  path: string,
  pick: (meta: Dictionary['meta']) => { title: string; description: string },
): Metadata {
  if (!isLocale(locale)) return {};

  const { title, description } = pick(getDictionary(locale).meta);
  const suffix = path ? `/${path}` : '';

  return {
    // The home title is the whole brand line already; the root template would
    // append a second "· Inverse" to it.
    title: path ? title : { absolute: title },
    description,
    alternates: {
      canonical: `/${locale}${suffix}`,
      languages: Object.fromEntries(
        LOCALES.map((value: Locale) => [value, `/${value}${suffix}`]),
      ),
    },
  };
}
