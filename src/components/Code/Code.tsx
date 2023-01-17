import { PropsWithChildren, ReactNode, useEffect, useRef, useState } from "react"

export type CodeProps = PropsWithChildren & {
  id: string
  tabs: string[]
  panels: ReactNode[]
}

export const Code: React.FC<CodeProps> = ({ id, tabs, panels }) => {
  const panelsRef = useRef<HTMLDivElement | null>()
  useEffect(() => {
    document.addEventListener(`tabs.${id}`, e => {
      const panels = panelsRef.current?.querySelectorAll('[role=tabpanel]')
      const index = (e as CustomEvent).detail

      panels?.forEach((panel, i) => {
        if (i !== index) panel.classList.add('hidden')
        else panel.classList.remove('hidden')
      })
    })
  }, [])

  return (
    <div className="relative flex flex-col w-full">
      <div className="absolute z-10 -top-1 left-2 flex flex-row">
        {tabs.map((tab, i) => <Tab name={id} tab={tab} i={i} key={tab} />)}
      </div>
      <div className="relative z-0" ref={r => panelsRef.current = r}>
        {panels}
      </div>
    </div>
  )
}

type TabProps = {
  name: string
  tab: string
  i: number
}

const Tab: React.FC<TabProps> = ({ tab, name, i }) => {
  const onClick = () => {
    const event = new CustomEvent(`tabs.${name}`, {
      detail: i
    })

    document.dispatchEvent(event)
  }

  const [selected, setSelected] = useState(i === 0)
  useEffect(() => {
    document.addEventListener(`tabs.${name}`, e => {
      const index = (e as CustomEvent).detail

      setSelected(i === index)
    })
  }, [])

  return (
    <div role="tab" aria-selected={selected} aria-controls={tab} tabIndex={-1}>
      <input type="radio" id={`${name}-${i}`} name={name} className={`peer hidden`} />
      <label 
        onClick={onClick}
        htmlFor={`${name}-${i}`} 
        className={(selected ? 'bg-[#030314]' : 'bg-slate-800') + ' peer-checked:bg-[#030314] text-white rounded-t-md px-2 font-mono text-xs'}
      >
        {tab}
      </label>
    </div>
  )
}