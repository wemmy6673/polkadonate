import Modal      from '@/components/ui/Modal'
import { useWallet } from '@/hooks/useWallet'

const WALLET_OPTIONS = [
  {
    id:   'polkadot',
    name: 'Polkadot.js Extension',
    desc: 'Browser extension · EVM compatible',
    icon: '●',
    bg:   'rgba(230,0,122,.12)',
  },
  {
    id:   'walletconnect',
    name: 'WalletConnect',
    desc: 'Scan QR code with mobile wallet',
    icon: '📱',
    bg:   'rgba(0,212,255,.1)',
  },
  {
    id:   'metamask',
    name: 'MetaMask',
    desc: 'Browser extension · EVM',
    icon: '🦊',
    bg:   'rgba(255,107,26,.1)',
  },
]

export default function WalletModal({ open, onClose }) {
  const { connect } = useWallet()

  const handleConnect = async (id) => {
    onClose()
    await connect(id)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <h2
        className="font-extrabold text-xl mb-1 tracking-tight"
        style={{ color: '#e8edf5', letterSpacing: '-.02em' }}
      >
        Connect Wallet
      </h2>
      <p className="font-mono text-xs text-muted mb-7">
        // choose your wallet to get started
      </p>

      <div className="flex flex-col gap-3">
        {WALLET_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleConnect(opt.id)}
            className="flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200 w-full border"
            style={{ background: '#070b14', borderColor: '#243550' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,107,26,.4)'
              e.currentTarget.style.background  = 'rgba(255,107,26,.03)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#243550'
              e.currentTarget.style.background  = '#070b14'
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: opt.bg }}
            >
              {opt.icon}
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm text-white">{opt.name}</p>
              <p className="font-mono text-xs text-muted mt-0.5">{opt.desc}</p>
            </div>
            <span className="text-muted">→</span>
          </button>
        ))}
      </div>
    </Modal>
  )
}
