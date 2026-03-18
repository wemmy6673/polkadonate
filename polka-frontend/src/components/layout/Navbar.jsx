import { useState }      from 'react'
import { NavLink }       from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useWallet }     from '@/hooks/useWallet'
import { formatToken, shortAddress } from '@/utils/formatters'

const NAV_LINKS = [
  { to: '/',          label: 'Home'      },
  { to: '/causes',    label: 'Causes'    },
  { to: '/create',    label: 'Create'    },
  { to: '/dashboard', label: 'Dashboard' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pdt } = useWallet()

  return (
    <nav
      className="sticky top-0 z-30 flex items-center justify-between px-6 py-10 md:px-36 h-16 border-b border-border"
      style={{ background: 'rgba(7,11,20,.88)', backdropFilter: 'blur(16px)' }}
    >
      {/* Logo */}
      <NavLink
        to="/"
        className="flex items-center gap-2.5 font-extrabold text-xl tracking-tight"
        style={{ letterSpacing: '-.02em' }}
      >
        <span
          className="w-7 h-7 rounded-lg flex items-center justify-center text-lg shadow-orange"
          style={{ background: 'linear-gradient(135deg,#ff6b1a,#cc4f0a)' }}
        >
          ◆
        </span>
        Polka<span className="text-orange text-lg">Donate</span>
      </NavLink>

      {/* Desktop nav links */}
      <div className="hidden md:flex gap-1">
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-md font-semibold transition-colors duration-150 ${
                isActive
                  ? 'bg-surface2 text-orange'
                  : 'text-muted hover:bg-surface hover:text-white'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        

        {/* RainbowKit ConnectButton — custom render for full style control */}
        <ConnectButton.Custom>
          {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
            if (!mounted) return null

            if (account && chain?.unsupported) {
              return (
                <button
                  onClick={openChainModal}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all"
                  style={{
                    background:  'rgba(230,0,122,.1)',
                    borderColor: 'rgba(230,0,122,.4)',
                    color:       '#e6007a',
                  }}
                >
                  ⚠ Wrong Network
                </button>
              )
            }

            if (account) {
              return (
                <div className="flex items-center gap-2">
                  
                  {/* Account button → opens RainbowKit account modal */}
                  <button
                    onClick={openAccountModal}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all duration-200"
                    style={{
                      background:  '#0d1525',
                      borderColor: '#1a2a45',
                      color:       '#e8edf5',
                      fontFamily:  "'Syne', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background  = '#111e33'
                      e.currentTarget.style.borderColor = '#243550'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background  = '#0d1525'
                      e.currentTarget.style.borderColor = '#1a2a45'
                    }}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs"
                      style={{ background: 'linear-gradient(135deg,#ff6b1a,#cc4f0a)' }}
                    >
                      ◆
                    </span>
                    {shortAddress(account.address)}
                  </button>
                </div>
              )
            }

            return (
              <button
                onClick={openConnectModal}
                className="inline-flex items-center gap-2 font-bold rounded-xl border-0 cursor-pointer transition-all duration-200 px-4 py-3 text-sm text-white"
                style={{
                  background:  'linear-gradient(135deg,#ff6b1a,#cc4f0a)',
                  boxShadow:   '0 0 28px rgba(255,107,26,.4)',
                  fontFamily:  "'Syne', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(255,107,26,.6)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.boxShadow = '0 0 28px rgba(255,107,26,.4)'
                }}
              >
                Connect Wallet
              </button>
            )
          }}
        </ConnectButton.Custom>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg border border-border text-muted"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

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
    </nav>
  )
}