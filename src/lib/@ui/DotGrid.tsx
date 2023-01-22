import type { PropsWithChildren } from "react"

export type DotGridSize = 'fit' | 'full' | 'screen'

export type DotGridProps = {
  size: DotGridSize
} & PropsWithChildren

export const DotGrid: React.FC<DotGridProps> = ({size = 'full', children}) => {
  let classes = ['flex flex-col justify-between p-5 border-[1rem] border-slate-100 dark:border-slate-900 bg-dots-slate-200 dark:bg-dots-slate-800']

  classes.push(getSize(size))

  return (
    <div className={classes.join(' ')}>
      {children}
    </div>
  )
}

function getSize(size: DotGridSize) {
  switch (size) {
    case 'fit':
      return 'w-fit h-fit'
    case 'full':
      return 'w-full h-full'
    case 'screen':
      return 'w-full min-h-[calc(100vh-6.25rem)] lg:min-h-[calc(100vh-2.25rem)]'
  }
}

export default DotGrid