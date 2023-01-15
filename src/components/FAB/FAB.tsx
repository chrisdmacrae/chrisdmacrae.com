import type { PropsWithChildren } from "react";

export type FABDirection = 'horizontal' | 'vertical'
export type FABStick = 'top' | 'bottom' | false

export type FABProps = {
  direction?: FABDirection
  stick?: FABStick
} & PropsWithChildren

export const FAB: React.FC<FABProps> = ({direction = 'horizontal', stick = false, children}) => {
  let classes = ["w-[max-content] rounded-full gap-2 bg-slate-100 dark:bg-slate-800 overflow-hidden border-1 border-white dark:border-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 shadow-md dark:drop-shadow-md"]

  classes.push(getDirection(direction))
  classes.push(getStick(stick))

  return (
    <aside className={classes.join(" ")}>
      {children}
    </aside>
  )
}

function getDirection(direction: FABDirection) {
  switch (direction) {
    case 'horizontal':
      return 'flex flex-row'
    case 'vertical':
      return 'flex flex-col'
  }
}

function getStick(stick: FABStick) {
  switch (stick) {
    case 'top':
      return 'sticky top-0'
    case 'bottom':
      return 'sticky bottom-0'
    case false:
      return ''
  }
}

export default FAB