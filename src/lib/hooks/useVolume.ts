import { useEffect, useState } from "react"
import Cookies from 'js-cookie'

export const VOLUME_COOKIE = 'volume'
export const VOLUME_ENABLE_EVENT = 'volume.enable'
export const VOLUME_DISABLE_EVENT = 'volume.enable'

export const useVolume = (initialVolume: boolean = true) => {
  const [volume, setVolume] = useState(initialVolume)
  const toggleVolume = () => {
    if (volume) {
      const event = new CustomEvent(VOLUME_DISABLE_EVENT)
      document.dispatchEvent(event)
    }
    else {
      const event = new CustomEvent(VOLUME_ENABLE_EVENT)
      document.dispatchEvent(event)
    }

    setVolume(!volume)
  }

  useEffect(() => {
    setVolume(initialVolume)
  }, [initialVolume])

  useEffect(() => {
    if (volume) Cookies.set(VOLUME_COOKIE, volume.toString(), { sameSite: 'strict' })
  }, [volume])

  useEffect(() => {
    const persistedSound = Cookies.get(VOLUME_COOKIE) == 'true'

    setVolume(persistedSound)

    const enable_cb = () => {
      if (!volume) {
        setVolume(true)
      }
    }
    const disable_cb = () => {
      if (volume) {
        setVolume(false)
      }
    }

    document.addEventListener(VOLUME_ENABLE_EVENT, enable_cb)
    document.addEventListener(VOLUME_DISABLE_EVENT, disable_cb)

    return () => {
      document.removeEventListener(VOLUME_ENABLE_EVENT, enable_cb)
      document.removeEventListener(VOLUME_DISABLE_EVENT, disable_cb)
    }
  }, [])

  return [volume, toggleVolume] as const
}