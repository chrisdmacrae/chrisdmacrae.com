import { z, defineCollection } from 'astro:content'
import { rssSchema } from '@astrojs/rss';


const articles = defineCollection({
  schema: rssSchema.merge(z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    draft: z.boolean().optional(),
  })),
  slug: ({ defaultSlug, data }) => {
    if (!data.category) throw new Error('Missing a category')

    return `/articles/${data.category}/${defaultSlug}`
  }
})

export const collections = {
  'articles': articles,
}