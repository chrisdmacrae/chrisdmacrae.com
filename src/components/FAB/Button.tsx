import type { HTMLAttributes, PropsWithChildren } from "react";

export type ButtonProps = Omit<HTMLAttributes<HTMLButtonElement>, 'className'> & PropsWithChildren

export const Button: React.FC<ButtonProps> = ({children, ...props}) => {
  let classes = ['flex flex-col justify-center items-center rounded-full w-[2.5rem] h-[2.5rem] md:w-[3rem] md:h-[3rem] p-2 bg-slate-100 text-slate-600 dark:text-slate-500 hover:bg-slate-50 active:bg-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-slate-600 overflow-hidden']

  return (
    <button className={classes.join(" ")} {...props}>
      {children}
    </button>
  )
}