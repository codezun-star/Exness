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
 * ⚠️ COMPROBACIÓN 2026-08-26: one.exnessonelink.com responde, pero está
 * detrás del anti-bot de Cloudflare y devuelve 403 con `cf-mitigated:
 * challenge` a cualquier petición automatizada. Eso confirma que el host está
 * vivo, pero NO confirma que este identificador de socio concreto resuelva a
 * un registro válido: el reto de Cloudflare se sirve igual para una ruta
 * correcta que para una inventada.
 *
 * La única comprobación que vale es manual, desde un navegador de verdad y en
 * ventana privada:
 *
 *   1. Abre https://one.exnessonelink.com/intl/es/a/c_oq7nroj1va
 *   2. Debe acabar en un registro de exness.com con tu código en la URL.
 *   3. Repite con los tres destinos de abajo, incluido el de la app.
 *
 * Hazlo antes de publicar y cada vez que rotes un enlace. Un enlace roto no
 * rompe el build ni se ve en la página: simplemente deja de pagar.
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
 * Todas salen del panel Exness Partners → Marketing tools → Banners, campaña
 * «Take control» en español, y se sirven desde el CDN de Exness
 * (d3dpet1g0ty5ed.cloudfront.net). No están rehospedadas a propósito: las
 * condiciones de uso del material de marca no permiten copiarlo, recortarlo
 * ni redimensionarlo, sólo enlazarlo tal cual.
 *
 * El `href` de cada pieza NO es el enlace de socio crudo, sino el redirector
 * interno /go/. Es lo mismo que hacen los botones del sitio y por los mismos
 * motivos: se puede rotar el enlace sin recompilar, cada impresión queda
 * atribuida a su formato en analítica y el clic saliente lleva siempre
 * rel="sponsored".
 *
 * ⚠️ Si añades piezas nuevas, copia la URL de imagen literal del panel. Una
 * URL inventada devuelve 404 y deja el hueco en blanco en todas las páginas
 * a la vez, sin que nada falle en el build.
 */
export interface PartnerBanner {
  /** URL absoluta de la imagen de la creatividad, tal cual la da el panel */
  img: string;
  /** Destino del clic: siempre el redirector interno /go/ */
  href: string;
  width: number;
  height: number;
  format: BannerFormat;
}

/**
 * Formatos, y dónde vive cada uno.
 *
 *   skyscraper  120x600   raíles laterales (EdgeRails y SideRails)
 *   leaderboard 728x90    tira horizontal en escritorio
 *   mobilebar   320x50    la misma tira, por debajo de 48rem
 *   billboard   970/980x250  banda ancha dentro del contenido
 *   wide        1200x628  pieza destacada, formato social
 *   square      800x800   unidad cuadrada, la que va en pareja
 *   rectangle   300x250   sin creatividad todavía; el hueco no renderiza
 */
export type BannerFormat =
  | 'rectangle'
  | 'skyscraper'
  | 'leaderboard'
  | 'mobilebar'
  | 'billboard'
  | 'wide'
  | 'square';

/** Raíz del CDN de creatividades de Exness. */
const CDN = 'https://d3dpet1g0ty5ed.cloudfront.net';

/**
 * Destino de una creatividad. Pasa por /go/ con la posición marcada, así que
 * en analítica se distingue el clic en un rascacielos del clic en el botón
 * del hero sin tener que mirar el referrer.
 */
const creativeHref = (format: BannerFormat) => goUrl('real', `banner-${format}`);

export const EXNESS_BANNERS: PartnerBanner[] = [
  { img: `${CDN}/ES_Take_control_120x600.png`,  width: 120,  height: 600, format: 'skyscraper',  href: creativeHref('skyscraper') },
  { img: `${CDN}/ES_Take_control_728x90.png`,   width: 728,  height: 90,  format: 'leaderboard', href: creativeHref('leaderboard') },
  { img: `${CDN}/ES_Take_control_320x50.png`,   width: 320,  height: 50,  format: 'mobilebar',   href: creativeHref('mobilebar') },
  { img: `${CDN}/ES_Take_control_980x250.png`,  width: 980,  height: 250, format: 'billboard',   href: creativeHref('billboard') },
  { img: `${CDN}/ES_Take_control_970x250.png`,  width: 970,  height: 250, format: 'billboard',   href: creativeHref('billboard') },
  { img: `${CDN}/ES_Take_control_1200x628.png`, width: 1200, height: 628, format: 'wide',        href: creativeHref('wide') },
  { img: `${CDN}/ES_Take_control_800x800.png`,  width: 800,  height: 800, format: 'square',      href: creativeHref('square') },
];

/**
 * Vídeos de marca del panel de socio, servidos como incrustación de
 * Brandfolder. Se distribuyen por el sitio con <Video>, que los carga
 * perezosamente: un iframe de vídeo por encima del pliegue costaría más LCP
 * del que compensa cualquier clic que traiga.
 */
export interface PartnerVideo {
  /** Identificador de la incrustación de Brandfolder */
  id: string;
  /** Título accesible del iframe. No es decorativo: lo lee el lector de pantalla. */
  title: string;
}

export const EXNESS_VIDEOS: PartnerVideo[] = [
  { id: '2xbpwnnprqvwmnvfmjwgccs', title: 'Exness — vídeo de marca (1)' },
  { id: 'x3mmj9mzmzwnswcx8vkqscgb', title: 'Exness — vídeo de marca (2)' },
  { id: 'tbm4crqh2v6tp9x9jx4g55', title: 'Exness — vídeo de marca (3)' },
];

/** Host desde el que se sirven las incrustaciones de vídeo. */
export const VIDEO_HOST = 'https://brandfolder.com';

/**
 * URL de incrustación. `autoplay=false` es deliberado y no se debe cambiar:
 * un vídeo que arranca solo con sonido es la forma más rápida de que el
 * visitante cierre la pestaña, y en móvil consume datos que no ha pedido.
 */
export function videoEmbed(id: string): string {
  return `${VIDEO_HOST}/brandfolder/attachments/embed/${id}?loop=false&muted=false&autoplay=false`;
}

/** Elige un vídeo de forma estable a partir del identificador del hueco. */
export function videoFor(seed: string): PartnerVideo | undefined {
  if (!EXNESS_VIDEOS.length) return undefined;
  return EXNESS_VIDEOS[hash(seed) % EXNESS_VIDEOS.length];
}

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
 * Si un formato no tiene ninguna pieza cargada devuelve [], y entonces el
 * hueco no renderiza absolutamente nada: ni marco, ni espacio reservado, ni
 * petición de red. Es el caso de `rectangle` mientras no haya un 300x250.
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
