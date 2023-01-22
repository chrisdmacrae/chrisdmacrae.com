import type { HTMLAttributes, PropsWithChildren } from "react"
import { useButtonSound } from "../../lib/hooks/useButtonSound"
import { useVolume } from "../../lib/hooks/useVolume"
import { Icon, IconName } from "../../lib/@ui/Icon"

export type ButtonProps = PropsWithChildren & Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  icon: IconName
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({ icon, children, onClick: propOnClick, ...props }) => {
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
      <Icon name={icon} size='md' />
      {children}
    </button>
  )
}