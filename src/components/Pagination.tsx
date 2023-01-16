import FAB from "./FAB"
import type { FABDirection } from "./FAB/FAB"
import { useButtonSound } from "./hooks/useButtonSound"
import Icon from "./Icon"

export type PaginationProps = {
  prevHref?: string
  nextHref?: string
  direction?: FABDirection
}

export const Pagination: React.FC<PaginationProps> = ({ prevHref, nextHref, direction = 'vertical' }) => {
  const [play] = useButtonSound()

  return (
    <FAB direction={direction} stick='top'>
      <a href={prevHref} role={!prevHref ? 'button' : 'link'}>
        <FAB.Button label="Previous article" disabled={!prevHref} onClick={prevHref ? play : undefined}>
          <Icon name="chevron-up" size='md' />
        </FAB.Button>
      </a>
      <a href={nextHref} role={!nextHref ? 'button' : 'link'}>
        <FAB.Button label="Next article" disabled={!nextHref} onClick={nextHref ? play : undefined}>
          <Icon name="chevron-down" size='md' />
        </FAB.Button>
      </a>
    </FAB>
  )
}