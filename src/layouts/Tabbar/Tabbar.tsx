import { IconHome, IconSearch } from "@tabler/icons"
import { Button } from "./Button"
import { Container } from "./Container"


export const TabBar: React.FC = () => {
  return (
    <Container>
      <Button Icon={IconHome}>
        Home
      </Button>
      <Button Icon={IconSearch}>
        Search
      </Button>
    </Container>
  )
}