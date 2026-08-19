import type { APIRoute } from 'astro';
import { SITE } from '../config/site';

/**
 * robots.txt orientado a SEO + AEO + GEO.
 *
 * Los rastreadores de motores generativos se declaran de forma explícita:
 * si no aparecen, algunos aplican políticas conservadoras y dejan de citar
 * el sitio. El redirector de afiliados queda fuera de índice para todos.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'Amazonbot',
  'cohere-ai',
  'DuckAssistBot',
  'MistralAI-User',
  'YouBot',
];

export const GET: APIRoute = () => {
  const lines: string[] = [
    '# https://www.robotstxt.org/',
    '',
    'User-agent: *',
    'Allow: /',
    'Disallow: /go/',
    '',
  ];

  for (const bot of AI_CRAWLERS) {
    lines.push(`User-agent: ${bot}`, 'Allow: /', 'Disallow: /go/', '');
  }

  lines.push(
    `Sitemap: ${SITE.url}/sitemap-index.xml`,
    `# LLM summary: ${SITE.url}/llms.txt`,
    '',
  );

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
