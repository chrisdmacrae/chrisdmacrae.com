import type { PropsWithChildren } from "react"

export type DisclaimerType = 'primary' | 'success' | 'warning' | 'info'

export type DisclaimerProps = PropsWithChildren & {
  type: DisclaimerType
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ children, type = 'info' }) => {
  let classes = ["rounded-md p-4 border-l-4 border bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"]

  classes.push(getType(type))

  return (
    <aside className={classes.join(' ')}>
      {children}
    </aside>
  )
}

function getType(type: DisclaimerType) {
  switch(type) {
    case 'primary':
      return 'border-l-purple-500 dark:border-l-purple-500'
    case 'success':
      return 'border-l-green-500 dark:border-l-green-500'
    case 'warning':
      return 'border-l-amber-500 dark:border-l-amber-500'
    case 'info':
      return 'border-l-blue-500 dark:border-l-blue-500'
  }
}

export default Disclaimer