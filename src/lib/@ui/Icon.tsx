export type IconName = string
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type IconProps = {
  name: IconName
  size?: IconSize
}

export const Icon: React.FC<IconProps> = ({ name, size = 'xs' }) => {
  let classes = [`ti ti-${name} inline-flex flex-col justify-center items-center`]

  classes.push(getSize(size))

  return (
    <i className={classes.join(' ')} />
  )
}

function getSize(size: IconSize) {
  switch(size) {
    case 'sm':
      return 'w-6 h-6 text-lg'
    case 'md':
        return 'w-8 h-8 text-xl'
    case 'lg':
      return 'w-10 h-10 text-2xl'
    case 'xl':
      return 'w-12 h-12 text-3xl'
    default:
      return 'w-4 h-4 text-md'
  }
}

export default Icon