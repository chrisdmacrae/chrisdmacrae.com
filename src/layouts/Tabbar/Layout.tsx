import { createContext, PropsWithChildren, useContext } from "react"

export type LayoutProps = PropsWithChildren & {
  sm?: boolean
  md?: boolean
  lg?: boolean
}

const LayoutContext = createContext<Required<Omit<LayoutProps, 'children'>>>({
  sm: true,
  md: false,
  lg: false
})

export const useLayout = () => useContext(LayoutContext)

export const Layout: React.FC<LayoutProps> = ({ sm = true, md = false, lg = false, children }) => {
  let classes = ['']

  classes.push(getBreakpoints(sm, md, lg))

  return (
    <LayoutContext.Provider value={{ sm, md, lg }}>
      <div className={classes.join(' ')}>
        {children}
      </div>
    </LayoutContext.Provider>
  )
}

function getBreakpoints(sm: boolean, md: boolean, lg: boolean) {
  let classes = ['pb-24']

  if (sm) classes.push('sm:pb-24')
  else classes.push('sm:pb-0')
  if (md) classes.push('md:pb-24')
  else classes.push('md:pb-0')
  if (lg) classes.push('lg:pb-24')
  else classes.push('lg:pb-0')

  return classes.join(' ')
}