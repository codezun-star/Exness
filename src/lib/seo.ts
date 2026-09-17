import { SITE } from '../config/site';
import { COUNTRIES, countryHreflang } from '../config/countries';

export interface Alternate {
  hreflang: string;
  href: string;
}

/** URL absoluta y normalizada (siempre con barra final). */
export function abs(pathname: string): string {
  const clean = `/${pathname.replace(/^\/+|\/+$/g, '')}`;
  return `${SITE.url}${clean === '/' ? '/' : `${clean}/`}`;
}

/**
 * Bloque hreflang de las páginas de mercado.
 *
 * Las 15 landings son la misma página en español dirigida a países distintos,
 * así que forman un único grupo anotado con idioma + región ("es-MX",
 * "es-CO", "es-ES"…). Es lo que hace que Google sirva /mx/ a México y /co/ a
 * Colombia en vez de elegir una y tratar el resto como duplicado.
 *
 * El grupo se cierra con x-default = "/" (la portada), y la propia portada
 * declara la misma lista: sin esa reciprocidad Google descarta el bloque
 * entero. La lista es idéntica en todas las páginas del grupo a propósito.
 */
export function countryAlternates(): Alternate[] {
  return [
    ...COUNTRIES.map((c) => ({
      hreflang: countryHreflang(c),
      href: abs(c.code),
    })),
    { hreflang: 'x-default', href: abs('') },
  ];
}


/** Recorta a la longitud óptima sin cortar palabras a la mitad. */
export function clampText(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

/** Corte habitual del título en Google: por encima de esto no se muestra. */
const TITLE_MAX = 65;

/**
 * Título de pestaña.
 *
 * La marca sólo se añade si cabe entera. Recortar `título | EXZUN` como una
 * sola cadena dejaba resultados terminados en «|…» —una barra suelta y unos
 * puntos— en las ocho páginas cuyo titular pasaba de 56 caracteres: el
 * recorte se comía la marca y dejaba a la vista el separador. Un titular
 * completo sin marca es mejor resultado de búsqueda que uno con la marca a
 * medias, así que cuando no caben los dos gana el titular.
 */
export function pageTitle(title: string, withBrand = true): string {
  if (!withBrand) return clampText(title, TITLE_MAX);

  const full = `${title} | ${SITE.brand}`;
  if (full.length <= TITLE_MAX) return full;

  // Sin marca. El titular sólo se recorta si por sí solo ya no cabe, algo que
  // el esquema del blog (máx. 70) permite por poco margen.
  return clampText(title, TITLE_MAX);
}

/**
 * Descripción para `<meta name="description">`, Open Graph y Twitter.
 *
 * El tope es el mismo que valida el esquema de contenido (170), no uno más
 * estricto. Antes se recortaba a 158 y ocho descripciones ya aprobadas por el
 * esquema llegaban al HTML cortadas a media frase: el recorte no evita que
 * Google acorte el fragmento —eso lo decide él— y en cambio sí estropea la
 * tarjeta de redes sociales, que muestra bastante más texto. Aquí queda sólo
 * como red de seguridad ante una cadena desbocada.
 */
export function metaDescription(text: string): string {
  return clampText(text, 170);
}

/** Estimación de tiempo de lectura a 200 palabras por minuto. */
export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
