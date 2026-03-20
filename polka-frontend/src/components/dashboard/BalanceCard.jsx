import { useNavigate }  from 'react-router-dom'
import { useWallet }    from '@/hooks/useWallet'
import Card             from '@/components/ui/Card'
import Button           from '@/components/ui/Button'
import { formatToken }  from '@/utils/formatters'

export default function BalanceCard() {
  const { connected, address, dot } = useWallet()
  const navigate = useNavigate()

  return (
    <Card accent className="p-7">
      <p className="font-mono uppercase tracking-widest text-xs text-muted mb-5 flex items-center gap-2">
        <span className="w-0.5 h-3.5 rounded-full bg-orange inline-block" />
        DOT Balance
      </p>

      <div className="text-center py-4">
        <p
          className="font-extrabold mb-1 text-orange"
          style={{ fontSize: 52, letterSpacing: '-.03em', lineHeight: 1 }}
        >
          {formatToken(dot, 4)}
        </p>
        <p className="font-mono text-sm text-muted">Polkadot Testnet</p>
        <p className="font-mono text-xs mt-1 text-muted2">
          {connected ? address : 'Connect wallet to view balance'}
        </p>
      </div>

      <div className="flex gap-3 mt-4">
        <Button className="flex-1" onClick={() => navigate('/causes')}>
          Donate Now
        </Button>
        <Button className="flex-1" variant="outline" onClick={() => navigate('/create')}>
          Create Cause
        </Button>
      </div>
    </Card>
  )
}