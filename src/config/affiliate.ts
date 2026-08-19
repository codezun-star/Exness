/**
 * ⚠️  ÚNICO ARCHIVO QUE DEBES TOCAR PARA CAMBIAR TUS ENLACES DE AFILIADO.
 *
 * Todos los CTAs del sitio apuntan a /go/<key>/ (redirector interno con
 * rel="sponsored nofollow noopener" y evento de analítica), nunca al link
 * crudo. Así puedes rotar links sin recompilar todas las páginas y medir
 * el CTR por posición.
 */

/** El identificador que va dentro de tus enlaces one.exnessonelink.com. */
export const PARTNER_CODE = 'c_oq7nroj1va';

/**
 * Enlaces del panel de socio de Exness.
 *
 * ⚠️ NO VERIFICADOS EN ESTE ENTORNO. one.exnessonelink.com está bloqueado por
 * la política de red desde la que se construyó el sitio, así que los dos
 * enlaces están tal cual los entregó el propietario de la cuenta, sin
 * comprobar que devuelvan 302. Compruébalos antes de publicar:
 *
 *   curl -sI 'https://one.exnessonelink.com/intl/es/a/c_oq7nroj1va'
 *
 * Un 302 con `location:` hacia exness.com es un enlace vivo.
 *
 * Hay dos destinos reales y tres claves. No es una duplicación por descuido:
 * `home` y `real` apuntan al mismo sitio a propósito, para que el redirector
 * distinga en analítica el clic de descubrimiento del clic de apertura de
 * cuenta sin tener que mirar el parámetro ?s=.
 */
export const AFFILIATE_LINKS = {
  /** Portada de Exness en español — CTAs secundarios y de cabecera */
  home: 'https://one.exnessonelink.com/intl/es/a/c_oq7nroj1va',
  /** Registro — el que más convierte, y el de todos los CTA principales */
  real: 'https://one.exnessonelink.com/intl/es/a/c_oq7nroj1va',
  /** App móvil — el propio enlace lleva ?platform=mobile */
  app: 'https://one.exnessonelink.com/a/c_oq7nroj1va?platform=mobile',
} as const;

export type AffiliateKey = keyof typeof AFFILIATE_LINKS;

/**
 * Creatividades del panel de socio de Exness.
 *
 * ⚠️ VACÍO A PROPÓSITO, Y NO DEBE RELLENARSE A OJO.
 *
 * Los huecos de banner existen en la portada, en las 17 landings, en el blog
 * y en el 404, y funcionan; simplemente no tienen nada que servir todavía,
 * así que no renderizan nada en absoluto — ni marco, ni hueco, ni petición de
 * red. En cuanto haya piezas aquí, los seis emplazamientos se activan solos.
 *
 * Para rellenarlo: entra en tu panel de Exness Partners → Marketing tools →
 * Banners, elige idioma español y copia de cada creatividad su URL de imagen
 * y su URL de destino. Añade un objeto por pieza a EXNESS_BANNERS con el
 * formato que le corresponda por tamaño.
 *
 * No inventes identificadores ni los derives de los que veas en otro sitio:
 * una URL de creatividad que no existe devuelve 404 y deja el hueco en blanco
 * en todas las páginas a la vez.
 */
export interface PartnerBanner {
  /** URL absoluta de la imagen de la creatividad */
  img: string;
  /** URL absoluta de destino, ya con tu identificador de socio */
  href: string;
  width: number;
  height: number;
  format: BannerFormat;
}

export type BannerFormat = 'rectangle' | 'skyscraper' | 'leaderboard' | 'mobilebar';

export const EXNESS_BANNERS: PartnerBanner[] = [];

/** Hash estable de 32 bits. Mismo texto, mismo número, en cada build. */
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Baraja de creatividades para un hueco concreto.
 *
 * El sitio es estático: no hay servidor que sortee un banner por visita. La
 * rotación se hace en dos capas. Aquí, en build, el `seed` —la ruta de la
 * página más el nombre del hueco— decide por dónde empieza la baraja, así que
 * dos páginas distintas nunca abren con la misma pieza. En el cliente,
 * Banner.astro va pasando por el resto de la lista.
 *
 * Empezar en un punto distinto y no barajar al azar es deliberado: el HTML
 * tiene que ser reproducible entre builds o cada despliegue invalidaría la
 * caché de todas las páginas sin que haya cambiado nada.
 *
 * Con la lista vacía devuelve [], y ese es hoy el camino normal.
 */
export function bannerRotation(
  format: BannerFormat,
  seed: string,
  count = 4,
): PartnerBanner[] {
  const pool = EXNESS_BANNERS.filter((b) => b.format === format);
  if (!pool.length) return [];
  const start = hash(seed) % pool.length;
  return Array.from({ length: Math.min(count, pool.length) }, (_, i) =>
    pool[(start + i) % pool.length],
  );
}

/**
 * Genera la URL del redirector interno.
 * @param key    cuál de tus enlaces
 * @param source identificador de la posición (hero, sticky, tabla, faq…)
 * @param country ISO-2 en minúsculas, para saber qué país convierte
 */
export function goUrl(
  key: AffiliateKey = 'real',
  source = 'generic',
  country?: string,
): string {
  const params = new URLSearchParams({ s: source });
  if (country) params.set('c', country.toLowerCase());
  return `/go/${key}/?${params.toString()}`;
}
