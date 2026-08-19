import type { EntityId } from './offers';
import { ENTITIES } from './offers';

/**
 * Registro de mercados. El sitio es monolingüe —todo en español— así que un
 * país sólo aporta lo que de verdad cambia entre jurisdicciones: la entidad
 * de Exness que atiende, la divisa, los métodos de depósito y los activos.
 *
 * Cada país genera una página en /{code}/. Añadir un mercado = añadir un
 * objeto aquí. Nada más.
 *
 * ⚠️ Antes de añadir uno, comprueba que no está en BLOCKED_COUNTRIES. La
 * lista de Exness es larga y cubre toda la UE: España, en concreto, NO es un
 * mercado posible, por mucho que sea el mayor mercado hispanohablante de
 * Europa. Exness no abre cuentas a residentes españoles.
 */
export interface Country {
  /** ISO-3166 alpha-2 en minúsculas — también es el slug de URL */
  code: string;
  /** Nombre del país en español: es lo que se muestra siempre */
  name: string;
  /** Entidad de Exness que atiende ese país → define apalancamiento */
  entity: EntityId;
  /** Divisa local, para el copy de depósito mínimo */
  currency: string;
  /** Métodos de depósito locales — el argumento nº1 de conversión en LATAM */
  payments: string[];
  /** Activos que más se operan ahí (para el copy y el schema) */
  assets: string[];
  /** 1 = mercado prioritario (menú principal), 2 = secundario, 3 = cola larga */
  tier: 1 | 2 | 3;
  /** Nombre del regulador financiero local, si aplica mencionarlo */
  localRegulator?: string;
}

/**
 * Los 17 mercados hispanoamericanos. Todos los atiende Exness (SC) Ltd desde
 * Seychelles: ninguno tiene entidad local, y por eso todos comparten `global`.
 *
 * Los métodos de pago sí son propios de cada país y son el dato con más peso
 * comercial de este archivo — SPEI en México o PSE en Colombia deciden más
 * conversiones que cualquier argumento sobre spreads.
 */
export const COUNTRIES: Country[] = [
  { code: 'mx', name: 'México', entity: 'global', currency: 'MXN',
    payments: ['SPEI', 'OXXO', 'Visa/Mastercard', 'Skrill', 'USDT'], assets: ['USD/MXN', 'Oro', 'US30', 'NAS100'], tier: 1, localRegulator: 'CNBV' },
  { code: 'co', name: 'Colombia', entity: 'global', currency: 'COP',
    payments: ['PSE', 'Nequi', 'Daviplata', 'Visa/Mastercard', 'USDT'], assets: ['USD/COP', 'Oro', 'Petróleo', 'US500'], tier: 1, localRegulator: 'SFC' },
  { code: 'cl', name: 'Chile', entity: 'global', currency: 'CLP',
    payments: ['Transferencia local', 'Visa/Mastercard', 'Skrill', 'USDT'], assets: ['USD/CLP', 'Cobre', 'Oro', 'US30'], tier: 1, localRegulator: 'CMF' },
  { code: 'pe', name: 'Perú', entity: 'global', currency: 'PEN',
    payments: ['Transferencia local', 'Visa/Mastercard', 'Skrill', 'USDT'], assets: ['USD/PEN', 'Oro', 'Plata', 'NAS100'], tier: 1, localRegulator: 'SMV' },
  { code: 'ar', name: 'Argentina', entity: 'global', currency: 'ARS',
    payments: ['Mercado Pago', 'Transferencia local', 'Visa/Mastercard', 'USDT'], assets: ['Oro', 'US30', 'NAS100', 'BTC/USD'], tier: 1, localRegulator: 'CNV' },
  { code: 'ec', name: 'Ecuador', entity: 'global', currency: 'USD',
    payments: ['Transferencia local', 'Visa/Mastercard', 'Skrill', 'USDT'], assets: ['Oro', 'Petróleo', 'US500'], tier: 2 },
  { code: 'bo', name: 'Bolivia', entity: 'global', currency: 'BOB',
    payments: ['Visa/Mastercard', 'Skrill', 'USDT'], assets: ['Oro', 'Plata', 'US30'], tier: 3 },
  { code: 've', name: 'Venezuela', entity: 'global', currency: 'USD',
    payments: ['Skrill', 'Neteller', 'USDT'], assets: ['Oro', 'BTC/USD', 'US500'], tier: 2 },
  { code: 'gt', name: 'Guatemala', entity: 'global', currency: 'GTQ',
    payments: ['Visa/Mastercard', 'Skrill', 'USDT'], assets: ['Oro', 'US30', 'EUR/USD'], tier: 3 },
  { code: 'cr', name: 'Costa Rica', entity: 'global', currency: 'CRC',
    payments: ['Visa/Mastercard', 'Skrill', 'USDT'], assets: ['Oro', 'US500', 'EUR/USD'], tier: 3 },
  { code: 'pa', name: 'Panamá', entity: 'global', currency: 'USD',
    payments: ['Transferencia local', 'Visa/Mastercard', 'Skrill', 'USDT'], assets: ['Oro', 'US30', 'NAS100'], tier: 2 },
  { code: 'do', name: 'República Dominicana', entity: 'global', currency: 'DOP',
    payments: ['Visa/Mastercard', 'Skrill', 'USDT'], assets: ['Oro', 'US500', 'EUR/USD'], tier: 3 },
  { code: 'uy', name: 'Uruguay', entity: 'global', currency: 'UYU',
    payments: ['Transferencia local', 'Visa/Mastercard', 'Skrill', 'USDT'], assets: ['Oro', 'US30', 'EUR/USD'], tier: 3 },
  { code: 'py', name: 'Paraguay', entity: 'global', currency: 'PYG',
    payments: ['Visa/Mastercard', 'Skrill', 'USDT'], assets: ['Oro', 'Soja', 'US500'], tier: 3 },
  { code: 'sv', name: 'El Salvador', entity: 'global', currency: 'USD',
    payments: ['Visa/Mastercard', 'Skrill', 'USDT'], assets: ['BTC/USD', 'Oro', 'US30'], tier: 3 },
  { code: 'hn', name: 'Honduras', entity: 'global', currency: 'HNL',
    payments: ['Visa/Mastercard', 'Skrill', 'USDT'], assets: ['Oro', 'US500', 'EUR/USD'], tier: 3 },
  { code: 'ni', name: 'Nicaragua', entity: 'global', currency: 'NIO',
    payments: ['Visa/Mastercard', 'Skrill', 'USDT'], assets: ['Oro', 'US500', 'EUR/USD'], tier: 3 },
];

/** Países ordenados por prioridad de negocio. */
export const COUNTRIES_BY_TIER = [...COUNTRIES].sort((a, b) => a.tier - b.tier);

export function getCountry(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code);
}

/** Los demás mercados, para el enlazado interno desde una página de país. */
export function siblingsOf(country: Country): Country[] {
  return COUNTRIES_BY_TIER.filter((c) => c.code !== country.code);
}

/** Datos regulatorios efectivos del país (apalancamiento, entidad, licencia). */
export function countryEntity(country: Country) {
  return ENTITIES[country.entity];
}

/**
 * ¿Puedo anunciar el apalancamiento escalado de Exness en este país?
 *
 * Ocupa el lugar que en un sitio de XM ocupa `bonusAllowed`: la afirmación
 * comercial fuerte que sólo es publicable bajo ciertas entidades. Bajo un
 * régimen tipo ESMA el tope es 1:30 y prometer más es ilegal, así que el
 * bloque entero se sustituye por el aviso de protección reforzada.
 */
export function scaledLeverageAllowed(country: Country): boolean {
  return ENTITIES[country.entity].scaledLeverage;
}

/**
 * Valor de hreflang de la página: español + región, p. ej. "es-MX".
 *
 * Es la anotación que corresponde a este sitio: 17 páginas en el mismo idioma
 * dirigidas a países distintos. Sin la región competirían entre sí en vez de
 * servirse cada una a su audiencia.
 */
export function countryHreflang(country: Country): string {
  return `es-${country.code.toUpperCase()}`;
}

/** Locale de Open Graph, p. ej. "es_MX". */
export function countryLocale(country: Country): string {
  return `es_${country.code.toUpperCase()}`;
}
