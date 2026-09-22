import Code from "../Code";
import Heading from "./Heading";
import Text from "./Text";

// Astro's React renderer drops the `class` MDX passes to these components, so
// elements whose Markdown classes matter (like Prism's `pre`) aren't overridden.
export const components = {
  h1: (props: any) => <span className="pt-6"><Heading as='h2' size={2} {...props} /></span>,
  // GFM's footnotes label, which Markdown gives an `sr-only` class
  h2: (props: any) => props.id === 'footnote-label'
    ? <h3 {...props} className="sr-only" />
    : <span className="pt-4"><Heading as='h3' size={3} {...props} /></span>,
  h3: (props: any) => <span className="pt-2"><Heading as='h4' size={4} {...props} /></span>,
  h4: (props: any) => <span className="pt-2"><Heading as='h5' size={4} {...props} /></span>,
  h5: (props: any) => <span className="pt-2"><Heading as='h6' size={4} {...props} /></span>,
  h6: (props: any) => <span className="pt-2"><Heading as='h6' size={4} {...props} /></span>,
  hr: (props: any) => <hr className="my-10 lg:my-20 border-0 border-b border-slate-200 dark:border-slate-700" {...props} />,
  img: (props: any) => <img {...props} className="w-full h-auto rounded-lg overflow-hidden" />,
  p: (props: any) => <Text as='p' {...props} />,
  a: (props: any) => <a className="text-blue-500" {...props} />,
  ul: (props: any) => <ul className="list-disc list-outside marker:text-slate-500 dark:marker:text-slate-600 text-slate-900 dark:text-slate-50 pl-6 pt-2 mb-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-outside text-slate-900 dark:text-slate-50 pl-6 pt-2 mb-4" {...props} />,
  li: ({children, ...props}: any) => <li {...props}><Text>{children}</Text></li>,
  blockquote: ({children, ...props}: any) => (
    <div className="border-l-4 pl-4 py-6 border-slate-200 dark:border-slate-700">
      <Text as="p" {...props}>
        <strong>{children}</strong>
      </Text>
    </div>
  )
}

export default components