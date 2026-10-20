import { getCollection, type CollectionEntry } from 'astro:content';
import { INTL_LOCALE } from '../i18n/ui';
import { COUNTRIES, guideSlug, type Country } from '../config/countries';

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

/** El mercado del que trata un artículo, si es la guía de un país. */
export function guideCountry(post: Post): Country | undefined {
  return COUNTRIES.find((c) => guideSlug(c) === postSlug(post));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat(INTL_LOCALE, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
