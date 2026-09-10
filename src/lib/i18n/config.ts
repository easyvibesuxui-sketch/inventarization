export const LOCALES = ['ka', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

/** Georgia is the launch market, so Georgian is the default rather than a fallback. */
export const DEFAULT_LOCALE: Locale = 'ka';

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export const LOCALE_NAMES: Record<Locale, string> = {
  ka: 'ქარ',
  en: 'ENG',
};

/** `lang` attribute for <html>. */
export const HTML_LANG: Record<Locale, string> = {
  ka: 'ka-GE',
  en: 'en',
};
