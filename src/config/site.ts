/**
 * Configuración global del sitio.
 * Todo lo editable sin tocar código vive aquí.
 */

export const SITE = {
  domain: 'exness.inversax.com',
  url: 'https://exness.inversax.com',
  /**
   * Marca propia del socio, no la del bróker. Es deliberado que el nombre
   * comercial no contenga «Exness»: el sitio es de un afiliado, y presentarse
   * con el nombre del bróker es lo primero que hace saltar una auditoría de
   * programa de socios. Exness se nombra siempre como lo que es, el bróker
   * del que se habla, nunca como el emisor de estas páginas.
   */
  brand: 'EXZUN',
  brandFull: 'EXZUN · Socio de Exness',
  /** Se usa en JSON-LD Organization y en el footer */
  legalName: 'EXZUN',
  email: 'contacto@inversax.com',
  /** Imagen OG por defecto (1200x630) */
  ogImage: '/og/default.jpg',
  themeColor: '#0b0b0c',
  /** Año de fundación para JSON-LD */
  founded: '2024',
  social: {
    telegram: '',
    youtube: '',
    instagram: '',
    x: '',
    tiktok: '',
    facebook: '',
  },
} as const;

/**
 * Recursos de marca generados por `npm run brand` desde los dos SVG de
 * `brand-source/`. Las medidas de aquí son las de VISUALIZACIÓN en CSS: los
 * archivos vienen a 3x, así que se ven nítidos en cualquier pantalla.
 *
 * Todos tienen fondo transparente, y no es un detalle: la cabecera es
 * semitransparente con desenfoque, así que un rectángulo opaco detrás del
 * logo se vería como un parche al hacer scroll.
 *
 * Si cambias los SVG, vuelve a ejecutar `npm run brand` y ajusta aquí las
 * medidas que imprime el script.
 */
export const BRAND = {
  /** Símbolo + wordmark en horizontal. Para la cabecera. 327x96 reales. */
  lockup: { src: '/brand/lockup.png', width: 109, height: 32 },
  /** Sólo el símbolo. Para espacios estrechos y el redirector. */
  mark: { src: '/brand/mark-96.png', width: 38, height: 32 },
  /** Símbolo grande, para el pie. */
  markLarge: { src: '/brand/mark-128.png', width: 52, height: 44 },
  /** Bloque apilado completo. Para la portada raíz y el 404. 320x235 reales. */
  stacked: {
    src: '/brand/logo-320.png',
    srcset: '/brand/logo-320.png 320w, /brand/logo-640.png 640w',
    width: 200,
    height: 147,
  },
  /** Cuadrado 512x512 sobre fondo tinta, para JSON-LD y manifiestos. */
  icon: '/brand/icon-512.png',
} as const;

/**
 * IDs de analítica. Déjalos vacíos para desactivar el script correspondiente.
 * Todos se cargan sólo tras consentimiento (ver src/components/Consent.astro).
 */
export const ANALYTICS = {
  ga4: '',            // G-XXXXXXXXXX
  metaPixel: '',      // 1234567890
  tiktokPixel: '',    // CXXXXXXXXXXXXXXXXXX
  gtm: '',            // GTM-XXXXXXX
  clarity: '',        // Microsoft Clarity
} as const;

/**
 * Verificación de propiedad en buscadores / motores de IA.
 */
export const VERIFICATION = {
  google: '',
  bing: '',
  yandex: '',
} as const;

/** Endpoint del formulario de captura (Formspree, Cloudflare Worker, etc.). */
export const LEAD_ENDPOINT = '';
