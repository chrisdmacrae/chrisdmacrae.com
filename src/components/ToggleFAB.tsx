import FAB from './FAB'
import { IconMoon, IconSearch, IconSun, IconVolumeOff, IconVolume } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useButtonSound } from './hooks/useButtonSound';

export const ToggleFAB = () => {
  const [buttonClick] = useButtonSound()
  const [sound, setSound] = useState(true)
  const toggleSound = () => {
      if (!sound) buttonClick()

      setSound(!sound)
  }
  
  const [theme, setTheme] = useState<'light' | 'dark'>()
  const toggleTheme = () => {
    if (sound) buttonClick()
    if (theme === 'dark') setTheme('light')
    else setTheme('dark')
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark')
    } else if ((!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark')
    }
  }, [theme])
  

  return (
    <FAB>
      <FAB.Button onClick={toggleTheme}>
        {theme === 'dark' && <IconSun />}
        {theme !== 'dark' && <IconMoon />}
      </FAB.Button>
      <FAB.Button onClick={toggleSound}>
        {sound && <IconVolumeOff />}
        {!sound && <IconVolume />}
      </FAB.Button>
      <div className="hidden md:inline-block">
        <FAB.Button>
          <IconSearch />
        </FAB.Button>
      </div>
  </FAB>
  )
}

export default ToggleFAB