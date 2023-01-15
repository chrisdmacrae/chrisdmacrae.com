import { createContext, PropsWithChildren, useContext } from "react"

export type LayoutProps = PropsWithChildren & {
  sm?: boolean
  md?: boolean
  lg?: boolean
  noBottomSpace?: boolean
}

const LayoutContext = createContext<Required<Omit<LayoutProps, 'children'>>>({
  sm: true,
  md: false,
  lg: false,
  noBottomSpace: true
})

export const useLayout = () => useContext(LayoutContext)

export const Layout: React.FC<LayoutProps> = ({ sm = true, md = false, lg = false, noBottomSpace = false, children }) => {
  let classes = ['relative z-0']

  classes.push(getBreakpoints(sm, md, lg, noBottomSpace ))

  return (
    <LayoutContext.Provider value={{ sm, md, lg, noBottomSpace }}>
      <div className={classes.join(' ')}>
        {children}
      </div>
    </LayoutContext.Provider>
  )
}

function getBreakpoints(sm: boolean, md: boolean, lg: boolean, noBottomSpace: boolean) {
  if (noBottomSpace) return ''

  let classes = ['pb-16']

  if (sm) classes.push('sm:pb-16')
  else classes.push('sm:pb-0')
  if (md) classes.push('md:pb-16')
  else classes.push('md:pb-0')
  if (lg) classes.push('lg:pb-16')
  else classes.push('lg:pb-0')

  return classes.join(' ')
}