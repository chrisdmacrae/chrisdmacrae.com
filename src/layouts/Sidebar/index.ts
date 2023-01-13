import { Sidebar as SidebarComponent } from './Sidebar'
import { Layout as LayoutComponent } from './Layout'
import { Pane as PaneComponent } from './Pane'
import { Link as LinkComponent } from './Link'

export type SidebarShape = typeof SidebarComponent & {
    Layout: typeof LayoutComponent
    Pane: typeof PaneComponent
    Link: typeof LinkComponent
}

export const Sidebar = SidebarComponent as SidebarShape

Sidebar.Layout = LayoutComponent
Sidebar.Pane = PaneComponent
Sidebar.Link = LinkComponent

export default Sidebar