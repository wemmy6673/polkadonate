import { useNavigate }   from 'react-router-dom'
import { useWalletStore } from '@/store/walletStore'
import Card               from '@/components/ui/Card'
import Button             from '@/components/ui/Button'
import { formatToken }    from '@/utils/formatters'

export default function BalanceCard() {
  const { connected, address, pdt, dot } = useWalletStore()
  const navigate = useNavigate()

  return (
    <Card accent className="p-7">
      <p className="font-mono uppercase tracking-widest text-xs text-muted mb-5 flex items-center gap-2">
        <span className="w-0.5 h-3.5 rounded-full bg-orange inline-block" />
        PDT Balance
      </p>

      <div className="text-center py-4">
        <p
          className="font-extrabold mb-1 text-orange"
          style={{ fontSize: 52, letterSpacing: '-.03em', lineHeight: 1 }}
        >
          {formatToken(pdt)}
        </p>
        <p className="font-mono text-sm text-muted">PDT — PolkaDonate Token</p>
        <p className="font-mono text-xs mt-1 text-muted2">
          {connected ? address : 'Connect wallet to view balance'}
        </p>
        {connected && (
          <p className="font-mono text-xs mt-0.5 text-muted2">
            DOT Balance: {dot.toFixed(2)} DOT
          </p>
        )}
      </div>

      <div className="flex gap-3 mt-4">
        <Button className="flex-1" onClick={() => navigate('/swap')}>
          ⇄ Swap More
        </Button>
        <Button className="flex-1" variant="outline" onClick={() => navigate('/causes')}>
          Donate
        </Button>
      </div>
    </Card>
  )
}
