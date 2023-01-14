import type { PropsWithChildren } from "react"

export type SidebarProps = {} & PropsWithChildren

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    return (
        <nav className="hidden md:flex basis-72 shrink-0 h-screen sticky top-0 flex-col gap-2 md:gap-4 border-r border-1 border-slate-200 dark:border-slate-800 p-5">
            {children}
        </nav>
    )
}

export default Sidebar