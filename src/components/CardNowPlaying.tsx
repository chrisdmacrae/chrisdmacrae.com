import { useEffect, useState } from "react";
import Card from "../lib/@ui/Card";
import Text from '../lib/@ui/typography/Text'
import { prettyDate } from "../lib/prettyDate";
import type { NowListening, NowPlaying, NowWatching } from "../pages/api/now-playing.json";

const POLL_INTERVAL = 30_000

// Undefined until the first lookup finishes, and null if it failed
type State = NowPlaying | null | undefined

// Every mounted card shares one poll, since the sidebar's and the about
// page's cards can both be on the page at once
let current: State
let timer: ReturnType<typeof setTimeout> | undefined
const listeners = new Set<(nowPlaying: State) => void>()

async function poll() {
  clearTimeout(timer)

  if (document.visibilityState === 'visible') {
    try {
      const res = await fetch('/api/now-playing.json')
      if (res.ok) current = await res.json()
    } catch {
      // Keep showing what we had; try again next time
    }
    current ??= null
    listeners.forEach(listener => listener(current))
  }

  if (listeners.size) timer = setTimeout(poll, POLL_INTERVAL)
}

function onVisibilityChange() {
  if (document.visibilityState === 'visible') poll()
}

function subscribe(listener: (nowPlaying: State) => void) {
  listeners.add(listener)

  if (listeners.size === 1) {
    document.addEventListener('visibilitychange', onVisibilityChange)
    poll()
  } else {
    listener(current)
  }

  return () => {
    listeners.delete(listener)

    if (!listeners.size) {
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }
}

export const CardNowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState<State>(undefined)

  useEffect(() => subscribe(setNowPlaying), [])

  // Hold the card's space until the first lookup lands, so nothing shifts
  if (nowPlaying === undefined) return <Placeholder />

  const { listening, watching } = nowPlaying ?? {}
  if (!listening && !watching) return null

  const live = listening?.live || watching?.live

  return (
    <Frame live={live} heading={live ? 'Now playing' : 'Recently played'}>
      {listening && <Listening {...listening} />}
      {watching && <Watching {...watching} />}
    </Frame>
  )
}

const Frame: React.FC<{ live?: boolean, heading: string, children: React.ReactNode }> = ({ live, heading, children }) => (
  <Card>
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          {live && (
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
          )}
          <span className={`relative inline-flex rounded-full h-3 w-3 ${live ? 'bg-pink-500' : 'bg-slate-400'}`} />
        </span>
        <Text as="span">
          <strong>{heading}</strong>
        </Text>
      </div>
      {children}
    </div>
  </Card>
)

const Placeholder = () => (
  <Frame heading="Now playing">
    {[<Record live={false} />, <Television live={false} />].map((visual, i) => (
      <div key={i} className={ROW} aria-hidden>
        <span className="shrink-0">{visual}</span>
        <span className="flex flex-col gap-1.5 flex-1 motion-safe:animate-pulse">
          <span className="h-3 w-3/5 rounded bg-slate-200 dark:bg-slate-700" />
          <span className="h-4 w-4/5 rounded bg-slate-200 dark:bg-slate-700" />
          <span className="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
        </span>
      </div>
    ))}
  </Frame>
)

// Wraps anywhere, even mid-word, so long titles can't widen the sidebar
const WRAP = '[overflow-wrap:anywhere] overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical]'
const CLAMP_1 = `${WRAP} [-webkit-line-clamp:1]`
const CLAMP_2 = `${WRAP} [-webkit-line-clamp:2]`

// Fits the most lines a row's text can clamp to (1 + 2 + 1), so the card is
// the same height however long the titles are, and as tall as its placeholder
const ROW = 'flex items-center gap-3 h-[4.5rem]'

type RowProps = {
  label: string
  title: string
  subtitle?: string
  url?: string
  children: React.ReactNode
}

const Row: React.FC<RowProps> = ({ label, title, subtitle, url, children }) => {
  const El = url ? 'a' : 'div'

  return (
    <El
      className={`group ${ROW} no-underline`}
      {...(url ? { href: url, target: '_blank', rel: 'noopener' } : {})}
    >
      <span className="shrink-0" aria-hidden>{children}</span>
      <span className="flex flex-col flex-1 min-w-0">
        <span className={CLAMP_1}>
          <Text as="span" size="xs" color="muted">{label}</Text>
        </span>
        <span className={`${CLAMP_2} group-hover:underline`}>
          <Text as="span" size="sm"><strong>{title}</strong></Text>
        </span>
        {subtitle && (
          <span className={CLAMP_1}>
            <Text as="span" size="xs" color="muted">{subtitle}</Text>
          </span>
        )}
      </span>
    </El>
  )
}

// The heading already says it's recently played, so only say when
function label(verb: string, pastVerb: string, live: boolean, playedAt?: string) {
  if (live) return verb
  return playedAt ? prettyDate(playedAt) : pastVerb
}

const Listening: React.FC<NowListening> = ({ live, playedAt, track, artist, image, url }) => (
  <Row label={label('Listening to', 'Listened', live, playedAt)} title={track} subtitle={artist} url={url}>
    <Record image={image} live={live} />
  </Row>
)

const Watching: React.FC<NowWatching> = ({ live, playedAt, title, subtitle, image, url }) => (
  <Row label={label('Watching', 'Watched', live, playedAt)} title={title} subtitle={subtitle} url={url}>
    <Television image={image} live={live} />
  </Row>
)

const GROOVES = 'repeating-radial-gradient(circle at center, #0f172a 0 1px, #1e293b 1px 2.5px)'
const SHEEN = 'conic-gradient(from 45deg, transparent 0 10%, rgba(255,255,255,.18) 15%, transparent 22% 60%, rgba(255,255,255,.12) 65%, transparent 72%)'

// An album sleeve with its record slid halfway out and spinning while it
// plays, or tucked back in once it's done
const Record: React.FC<{ image?: string, live: boolean }> = ({ image, live }) => (
  <span className="relative block w-[5.5rem] h-14">
    <span className={`absolute top-0 w-14 h-14 rounded-full shadow-md transition-[left] duration-700 ${live ? 'left-7' : 'left-3'}`}>
      <span
        className={`absolute inset-0 rounded-full ${live ? 'motion-safe:animate-[spin_3s_linear_infinite]' : ''}`}
        style={{ background: GROOVES }}
      >
        <span className="absolute inset-[30%] rounded-full overflow-hidden bg-pink-500">
          {image && <img src={image} alt="" className="w-full h-full object-cover" />}
        </span>
        <span className="absolute inset-[47%] rounded-full bg-slate-100 dark:bg-slate-300" />
      </span>
      {/* Light catching the grooves stays put while the record turns */}
      <span className="absolute inset-0 rounded-full" style={{ background: SHEEN }} />
    </span>
    <span className="absolute left-0 top-0 w-14 h-14 rounded-sm overflow-hidden bg-gradient-to-br from-purple-400 to-pink-600 shadow-md ring-1 ring-black/10">
      {image && <img src={image} alt="" className="w-full h-full object-cover" />}
    </span>
  </span>
)

const SCANLINES = 'repeating-linear-gradient(0deg, rgba(0,0,0,.18) 0 1px, transparent 1px 3px)'
const GLARE = 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,.25), transparent 60%)'

// A little CRT, antennae and all, faded out once it's done playing
const Television: React.FC<{ image?: string, live: boolean }> = ({ image, live }) => (
  <span className="relative block w-[5.5rem] pt-3">
    <span className="absolute top-0 left-1/2 w-px h-4 origin-bottom -rotate-[30deg] bg-slate-400 dark:bg-slate-500" />
    <span className="absolute top-0 left-1/2 w-px h-4 origin-bottom rotate-[30deg] bg-slate-400 dark:bg-slate-500" />
    <span className="relative flex gap-1 p-1 rounded-md bg-slate-700 dark:bg-slate-950 shadow-md ring-1 ring-black/10">
      <span className="relative flex-1 aspect-[4/3] rounded-[30%/20%] overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600">
        {image && (
          <img
            src={image}
            alt=""
            className={`w-full h-full object-cover transition ${live ? '' : 'grayscale brightness-50'}`}
          />
        )}
        <span className="absolute inset-0" style={{ background: SCANLINES }} />
        <span className="absolute inset-0" style={{ background: GLARE }} />
      </span>
      <span className="flex flex-col justify-center gap-1 w-2">
        <span className="w-2 h-2 rounded-full bg-slate-500" />
        <span className="w-2 h-2 rounded-full bg-slate-500" />
        <span className="w-2 h-0.5 mt-1 rounded-full bg-slate-600" />
        <span className="w-2 h-0.5 rounded-full bg-slate-600" />
      </span>
    </span>
    <span className="flex justify-between px-3">
      <span className="w-1 h-1.5 bg-slate-700 dark:bg-slate-950 rounded-b-sm" />
      <span className="w-1 h-1.5 bg-slate-700 dark:bg-slate-950 rounded-b-sm" />
    </span>
  </span>
)
