import { Sidebar as SidebarComponent } from './Sidebar'
import { Layout } from './Layout'
import { Pane } from './Pane'
import { Link } from './Link'
import { Header } from './Header'

export type SidebarShape = typeof SidebarComponent & {
    Layout: typeof Layout
    Pane: typeof Pane
    Link: typeof Link
    Header: typeof Header
}

export const Sidebar = SidebarComponent as SidebarShape

Sidebar.Layout = Layout
Sidebar.Pane = Pane
Sidebar.Link = Link
Sidebar.Header = Header

export default Sidebar