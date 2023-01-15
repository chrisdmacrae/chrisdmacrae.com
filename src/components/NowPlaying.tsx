import Icon from './Icon'
import Text from './typography/Text'

export const NowPlaying = () => {
  return (
    <Text>
      <Icon name='disc' className="inline-block motion-safe:animate-spin" />
      I'm currently listening to:
      <Icon name='dots' className="inline-block animate-bounce" />
    </Text>
  )
}