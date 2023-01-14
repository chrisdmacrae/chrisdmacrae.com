import type { HTMLAttributes, PropsWithChildren, ReactElement } from "react"
import { useButtonSound } from "../../components/hooks/useButtonSound"
import { useVolume } from "../../components/hooks/useVolume"

export type ButtonProps = PropsWithChildren & Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  Icon: ({ className }: any) => ReactElement<any, any> | null
  onClick: () => void
}

export const Button: React.FC<ButtonProps> = ({ Icon, children, onClick: propOnClick, ...props }) => {
  const [volume] = useVolume()
  const [buttonSound] = useButtonSound()
  const onClick = () => {
    if (volume) buttonSound()
    if (propOnClick) propOnClick()
  }

  return (
    <button 
      {...props}
      onClick={onClick}
      className="flex flex-col justify-center items-center w-32 h-32 text-slate-500 hover:text-slate-400 active:text-slate-500 dark:text-slate-200 dark:hover:text-slate-50 dark:active:text-slate-50"
    >
      <Icon className="w-6 h-6" />
      {children}
    </button>
  )
}