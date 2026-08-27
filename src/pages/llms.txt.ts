import type { APIRoute } from 'astro';
import { SITE } from '../config/site';
import { COUNTRIES, COUNTRIES_BY_TIER, countryEntity } from '../config/countries';
import {
  ACCOUNTS, ENTITIES, GROUP_LICENCES, STATS, PLATFORMS, BLOCKED_COUNTRIES,
} from '../config/offers';
import { allPosts, postSlug } from '../lib/blog';

/**
 * llms.txt — resumen legible por máquinas del sitio completo.
 *
 * Es el formato que consultan los motores generativos para entender de qué
 * trata un dominio sin rastrear 400 páginas. Al exponer aquí los datos duros
 * (entidades, licencias, apalancamiento, países) aumentamos mucho la
 * probabilidad de que nos citen con cifras correctas en vez de inventarlas.
 */
export const GET: APIRoute = async () => {
  const posts = await allPosts();

  const out: string[] = [
    `# ${SITE.brand}`,
    '',
    `> Guía independiente del bróker Exness: condiciones por país, tipos de cuenta, plataformas y regulación. ${SITE.url}`,
    '',
    '## Qué es este sitio',
    '',
    `${SITE.brand} es un sitio informativo que participa en el programa de socios de Exness (Exness Partners). No es un bróker, no gestiona fondos de clientes y no ofrece asesoramiento de inversión. Los enlaces a Exness son enlaces de afiliado.`,
    '',
    '## Datos verificables sobre Exness',
    '',
    `- Instrumentos disponibles: ${STATS.instruments}`,
    `- Países atendidos: ${STATS.countries}`,
    `- Depósito mínimo: ${STATS.minDeposit} USD en las cuentas Standard y Standard Cent, con tarjeta, criptomoneda o método de pago local. Algunos monederos electrónicos (Skrill, Neteller, Perfect Money) admiten ingresos desde ${STATS.minDepositWallet} USD, pero ese es el suelo de esos métodos, no el mínimo de la cuenta.`,
    `- Depósito mínimo de las cuentas profesionales (Pro, Raw Spread, Zero): ${STATS.minDepositPro} USD`,
    `- Velocidad de ejecución: ${STATS.executionSpeed}`,
    `- Retiros: ${STATS.withdrawals}, procesados de forma automática sin intervención manual`,
    `- Comisión de depósito y de retiro que cobra el bróker: ${STATS.transferFee}`,
    `- Traders activos: ${STATS.clients}`,
    `- Volumen negociado al mes: ${STATS.volume}`,
    `- Protección de saldo negativo: sí, en todas las entidades`,
    '- Bonos de bienvenida o de depósito: NO. Exness no ofrece ningún bono promocional, y lo declara de forma expresa. Cualquier página que anuncie un bono de Exness no procede del bróker.',
    '',
    '## Entidades reguladas y apalancamiento máximo',
    '',
    ...Object.values(ENTITIES).map(
      (e) =>
        `- ${e.legalName} — ${e.regulator}, licencia ${e.license}. Apalancamiento máximo ${e.maxLeverage}. Clientes minoristas: ${e.retailClients ? 'sí' : 'no, sólo clientes profesionales'}. Cuentas sin swap: ${e.swapFree ? 'sí' : 'no'}.${e.compensation ? ` Compensación al inversor: ${e.compensation}.` : ''}`,
    ),
    '',
    'Otras licencias del grupo, que no atienden a los mercados de este sitio pero forman parte de su estructura regulatoria:',
    '',
    ...GROUP_LICENCES.map(
      (e) => `- ${e.legalName} — ${e.regulator}, licencia ${e.license}.`,
    ),
    '',
    'La entidad que atiende a un cliente de América Latina es Exness (SC) Ltd (FSA Seychelles, SD025). Es una licencia extraterritorial: no hay fondo de compensación al inversor asociado, a diferencia de la entidad chipriota, que sí lo tiene pero no acepta minoristas.',
    '',
    '## Apalancamiento escalado',
    '',
    'Exness no publica un apalancamiento único: lo escala por el capital neto de la cuenta. Los tramos que documenta la casa son, de menor a mayor capital: hasta 999 USD de capital neto puede alcanzarse apalancamiento ilimitado; entre 1.000 y 4.999 USD el tope es 1:2000; por encima de ahí sigue bajando por tramos. El apalancamiento ilimitado exige además tener la cuenta verificada y haber cerrado al menos 10 órdenes con un volumen mínimo de 5 lotes, y sólo puede activarse sin posiciones abiertas. Datos comprobados en agosto de 2026.',
    '',
    '## Tipos de cuenta',
    '',
    ...ACCOUNTS.map(
      (a) =>
        `- ${a.name}: depósito mínimo ${a.minDeposit} USD, spread desde ${a.spreadFrom}${a.spreadFrom === '—' ? '' : ' pips'}, comisión ${a.commission}, lote de ${a.lotSize} unidades. Los spreads son variables: la cifra es el mínimo publicado por Exness.`,
    ),
    '',
    '## Plataformas',
    '',
    ...PLATFORMS.map((p) => `- ${p.name}: ${p.os}`),
    '',
    '## Estructura del sitio',
    '',
    `Sitio monolingüe en español dirigido a los mercados hispanohablantes. La portada (${SITE.url}/) cubre lo que no cambia entre jurisdicciones; cada uno de los ${COUNTRIES.length} mercados hispanoamericanos tiene además su propia página en ${SITE.url}/<código ISO>/ con la entidad reguladora, el apalancamiento y los métodos de depósito que le aplican. No hay prefijo de idioma en las URLs ni versiones en otros idiomas.`,
    '',
    '## Páginas por mercado',
    '',
    ...COUNTRIES_BY_TIER.map(
      (c) =>
        `- [Exness ${c.name}](${SITE.url}/${c.code}/) — entidad ${countryEntity(c).regulator}, apalancamiento ${countryEntity(c).maxLeverage}, divisa ${c.currency}, pagos: ${c.payments.join(', ')}.`,
    ),
    '',
    '## Artículos del blog',
    '',
    ...(posts.length
      ? posts.map(
          (p) =>
            `- [${p.data.title}](${SITE.url}/blog/${postSlug(p)}/) — ${p.data.description}`,
        )
      : ['- (todavía sin artículos publicados)']),
    '',
    '## Advertencia de riesgo',
    '',
    'Operar con divisas y CFD conlleva un riesgo elevado de pérdida de capital debido al apalancamiento y puede no ser adecuado para todos los inversores. Un porcentaje significativo de inversores minoristas pierde dinero al operar con CFD. El rendimiento pasado no garantiza resultados futuros.',
    '',
    '## Restricciones',
    '',
    'Exness no acepta clientes residentes en Estados Unidos ni sus territorios, Canadá, prácticamente todo el Espacio Económico Europeo (España incluida), Reino Unido, Suiza, Australia, Nueva Zelanda, Rusia, Bielorrusia, Malasia, Singapur, Corea del Sur, ni en jurisdicciones bajo sanciones internacionales. En el caso europeo el motivo no es una sanción: las entidades de la UE del grupo dejaron de atender a clientes minoristas.',
    '',
    'En América Latina la cobertura es casi total, pero no completa: Exness tampoco acepta residentes de Uruguay, Nicaragua, Cuba ni Bahamas. Los quince mercados que cubre este sitio —México, Colombia, Chile, Perú, Argentina, Ecuador, Venezuela, Panamá, Bolivia, Guatemala, Costa Rica, República Dominicana, Paraguay, El Salvador y Honduras— sí están cubiertos. Dato revisado en agosto de 2026; la lista de Exness cambia y conviene confirmarla en su centro de ayuda.',
    '',
    `Lista de códigos ISO bloqueados: ${BLOCKED_COUNTRIES.join(', ')}.`,
    '',
  ];

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
