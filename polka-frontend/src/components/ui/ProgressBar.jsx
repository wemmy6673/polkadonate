import { calcPct } from '@/utils/formatters'

export default function ProgressBar({ raised, goal, showLabel = false }) {
  const pct = calcPct(raised, goal)

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5 font-mono text-xs">
          <span className="text-orange font-medium">{raised.toLocaleString()} PDT</span>
          <span className="text-muted">/ {goal.toLocaleString()} · {pct}%</span>
        </div>
      )}
      <div className="h-1 rounded-full bg-border overflow-hidden w-full">
        <div
          className="h-full rounded-full progress-shimmer relative overflow-hidden transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #ff6b1a, #ff8c4a)',
          }}
        />
      </div>
    </div>
  )
}
