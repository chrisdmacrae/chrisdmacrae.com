import type { HTMLAttributes, PropsWithChildren } from "react";

export type ButtonColor = 'primary' | 'light' | 'dark' | 'muted'

export type ButtonProps = Omit<HTMLAttributes<HTMLButtonElement>, 'className'> & PropsWithChildren & {
  label?: string
  color?: ButtonColor
  fluid?: boolean
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({label, color = 'light', fluid = false, disabled, children, ...props}) => {
  let classes = ['flex flex-row shrink-0 grow-0 gap-2 justify-center items-center rounded-full h-[2.5rem] md:h-[3rem] p-2 overflow-hidden']

  classes.push(getColor(color))

  if (fluid) classes.push('px-4')
  else classes.push('w-[2.5rem] md:w-[3rem]')

  return (
    <button className={classes.join(" ")}  disabled={disabled} {...props}>
      {children}
      {label && (<span className="sr-only">{label}</span>)}
    </button>
  )
}

function getColor(color: ButtonColor) {
  switch (color) {
    case 'light':
      return 'bg-slate-100 text-slate-600 disabled:text-slate-400 dark:disabled:text-slate-700 dark:text-slate-500 hover:bg-slate-50 active:bg-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-slate-600'
    case 'dark':
      return 'bg-slate-600 dark:bg-slate-100 text-slate-50 disabled:text-slate-700 dark:disabled:text-slate-400 dark:text-slate-600 hover:bg-slate-700 dark:hover:bg-slate-50 active:bg-slate-600 dark:active:bg-white'
    case 'primary':
      return 'bg-purple-500 text-slate-50 disabled:text-slate-purple-50 hover:bg-purple-400 active:bg-purple-400'
    case 'muted':
      return 'bg-slate-200 dark:bg-slate-800 text-slate-600 disabled:text-slate-300 dark:text-slate-400 dark:disabled:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-500 active:bg-white dark:hover:bg-slate-500'
  }
}