import { cn } from '@/utils/cn'

const variants = {
  orange: 'bg-orange/10 border-orange/25 text-orange',
  green:  'bg-green/10  border-green/25  text-green',
  muted:  'bg-muted2/20 border-muted2/30 text-muted',
  purple: 'bg-purple/10 border-purple/25 text-purple',
}

export default function Badge({ variant = 'orange', className = '', children }) {
  return (
    <span
      className={cn(
        'font-mono text-xs px-2.5 py-0.5 rounded border tracking-wide uppercase',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
