import FAB from './FAB'
import { IconMoon, IconSearch, IconSun, IconVolumeOff, IconVolume } from '@tabler/icons';
import { useState } from 'react';
import { useButtonSound } from './hooks/useButtonSound';
import { Theme, useTheme } from './hooks/useTheme';
import { useVolume } from './hooks/useVolume';
import { useSearch } from './Search';

export type ToggleFABProps = {
  theme?: Theme
}

export const ToggleFAB: React.FC<ToggleFABProps> = ({ theme: initialTheme }) => {
  const [buttonClick] = useButtonSound()
  const [volume, toggleVolume] = useVolume()
  const toggleSound = () => {
      if (!volume) buttonClick()

      toggleVolume()
  }

  const [theme, toggleTheme] = useTheme(initialTheme)
  const toggleThemeWithSound = () => {
    if (volume) buttonClick()

    toggleTheme()
  }

  const [toggleSearch] = useSearch()
  
  return (
    <FAB>
      <FAB.Button onClick={toggleThemeWithSound}>
        {theme === 'dark' && <IconSun />}
        {theme !== 'dark' && <IconMoon />}
      </FAB.Button>
      <FAB.Button onClick={toggleSound}>
        {volume && <IconVolumeOff />}
        {!volume && <IconVolume />}
      </FAB.Button>
      <div className="hidden md:inline-block">
        <FAB.Button onClick={toggleSearch}>
          <IconSearch />
        </FAB.Button>
      </div>
  </FAB>
  )
}

export default ToggleFAB