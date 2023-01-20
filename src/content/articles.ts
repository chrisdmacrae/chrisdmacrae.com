import { getCollection } from 'astro:content';

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
  const importedArticles = import.meta.glob<Record<string, any>>('./articles/*.mdx', { eager: false })
  const articlesCollection = await getCollection('articles', ({ data }) => {
    if (!options?.drafts && data.draft === true) {
      return false
    }
  
    if (options?.category && options?.category !== data.category) {
      return false
    }

    return true
  })
  let articles = await Promise.all(articlesCollection.map(async (article) => {
    const importedArticle = await importedArticles[`./articles/${article.id}`]()

    return {
      ...article,
      readingTime: importedArticle.readingTime
    } as const
  }))

  return articles
}