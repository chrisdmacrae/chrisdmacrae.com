import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export type DialogPortalProps = {
  portalId?: string
}

export const DialogPortal: React.FC<DialogPortalProps> = ({ portalId = 'dialogs', children }) => {
  const [containerNode, setContainerNode] = useState()

  const setContainerNodeRef = useCallback((node) => {
    if (node !== null) {
      setContainerNode(node)
    }
  }, [])

  useEffect(() => {
    let container = document.getElementById(portalId)
    if (!container) {
      container = document.createElement('div')
      container.setAttribute('id', portalId)

      document.body.appendChild(container)
    }

    setContainerNodeRef(container)

    return () => {
      if (container?.childNodes.length === 1) {
        container!.remove()
      }
    }
  }, [setContainerNode])

  return containerNode ? createPortal(children, containerNode) : null
}
