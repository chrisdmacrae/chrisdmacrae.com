import { getCollection } from 'astro:content';

export type Article = Awaited<ReturnType<typeof getArticles>>[number]

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
  // getCollection() has no guaranteed order, so keep articles sorted by filename.
  articlesCollection.sort((a, b) => a.id.localeCompare(b.id))

  let articles = await Promise.all(articlesCollection.map(async (article) => {
    const importedArticle = await importedArticles[`./articles/${article.filePath!.split('/').pop()}`]()

    return {
      ...article,
      // The article's URL, served by src/pages/articles/[category]/[id].astro
      slug: `/articles/${article.data.category}/${article.id}`,
      readingTime: importedArticle.readingTime
    } as const
  }))

  return articles
}