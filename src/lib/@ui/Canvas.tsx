import type { CSSProperties, PropsWithChildren } from "react"

export type CanvasProps = PropsWithChildren

export const Canvas: React.FC<CanvasProps> = ({children}) => {
  let classes = ['w-full flex flex-col justify-between rounded-lg border border-slate-200 dark:border-slate-700 bg-[length:2rem_2rem] bg-origin-border bg-[linear-gradient(to_right,_var(--canvas-color)_1px,_transparent_1px),_linear-gradient(to_bottom,_var(--canvas-color)_1px,_transparent_1px)] dark:bg-[linear-gradient(to_right,_var(--canvas-color-dark)_1px,_transparent_1px),_linear-gradient(to_bottom,_var(--canvas-color-dark)_1px,_transparent_1px)]']
  let vars = '[--canvas-color:var(--tw-color-slate-200)] [--canvas-color-dark:var(--tw-color-slate-700)]'

  classes.push(vars)

  return (
    <figure>
      <div className={classes.join(' ')}>
        <div className="w-full flex flex-col justify-center items-center p-6 md:p-16">
          {children}
        </div>
      </div>
    </figure>
  )
}

export default Canvas