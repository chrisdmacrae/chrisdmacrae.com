import React from 'react'
import { ModalProviderProps, OverlayProvider, SSRProvider } from 'react-aria'

export const DialogProvider: React.FC<ModalProviderProps> = ({ children, ...props }) => {
  return (
    <SSRProvider>
      <OverlayProvider {...props}>{children}</OverlayProvider>
    </SSRProvider>
  )
}
