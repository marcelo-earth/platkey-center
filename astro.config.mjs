import { defineConfig } from 'astro/config';

// https://astro.build/config
import react from '@astrojs/react';

// https://github.com/yassinedoghri/astro-i18next
import astroI18next from 'astro-i18next';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), astroI18next()],
  vite: {
    plugins: [tailwindcss()],
  },
});
