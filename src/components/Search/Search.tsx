import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react"
import { Container } from "./Container"
import { Input } from "./Input"
import Icon from "../../lib/@ui/Icon"
import type { SearchResult } from "."
import Text from "../../lib/@ui/typography/Text"

export const SEARCH_EVENT = 'search.toggle'

export const useSearch = () => {
  const toggleSearch = () => {
    const event = new CustomEvent(SEARCH_EVENT)
    document.dispatchEvent(event)
  }

  return [toggleSearch] as const
}

export type SearchProps = {
  results: SearchResult[]
}

export const Search: React.FC<SearchProps> = ({ results: propResults }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleOpen = () => setIsOpen(!isOpen)
  const [results, setResults] = useState(propResults)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value?.length > 0) {
      setResults([])
    } else {
      setResults(propResults)
    }
  }

  useEffect(() => {
    let toggleSearch = () => {
      toggleOpen()
    }
    
    document.addEventListener(SEARCH_EVENT, toggleSearch)
  }, [])

  return (
    <Container isOpen={isOpen} onClose={() => toggleOpen()}>
      {({titleProps}) => (
        <>
          <div className="flex flex-row items-center gap-2 pr-2 pb-1 border-b border-slate-200 dark:border-slate-800">
            <Input onChange={onChange} placeholder="Search the site..." {...titleProps} />
            <button onClick={toggleOpen}>
              <Icon name='x' size='md' />
            </button>
          </div>
          <div className="flex flex-row items-center gap-2 p-4">
            {results.map(result => (
              <Result {...result} />
            ))}
            {!results && (
              <Text color="muted">No results</Text>
            )}
          </div>
        </>
      )}
    </Container>
  )
}

const Result: React.FC<SearchResult> = ({ url, event, ...props }) => {
  const open = () =>  {
    if (event) {
      const customEvent = new CustomEvent(event)

      window.dispatchEvent(customEvent)
    }
    else if (url) window.location.href = url
  }
  const trigger = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') open()
  }, [url])
  const onFocus = () => {
    window.addEventListener('keydown', trigger)
  }
  const onBlur = () => {
    window.removeEventListener('keydown', trigger)
  }

  if (!event && url) {
    <a href={url} onFocus={onFocus} onBlur={onBlur} tabIndex={0} className="w-full">
      <ResultUI {...props} /> 
    </a>
  }

  return (
    <div onClick={open} onFocus={onFocus} onBlur={onBlur} tabIndex={0} className="w-full">
      <ResultUI {...props} />
    </div>
  )
}

const ResultUI: React.FC<SearchResult> = ({ title, description }) => (
  <div className="z-0 group relative flex flex-col w-full gap-2 p-6 cursor-pointer">
    <span className="absolute z-0 inset-1 group-hover:-inset-1 group-active:-inset-1 rounded-2xl bg-slate-200 dark:bg-slate-800 group-hover:opacity-100 group-active:opacity-100 transition-all duration-200 ease-bounce" />
    <span className="relative z-10">
      <Text><strong>{title}</strong></Text>
      <Text color="muted">{description}</Text>
    </span>
  </div>
)