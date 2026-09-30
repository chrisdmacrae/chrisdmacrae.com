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

// A run of heading text, optionally in one of Text's gradients
const segment = z.object({
  text: z.string(),
  gradient: z.enum(['primary', 'success', 'info', 'warning']).optional(),
  italic: z.boolean().optional(),
  line_break: z.boolean().optional(),
})

const pages = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // The rest are the homepage's (index.mdx)
    intro: z.string().optional(),
    headline: z.array(segment).optional(),
    learn_prompt: z.string().optional(),
    about_heading: z.array(segment).optional(),
    // A repository path under src/assets/images/, resolved by src/lib/images.ts
    about_photo: z.string().optional(),
    testimonials_heading: z.string().optional(),
  }),
})

const testimonials = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    // A repository path under src/assets/images/, resolved by src/lib/images.ts
    photo: z.string(),
    heading: z.string(),
    text: z.string(),
    order: z.number().optional(),
  }),
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
  'testimonials': testimonials,
}
