import type { ImageMetadata } from 'astro'

// Images picked in the CMS are stored as repository paths, e.g.
// "src/assets/images/me.png". This resolves one to the image Astro imported.
const images = import.meta.glob<ImageMetadata>('/src/assets/images/**/*.{png,jpg,jpeg,webp,avif,gif,svg}', {
  eager: true,
  import: 'default',
})

export function resolveImage(path: string): ImageMetadata {
  const image = images[`/${path.replace(/^\/+/, '')}`]
  if (!image) throw new Error(`No image at ${path}. It must live under src/assets/images/.`)
  return image
}
