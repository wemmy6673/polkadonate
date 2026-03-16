import { useState }     from 'react'
import { useNavigate }  from 'react-router-dom'
import SectionHeader    from '@/components/ui/SectionHeader'
import CauseGrid        from '@/components/causes/CauseGrid'
import DonateModal      from '@/components/causes/DonateModal'
import Button           from '@/components/ui/Button'
import { useWalletStore } from '@/store/walletStore'

export default function Causes() {
  const [selectedCause, setSelectedCause] = useState(null)
  const [donateOpen,    setDonateOpen]    = useState(false)
  const { connected } = useWalletStore()
  const navigate = useNavigate()

  const handleCauseClick = (cause) => {
    if (!connected) {
      // WalletModal will be triggered by DonateModal's inner guard
    }
    setSelectedCause(cause)
    setDonateOpen(true)
  }

  const handleClose = () => {
    setDonateOpen(false)
    // Keep selectedCause alive until modal animation finishes
    setTimeout(() => setSelectedCause(null), 300)
  }

  return (
    <div className="animate-fadeUp py-16">
      <SectionHeader
        title="Active Causes"
        sub="// browse and donate to verified campaigns"
        action={
          <Button onClick={() => navigate('/create')}>+ Launch Cause</Button>
        }
      />

      <CauseGrid onCauseClick={handleCauseClick} />

      <DonateModal
        open={donateOpen}
        onClose={handleClose}
        cause={selectedCause}
      />
    </div>
  )
}
