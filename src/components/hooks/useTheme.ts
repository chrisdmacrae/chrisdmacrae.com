import { useEffect, useState } from "react"
import Cookies from 'js-cookie'

export const THEME_COOKIE = 'theme'

export type Theme = 'light' | 'dark' | 'system'

export const useTheme = (initialTheme: Theme = 'system') => {
  const [theme, setTheme] = useState<Theme | undefined>(initialTheme)
  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light')
    else setTheme('dark')
  }

  useEffect(() => {
    setTheme(initialTheme)
  }, [initialTheme])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark')
    } else if ((!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark')
    }

    if (theme) {
      Cookies.set(THEME_COOKIE, theme, { sameSite: 'strict' })
      localStorage.setItem(THEME_COOKIE, theme)
    }
  }, [theme])

  useEffect(() => {
    const persistedTheme = Cookies.get(THEME_COOKIE) as Theme | undefined

    if (persistedTheme) setTheme(persistedTheme)
  }, [])

  return [theme, toggleTheme] as const
}