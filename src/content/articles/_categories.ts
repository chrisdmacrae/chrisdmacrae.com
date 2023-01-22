export type Category = {
  name: string
  slug: string
  icon: string
  color: 'primary' | 'success' | 'warning' | 'info'
  featuredHref?: string
  homepage?: boolean
}

export const categories: Category[] = [
  {
    name: "Engineering Management",
    slug: "engineering-management",
    icon: "code",
    color: 'primary',
    homepage: true
  },
  {
    name: "Design Management",
    slug: "design-management",
    icon: "box-align-bottom-left",
    color: 'success',
    homepage: true

  },
  {
    name: "Web Development",
    slug: "web-development",
    icon: "box-model-2",
    color: 'info',
    featuredHref: "/web-development",
    homepage: true

  },
  {
    name: "Systems Thinking",
    slug: "systems-thinking",
    icon: "schema",
    color: 'warning',
    homepage: true
  },
  {
    name: "All Articles",
    slug: "all",
    icon: "article",
    color: "warning",
    featuredHref: "/articles/all"
  }
]

export default categories