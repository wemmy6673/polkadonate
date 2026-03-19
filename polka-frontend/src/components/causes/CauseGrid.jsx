import { useState }      from 'react'
import { useCauseStore } from '@/store/causeStore'
import CauseCard         from './CauseCard'

const CATEGORIES = ['All', 'Education', 'Environment', 'Health', 'Community', 'Tech']

export default function CauseGrid({ onCauseClick }) {
  const [filter, setFilter] = useState('All')
  const { causes, loading } = useCauseStore()

  const filtered =
    filter === 'All'
      ? causes
      : causes.filter((c) => c.cat === filter.toLowerCase())

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-surface border border-border h-72 animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="font-mono px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border"
            style={{
              background:    filter === cat ? 'rgba(255,107,26,.1)' : '#0d1525',
              borderColor:   filter === cat ? 'rgba(255,107,26,.4)' : '#1a2a45',
              color:         filter === cat ? '#ff6b1a' : '#5a6a85',
              letterSpacing: '.05em',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-5xl mb-4 opacity-20">🔍</p>
          <p className="font-mono text-sm text-muted">No causes found</p>
          <p className="font-mono text-xs text-muted2 mt-1">
            Be the first to create one
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((cause) => (
            <CauseCard key={cause.id} cause={cause} onClick={onCauseClick} />
          ))}
        </div>
      )}
    </div>
  )
}