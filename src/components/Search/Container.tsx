import type { PropsWithChildren } from "react"
import { Dialog } from "../Dialog"

export type ContainerProps = PropsWithChildren & {
  isOpen: boolean
  onClose: () => void
}

export const Container: React.FC<ContainerProps> = ({ isOpen, onClose, children }) => {
  return (
    <Dialog.Provider>
      <Dialog.Modal isOpen={isOpen} onClose={onClose} isDismissable>
        {({ modalProps, titleProps }) => (
            <div className="relative -top-32 w-full p-4 flex flex-col justify-center items-center">
              <div className="w-full max-w-[45rem] rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800" {...modalProps}>
                {children}
              </div>
            </div>
        )}
      </Dialog.Modal>
    </Dialog.Provider>
  )
}