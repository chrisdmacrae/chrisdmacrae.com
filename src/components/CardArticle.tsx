import type { CollectionEntry } from "astro:content"
import { categories } from "../content/articles/_categories"
import { prettyDate } from "../lib/prettyDate"
import Heading from "./typography/Heading"
import Text from "./typography/Text"

export type CardArticleProps = {
  article: CollectionEntry<"articles">
  readingTime: Record<string, any>
}

export const CardArticle: React.FC<CardArticleProps> = ({ article, readingTime }) => {
  const category = categories.find(category => category.slug === article.data.category)

  return (
    <a href={article.slug} rel="prefetch">
      <article className="z-0 group relative flex flex-col gap-2 p-6">
        <span className="absolute z-0 inset-1 group-hover:-inset-1 group-active:-inset-1 rounded-2xl bg-slate-200 dark:bg-slate-800 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-200 ease-bounce" />
        <span className="relative z-10">
          <Heading as='h2' size={4}>
            {article.data.title}
          </Heading>
          <Text>
            {article.data.description}
          </Text>
          <Text color='muted'>
            <span className="leading-10 break-keep">{prettyDate(article.data.pubDate)} · {readingTime?.text} min read · <span className="rounded-full bg-slate-200 dark:bg-slate-800 p-2 whitespace-nowrap">{category?.name}</span></span>
          </Text>
        </span>
      </article>
    </a>
  )
}