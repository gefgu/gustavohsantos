// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://gefgu.github.io',
  base: '/',
  output: 'static',

  build: {
    format: 'directory'
  },

  integrations: [tailwind()]
});