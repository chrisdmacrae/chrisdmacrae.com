import type { Article } from "../content/articles"
import { categories } from "../content/articles/_categories"
import { prettyDate } from "../lib/prettyDate"
import Card from "../lib/@ui/Card"
import Heading from "../lib/@ui/typography/Heading"
import Text from "../lib/@ui/typography/Text"

export type CardArticleProps = {
  article: Article
  readingTime: Record<string, any>
}

export const CardArticle: React.FC<CardArticleProps> = ({ article, readingTime }) => {
  const category = categories.find(category => category.slug === article.data.category)

  return (
    <a href={article.slug} data-astro-prefetch="viewport">
      <article>
        <Card variant="bubble">
          <Heading as='h2' size={4}>
            {article.data.title}
          </Heading>
          <Text>
            {article.data.description}
          </Text>
          <Text color='muted'>
            <span className="leading-10 break-keep">{prettyDate(article.data.pubDate)} · {readingTime?.text} min read · <span className="rounded-full bg-slate-200 dark:bg-slate-800 p-2 whitespace-nowrap">{category?.name}</span></span>
          </Text>
        </Card>
      </article>
    </a>
  )
}