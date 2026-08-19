/**
 * Páginas legales. Los slugs son neutrales en todos los idiomas para que
 * las URLs no cambien al traducir; el título sí se traduce.
 *
 * Vive en su propio módulo porque Astro extrae `getStaticPaths()` a un
 * ámbito aislado que sólo ve los imports, no las constantes del frontmatter.
 */
export const LEGAL_PAGES = ['risk', 'affiliate', 'privacy', 'terms', 'cookies'] as const;

export type LegalPage = (typeof LEGAL_PAGES)[number];
