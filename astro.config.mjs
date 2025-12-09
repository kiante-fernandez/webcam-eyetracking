// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://github.com',
  base: '/webcam-eyetracking',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    preact({
      compat: true
    }),
    sitemap(),
  ],
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
