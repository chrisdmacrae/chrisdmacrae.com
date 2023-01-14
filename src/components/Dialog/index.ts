import { Dialog as DialogComponent } from './Dialog'
import { Modal as ModalComponent } from './Modal'
import { DialogProvider } from './DialogProvider'

type DialogTypes = typeof DialogComponent & {
  Modal: typeof ModalComponent
  Provider: typeof DialogProvider
}

export type { DialogProps } from './Dialog'
export type { ModalProps } from './Modal'
export const Dialog = DialogComponent as DialogTypes
Dialog.Modal = ModalComponent
Dialog.Modal.displayName = 'Dialog.Modal'
Dialog.Provider = DialogProvider
Dialog.Provider.displayName = 'Dialog.Provider'
