import React, { HTMLAttributes, ReactNode, RefObject, useRef } from 'react'
import { useDialog, useOverlay, FocusScope, useId } from 'react-aria'
import { DialogPortal } from './DialogPortal'

export type DialogProps<IsAlert = boolean> = {
  children: (props: DialogRenderChildrenProps) => ReactNode
  autoFocus?: boolean
  isOpen?: boolean
  isAlert?: IsAlert
  isDismissable?: IsAlert extends true ? never : boolean
  onClose?: () => void
}

export type DialogRenderChildrenProps = {
  titleProps: Omit<HTMLAttributes<HTMLElement>, 'css'>
  dialogProps: Omit<HTMLAttributes<HTMLElement>, 'css'>
  underlayProps: Omit<HTMLAttributes<HTMLElement>, 'css'>
  dialogRef: RefObject<any>
}

/**
 * Renders an on-screen overlay that does not prevent
 * interaction with the rest of the page.
 * Think: dismissable popup windows, drawers, etc
 *
 * @param props
 * @returns
 */
export const Dialog: React.FC<DialogProps> = (props) => {
  const { isOpen, isAlert, isDismissable, autoFocus, children } = props
  const ref = useRef<HTMLElement | null>(null)
  const id = useId('cgc-dialog-' + Date.now().toString())
  const { overlayProps, underlayProps } = useOverlay(
    {
      ...props,
      isDismissable: isAlert === true ? false : isDismissable,
      isKeyboardDismissDisabled: isAlert === true ? true : !isDismissable,
    },
    ref
  )
  const { dialogProps, titleProps } = useDialog(
    { ...props, role: isAlert ? 'alertdialog' : 'dialog', 'aria-labelledby': id },
    ref
  )

  if (isOpen) {
    return (
      <DialogPortal>
        <div id={id}>
          <FocusScope autoFocus={autoFocus}>
            {children({
              titleProps: { ...titleProps, id },
              dialogProps: { ...overlayProps, ...dialogProps },
              dialogRef: ref,
              underlayProps,
            })}
          </FocusScope>
        </div>
      </DialogPortal>
    )
  }

  return null
}

Dialog.defaultProps = {
  isOpen: false,
  isDismissable: true,
}
