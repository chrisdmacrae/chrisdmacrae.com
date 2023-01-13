import type { PropsWithChildren } from "react";

export type HeadingSize = 1 | 2 | 3 | 4

export type HeadingProps = {
    as: 'h1' | 'h2' | 'h3' | 'h4'
    size?: HeadingSize
} & PropsWithChildren

export const Heading: React.FC<HeadingProps> = ({as = 'h2', size = 1, children}) => {
    const El = as as any
    let classes = ["w-full max-w-[40rem] text-slate-900 tracking-tight dark:text-white"]

    classes.push(getSize(size))

    return (
        <El className={classes.join(" ")}>
            {children}
        </El>        
    )
}

function getSize(size: HeadingSize) {
  switch (size) {
    case 1:
      return 'font-extrabold text-4xl sm:text-5xl lg:text-6xl'
    case 2:
      return 'font-extrabold text-3xl sm:text-4xl lg:text-5xl'
    case 3:
      return 'font-extrabold text-2xl sm:text-3xl lg:text-4xl'
    case 4:
      return 'font-extrabold text-xl sm:text-2xl lg:text-3xl'
  }
}

export default Heading