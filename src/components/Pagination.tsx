import FAB from "./FAB"
import { useButtonSound } from "./hooks/useButtonSound"
import Icon from "./Icon"

export type PaginationProps = {
  prevHref?: string
  nextHref?: string
}

export const Pagination: React.FC<PaginationProps> = ({ prevHref, nextHref }) => {
  const [play] = useButtonSound()

  return (
    <FAB direction='vertical' stick='top'>
      <a href={prevHref} role={!prevHref ? 'button' : 'link'}>
        <FAB.Button disabled={!prevHref} onClick={prevHref ? play : undefined}>
          <Icon name="chevron-up" size='md' />
        </FAB.Button>
      </a>
      <a href={nextHref} role={!nextHref ? 'button' : 'link'}>
        <FAB.Button disabled={!nextHref} onClick={nextHref ? play : undefined}>
          <Icon name="chevron-down" size='md' />
        </FAB.Button>
      </a>
    </FAB>
  )
}