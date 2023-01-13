import type { PropsWithChildren } from "react"

export type LinkProps = {
  href: string
} & PropsWithChildren

export const Link: React.FC<LinkProps> = ({href, children}) => {
  let classes = ["rounded-md p-2 text-slate-600 dark:text-slate-400 bg-slate-200 hover:bg-slate-50 active:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-slate-700"]

  return (
    <a href={href} className={classes.join(" ")}>
      {children}
    </a>
  )
}