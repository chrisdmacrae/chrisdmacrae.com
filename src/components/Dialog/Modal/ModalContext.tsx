import { createContext, useContext } from 'react'

export type ModalContext = {
  id: string
  parent?: string
}

const Context = createContext<ModalContext>({
  id: 'root',
})

export const useModalDialog = () => useContext(Context)

export const DialogModalContext = Context.Provider
