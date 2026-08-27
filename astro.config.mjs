// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://exness.inversax.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },

  // Sin bloque `i18n` a propósito.
  //
  // El enrutado i18n de Astro parte de que el idioma es un prefijo de URL y de
  // que existe una portada por idioma. Aquí la dimensión es el país, no el
  // idioma: las 17 landings están todas en español y se diferencian por el
  // mercado al que apuntan. Un idioma nunca es un segmento de ruta, así que no
  // hay nada que declarar.
  //
  // Los hreflang del HTML los genera countryAlternates() en src/lib/seo.ts:
  // un único grupo con las 17 landings anotadas como idioma-región (es-MX,
  // es-CO, es-AR…) y x-default en la raíz.

  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // El redirector de afiliados nunca debe indexarse.
      filter: (page) => !page.includes('/go/'),

      // Sin la opción `i18n`: asume el mismo modelo de prefijo por idioma que
      // se acaba de descartar. Las etiquetas del HTML ya son correctas y
      // completas, y Google documenta ese método como suficiente por sí solo.
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
