import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getArticles } from '../../../content/articles';
import categories from '../../../content/articles/_categories';

export const prerender = true

export const getStaticPaths = async () => categories.map(category => ({
  params: { category: category.slug },
  props: { category }
}))

export const get: APIRoute = async ({ params }) => {
  const category = categories.find(category => category.slug === params.category)

  if (!category) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found'
    })
  }

  const articles = await getArticles({
    category: category.slug,
    drafts: import.meta.env.DEV
  })

  return rss({
    title: category?.name,
    description: `Learn more about ${category.name}`,
    site: import.meta.env.SITE,
    items: articles.map((article) => ({
      link: article.slug,
      ...article.data
    }))
  })
}