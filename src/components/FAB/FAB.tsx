import type { PropsWithChildren } from "react";

export type FABProps = PropsWithChildren

export const FAB: React.FC<FABProps> = ({children}) => {
  let classes = ["w-fit sticky top-0 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border-1 border-white dark:border-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 shadow-md dark:drop-shadow-md"]

  return (
    <aside className={classes.join(" ")}>
      {children}
    </aside>
  )
}

export default FAB