import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Blog en Markdown puro.
 *
 * Estructura de archivos: src/content/blog/<slug>.md
 * El sitio es monolingüe, así que el nombre del archivo es el slug y la URL
 * resultante es /blog/<slug>/. No hay traducciones que enlazar.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().min(50).max(170),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('EXZUN'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /** Respuesta directa de 40-60 palabras: es lo que citan los motores de IA */
    answer: z.string().optional(),
    /** Preguntas que se publican como FAQPage en JSON-LD */
    faq: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .default([]),
  }),
});

export const collections = { blog };
