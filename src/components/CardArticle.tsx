import type { MarkdownContent } from "astro"
import type { Category } from "../content/articles/categories"
import { prettyDate } from "../lib/prettyDate"
import Heading from "./typography/Heading"
import Text from "./typography/Text"

export type Article = any

export type CardArticleProps = {
  article: Article
  category: Category
}

export const CardArticle: React.FC<CardArticleProps> =({ article, category }) => (
  <a href={`/articles/${article.frontmatter.category}/${article.slug}`}>
    <article className="flex flex-col gap-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 dark:active:bg-slate-800 p-6">
      <Heading as='h2' size={4}>
        {article.frontmatter.title}
      </Heading>
      <Text>
        {article.frontmatter.description}
      </Text>
      <Text color='muted'>
        <span className="leading-10 break-keep">{prettyDate(article.frontmatter.created)} · {article.readingTime.text} min read · <a href={`/articles/${category.slug}`}><span className="rounded-full bg-slate-200 dark:bg-slate-800 p-2 whitespace-nowrap">{category?.name}</span></a></span>
      </Text>
    </article>
  </a>
)