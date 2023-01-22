import { Code as CodeComponent } from './Code'
import { Block } from './Tab'

export type CodeShape = typeof CodeComponent & {
  Block: typeof Block
}

export const Code = CodeComponent as CodeShape

Code.Block = Block

export default Code