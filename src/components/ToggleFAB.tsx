import FAB from '../lib/@ui/FAB'
import { useButtonSound } from '../lib/hooks/useButtonSound';
import { Theme, useTheme } from '../lib/hooks/useTheme';
import { useVolume } from '../lib/hooks/useVolume';
import { useSearch } from './Search';
import Icon from '../lib/@ui/Icon';

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

  const [theme, toggleTheme] = useTheme(initialTheme || 'system')
  const toggleThemeWithSound = () => {
    if (volume) buttonClick()

    toggleTheme()
  }

  const [toggleSearch] = useSearch()
  
  return (
    <FAB>
      <FAB.Button label="Toggle theme" onClick={toggleThemeWithSound}>
        {theme === 'dark' && <Icon name='sun' />}
        {theme !== 'dark' && <Icon name='moon' />}
      </FAB.Button>
      <FAB.Button label="Toggle sound" onClick={toggleSound}>
        {volume && <Icon name='volume-off' />}
        {!volume && <Icon name='volume' />}
      </FAB.Button>
      <div className="hidden md:inline-block">
        <FAB.Button label="Open search" onClick={toggleSearch}>
          <Icon name='search' />
        </FAB.Button>
      </div>
  </FAB>
  )
}

export default ToggleFAB