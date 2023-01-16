import Heading from "./Heading";
import Text from "./Text";

export const components = {
  h1: (props: any) => <span className="pt-6"><Heading as='h2' size={2} {...props} /></span>,
  h2: (props: any) => <span className="pt-4"><Heading as='h3' size={3} {...props} /></span>,
  h3: (props: any) => <span className="pt-2"><Heading as='h4' size={4} {...props} /></span>,
  h4: (props: any) => <span className="pt-2"><Heading as='h5' size={4} {...props} /></span>,
  h5: (props: any) => <span className="pt-2"><Heading as='h6' size={4} {...props} /></span>,
  h6: (props: any) => <span className="pt-2"><Heading as='h6' size={4} {...props} /></span>,
  p: (props: any) => <Text as='p' {...props} />,
  span: (props: any) => <Text as='span' {...props} />,
  ul: (props: any) => <ul className="list-disc" {...props} />,
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