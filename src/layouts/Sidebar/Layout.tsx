import type { PropsWithChildren } from "react"

export type LayoutProps = {} & PropsWithChildren

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="bg-slate-100 dark:bg-slate-900 flex flex-row min-w-full min-h-screen">
            {children}
        </div>
    )
}