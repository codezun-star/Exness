import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { SITE } from '../config/site';
import { useT, blogPath, LANG } from '../i18n/ui';
import { allPosts, postSlug } from '../lib/blog';

export const GET: APIRoute = async () => {
  const t = useT();
  const posts = await allPosts();

  return rss({
    title: `${SITE.brand} — ${t('blog.title')}`,
    description: t('seo.blog.desc'),
    site: SITE.url,
    trailingSlash: true,
    customData: `<language>${LANG}</language>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: blogPath(postSlug(post)),
      categories: post.data.tags,
      author: post.data.author,
    })),
  });
};
