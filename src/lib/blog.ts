import { getCollection, type CollectionEntry } from 'astro:content';
import { INTL_LOCALE } from '../i18n/ui';

export type Post = CollectionEntry<'blog'>;

/** El id de la entrada es el slug: src/content/blog/<slug>.md */
export function postSlug(post: Post): string {
  return post.id;
}

const isPublished = (post: Post) =>
  !post.data.draft && post.data.pubDate.getTime() <= Date.now();

/** Artículos publicados, del más reciente al más antiguo. */
export async function allPosts(): Promise<Post[]> {
  return (await getCollection('blog', isPublished)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );
}

/** Relacionados: primero por etiqueta compartida, luego por recencia. */
export async function relatedTo(post: Post, limit = 3): Promise<Post[]> {
  const pool = (await allPosts()).filter((p) => p.id !== post.id);
  const tags = new Set(post.data.tags);

  return pool
    .map((p) => ({
      post: p,
      score: p.data.tags.filter((tag) => tags.has(tag)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.post);
}

/** "República Dominicana" → "republica-dominicana". */
export function slugifyName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * La guía dedicada a un mercado, si existe y está publicada.
 *
 * El slug se deriva del nombre del país en vez de guardarse en un campo
 * aparte: así añadir un mercado y su artículo no obliga a mantener un mapa
 * sincronizado a mano, y si el artículo todavía no existe la función
 * devuelve undefined y la landing simplemente no enlaza a ninguna parte.
 */
export async function guideFor(name: string): Promise<Post | undefined> {
  const slug = `exness-en-${slugifyName(name)}`;
  return (await allPosts()).find((post) => postSlug(post) === slug);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat(INTL_LOCALE, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
