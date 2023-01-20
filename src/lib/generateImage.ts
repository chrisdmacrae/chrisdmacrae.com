import sharp from 'sharp'
// @ts-ignore: no types
import initYoga from 'yoga-wasm-web/asm'
// @ts-ignore: no types
import satori, { init as initSatori } from 'satori/wasm'

const YOGA = initYoga()
initSatori(YOGA)

export type ImageOptions = {
  site: string,
  width: number
  height: number,
  debug?: boolean
}

export async function generateImage(Component: any, props: Record<string, any>, { site, width, height, debug }: ImageOptions) {
  const roboto400 = await fetch(new URL('/fonts/Roboto/Roboto-Medium.ttf', site)).then(
    (res) => res.arrayBuffer()
  )
  const roboto700 = await fetch(new URL('/fonts/Roboto/Roboto-Bold.ttf', site)).then(
    (res) => res.arrayBuffer()
  )
  const roboto900 = await fetch(new URL('/fonts/Roboto/Roboto-Black.ttf', site)).then(
    (res) => res.arrayBuffer()
  )
  const svg = await satori(
    Component(props),
    {
      debug: debug,
      width: width,
      height: height,
      fonts: [
        {
          name: 'Roboto',
          data: roboto400,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Roboto',
          data: roboto700,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Roboto',
          data: roboto900,
          weight: 900,
          style: 'normal',
        }
      ]
    }
  )

  return await sharp(Buffer.from(svg)).png().toBuffer()
}