import { TabBar as TabBarComponent } from './Tabbar'
import { Layout } from './Layout'

export type TabBarShape = typeof TabBarComponent & {
  Layout: typeof Layout
}

export const TabBar = TabBarComponent as TabBarShape

TabBar.Layout = Layout

export default TabBar