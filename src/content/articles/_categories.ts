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
    featuredHref: "/engineering-management",
    homepage: true
  },
  {
    name: "Design Management",
    slug: "design-management",
    icon: "box-align-bottom-left",
    color: 'success',
    featuredHref: "/design-management",
    homepage: true

  },
  {
    name: "Web Development",
    slug: "web-development",
    icon: "box-model-2",
    color: 'info',
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
    name: "All",
    slug: "all",
    icon: "article",
    color: "warning"
  }
]

export default categories