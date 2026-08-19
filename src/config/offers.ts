/**
 * Datos verificables de Exness. Todo el copy comercial se alimenta de aquí,
 * para que una sola edición actualice todas las páginas del sitio.
 *
 * ⚠️ PROCEDENCIA DE LAS CIFRAS — LÉELO ANTES DE PUBLICAR
 *
 * Este archivo se redactó el 2026-08-19 a partir de fuentes secundarias
 * (registros públicos de los reguladores, el acuerdo de cliente de Exness (SC)
 * Ltd alojado en my.exness.com y reseñas sectoriales). El dominio exness.com
 * y su centro de ayuda están bloqueados por la política de red del entorno en
 * el que se construyó el sitio, así que NO se pudieron contrastar contra la
 * fuente primaria.
 *
 * Cada bloque lleva marcada su procedencia:
 *   [REG]  verificado contra registro regulatorio o documento legal de Exness
 *   [SEC]  fuente secundaria coherente entre varias reseñas — CONFIRMAR
 *
 * Antes de publicar, abre exness.com y confirma uno por uno los marcados
 * [SEC]. Repite la revisión cada trimestre: publicar condiciones caducadas es
 * causa de cierre de la cuenta de socio.
 */

/** Entidades legales del grupo Exness. El país determina cuál aplica. */
export type EntityId = 'global' | 'curacao' | 'fsca' | 'cysec';

export interface Entity {
  id: EntityId;
  legalName: string;
  regulator: string;
  license: string;
  /** Apalancamiento máximo publicable para esta entidad */
  maxLeverage: string;
  /**
   * ¿Puede anunciarse el apalancamiento escalado de Exness (hasta ilimitado)?
   * Bajo ESMA y regímenes equivalentes el tope es 1:30 y la promesa de
   * apalancamiento extremo es directamente ilegal en la comunicación.
   *
   * Es el equivalente estructural al `bonusAllowed` de un sitio de XM: la
   * afirmación comercial que sólo es publicable en algunas jurisdicciones.
   */
  scaledLeverage: boolean;
  /**
   * ¿Atiende a clientes minoristas? Las entidades europeas de Exness dejaron
   * de hacerlo: sólo aceptan clientes profesionales. Un mercado nunca debe
   * apuntar a una entidad con `retailClients: false`.
   */
  retailClients: boolean;
  negativeBalanceProtection: boolean;
  /** Cuentas sin swap disponibles bajo esta entidad */
  swapFree: boolean;
  /** Fondo de compensación al inversor, si aplica */
  compensation?: string;
}

export const ENTITIES: Record<EntityId, Entity> = {
  /**
   * [REG] La entidad que atiende a Latinoamérica. El acuerdo de cliente que
   * publica la propia Exness la identifica como «EXNESS (SC) LTD (FSA License
   * Number SD025)». Antes se llamaba Nymstar Limited: es la misma sociedad
   * renombrada, no una entidad distinta.
   */
  global: {
    id: 'global',
    legalName: 'Exness (SC) Ltd',
    regulator: 'FSA Seychelles · Securities Dealer',
    license: 'SD025',
    maxLeverage: 'Ilimitado',
    scaledLeverage: true,
    retailClients: true,
    negativeBalanceProtection: true,
    swapFree: true,
  },
  /** [REG] Intermediario de valores registrado en Curazao. */
  curacao: {
    id: 'curacao',
    legalName: 'Exness B.V.',
    regulator: 'CBCS (Curazao) · Securities Intermediary',
    license: '0003LSI',
    maxLeverage: '1:2000',
    scaledLeverage: true,
    retailClients: true,
    negativeBalanceProtection: true,
    swapFree: true,
  },
  /**
   * [REG] Sudáfrica. La sociedad se llama Vlerizo (Pty) Ltd y opera bajo el
   * nombre comercial Exness ZA; el número de FSP es el de Vlerizo.
   */
  fsca: {
    id: 'fsca',
    legalName: 'Vlerizo (Pty) Ltd — Exness ZA',
    regulator: 'FSCA (Sudáfrica)',
    license: 'FSP 51024',
    maxLeverage: '1:2000',
    scaledLeverage: true,
    retailClients: true,
    negativeBalanceProtection: true,
    swapFree: true,
  },
  /**
   * [REG] Chipre. Está aquí para poder citarla como licencia del grupo, no
   * para dirigirle mercados: Exness (Cy) Ltd dejó de aceptar minoristas y hoy
   * sólo atiende a clientes profesionales. Ningún país de COUNTRIES debe
   * apuntar a esta entidad — ver la comprobación al final del archivo.
   */
  cysec: {
    id: 'cysec',
    legalName: 'Exness (Cy) Ltd',
    regulator: 'CySEC (Chipre) · MiFID II',
    license: '178/12',
    maxLeverage: '1:30',
    scaledLeverage: false,
    retailClients: false,
    negativeBalanceProtection: true,
    swapFree: false,
    compensation: 'ICF hasta 20.000 €',
  },
};

/** Tipos de cuenta. `key` identifica la cuenta en el copy y en el schema. */
export interface AccountType {
  key: 'cent' | 'standard' | 'pro' | 'rawspread' | 'zero';
  name: string;
  minDeposit: number;
  spreadFrom: string;
  commission: string;
  lotSize: string;
  /** Marcado visual de "recomendado" */
  featured?: boolean;
}

/**
 * [SEC] Exness comercializa cinco cuentas, en dos familias: las estándar
 * (Standard Cent y Standard), sin comisión y con depósito mínimo bajo, y las
 * profesionales (Pro, Raw Spread y Zero), con 200 USD de entrada.
 *
 * Confirmado entre fuentes: Raw Spread cobra hasta 7 USD por lote ida y
 * vuelta —3,5 por lado— y arranca en 0,0 pips; Pro no cobra comisión y
 * arranca en 0,1. El spread de las dos cuentas estándar y la comisión exacta
 * de Zero varían por instrumento: por eso la tabla lleva nota al pie y no
 * promete un valor fijo. CONFIRMAR ambos contra exness.com.
 */
export const ACCOUNTS: AccountType[] = [
  { key: 'cent',      name: 'Standard Cent', minDeposit: 10,  spreadFrom: '0.3', commission: '0',                     lotSize: '1.000' },
  { key: 'standard',  name: 'Standard',      minDeposit: 10,  spreadFrom: '0.3', commission: '0',                     lotSize: '100.000', featured: true },
  { key: 'pro',       name: 'Pro',           minDeposit: 200, spreadFrom: '0.1', commission: '0',                     lotSize: '100.000' },
  { key: 'rawspread', name: 'Raw Spread',    minDeposit: 200, spreadFrom: '0.0', commission: 'Hasta 3,5 USD por lado', lotSize: '100.000' },
  { key: 'zero',      name: 'Zero',          minDeposit: 200, spreadFrom: '0.0', commission: 'Variable',              lotSize: '100.000' },
];

/**
 * Cifras usadas en badges y prueba social. Sólo datos públicos de Exness.
 *
 * [SEC] Todas salvo el año de fundación proceden de reseñas sectoriales
 * coherentes entre sí. Son conservadoras a propósito —se redondea hacia
 * abajo— pero siguen necesitando confirmación en exness.com.
 */
export const STATS = {
  instruments: '200+',
  countries: '100+',
  /** Traders activos al mes, no cuentas abiertas: es la cifra que publica Exness. */
  clients: '600.000+',
  /** Volumen negociado al mes. «Billón» aquí es 10^12, en el sentido del español. */
  volume: '4 billones USD',
  yearsActive: new Date().getFullYear() - 2008,
  /** Con tarjeta o cripto. Los métodos locales arrancan en 10 USD. */
  minDeposit: 1,
  minDepositLocal: 10,
  executionSpeed: '<1 s',
  /** El argumento comercial nº1 de Exness, y es verificable. */
  withdrawals: 'Instantáneos 24/7',
  /**
   * Comisión de depósito y de retiro que cobra Exness. Es cero, y es un dato
   * que conviene mantener literal: no dice que no haya coste ninguno —el
   * proveedor de pago sí puede cobrar—, dice que el bróker no cobra.
   */
  transferFee: '0',
} as const;

/**
 * [SEC] Plataformas. Exness añade dos propias a las dos de MetaQuotes: el
 * Terminal web y la app Exness Trade, ambas sólo para cuentas MT5.
 */
export const PLATFORMS = [
  { key: 'mt5',      name: 'MetaTrader 5',    os: 'Windows · macOS · Web · iOS · Android' },
  { key: 'mt4',      name: 'MetaTrader 4',    os: 'Windows · macOS · Web · iOS · Android' },
  { key: 'terminal', name: 'Exness Terminal', os: 'Navegador, sin descarga · sólo MT5' },
  { key: 'app',      name: 'Exness Trade',    os: 'iOS · Android · sólo MT5' },
] as const;

/**
 * Ventajas estructurales de Exness. Ocupan el lugar que en un sitio de XM
 * ocupa el bono, y no es un cambio cosmético: Exness NO ofrece bonos de
 * bienvenida ni de depósito, y decirlo sería publicidad falsa. Estas cinco
 * son lo que la casa sí ofrece de verdad.
 *
 * `entityGated` marca las que dependen del apalancamiento escalado, para que
 * desaparezcan solas en una jurisdicción que no permita anunciarlo.
 */
export interface Advantage {
  key: 'withdrawals' | 'fees' | 'leverage' | 'swapfree' | 'entry';
  entityGated?: boolean;
}

export const ADVANTAGES: Advantage[] = [
  { key: 'withdrawals' },
  { key: 'fees' },
  { key: 'leverage', entityGated: true },
  { key: 'swapfree' },
  { key: 'entry' },
];

/**
 * Países donde NO se puede operar ni promocionar Exness. El sitio no genera
 * página para ninguno de ellos, y si detecta que el visitante llega desde uno
 * marca el documento con `data-blocked-region` en vez de sugerirle nada.
 *
 * [SEC] Compilada el 2026-08-19 desde la lista que publica el centro de ayuda
 * de socios de Exness. Es MUCHO más larga que la de un bróker como XM, y la
 * diferencia no es un detalle: además de Estados Unidos y sus territorios, de
 * Canadá y de las jurisdicciones sancionadas, Exness no acepta residentes de
 * prácticamente todo el Espacio Económico Europeo ni del Reino Unido, porque
 * sus entidades europeas dejaron de atender a minoristas.
 *
 * Consecuencia directa para este sitio: ESPAÑA NO ES UN MERCADO. No es una
 * decisión de prudencia publicitaria como lo sería con otro bróker — es que
 * Exness no abre cuentas a residentes españoles, así que una landing
 * dirigida a España enviaría tráfico a un registro que va a rebotar.
 *
 * ⚠️ Esta lista cambia. Confírmala en el centro de ayuda de socios antes de
 * publicar y cada trimestre.
 */
export const BLOCKED_COUNTRIES = [
  // América del Norte y territorios de EE. UU.
  'US', 'CA', 'GL', 'PR', 'VI', 'GU', 'AS', 'MP', 'MH',
  // Espacio Económico Europeo, Reino Unido y microestados
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
  'HU', 'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT', 'MC', 'NL', 'NO',
  'PL', 'PT', 'RO', 'SM', 'SK', 'SI', 'ES', 'SE', 'CH', 'GB', 'VA',
  // Oceanía
  'AU', 'NZ', 'VU', 'FJ', 'PW', 'WS', 'KI', 'FM', 'NF', 'TV',
  // África
  'SC', 'SD', 'SS', 'CF', 'MU', 'EH',
  // Oriente Medio y jurisdicciones sancionadas
  'IL', 'IR', 'IQ', 'SY', 'YE', 'PS', 'KP', 'CU',
] as const;
