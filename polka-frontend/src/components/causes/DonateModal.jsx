import { useState }     from 'react'
import Modal            from '@/components/ui/Modal'
import TokenInput       from '@/components/ui/TokenInput'
import RateRow          from '@/components/ui/RateRow'
import ProgressBar      from '@/components/ui/ProgressBar'
import Button           from '@/components/ui/Button'
import { useWalletStore } from '@/store/walletStore'
import { useToastStore }  from '@/store/toastStore'
import { useDonate }      from '@/hooks/useDonate'

export default function DonateModal({ open, onClose, cause }) {
  const [amount,  setAmount]  = useState('')
  const [loading, setLoading] = useState(false)

  const { connected, pdt } = useWalletStore()
  const toast = useToastStore((s) => s.add)
  const { executeDonate } = useDonate()

  if (!cause) return null

  const handleDonate = async () => {
    const amt = parseFloat(amount)
    if (!connected)     { toast('error', 'Not Connected',       'Connect your wallet first'); return }
    if (!amt || amt <= 0) { toast('error', 'Invalid Amount',    'Enter a PDT amount to donate'); return }
    if (amt > pdt)        { toast('error', 'Insufficient PDT',  'Swap more DOT to get PDT tokens'); return }

    setLoading(true)
    try {
      await executeDonate(cause.id, amt)
      setAmount('')
      onClose()
    } catch (err) {
      toast('error', 'Transaction Failed', err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (loading) return
    setAmount('')
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <h2
        className="font-extrabold text-xl mb-1 tracking-tight"
        style={{ color: '#e8edf5', letterSpacing: '-.02em' }}
      >
        Donate to Cause
      </h2>
      <p className="font-mono text-xs text-orange mb-4">// {cause.title}</p>

      {/* Cause progress snapshot */}
      <ProgressBar raised={cause.raised} goal={cause.goal} showLabel />

      {/* Amount input */}
      <div className="mt-5 mb-4">
        <TokenInput
          label="Donation Amount"
          balanceLabel={`Balance: ${pdt.toLocaleString()} PDT`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          symbol="PDT"
          iconBg="rgba(255,107,26,.15)"
          iconChar="◆"
        />
      </div>

      {/* Contract steps */}
      <div className="flex flex-col gap-2 mb-6">
        <RateRow label="Step 1" value="ERC20.approve(factory, amount)" />
        <RateRow label="Step 2" value="DonationFactory.donate(causeId, amount)" />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="ghost" onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button className="flex-1" onClick={handleDonate} disabled={loading}>
          {loading ? '⏳ Processing…' : '💸 Confirm Donation'}
        </Button>
      </div>
    </Modal>
  )
}
