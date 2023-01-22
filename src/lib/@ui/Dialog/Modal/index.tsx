import type { HTMLAttributes, ReactNode, RefObject } from 'react'
import { usePreventScroll, useModal } from 'react-aria'
import { DialogModalContext, useModalDialog } from './ModalContext'
import { Dialog, DialogProps } from '../Dialog'

export type ModalProps = Omit<DialogProps, 'children'> & {
  children: (props: ModalRenderChildrenProps) => ReactNode
}

export type ModalRenderChildrenProps = {
  titleProps: Omit<HTMLAttributes<HTMLElement>, 'css'>
  modalProps: Omit<HTMLAttributes<HTMLElement>, 'css'>
  modalRef: RefObject<any>
}

/**
 * Renders an on-screen overlay that prevents
 * interaction with the rest of the page.
 * Think: confirmation modals, warning/error alerts, etc
 *
 * @param props
 * @returns
 */
export const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  const { id: parentId } = useModalDialog()

  return (
    <Dialog {...props}>
      {({ titleProps, dialogProps, underlayProps, dialogRef }) => (
        <DialogModalContext value={{ id: dialogProps['aria-labelledby']!, parent: parentId }}>
          <div className="flex flex-col items-center justify-center fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.2)]" {...underlayProps}>
            <ScrollHandler>
              {({ modalProps }) =>
                children({
                  titleProps: { ...titleProps, tabIndex: 0 },
                  modalProps: { ...dialogProps, ...modalProps },
                  modalRef: dialogRef,
                })
              }
            </ScrollHandler>
          </div>
        </DialogModalContext>
      )}
    </Dialog>
  )
}

const ScrollHandler = ({ children }: { children(modalProps: any): ReactNode }) => {
  const { parent } = useModalDialog()
  const isDisabled = parent !== 'root'
  const { modalProps } = useModal({ isDisabled })

  usePreventScroll({ isDisabled })

  return <>{children({ modalProps })}</>
}

Modal.defaultProps = {
  autoFocus: true,
}
