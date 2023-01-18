import type { PropsWithChildren } from "react"

export type LinkProps = {
  href: string
  active?: boolean
} & PropsWithChildren

export const Link: React.FC<LinkProps> = ({href, active, children}) => {
  let classes = ["group relative z-0 flex flex-row items-center gap-2 p-2 text-blue-600 dark:text-sky-400"]
  let bgClasses = ["absolute z-0 inset-1 group-hover:-inset-1 group-active:-inset-1 rounded-md group-hover:bg-slate-200 group-active:bg-slate-300 dark:group-hover:bg-slate-700 dark:group-active:bg-slate-600 group-hover:opacity-100 group-active:opacity-100 transition-all duration-200 ease-bounce"]

  if (active) bgClasses.push("-inset-1 bg-slate-200")
  else bgClasses.push("opacity-0")

  return (
    <a href={href}>
      <div className={classes.join(" ")}>
        <span className={bgClasses.join(" ")} />
        <span className="relative z-10">
          {children}
        </span>
      </div>
    </a>
  )
}