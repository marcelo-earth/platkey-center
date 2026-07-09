import es from '../../public/locales/es/translation.json';
import en from '../../public/locales/en/translation.json';

export type Lang = 'es' | 'en';

const translations: Record<Lang, Record<string, string>> = { es, en };

export function getTranslator(lang: Lang = 'es') {
  const dict = translations[lang] || translations.es;
  return (key: string): string => dict[key] ?? key;
}
