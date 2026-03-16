import Card from '@/components/ui/Card'

const ACTIVITY = [
  {
    type:   'donate',
    icon:   '💸',
    title:  'Donated to Clean Water Initiative',
    meta:   '0x1a2b…3c4d · 12 min ago · tx: 0xabc…def',
    amount: '−500 PDT',
    color:  '#ff6b1a',
  },
  {
    type:   'swap',
    icon:   '⇄',
    title:  'Swapped DOT → PDT',
    meta:   '0x1a2b…3c4d · 2 hrs ago · tx: 0x123…456',
    amount: '+1,000 PDT',
    color:  '#00f5a0',
  },
  {
    type:   'create',
    icon:   '🚀',
    title:  'Created Cause: Climate Action Fund',
    meta:   '0x1a2b…3c4d · 1 day ago · IPFS: QmXy…zab',
    amount: 'Deployed',
    color:  '#9b59ff',
  },
  {
    type:   'donate',
    icon:   '💸',
    title:  'Donated to Open Dev Tools',
    meta:   '0x1a2b…3c4d · 3 days ago · tx: 0x789…abc',
    amount: '−250 PDT',
    color:  '#ff6b1a',
  },
]

const TYPE_BG = {
  donate: 'rgba(0,245,160,.1)',
  swap:   'rgba(0,212,255,.1)',
  create: 'rgba(255,107,26,.1)',
}

export default function ActivityFeed() {
  return (
    <Card accent className="p-7 col-span-full">
      <p className="font-mono uppercase tracking-widest text-xs text-muted mb-5 flex items-center gap-2">
        <span className="w-0.5 h-3.5 rounded-full bg-orange inline-block" />
        Recent Activity
      </p>

      <div className="flex flex-col gap-3">
        {ACTIVITY.map((tx, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-xl bg-bg border border-border transition-colors duration-200 hover:border-orange/20"
          >
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: TYPE_BG[tx.type] }}
            >
              {tx.icon}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-white truncate">{tx.title}</p>
              <p className="font-mono text-xs text-muted mt-0.5 truncate">{tx.meta}</p>
            </div>

            {/* Amount */}
            <p className="font-mono text-sm font-medium flex-shrink-0" style={{ color: tx.color }}>
              {tx.amount}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}
