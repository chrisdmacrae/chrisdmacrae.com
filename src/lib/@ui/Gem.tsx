import type { ReactElement, ReactNode } from "react"
import { Icon, IconName } from "./Icon"
import Text from './typography/Text'

export type GemColor = 'primary' | 'success' | 'warning' | 'info'

export type GemProps = {
  label: string
  icon: IconName
  color?: GemColor
}

export const Gem: React.FC<GemProps> = ({ label, icon, color = 'primary' }) => {
  let classes = ['text-white w-32 h-32 rounded-lg border drop-shadow-md ring-1  flex flex-row items-center justify-center']

  classes.push(getGradient(color))

  return (
    <div className="flex flex-col gap-2 basis-32 shrink-0 grow-0">
    <div
      className={classes.join(' ')}
    >
      <Icon name={icon} size="xl" />
    </div>
    <Text color="muted">
      {label}
    </Text>
  </div>
  )
}

function getGradient(color: GemColor) {
  switch(color) {
    case 'primary':
      return 'ring-purple-300 dark:ring-transparent border-purple-200 dark:border-transparent bg-gradient-to-br from-purple-400 hover:from-purple-500 to-pink-600 hover:to-pink-700 transition-all'
    case 'success':
      return 'ring-green-300 dark:ring-transparent border-green-200 dark:border-transparent bg-gradient-to-br from-green-400 to-cyan-600'
    case 'warning':
      return 'ring-amber-300 dark:ring-transparent border-amber-200 dark:border-transparent bg-gradient-to-br bg-gradient-to-r from-yellow-400 to-amber-600'
    case 'info':
      return 'ring-blue-300 dark:ring-transparent border-blue-200 dark:border-transparent bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-300 dark:to-indigo-400'
  }
}

export default Gem
