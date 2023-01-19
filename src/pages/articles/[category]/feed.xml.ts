import rss from '@astrojs/rss';
import type { APIRoute, MDXInstance } from 'astro';
import { Article, getArticles } from '../../../content/articles';
import categories from '../../../content/articles/_categories';

export const get: APIRoute = async ({ params }) => {
  const category = categories.find(category => category.slug === params.category)

  if (!category) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found'
    })
  }

  const getRawArticles = async () => {
    const rawResult = import.meta.glob('../../../content/articles/*.mdx', { eager: true })
    const results = Object.values(rawResult) as MDXInstance<Article>[]

    return results
  }
  const articles = await getArticles(getRawArticles, {
    category: category.slug,
    drafts: import.meta.env.DEV
  })

  return rss({
    title: category?.name,
    description: `Learn more about ${category.name}`,
    site: import.meta.env.SITE,
    items: articles.map((article) => ({
      link: `/articles/${category.slug}/${article.slug}`,
      title: article.frontmatter.title,
      pubDate: new Date(article.frontmatter.created),
    }))
  })
}