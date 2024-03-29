import { useEffect, useState } from "react"
import Cookies from 'js-cookie'

export const THEME_COOKIE = 'theme'
export const THEME_EVENT = 'theme.toggle'

export type Theme = 'light' | 'dark' | 'system'

export const useTheme = (initialTheme: Theme) => {
  const [theme, setTheme] = useState<Theme | undefined>(initialTheme)
  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light')
    else setTheme('dark')
  }
  const emitThemeToggle = () => {
    const event = new CustomEvent(THEME_EVENT)

    window.dispatchEvent(event)
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark')
    } else if ((!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark')
    }

    if (theme === 'system') {
      localStorage.removeItem(THEME_COOKIE)
    }
    else if (theme) {
      Cookies.set(THEME_COOKIE, theme, { sameSite: 'strict' })
      localStorage.setItem(THEME_COOKIE, theme)
    }

    window.addEventListener(THEME_EVENT, toggleTheme)

    return () => {
      window.removeEventListener(THEME_EVENT, toggleTheme)
    }
  }, [theme])

  useEffect(() => {
    const persistedTheme = Cookies.get(THEME_COOKIE) as Theme | undefined

    if (persistedTheme) setTheme(persistedTheme)
  }, [])

  return [theme, emitThemeToggle] as const
}