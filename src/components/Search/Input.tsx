export const Input: React.FC = (props: any) => {
  return (
    <input
      {...props}
      type="text"
      className="w-full px-4 py-2 bg-transparent outline-none text-slate-600 dark:text-slate-400"
    />
  )
}