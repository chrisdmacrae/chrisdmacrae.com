import type { PropsWithChildren } from "react";

export type PaneProps = {} & PropsWithChildren

export const Pane: React.FC<PaneProps> = ({children}) => {
    return (
        <main className="w-full flex flex-col flex-grow p-5">
            {children}
        </main>
    )
}

export default Pane