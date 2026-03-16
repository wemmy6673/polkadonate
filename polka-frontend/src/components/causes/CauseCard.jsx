import { useState }   from 'react'
import ProgressBar    from '@/components/ui/ProgressBar'
import { calcPct }    from '@/utils/formatters'

export default function CauseCard({ cause, onClick }) {
  const [hov, setHov] = useState(false)
  const pct = calcPct(cause.raised, cause.goal)

  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        background: '#0d1525',
        border: `1px solid ${hov ? 'rgba(255,107,26,.4)' : '#1a2a45'}`,
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov
          ? '0 20px 60px rgba(0,0,0,.5), 0 0 20px rgba(255,107,26,.1)'
          : 'none',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onClick(cause)}
    >
      {/* Cover image */}
      <div
        className="h-44 flex items-center justify-center relative"
        style={{
          background: `linear-gradient(135deg, ${cause.gradFrom}, ${cause.gradTo})`,
        }}
      >
        <span className="text-5xl">{cause.emoji}</span>
        <div
          className="absolute top-3 left-3 font-mono text-xs px-2.5 py-1 rounded-md uppercase"
          style={{
            background: 'rgba(7,11,20,.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #1a2a45',
            color: '#5a6a85',
            letterSpacing: '.08em',
          }}
        >
          {cause.cat}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-bold text-base text-white mb-2 leading-snug">{cause.title}</h3>
        <p className="text-sm text-muted mb-4 leading-relaxed line-clamp-2">{cause.desc}</p>

        {/* Progress */}
        <ProgressBar raised={cause.raised} goal={cause.goal} showLabel />

        {/* Footer */}
        <div className="mt-3 flex justify-between items-center">
          <span className="font-mono text-xs text-muted">👥 {cause.donors} donors</span>
          <span className="font-mono text-xs text-muted2">Ends {cause.deadline}</span>
        </div>
      </div>
    </div>
  )
}
