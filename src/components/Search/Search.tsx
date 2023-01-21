import { useEffect, useState } from "react"
import { Container } from "./Container"
import { Input } from "./Input"
import Text from '../typography/Text'
import Icon from "../Icon"

export const SEARCH_EVENT = 'search.toggle'

export const useSearch = () => {
  const toggleSearch = () => {
    const event = new CustomEvent(SEARCH_EVENT)
    document.dispatchEvent(event)
  }

  return [toggleSearch] as const
}

export const Search: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleOpen = () => setIsOpen(!isOpen)

  useEffect(() => {
    let cb = () => {
      toggleOpen()
    }
    
    document.addEventListener(SEARCH_EVENT, cb)
  }, [])

  return (
    <Container isOpen={isOpen} onClose={() => toggleOpen()}>
      {({titleProps}) => (
        <>
          <div className="flex flex-row items-center gap-2 pr-2 pb-1 border-b border-slate-200 dark:border-slate-800">
            <Input {...titleProps} />
            <button onClick={toggleOpen}>
              <Icon name='x' size='md' />
            </button>
          </div>
          <div className="flex flex-row items-center gap-2 p-4">
            <Text color='muted'>
              No results
            </Text>
          </div>
        </>
      )}
    </Container>
  )
}