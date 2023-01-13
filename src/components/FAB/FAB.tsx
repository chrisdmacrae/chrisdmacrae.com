import type { PropsWithChildren } from "react";

export type FABDirection = 'horizontal' | 'vertical'

export type FABProps = {
  direction?: FABDirection
} & PropsWithChildren

export const FAB: React.FC<FABProps> = ({direction = 'horizontal', children}) => {
  let classes = ["rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border-1 border-white dark:border-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 shadow-md dark:drop-shadow-md"]

  classes.push(getDirection(direction))

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

export default FAB