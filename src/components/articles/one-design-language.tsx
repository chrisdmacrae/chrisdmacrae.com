import { useState, type PropsWithChildren } from "react"

// Visuals for src/content/articles/building-one-design-language-for-every-screen.mdx

const Box: React.FC<PropsWithChildren<{ className?: string }>> = ({ children, className = '' }) => (
  <div className={`rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-sm text-slate-700 dark:text-slate-200 ${className}`}>
    {children}
  </div>
)

const Label: React.FC<PropsWithChildren> = ({ children }) => (
  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{children}</span>
)

const Arrow: React.FC<{ direction?: 'right' | 'down', className?: string }> = ({ direction = 'right', className = '' }) => (
  <span aria-hidden className={`text-slate-400 dark:text-slate-500 text-xl leading-none ${className}`}>
    {direction === 'right' ? '→' : '↓'}
  </span>
)

const platforms = ['Phone', 'Desktop', 'Web app', 'Website']

// Intro: four platforms that "sort of" match, versus one design language.
export const Drift: React.FC = () => {
  const drifted = [
    'rounded-sm bg-violet-600 px-3 py-1',
    'rounded-lg bg-purple-500 px-4 py-2',
    'rounded-full bg-indigo-500 px-2 py-1.5',
    'rounded-md bg-fuchsia-600 px-5 py-2.5',
  ]

  return (
    <div className="w-full grid gap-6 md:grid-cols-2">
      <Box>
        <Label>Before: close enough</Label>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {platforms.map((platform, i) => (
            <div key={platform} className="flex flex-col items-start gap-1">
              <span className="text-xs text-slate-500 dark:text-slate-400">{platform}</span>
              <button type="button" tabIndex={-1} className={`text-white text-xs font-medium ${drifted[i]}`}>Save</button>
            </div>
          ))}
        </div>
      </Box>
      <Box>
        <Label>After: one design language</Label>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {platforms.map(platform => (
            <div key={platform} className="flex flex-col items-start gap-1">
              <span className="text-xs text-slate-500 dark:text-slate-400">{platform}</span>
              <button type="button" tabIndex={-1} className="text-white text-xs font-medium rounded-md bg-violet-600 px-4 py-2">Save</button>
            </div>
          ))}
        </div>
      </Box>
    </div>
  )
}

// Step 1: the three things Claude Design gets up front.
export const DesignInputs: React.FC = () => {
  const inputs = [
    { title: 'References', body: '"The calm of Bear, the density of Notion."' },
    { title: 'Aesthetic', body: 'Warm and paper-like. Serif headings, soft shadows.' },
    { title: 'Prototype outline', body: 'Sign up → list → detail → settings.' },
  ]

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="w-full grid gap-3 md:grid-cols-3">
        {inputs.map(input => (
          <Box key={input.title}>
            <Label>{input.title}</Label>
            <p className="mt-1">{input.body}</p>
          </Box>
        ))}
      </div>
      <Arrow direction="down" />
      <Box className="w-full md:w-2/3 text-center">
        <strong>Claude Design</strong>
        <p className="text-slate-500 dark:text-slate-400">A design system <em>and</em> a working prototype to react to</p>
      </Box>
    </div>
  )
}

type Aesthetic = {
  name: string
  card: string
  heading: string
  body: string
  button: string
}

const aesthetics: Aesthetic[] = [
  {
    name: 'Warm and paper-like',
    card: 'bg-[#faf6ef] border border-[#e8dfd0] rounded-md shadow-md',
    heading: 'font-serif text-lg text-[#3b2f24]',
    body: 'text-[#6b5a48]',
    button: 'bg-[#8a5a35] text-[#faf6ef] rounded-md px-4 py-2',
  },
  {
    name: 'Sharp and technical',
    card: 'bg-black border border-lime-400 rounded-none',
    heading: 'font-mono text-base uppercase tracking-widest text-lime-400',
    body: 'font-mono text-xs text-slate-300',
    button: 'bg-lime-400 text-black font-mono uppercase text-xs rounded-none px-4 py-2',
  },
  {
    name: 'Soft and playful',
    card: 'bg-pink-50 border-2 border-pink-200 rounded-3xl',
    heading: 'text-xl font-extrabold text-pink-600',
    body: 'text-pink-900',
    button: 'bg-yellow-300 text-pink-700 font-bold rounded-full px-6 py-3 border-b-4 border-yellow-500',
  },
  {
    name: 'Quiet and premium',
    card: 'bg-white border border-neutral-200 rounded-sm p-8',
    heading: 'text-lg font-light tracking-tight text-neutral-900',
    body: 'text-neutral-500',
    button: 'bg-neutral-900 text-white text-xs tracking-wide rounded-sm px-5 py-2',
  },
]

// Step 1: the same screen in each aesthetic. Pick one.
export const AestheticPicker: React.FC = () => {
  const [selected, setSelected] = useState(0)
  const aesthetic = aesthetics[selected]

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Aesthetic">
        {aesthetics.map((a, i) => (
          <button
            key={a.name}
            type="button"
            role="radio"
            aria-checked={i === selected}
            onClick={() => setSelected(i)}
            className={`rounded-full px-3 py-1 text-xs border transition-colors ${i === selected
              ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white'
              : 'bg-white text-slate-600 border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-600'}`}
          >
            {a.name}
          </button>
        ))}
      </div>
      <div className={`flex flex-col gap-3 p-6 transition-all ${aesthetic.card}`}>
        <span className={aesthetic.heading}>Today's notes</span>
        <p className={`text-sm ${aesthetic.body}`}>Three drafts, one idea worth keeping.</p>
        <div>
          <button type="button" tabIndex={-1} className={aesthetic.button}>New note</button>
        </div>
      </div>
    </div>
  )
}

// Step 1: expect 3 to 10 rounds of feedback.
export const Rounds: React.FC = () => {
  const notes: Record<number, string> = {
    1: 'Never it',
    3: 'Decent',
    5: 'It clicks',
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="grid grid-cols-10 gap-1">
        {Array.from({ length: 10 }, (_, i) => i + 1).map(round => {
          let color = 'bg-slate-200 dark:bg-slate-700'
          if (round >= 3) color = 'bg-amber-300 dark:bg-amber-600'
          if (round >= 5) color = 'bg-green-400 dark:bg-green-600'

          return (
            <div key={round} className="flex flex-col items-center gap-1">
              <div className={`h-8 w-full rounded ${color}`} style={{ opacity: 0.4 + round * 0.06 }} />
              <span className="text-xs text-slate-500 dark:text-slate-400">{round}</span>
            </div>
          )
        })}
      </div>
      <div className="grid grid-cols-10 gap-1 text-[10px] leading-tight text-slate-600 dark:text-slate-300">
        {Array.from({ length: 10 }, (_, i) => i + 1).map(round => (
          <span key={round} className="text-center">{notes[round] ?? ''}</span>
        ))}
      </div>
    </div>
  )
}

// Step 2: what's inside the export.
export const ExportZip: React.FC = () => {
  const tree = [
    ['prototype-export.zip', 0],
    ['tokens/', 1],
    ['color.json', 2],
    ['spacing.json', 2],
    ['type.json', 2],
    ['components/', 1],
    ['Button', 2],
    ['Card', 2],
    ['ListItem', 2],
    ['screens/', 1],
    ['SignUp', 2],
    ['List', 2],
    ['Detail', 2],
    ['Settings', 2],
  ] as const

  return (
    <Box className="w-full md:w-2/3 font-mono text-xs">
      {tree.map(([name, depth]) => (
        <div key={name} className="py-0.5" style={{ paddingLeft: `${depth * 1.25}rem` }}>
          {depth > 0 && <span className="text-slate-400 dark:text-slate-500">└ </span>}
          <span className={name.endsWith('/') || depth === 0 ? 'font-semibold' : ''}>{name}</span>
        </div>
      ))}
    </Box>
  )
}

// Step 3: one component library, every platform.
export const OneLibrary: React.FC = () => {
  const targets = [
    { via: 'React Native', platforms: ['iOS', 'Android'] },
    { via: 'React Native Web', platforms: ['Web app', 'Website', 'Desktop'] },
  ]

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <Box className="text-center">
        <strong>One component library</strong>
        <p className="text-slate-500 dark:text-slate-400">tokens · spacing · type ramp · color · components</p>
      </Box>
      <Arrow direction="down" />
      <div className="w-full grid gap-3 md:grid-cols-2">
        {targets.map(target => (
          <Box key={target.via}>
            <Label>{target.via}</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {target.platforms.map(platform => (
                <span key={platform} className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs">{platform}</span>
              ))}
            </div>
          </Box>
        ))}
      </div>
    </div>
  )
}

// Step 4: the round trip between design and code.
export const RoundTrip: React.FC = () => (
  <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-3">
    <Box className="text-center">
      <strong>Claude Design</strong>
      <p className="text-slate-500 dark:text-slate-400">the design system</p>
    </Box>
    <div className="flex flex-col items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
      <span>export zip <Arrow /></span>
      <span><Arrow className="inline-block rotate-180" /> real code</span>
    </div>
    <Box className="text-center">
      <strong>Claude Code</strong>
      <p className="text-slate-500 dark:text-slate-400">the code you ship</p>
    </Box>
  </div>
)

// Step 5: one shared system, one isolated project per platform.
export const PlatformProjects: React.FC = () => {
  const projects = [
    { name: 'Mobile', traits: ['Bigger tap targets', 'Bottom navigation'] },
    { name: 'Desktop', traits: ['Keyboard shortcuts', 'Dense lists', 'Side panels'] },
    { name: 'Web app', traits: ['Responsive layouts', 'Pointer and touch'] },
    { name: 'Website', traits: ['Bolder type', 'Room to breathe'] },
  ]

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <Box className="text-center">
        <strong>Shared design system</strong>
      </Box>
      <Arrow direction="down" />
      <div className="w-full grid gap-3 grid-cols-2 md:grid-cols-4">
        {projects.map(project => (
          <Box key={project.name}>
            <Label>{project.name}</Label>
            <ul className="mt-2 flex flex-col gap-1 text-xs">
              {project.traits.map(trait => <li key={trait}>{trait}</li>)}
            </ul>
          </Box>
        ))}
      </div>
    </div>
  )
}

// Step 6: by now, the design decisions are already made.
export const AlreadyDecided: React.FC = () => {
  const decided = ['Buttons', 'Spacing', 'Type ramp', 'Color', 'Dark mode', 'Platform layouts']

  return (
    <div className="w-full grid gap-3 md:grid-cols-2">
      <Box>
        <Label>Already decided</Label>
        <ul className="mt-2 flex flex-col gap-1">
          {decided.map(item => (
            <li key={item} className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400" aria-hidden>✓</span>
              <span className="line-through decoration-slate-400 text-slate-500 dark:text-slate-400">{item}</span>
            </li>
          ))}
        </ul>
      </Box>
      <Box className="flex flex-col justify-center border-violet-300 dark:border-violet-700">
        <Label>Left to do</Label>
        <p className="mt-2 text-base font-semibold">Build the feature.</p>
      </Box>
    </div>
  )
}

// Why this works: each step makes the design a little more real.
export const RealerEachStep: React.FC = () => {
  const steps = [
    { step: 'Prototype', real: 'to critique' },
    { step: 'Export', real: 'to code' },
    { step: 'Round trip', real: 'to trust' },
    { step: 'React Native Web', real: 'on every platform' },
  ]

  return (
    <div className="w-full flex flex-col gap-2">
      {steps.map((s, i) => (
        <div key={s.step} className="flex items-center gap-3">
          <span className="w-32 shrink-0 text-right text-xs text-slate-500 dark:text-slate-400">{s.step}</span>
          <div
            className="h-8 rounded bg-violet-500 dark:bg-violet-600 flex items-center px-3 text-xs text-white whitespace-nowrap"
            style={{ width: `${40 + i * 20}%`, opacity: 0.55 + i * 0.15 }}
          >
            Real enough {s.real}
          </div>
        </div>
      ))}
    </div>
  )
}
