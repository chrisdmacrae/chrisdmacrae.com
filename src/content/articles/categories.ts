export type Category = {
  name: string
  slug: string
  icon: string
  color: 'primary' | 'success' | 'warning' | 'info'
  featured?: boolean
}

export const categories: Category[] = [
  {
    name: "Engineering Management",
    slug: "engineering-management",
    icon: "code",
    color: 'primary',
    featured: true
  },
  {
    name: "Design Management",
    slug: "design-management",
    icon: "box-align-bottom-left",
    color: 'success',
    featured: true
  },
  {
    name: "Web Development",
    slug: "web-development",
    icon: "box-model-2",
    color: 'info',
    featured: true
  },
  {
    name: "Systems Thinking",
    slug: "systems-thinking",
    icon: "schema",
    color: 'warning',
    featured: true
  },
  {
    name: "Opinions",
    slug: "opinions",
    icon: "bulb",
    color: 'warning'
  },
  {
    name: "All",
    slug: "all",
    icon: "article",
    color: "warning"
  }
]

export default categories