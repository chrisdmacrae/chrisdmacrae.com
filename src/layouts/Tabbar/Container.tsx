import type { PropsWithChildren } from "react"
import { useLayout } from "./Layout"

export type ContainerProps = PropsWithChildren

export const Container: React.FC<ContainerProps> = ({ children }) => {
  let classes = ["h-16 py-2 fixed z-30 bottom-0 left-0 right-0 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-row justify-around items-center shadow-md"]
  const {sm, md, lg} = useLayout()

  classes.push(getBreakpoints(sm, md, lg))

  return (
    <nav className={classes.join(' ')}>
      {children}
    </nav>
  )
}

function getBreakpoints(sm: boolean, md: boolean, lg: boolean) {
  let classes = []

  if (!sm) classes.push('sm:hidden')
  if (!md) classes.push('md:hidden')
  if (!lg) classes.push('lg:hidden')

  return classes.join(' ')
}