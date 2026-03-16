import { cn } from '@/utils/cn'

export default function Card({ className = '', accent = false, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-surface border border-border relative',
        accent && 'card-accent',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
