// The categories themselves live in src/content/categories/*.json, where the
// CMS edits them. They're read with an eager glob rather than getCollection so
// this module stays synchronous: React components and getStaticPaths import it
// directly.
export type Category = {
  name: string
  slug: string
  icon: string
  color: 'primary' | 'success' | 'warning' | 'info'
  featuredHref?: string
  homepage?: boolean
  order?: number
}

const files = import.meta.glob<Category>('../categories/*.json', { eager: true, import: 'default' })

export const categories: Category[] = Object.values(files)
  .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))

export default categories
