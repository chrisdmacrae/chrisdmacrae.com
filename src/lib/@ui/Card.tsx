import type { PropsWithChildren } from "react";

export type CardVariant = 'paper' | 'bubble'

export type CardProps<Variant = CardVariant> = PropsWithChildren & {
  variant?: CardVariant
} & (
  Variant extends 'paper' ? CardPaperProps : & 
  Variant extends 'bubble' ? CardBubbleProps : never)

export const Card: React.FC<CardProps> = ({variant = 'paper', ...props}) => {
    if (variant === 'bubble') {
      return <CardBubble {...props} />
    }

    return <CardPaper {...props} />
}

type CardPaperProps = PropsWithChildren

const CardPaper: React.FC<CardPaperProps> = ({ children }) => (
  <div className="w-full bg-slate-50 dark:bg-slate-800 overflow-hidden rounded-md border-1 border-white dark:border-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 shadow-md dark:drop-shadow-md p-3">
    {children}
  </div>
)

type CardBubbleProps = PropsWithChildren & {
  active?: boolean
}

const CardBubble: React.FC<CardBubbleProps> = ({ active, children }) => {
  let classes = ["absolute z-0 inset-1 group-hover:-inset-1 group-active:-inset-1 rounded-2xl bg-slate-200 dark:bg-slate-800 group-hover:opacity-100 group-active:opacity-100 transition-all duration-200 ease-bounce"]

  if (active) classes.push('opacity-100')
  else classes.push('opacity-0') 

  return (
    <div className="z-0 group relative flex flex-col gap-2 p-6">
      <span className={classes.join(' ')} />
      <span className="relative z-10">
        {children}
      </span>
    </div>
  )
}

export default Card