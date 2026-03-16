import { cn } from '@/utils/cn'

const base =
  'inline-flex items-center justify-center gap-2 font-bold font-syne rounded-xl border-0 cursor-pointer transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed'

const variants = {
  primary: 'bg-gradient-to-br from-orange to-orange-d text-white shadow-orange hover:shadow-orange-lg hover:-translate-y-0.5 active:translate-y-0',
  outline: 'bg-transparent text-orange border border-orange/40 hover:bg-orange/10 hover:border-orange',
  ghost:   'bg-surface text-white border border-border hover:bg-surface2',
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
