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

const projects = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    link: z.url(),
    // A path relative to the project's file, e.g. ../../assets/images/logos/companion.svg
    logo: image().optional(),
    draft: z.boolean().optional(),
  }),
})

export const collections = {
  'articles': articles,
  'pages': pages,
  'projects': projects,
}
