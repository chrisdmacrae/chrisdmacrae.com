import { useEffect, useState } from "react"
import FAB from "../lib/@ui/FAB"
import { useButtonSound } from "../lib/hooks/useButtonSound"
import Icon from "../lib/@ui/Icon"

export type BackFABProps = {
  defaultHref?: string
}

export const BackFAB: React.FC<BackFABProps> = ({ defaultHref }) => {
  const [play] = useButtonSound()
  const [canGoBack, setCanGoBack] = useState(defaultHref !== undefined)
  const goBack = () => {
    if (document.referrer.includes(window.location.host)) {
      play()
      history.back()
    } else if (defaultHref) {
      play()
      window.location.href = defaultHref
    }
  }

  useEffect(() => {
    if (document.referrer.includes(window.location.host)) {
      setCanGoBack(true)
    }
  }, [])


  if (!canGoBack) {
    return <div />
  }

  return (
    <FAB direction='horizontal'>
      <FAB.Button label="Go back" onClick={goBack}>
        <Icon name="chevron-left" size='md' />
      </FAB.Button>
    </FAB>
  )
}