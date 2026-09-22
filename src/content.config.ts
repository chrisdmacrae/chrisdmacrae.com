import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { rssSchema } from '@astrojs/rss';


const articles = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/articles' }),
  schema: rssSchema.extend({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    draft: z.boolean().optional(),
  }),
})

const pages = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/pages' }),
})

export const collections = {
  'articles': articles,
  'pages': pages,
}
