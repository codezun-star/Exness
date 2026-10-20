import { SITE } from '../config/site';
import { ACCOUNTS, ENTITIES, STATS, type Entity } from '../config/offers';
import { countryEntity, getCountry, guideSlug, type Country } from '../config/countries';

import es from './locales/es';

/** El sitio es monolingüe: un único diccionario, sin fallbacks ni selector. */
export type Dict = typeof es;
export type UIKey = keyof Dict;

/** Idioma del documento. Constante: todo el sitio se publica en español. */
export const LANG = 'es';
export const DIR = 'ltr';
/** Locale para Intl.NumberFormat y fechas — español neutro de América. */
export const INTL_LOCALE = 'es-419';

export type Vars = Record<string, string | number>;

/**
 * Entidad por defecto cuando la página no es de un país concreto.
 *
 * Exness (SC) Ltd atiende a los 15 mercados hispanoamericanos del sitio. La
 * portada se dirige al público general hispanohablante, así que declara esta
 * entidad de forma explícita en vez de heredarla por accidente.
 */
export const DEFAULT_ENTITY: Entity = ENTITIES.global;

/** Variables disponibles en cualquier cadena, sin pasarlas a mano. */
function baseVars(country?: Country): Vars {
  const entity = country ? countryEntity(country) : DEFAULT_ENTITY;
  /* El spread que se anuncia es el suelo del catálogo, no el de una cuenta
     concreta: es el de Raw Spread, la más barata en spread de las cinco. */
  const cheapest = ACCOUNTS.find((a) => a.key === 'rawspread') ?? ACCOUNTS[0];
  return {
    brand: SITE.brand,
    year: new Date().getFullYear(),
    min: STATS.minDeposit,
    minWallet: STATS.minDepositWallet,
    minPro: STATS.minDepositPro,
    spread: cheapest.spreadFrom,
    instruments: STATS.instruments,
    countries: STATS.countries,
    clients: STATS.clients,
    volume: STATS.volume,
    withdrawals: STATS.withdrawals,
    years: STATS.yearsActive,
    leverage: entity.maxLeverage,
    entity: entity.legalName,
    regulator: entity.regulator,
    license: entity.license,
    country: country?.name ?? '',
    currency: country?.currency ?? 'USD',
  };
}

/**
 * Traductor. `t('hero.sub')` ya resuelve {min}, {leverage}, {country}…
 * Pásale un segundo argumento para sobrescribir o añadir variables.
 */
export function useT(country?: Country) {
  const defaults = baseVars(country);

  return function t(key: UIKey, vars?: Vars): string {
    const raw = es[key] as string;
    const merged = vars ? { ...defaults, ...vars } : defaults;
    return raw.replace(/\{(\w+)\}/g, (match, name: string) =>
      name in merged ? String(merged[name]) : match,
    );
  };
}

export type T = ReturnType<typeof useT>;

/** Une segmentos en una ruta absoluta con barra final. */
export function path(...segments: Array<string | number>): string {
  const parts = segments
    .filter((s) => s !== '' && s !== undefined && s !== null)
    .map((s) => String(s).replace(/^\/+|\/+$/g, ''))
    .filter(Boolean);
  return `/${parts.join('/')}${parts.length ? '/' : ''}`;
}

/**
 * Slugs de los artículos del blog, leídos del disco al compilar.
 *
 * countryPath() es síncrona y la colección de contenido no: listar los
 * archivos basta para saber si la guía de un país está escrita.
 */
const POSTS = new Set(
  Object.keys(import.meta.glob('../content/blog/*.md')).map((file) =>
    file.slice(file.lastIndexOf('/') + 1, -'.md'.length),
  ),
);

/**
 * Página de un mercado: su guía del blog (/blog/exness-en-mexico/).
 *
 * Las landings /mx/, /co/… se retiraron: eran la misma plantilla con el
 * nombre del país cambiado y Google dejó de mostrar el sitio entero. La guía
 * es el contenido escrito a mano para cada país, así que todo enlace a un
 * mercado —selector, retícula, pie, aviso geográfico— lleva ahí. Un país sin
 * guía escrita cae a la portada.
 */
export function countryPath(code: string): string {
  const country = getCountry(code);
  const slug = country ? guideSlug(country) : '';
  return POSTS.has(slug) ? blogPath(slug) : path();
}

/**
 * ¿Tiene el país su guía escrita? Las listas que se presentan como «una guía
 * por país» sólo muestran los que sí: un enlace con el nombre de Costa Rica
 * que lleva a la portada promete algo que no hay.
 */
export function hasGuide(code: string): boolean {
  return countryPath(code) !== path();
}

export function blogPath(...rest: string[]): string {
  return path('blog', ...rest);
}

export function legalPath(page: string): string {
  return path('legal', page);
}
