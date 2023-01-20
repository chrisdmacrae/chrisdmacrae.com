import { basename } from 'path'
import type { MDXInstance } from "astro"

export type Article = {
  title: string
  description: string
  created: string
  category: string
  draft: boolean
}

export type getArticlesOptions = {
  category?: string
  drafts?: boolean
}

export const getArticles = async (options?: getArticlesOptions) => {
  let articlesByPath = import.meta.glob<MDXInstance<Article>>("./*.mdx", { eager: true })
  let articles = Object.values(articlesByPath)
    .map(article => ({
      ...article,
      slug: basename(article.file).split('.')[0]
    }))
    .sort((a, b) => Date.parse(b.frontmatter.created) - Date.parse(a.frontmatter.created))

  if (!options?.drafts) {
    articles = articles.filter(article => article.frontmatter.draft !== true)
  }

  if (options?.category) {
    articles = articles.filter(article => article.frontmatter.category === options.category)
  }

  return articles
}