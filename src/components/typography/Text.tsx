import type { PropsWithChildren } from "react";

export type TextGradient = "primary" | "success" | "info" | "warning"
export type TextColor = "light" | "dark" | "muted"

export type TextProps = {
    as?: 'p' | 'span'
    gradient?: TextGradient
    color?: TextColor
    className?: string
} & PropsWithChildren

export const Text: React.FC<TextProps> = ({as = 'p', gradient, color = 'dark', children, ...props}) => {
    const El = as as any
    let classes = ['max-w-[40rem] align-top items-center']

    if (gradient) classes.push(getGradient(gradient))
    else classes.push(getColor(color))

    return (
        <El className={classes.join(" ")} {...props}>
            {children}
        </El>        
    )
}

function getGradient(gradient: TextGradient) {
    switch (gradient) {
        case 'primary':
            return 'text-transparent dark:text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'
        case 'success':
            return 'text-transparent dark:text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-600'
        case 'warning':
          return 'text-transparent dark:text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600'
        case 'info':
            return 'text-transparent dark:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-300 dark:to-indigo-400'
    }
}

function getColor(color: TextColor) {
    switch(color) {
        case 'light':
            return 'text-slate-50 dark:text-slate-900'
        case 'dark':
            return 'text-slate-900 dark:text-slate-50'
        case 'muted':
          return 'text-slate-600 dark:text-slate-400'
    }
}

export default Text