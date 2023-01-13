import { useEffect, useState } from "react"

export const useButtonSound = () => {
  const [audio, setAudio] = useState<HTMLAudioElement | undefined>()
  const play = () => {
    if (audio) audio.play()
  }
  useEffect(() => {
    const audioEl = new Audio('/audio/click.mp3')

    setAudio(audioEl)
  }, [])

  return [play] as const
}