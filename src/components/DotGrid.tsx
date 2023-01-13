import type { PropsWithChildren } from "react"

export type DotGridProps = PropsWithChildren

export const DotGrid: React.FC<DotGridProps> = ({children}) => {
  return (
    <div className="w-full p-5 border-[1rem] border-slate-100 dark:border-slate-900 bg-dots-slate-200 dark:bg-dots-slate-800">
      {children}
    </div>
  )
}

export default DotGrid