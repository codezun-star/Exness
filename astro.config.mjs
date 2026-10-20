// @ts-check
import { readFileSync, readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
// El campo `changefreq` del sitemap está tipado como enumeración, no como
// cadena: pasar 'weekly' a pelo compila pero no pasa `astro check`.
import { EnumChangefreq } from 'sitemap';
import tailwindcss from '@tailwindcss/vite';

import { LEGAL_PAGES } from './src/config/legal';

const SITE_URL = 'https://exness.inversax.com';

/** Fecha del build, para las páginas que no tienen una fecha propia. */
const BUILD_DATE = new Date();

/**
 * Fecha real de cada artículo, leída del frontmatter.
 *
 * El sitemap se genera antes de que exista la colección de contenido, así que
 * aquí no se puede usar `astro:content`. El frontmatter del blog es YAML plano
 * con `pubDate:` y `updatedDate:` en una sola línea, así que leerlo directo es
 * fiable y no añade dependencias. Los archivos con guión bajo delante son
 * plantillas: el cargador de Astro los ignora y aquí también.
 */
function blogDates() {
  const dir = new URL('./src/content/blog/', import.meta.url);
  /** @type {Map<string, Date>} */
  const dates = new Map();

  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md') || file.startsWith('_')) continue;

    const raw = readFileSync(new URL(file, dir), 'utf8');
    const pub = raw.match(/^pubDate:\s*(\S+)/m)?.[1];
    const upd = raw.match(/^updatedDate:\s*(\S+)/m)?.[1];
    const stamp = upd ?? pub;
    if (!stamp) continue;

    const date = new Date(stamp.replace(/^["']|["']$/g, ''));
    if (Number.isNaN(date.getTime())) continue;

    // Un artículo con fecha futura todavía no está publicado: allPosts() lo
    // filtra, así que tampoco debe aparecer en el sitemap.
    if (date.getTime() > Date.now() && new Date(pub ?? stamp).getTime() > Date.now()) continue;

    dates.set(`${SITE_URL}/blog/${file.replace(/\.md$/, '')}/`, date);
  }

  return dates;
}

const BLOG_DATES = blogDates();

const LEGAL_URLS = new Set(
  LEGAL_PAGES.map((page) => `${SITE_URL}/legal/${page}/`),
);

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },

  // Sin bloque `i18n` a propósito.
  //
  // El enrutado i18n de Astro parte de que el idioma es un prefijo de URL y de
  // que existe una portada por idioma. Aquí la dimensión es el país, no el
  // idioma, y todo el sitio está en español. Un idioma nunca es un segmento de
  // ruta, así que no hay nada que declarar.
  //
  // Sin hreflang: las 15 landings de país que formaban el grupo se retiraron
  // y cada mercado vive en su guía del blog, que no es una variante regional
  // de otra página sino un artículo propio.

  integrations: [
    sitemap({
      // El redirector de afiliados nunca debe indexarse, y la pantalla sin
      // conexión de la app sólo existe para el service worker.
      filter: (page) => !page.includes('/go/') && !page.includes('/offline/'),

      /**
       * Una fecha y una prioridad por URL, no la misma para todas.
       *
       * Antes el sitemap salía con `lastmod` = hora del build y `priority` =
       * 0.7 en todas las URLs. Las dos señales quedaban inservibles: un
       * `lastmod` que cambia en cada despliegue sin que cambie el contenido es
       * justo el patrón que lleva a Google a dejar de leer el campo del sitio
       * entero —lo dice su documentación—, y una prioridad plana no ordena
       * nada. Los artículos ya traían su fecha en el frontmatter; sólo había
       * que usarla.
       *
       * Las páginas sin fecha propia (portada, legales) se quedan
       * con la del build: es lo único honesto que se puede afirmar de una
       * página generada a partir de configuración y copy.
       */
      serialize(item) {
        const url = item.url;

        const posted = BLOG_DATES.get(url);
        if (posted) {
          return {
            ...item,
            lastmod: posted.toISOString(),
            changefreq: EnumChangefreq.MONTHLY,
            // La guía de cada país es ahora la página de ese mercado.
            priority: url.includes('/blog/exness-en-') ? 0.9 : 0.8,
          };
        }

        if (url === `${SITE_URL}/blog/`) {
          return { ...item, lastmod: newest(BLOG_DATES), changefreq: EnumChangefreq.WEEKLY, priority: 0.6 };
        }

        if (LEGAL_URLS.has(url)) {
          return {
            ...item,
            lastmod: BUILD_DATE.toISOString(),
            changefreq: EnumChangefreq.YEARLY,
            priority: 0.3,
          };
        }

        // La portada: la única URL que merece 1.0.
        return {
          ...item,
          lastmod: BUILD_DATE.toISOString(),
          changefreq: EnumChangefreq.WEEKLY,
          priority: url === `${SITE_URL}/` ? 1.0 : 0.5,
        };
      },

      // Sin la opción `i18n`: asume el mismo modelo de prefijo por idioma que
      // se acaba de descartar. Las etiquetas del HTML ya son correctas y
      // completas, y Google documenta ese método como suficiente por sí solo.
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});

/**
 * El índice del blog se fecha con su artículo más reciente.
 *
 * @param {Map<string, Date>} dates
 * @returns {string}
 */
function newest(dates) {
  let max = 0;
  for (const date of dates.values()) max = Math.max(max, date.getTime());
  return new Date(max || BUILD_DATE.getTime()).toISOString();
}
