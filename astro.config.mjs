import { defineConfig } from 'astro/config';

// https://astro.build/config
import react from '@astrojs/react';

// https://github.com/yassinedoghri/astro-i18next
import astroI18next from 'astro-i18next';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://platkey.astronware.com',
  integrations: [
    react(),
    astroI18next(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es',
          en: 'en',
        },
      },
      serialize(item) {
        const defaultLink = item.links?.find((link) => link.lang === 'es');
        if (defaultLink) {
          item.links = [...item.links, { url: defaultLink.url, lang: 'x-default' }];
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
