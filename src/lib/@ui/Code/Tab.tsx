import { ReactElement, useState } from 'react'

export type BlockProps = {
  /* TODO: replace with children when astro bug fixed */
  id: string
  code?: ReactElement
  active?: boolean
}

export const Block: React.FC<BlockProps> = ({ id, active, code }) => {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    const html: string | undefined = (code as any)?.props?.value.toString()
    
    if (html) {
      let tmp = document.createElement('div')
          tmp.innerHTML = html
      let text = tmp.textContent || tmp.innerText || ""

      window.navigator.clipboard.writeText(text)
      setCopied(true)

      setTimeout(() => setCopied(false), 3000)
    }
  }

  return (
    <div role="tabpanel" id={id} className={(active ? 'block' : 'hidden') + ' relative w-full'}>
        <button 
          onClick={copy}
          className="absolute top-0 right-0 bg-[#030314] text-white rounded-t-md p-2 font-mono text-xs"
          >
          {!copied && "Copy"}
          {copied && "Copied"}
        </button>
      {code}
    </div>
  )
}