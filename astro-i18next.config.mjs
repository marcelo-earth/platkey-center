/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
  defaultLocale: 'es',
  locales: ['en', 'es'],
  load: ['server', 'client'],
  i18nextServer: {
    keySeparator: false,
    nsSeparator: false,
  },
  i18nextClient: {
    keySeparator: false,
    nsSeparator: false,
  },
  i18nextServerPlugins: {
    '{initReactI18next}': 'react-i18next',
  },
  i18nextClientPlugins: {
    '{initReactI18next}': 'react-i18next',
  },
};
