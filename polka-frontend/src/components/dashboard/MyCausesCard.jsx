import { useNavigate }  from 'react-router-dom'
import { useCauseStore } from '@/store/causeStore'
import { useWalletStore } from '@/store/walletStore'
import Card              from '@/components/ui/Card'
import Button            from '@/components/ui/Button'
import ProgressBar       from '@/components/ui/ProgressBar'

// Mock: treat the first 2 causes as "mine" for the demo
const MY_CAUSE_IDS = [1, 2]

export default function MyCausesCard() {
  const causes   = useCauseStore((s) => s.causes)
  const { connected } = useWalletStore()
  const navigate = useNavigate()

  const myCauses = causes.filter((c) => MY_CAUSE_IDS.includes(c.id))

  return (
    <Card accent className="p-7">
      <p className="font-mono uppercase tracking-widest text-xs text-muted mb-5 flex items-center gap-2">
        <span className="w-0.5 h-3.5 rounded-full bg-orange inline-block" />
        My Causes
      </p>

      <div className="flex flex-col gap-3">
        {myCauses.map((c) => {
          const isActive = c.raised < c.goal
          return (
            <div
              key={c.id}
              className="p-4 rounded-xl border border-border bg-bg transition-colors duration-200 hover:border-orange/20"
            >
              <div className="flex justify-between items-start mb-3">
                <p className="font-bold text-sm text-white">{c.title}</p>
                <span
                  className="font-mono text-xs px-2 py-0.5 rounded"
                  style={
                    isActive
                      ? { background: 'rgba(0,245,160,.1)', color: '#00f5a0' }
                      : { background: 'rgba(90,106,133,.2)', color: '#5a6a85' }
                  }
                >
                  {isActive ? 'Active' : 'Ended'}
                </span>
              </div>
              <ProgressBar raised={c.raised} goal={c.goal} showLabel />
            </div>
          )
        })}

        {!connected && (
          <p className="font-mono text-xs text-muted text-center py-4">
            Connect wallet to see your causes
          </p>
        )}

        <Button variant="outline" className="w-full" onClick={() => navigate('/create')}>
          + Create New Cause
        </Button>
      </div>
    </Card>
  )
}
