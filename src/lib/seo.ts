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
 * Las 17 landings son la misma página en español dirigida a países distintos,
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

/** Título de pestaña: 60 caracteres es el corte habitual en Google. */
export function pageTitle(title: string, withBrand = true): string {
  const full = withBrand ? `${title} | ${SITE.brand}` : title;
  return clampText(full, 65);
}

export function metaDescription(text: string): string {
  return clampText(text, 158);
}

/** Estimación de tiempo de lectura a 200 palabras por minuto. */
export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
