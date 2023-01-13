import type { PropsWithChildren } from "react"

export type LinkProps = {
  href: string
} & PropsWithChildren

export const Link: React.FC<LinkProps> = ({href, children}) => {
  let classes = ["flex flex-row gap-2 rounded-md p-2 text-blue-600 dark:text-sky-400 hover:bg-slate-200 active:bg-slate-300 dark:hover:bg-slate-700 dark:active:bg-slate-600"]

  return (
    <a href={href} className={classes.join(" ")}>
      {children}
    </a>
  )
}