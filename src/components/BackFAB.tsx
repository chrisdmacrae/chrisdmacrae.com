import { useEffect, useState } from "react"
import FAB from "./FAB"
import Icon from "./Icon"

export type BackFABProps = {
  defaultHref?: string
}

export const BackFAB: React.FC<BackFABProps> = ({ defaultHref }) => {
  const [canGoBack, setCanGoBack] = useState(defaultHref !== undefined)
  const goBack = () => {
    if (document.referrer.includes(window.location.host)) {
      history.back()
    } else if (defaultHref) {
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
      <FAB.Button onClick={goBack}>
        <Icon name="chevron-left" size='md' />
      </FAB.Button>
    </FAB>
  )
}