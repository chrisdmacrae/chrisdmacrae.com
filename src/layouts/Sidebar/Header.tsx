import type { PropsWithChildren } from "react"

export type HeaderProps = PropsWithChildren

export const Header: React.FC<HeaderProps> = ({ children }) => (
  <header className="flex flex-row gap-2 pb-4 border-b border-slate-200 dark:border-slate-700">
    {children}
  </header>
)