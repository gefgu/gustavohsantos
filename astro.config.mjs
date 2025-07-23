// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'gustavohsantos.com',
  base: '/',
  output: 'static',

  build: {
    format: 'directory'
  },

  integrations: [tailwind()]
});