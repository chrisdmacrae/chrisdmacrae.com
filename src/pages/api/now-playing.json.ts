import type { APIRoute } from 'astro'

// What I'm listening to (Last.fm) and watching (Trakt) right now, for
// src/components/CardNowPlaying.tsx. When nothing is live, each falls back to
// the last thing scrobbled. Either is null when its env vars aren't set.

export const prerender = false

type Scrobble = {
  // Whether it's playing right now, rather than the last thing that played
  live: boolean
  // When it finished playing, as an ISO date, if it isn't live
  playedAt?: string
}

export type NowListening = Scrobble & {
  track: string
  artist: string
  album?: string
  image?: string
  url?: string
}

export type NowWatching = Scrobble & {
  type: 'episode' | 'movie'
  title: string
  subtitle?: string
  image?: string
  url?: string
}

export type NowPlaying = {
  listening: NowListening | null
  watching: NowWatching | null
}

// Last.fm's placeholder for tracks without album art
const LASTFM_BLANK_IMAGE = '2a96cbd8b46e442fc41c2b86b821562f'

async function getListening(): Promise<NowListening | null> {
  const user = import.meta.env.LASTFM_USER
  const apiKey = import.meta.env.LASTFM_API_KEY
  if (!user || !apiKey) return null

  const url = new URL('https://ws.audioscrobbler.com/2.0/')
  url.searchParams.set('method', 'user.getrecenttracks')
  url.searchParams.set('user', user)
  url.searchParams.set('api_key', apiKey)
  url.searchParams.set('format', 'json')
  url.searchParams.set('limit', '1')

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Last.fm responded ${res.status}`)

  const json = await res.json()
  // The live track, if there is one, comes first
  const track = [json?.recenttracks?.track].flat()[0]
  if (!track) return null

  const live = track['@attr']?.nowplaying === 'true'

  const images: { size: string, '#text': string }[] = track.image ?? []
  const image = (images.find(i => i.size === 'extralarge') ?? images.at(-1))?.['#text']

  return {
    live,
    playedAt: !live && track.date?.uts ? new Date(Number(track.date.uts) * 1000).toISOString() : undefined,
    track: track.name,
    artist: track.artist?.['#text'] ?? track.artist?.name,
    album: track.album?.['#text'] || undefined,
    image: image && !image.includes(LASTFM_BLANK_IMAGE) ? image : undefined,
    url: track.url
  }
}

// Trakt returns image URLs without a scheme, e.g. "media.trakt.tv/images/..."
function traktImage(...candidates: (string[] | undefined)[]) {
  const image = candidates.find(c => c?.length)?.[0]
  if (!image) return undefined
  return image.startsWith('http') ? image : `https://${image}`
}

async function trakt(path: string, clientId: string) {
  const res = await fetch(`https://api.trakt.tv${path}`, {
    headers: {
      'Content-Type': 'application/json',
      // Trakt's Cloudflare turns away Node's default user agent with a 403
      'User-Agent': 'chrisdmacrae.com',
      'trakt-api-version': '2',
      'trakt-api-key': clientId
    }
  })

  // 204 means nothing is being watched
  if (res.status === 204) return null
  if (!res.ok) throw new Error(`Trakt responded ${res.status}`)

  return res.json()
}

async function getWatching(): Promise<NowWatching | null> {
  const user = import.meta.env.TRAKT_USER
  const clientId = import.meta.env.TRAKT_CLIENT_ID
  if (!user || !clientId) return null

  const id = encodeURIComponent(user)
  const watching = await trakt(`/users/${id}/watching?extended=images`, clientId)
  if (watching) return toWatching(watching, true)

  const [last] = await trakt(`/users/${id}/history?limit=1&extended=images`, clientId) ?? []
  return last ? toWatching(last, false) : null
}

// Shapes an item from Trakt's watching or history endpoints
function toWatching(json: any, live: boolean): NowWatching | null {
  const scrobble = {
    live,
    playedAt: live ? undefined : json.watched_at
  }

  if (json.type === 'episode') {
    const { show, episode } = json
    const code = `S${String(episode.season).padStart(2, '0')}E${String(episode.number).padStart(2, '0')}`

    return {
      ...scrobble,
      type: 'episode',
      title: show.title,
      subtitle: episode.title ? `${code} · ${episode.title}` : code,
      image: traktImage(episode.images?.screenshot, show.images?.fanart, show.images?.thumb, show.images?.poster),
      url: show.ids?.slug && `https://trakt.tv/shows/${show.ids.slug}/seasons/${episode.season}/episodes/${episode.number}`
    }
  }

  if (json.type === 'movie') {
    const { movie } = json

    return {
      ...scrobble,
      type: 'movie',
      title: movie.title,
      subtitle: movie.year ? String(movie.year) : undefined,
      image: traktImage(movie.images?.fanart, movie.images?.thumb, movie.images?.poster),
      url: movie.ids?.slug && `https://trakt.tv/movies/${movie.ids.slug}`
    }
  }

  return null
}

// A failing service shouldn't take the other down with it
async function settle<T>(promise: Promise<T>) {
  try {
    return await promise
  } catch (error) {
    console.error(error)
    return null
  }
}

export const GET: APIRoute = async () => {
  const [listening, watching] = await Promise.all([
    settle(getListening()),
    settle(getWatching())
  ])
  const body: NowPlaying = { listening, watching }

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      // Share one lookup between everyone viewing the site
      'Cache-Control': 'public, max-age=0, s-maxage=30, stale-while-revalidate=30'
    }
  })
}
