import { useState }      from 'react'
import { useNavigate }   from 'react-router-dom'
import { useWalletStore } from '@/store/walletStore'
import { useToastStore }  from '@/store/toastStore'
import { useSwap }        from '@/hooks/useSwap'
import TokenInput         from '@/components/ui/TokenInput'
import RateRow            from '@/components/ui/RateRow'
import Button             from '@/components/ui/Button'
import Card               from '@/components/ui/Card'

export default function SwapCard() {
  const [dotAmt,  setDotAmt]  = useState('')
  const [loading, setLoading] = useState(false)
  const { connected, dot, pdt } = useWalletStore()
  const toast    = useToastStore((s) => s.add)
  const { swap, getTokensOut } = useSwap()
  const navigate = useNavigate()

  const pdtOut = dotAmt ? getTokensOut(parseFloat(dotAmt)) : ''

  const handleSwap = async () => {
    if (!connected) { toast('error', 'Not Connected', 'Connect your wallet first'); return }
    const d = parseFloat(dotAmt)
    if (!d || d <= 0) { toast('error', 'Invalid Amount', 'Enter a DOT amount to swap'); return }
    if (d > dot)      { toast('error', 'Insufficient Balance', 'Not enough DOT in wallet'); return }

    setLoading(true)
    try {
      await swap(d)
      setDotAmt('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card accent className="p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="font-bold text-base text-white">Token Swap</span>
        <span
          className="font-mono text-xs px-2 py-0.5 rounded"
          style={{
            background: 'rgba(255,107,26,.1)',
            border: '1px solid rgba(255,107,26,.2)',
            color: '#ff6b1a',
          }}
        >
          LIVE
        </span>
      </div>

      {/* DOT input */}
      <TokenInput
        label="You Pay"
        balanceLabel={`Balance: ${dot.toFixed(2)} DOT`}
        value={dotAmt}
        onChange={(e) => setDotAmt(e.target.value)}
        symbol="DOT"
        iconBg="rgba(230,0,122,.15)"
        iconChar="●"
      />

      {/* Swap arrow */}
      <div className="flex justify-center my-3">
        <button
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg bg-surface2 border border-border2 text-muted hover:bg-orange/10 hover:border-orange/30 hover:text-orange transition-all duration-300 hover:rotate-180"
          onClick={() => {}}
        >
          ⇅
        </button>
      </div>

      {/* PDT output */}
      <TokenInput
        label="You Receive"
        balanceLabel={`Balance: ${pdt.toLocaleString()} PDT`}
        value={pdtOut}
        readOnly
        symbol="PDT"
        iconBg="rgba(255,107,26,.15)"
        iconChar="◆"
        valueColor="#ff6b1a"
      />

      {/* Rate info */}
      <div className="flex flex-col gap-2 mt-4">
        <RateRow label="Exchange Rate" value="1 DOT = 100 PDT" />
        <RateRow label="Network Fee"   value="~0.001 DOT" />
      </div>

      {/* CTA */}
      <Button
        className="w-full mt-5"
        onClick={handleSwap}
        disabled={loading}
      >
        {loading ? '⏳ Processing…' : '⇄ Swap Tokens'}
      </Button>

      <p className="font-mono text-center mt-3 text-xs text-muted2">
        Powered by SwapContract · Polkadot Hub Testnet
      </p>
    </Card>
  )
}
