import { useState }    from 'react'
import { useCauseStore } from '@/store/causeStore'
import { CATEGORIES }   from '@/data/causes'
import CauseCard        from './CauseCard'

export default function CauseGrid({ onCauseClick }) {
  const [filter, setFilter] = useState('All')
  const causes = useCauseStore((s) => s.causes)

  const filtered =
    filter === 'All'
      ? causes
      : causes.filter((c) => c.cat === filter.toLowerCase())

  return (
    <div>
      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="font-mono px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border"
            style={{
              background:   filter === cat ? 'rgba(255,107,26,.1)' : '#0d1525',
              borderColor:  filter === cat ? 'rgba(255,107,26,.4)' : '#1a2a45',
              color:        filter === cat ? '#ff6b1a' : '#5a6a85',
              letterSpacing: '.05em',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted font-mono text-sm">
          No causes found for this filter.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((cause) => (
            <CauseCard
              key={cause.id}
              cause={cause}
              onClick={onCauseClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}
