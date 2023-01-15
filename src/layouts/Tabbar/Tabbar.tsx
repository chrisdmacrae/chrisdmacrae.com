import { IconHome, IconSearch } from "@tabler/icons"
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
      <Button icon='search' onClick={toggleSearch}>
        Search
      </Button>
    </Container>
  )
}