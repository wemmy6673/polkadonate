import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useWalletStore } from '@/store/walletStore'
import { formatToken }    from '@/utils/formatters'
import WalletModal        from '@/components/wallet/WalletModal'
import Button             from '@/components/ui/Button'

const NAV_LINKS = [
  { to: '/',          label: 'Home'      },
  { to: '/swap',      label: 'Swap'      },
  { to: '/causes',    label: 'Causes'    },
  { to: '/create',    label: 'Create'    },
  { to: '/dashboard', label: 'Dashboard' },
]

export default function Navbar() {
  const [walletOpen, setWalletOpen] = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const { connected, address, pdt, disconnect } = useWalletStore()

  return (
    <>
      <nav
        className="sticky top-0 z-30 flex items-center justify-between px-6 py-10 md:px-36 h-16 border-b border-border"
        style={{ background: 'rgba(7,11,20,.88)', backdropFilter: 'blur(16px)' }}
      >
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight"
          style={{ letterSpacing: '-.02em' }}
        >
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shadow-orange"
            style={{ background: 'linear-gradient(135deg,#ff6b1a,#cc4f0a)' }}
          >
            ◆
          </span>
          Polka<span className="text-orange">Donate</span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${
                  isActive
                    ? 'text-orange'
                    : 'text-muted  hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          

          {connected ? (
            <>
              {/* Token balance */}
              <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs bg-surface border border-border text-muted">
                <span className="text-orange font-semibold">{formatToken(pdt)}</span> PDT
              </div>
              {/* Disconnect */}
              <Button variant="ghost" size="sm" onClick={disconnect}>
                {address} ✕
              </Button>
            </>
          ) : (
            <Button size="md" onClick={() => setWalletOpen(true)}>
              Connect Wallet
            </Button>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg border border-border text-muted"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-16 inset-x-0 z-20 bg-surface border-b border-border px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  isActive ? 'bg-surface2 text-orange' : 'text-muted hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}

      <WalletModal open={walletOpen} onClose={() => setWalletOpen(false)} />
    </>
  )
}
