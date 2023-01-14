import { IconHome, IconSearch } from "@tabler/icons"
import { useSearch } from "../../components/Search"
import { Button } from "./Button"
import { Container } from "./Container"


export const TabBar: React.FC = () => {
  const [toggleSearch] = useSearch()

  return (
    <Container>
      <a href="/">
        <Button Icon={IconHome}>
          Home
        </Button>
      </a>
      <Button Icon={IconSearch} onClick={toggleSearch}>
        Search
      </Button>
    </Container>
  )
}