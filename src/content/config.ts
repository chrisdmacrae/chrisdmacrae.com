import { z, defineCollection } from 'astro:content'

const articles = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    created: z.date()
  }),
  slug: ({ defaultSlug, data }) => {
    if (!data.category) throw new Error('Missing a category')

    return `/articles/${data.category}/${defaultSlug}`
  }
})

export const collections = {
  'articles': articles,
}