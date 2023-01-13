import type { PropsWithChildren } from "react";

export type CardProps = {} & PropsWithChildren

export const Card: React.FC<CardProps> = ({children}) => {
    return ( 
        <div className="w-full bg-slate-50 dark:bg-slate-800 overflow-hidden rounded-md border-1 border-white dark:border-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 shadow-md dark:drop-shadow-md p-3">
            {children}
        </div>
    )
}

export default Card