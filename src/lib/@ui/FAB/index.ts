import { FAB as FABComponent } from './FAB'
import { Button as ButtonComponent } from './Button'

export type { FABDirection, FABStick } from './FAB'

export type FABShape = typeof FABComponent & {
  Button: typeof ButtonComponent
}

export const FAB = FABComponent as FABShape

FAB.Button = ButtonComponent

export default FAB