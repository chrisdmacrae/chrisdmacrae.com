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
    name: "All Articles",
    slug: "all",
    icon: "article",
    color: "warning",
    featuredHref: "/articles/all"
  },
  {
    name: "Software Engineering",
    slug: "software-engineering",
    icon: "code",
    color: 'primary',
    homepage: true
  },
  {
    name: "Software Design",
    slug: "software-design",
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
    name: "Writing",
    slug: "writing",
    icon: "pencil",
    color: "warning"
  }
]

export default categories