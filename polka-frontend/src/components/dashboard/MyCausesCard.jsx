import { useNavigate }   from 'react-router-dom'
import { useCauseStore } from '@/store/causeStore'
import { useWallet }     from '@/hooks/useWallet'
import Card              from '@/components/ui/Card'
import Button            from '@/components/ui/Button'
import ProgressBar       from '@/components/ui/ProgressBar'

export default function MyCausesCard() {
  const causes    = useCauseStore((s) => s.causes)
  const { connected, address } = useWallet()
  const navigate  = useNavigate()

  const myCauses = causes.filter(
    (c) => c.creator?.toLowerCase() === address?.toLowerCase()
  )

  return (
    <Card accent className="p-7">
      <p className="font-mono uppercase tracking-widest text-xs text-muted mb-5 flex items-center gap-2">
        <span className="w-0.5 h-3.5 rounded-full bg-orange inline-block" />
        My Causes
      </p>

      <div className="flex flex-col gap-3">
        {!connected ? (
          <p className="font-mono text-xs text-muted text-center py-8">
            Connect wallet to see your causes
          </p>
        ) : myCauses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-3xl mb-3 opacity-30">📋</p>
            <p className="font-mono text-sm text-muted">No causes yet</p>
            <p className="font-mono text-xs text-muted2 mt-1">
              Causes you create will appear here
            </p>
          </div>
        ) : (
          myCauses.map((c) => {
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
          })
        )}

        <Button variant="outline" className="w-full" onClick={() => navigate('/create')}>
          + Create New Cause
        </Button>
      </div>
    </Card>
  )
}