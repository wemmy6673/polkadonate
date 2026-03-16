import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5 font-extrabold text-base tracking-tight">
          <span
            className="w-6 h-6 rounded-md flex items-center justify-center text-xs"
            style={{ background: 'linear-gradient(135deg,#ff6b1a,#cc4f0a)' }}
          >
            ◆
          </span>
          Polka<span className="text-orange">Donate</span>
        </div>

        {/* Links */}
        <div className="flex gap-6 font-mono text-xs text-muted">
          {[
            { to: '/',          label: 'Home'      },
            { to: '/swap',      label: 'Swap'      },
            { to: '/causes',    label: 'Causes'    },
            { to: '/create',    label: 'Create'    },
            { to: '/dashboard', label: 'Dashboard' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className="hover:text-orange transition-colors"
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Chain info */}
        <div className="font-mono text-xs text-muted2 text-center">
          <span className="text-green">●</span> Polkadot Hub Testnet · ChainID 420420421
        </div>
      </div>
    </footer>
  )
}
