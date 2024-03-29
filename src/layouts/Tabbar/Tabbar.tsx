import { useSearch } from "../../components/Search"
import { Button } from "./Button"
import { Container } from "./Container"


export const TabBar: React.FC = () => {
  const [toggleSearch] = useSearch()

  return (
    <Container>
      <a href="/">
        <Button icon='home'>
          Home
        </Button>
      </a>
      <a href="/articles/all">
        <Button icon='article'>
          Articles
        </Button>
      </a>
      <a href="/about">
        <Button icon='user-circle'>
          About
        </Button>
      </a>
      <Button icon='search' onClick={toggleSearch}>
        Search
      </Button>
    </Container>
  )
}