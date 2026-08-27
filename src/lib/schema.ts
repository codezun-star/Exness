import { SITE, BRAND } from '../config/site';
import { LANG } from '../i18n/ui';
import { STATS } from '../config/offers';
import { abs } from './seo';

/**
 * Constructores de JSON-LD.
 *
 * Estos bloques son lo que leen Google (rich results), Bing y los motores
 * generativos para citar el sitio. Sólo se declaran entidades reales: nada
 * de AggregateRating ni Review inventados — es motivo de penalización
 * manual y además incumple los términos de socio de Exness.
 */

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

export function organization() {
  const social = Object.values(SITE.social).filter(Boolean);
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.brand,
    legalName: SITE.legalName,
    url: `${SITE.url}/`,
    foundingDate: SITE.founded,
    email: SITE.email,
    description:
      'Sitio informativo independiente sobre el bróker Exness: condiciones por país, tipos de cuenta, plataformas y guías de trading.',
    // Google exige que el logo de Organization sea cuadrado y de al menos
    // 112x112 px para mostrarlo en los resultados.
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE.url}/#logo`,
      url: `${SITE.url}${BRAND.icon}`,
      width: 512,
      height: 512,
      caption: SITE.brand,
    },
    image: { '@id': `${SITE.url}/#logo` },
    ...(social.length ? { sameAs: social } : {}),
  };
}

export function website() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: `${SITE.url}/`,
    name: SITE.brand,
    inLanguage: LANG,
    publisher: { '@id': ORG_ID },
  };
}

/**
 * Nodo WebPage.
 *
 * ⚠️ Declara `about: #exness`, así que el grafo que lo incluya TIENE que
 * incluir también brokerEntity(). Una referencia a un @id que no existe en el
 * mismo grafo es un nodo colgando: el validador de Google lo marca y los
 * motores generativos, que resuelven el grafo entero, se quedan sin saber de
 * qué trata la página. Se dejó de cumplir en el índice del blog y en las
 * cinco páginas legales hasta la revisión de 2026-08.
 */
export function webPage(opts: {
  url: string;
  title: string;
  description: string;
  updated?: Date;
}) {
  return {
    '@type': 'WebPage',
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    name: opts.title,
    description: opts.description,
    inLanguage: LANG,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': `${SITE.url}/#exness` },
    ...(opts.updated ? { dateModified: opts.updated.toISOString() } : {}),
  };
}

/** La entidad "Exness" declarada una vez y referenciada desde cada página. */
export function brokerEntity() {
  return {
    '@type': 'FinancialService',
    '@id': `${SITE.url}/#exness`,
    name: 'Exness',
    url: 'https://www.exness.com/',
    serviceType: 'Bróker de Forex y CFD',
    areaServed: `${STATS.countries} países`,
    brand: { '@type': 'Brand', name: 'Exness' },
  };
}

export function breadcrumbs(items: Array<{ name: string; path: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

/** Bloque clave para AEO: alimenta directamente los fragmentos destacados. */
export function faqPage(qas: Array<{ q: string; a: string }>) {
  return {
    '@type': 'FAQPage',
    mainEntity: qas.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function howTo(opts: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
  totalTime?: string;
}) {
  return {
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    ...(opts.totalTime ? { totalTime: opts.totalTime } : {}),
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function blogPosting(opts: {
  url: string;
  title: string;
  description: string;
  published: Date;
  updated?: Date;
  author: string;
  tags?: string[];
  wordCount?: number;
}) {
  return {
    '@type': 'BlogPosting',
    '@id': `${opts.url}#article`,
    headline: opts.title,
    description: opts.description,
    inLanguage: LANG,
    datePublished: opts.published.toISOString(),
    dateModified: (opts.updated ?? opts.published).toISOString(),
    author: { '@type': 'Person', name: opts.author },
    publisher: { '@id': ORG_ID },
    // `mainEntityOfPage` apunta a un nodo WebPage que TIENE que existir en el
    // mismo grafo. Sin él la referencia queda colgando y el validador de
    // Google avisa; la página del artículo emite ese nodo desde webPage().
    mainEntityOfPage: { '@id': `${opts.url}#webpage` },
    // Google pide una imagen en cualquier tipo de artículo para poder
    // mostrarlo en los formatos con miniatura. Sin ella el resultado se
    // renderiza como un enlace de texto.
    image: {
      '@type': 'ImageObject',
      url: `${SITE.url}${SITE.ogImage}`,
      width: 1200,
      height: 630,
    },
    // El artículo habla de Exness: declararlo enlaza cada pieza de contenido
    // con la entidad del bróker, que es lo que hace que un motor generativo
    // entienda el sitio como una fuente sobre Exness y no como texto suelto.
    about: { '@id': `${SITE.url}/#exness` },
    ...(opts.tags?.length ? { keywords: opts.tags.join(', ') } : {}),
    ...(opts.wordCount ? { wordCount: opts.wordCount } : {}),
  };
}

/** Lista de países o de cuentas: ayuda a los motores a enumerar opciones. */
export function itemList(
  name: string,
  items: Array<{ name: string; path: string }>,
) {
  return {
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: abs(item.path),
    })),
  };
}

/** Envuelve varios bloques en un único @graph. */
export function graph(...nodes: Array<Record<string, unknown> | null | undefined>) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}
