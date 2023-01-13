import type { PropsWithChildren } from "react"

export type SidebarProps = {} & PropsWithChildren

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    return (
        <div className="hidden md:flex h-screen sticky top-0 flex-col gap-2 md:gap-4 md:basis-96 border-r border-1 border-slate-200 dark:border-slate-800 p-5">
            {children}
        </div>
    )
}

export default Sidebar