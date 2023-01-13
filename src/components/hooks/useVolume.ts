import { useEffect, useState } from "react"
import Cookies from 'js-cookie'

export const VOLUME_COOKIE = 'volume'

export const useVolume = (initialVolume: boolean = true) => {
  const [volume, setVolume] = useState(initialVolume)
  const toggleVolume = () => setVolume(!volume)

  useEffect(() => {
    setVolume(initialVolume)
  }, [initialVolume])

  useEffect(() => {
    const persistedSound = Cookies.get(VOLUME_COOKIE) === 'true'

    if (persistedSound) setVolume(persistedSound)
  }, [])

  return [volume, toggleVolume] as const
}