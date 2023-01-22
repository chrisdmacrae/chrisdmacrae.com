import { Search } from './Search'

export { Search, useSearch } from './Search'

export type SearchResult = {
  title: string
  description: string
  url?: string
  event?: string
}

export default Search