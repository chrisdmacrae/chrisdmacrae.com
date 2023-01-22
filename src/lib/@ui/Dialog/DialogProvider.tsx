import React from 'react'
import { SSRProvider } from 'react-aria'
import { ModalProviderProps, OverlayProvider } from '@react-aria/overlays'

export const DialogProvider: React.FC<ModalProviderProps> = ({ children, ...props }) => {
  return (
    <SSRProvider>
      <OverlayProvider {...props}>{children}</OverlayProvider>
    </SSRProvider>
  )
}
