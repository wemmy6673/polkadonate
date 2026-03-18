import { useNavigate } from 'react-router-dom'
import Button          from '@/components/ui/Button'

const STATS = [
  { value: '142,830', label: 'PDT Raised Total'  },
  { value: '24',      label: 'Active Causes'      },
  { value: '1,204',   label: 'Total Donors'       },
  { value: '98.2%',   label: 'Funds On-Chain'     },
]

const HOW_IT_WORKS = [
  {
    num:  'Step 1',
    title: 'Connect Wallet',
    desc:  "By establishing a connection with your EVM-compatible wallet, you are effectively initializing a digital fingerprint where your on-chain address serves as the foundational anchor for your entire ecosystem identity.",
  },
  {
    num:  'Step 2',
    title: 'Get Testnet Tokens',
    desc:  'To get started with donations on the Polkadonate platform, head over to the official polkadot faucet and claim your free tokens. These tokens serve as the primary donation currency across the platform, allowing you to participate fully without spending real funds',
  },
  {
    num:  'Step 3',
    title: 'Donate or Launch',
    desc:  'Take the opportunity to browse our curated selection of verified causes and provide support through PDT contributions; should you have a mission of your own, our platform enables you to establish a personalized fundraiser where every detail is secured via IPFS for transparent, tamper-proof record-keeping.',
  },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="animate-fadeUp">
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="pt-24 pb-16">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 font-mono text-xs px-4 py-1.5 rounded-full mb-7 uppercase tracking-widest"
          style={{
            background: 'rgba(255,107,26,.1)',
            border:     '1px solid rgba(255,107,26,.25)',
            color:      '#ff6b1a',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-orange animate-pulse inline-block" />
          Decentralized Fundraising
        </div>

        {/* Headline */}
        <h1
          className="font-extrabold leading-none mb-6"
          style={{ fontSize: 'clamp(40px,6vw,72px)', letterSpacing: '-.03em' }}
        >
          <span className="block text-white">Fund What Matters</span>
          <span
            className="block"
            style={{
              background: 'linear-gradient(90deg, #ff6b1a, #ff8c4a, #ffc04a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            On-Chain.
          </span>
        </h1>

        {/* Sub */}
        <p className="font-mono font-light text-base text-muted mb-10 max-w-lg leading-7">
          Swap testnet DOT for PDT tokens, launch fundraising causes, and donate
          directly — no middlemen, full transparency.
        </p>

        {/* CTA */}
        <div className="flex gap-4 flex-wrap">
          <Button size="lg" onClick={() => navigate('/swap')}>⇄ Get PDT Tokens</Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/causes')}>Browse Causes →</Button>
        </div>
      </section>

      {/* ── Stats bar ───────────────────────────────────────── */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden mb-20"
        style={{  gap: 1 }}
      >
        {STATS.map(({ value, label }) => (
          <div
            key={label}
            className="px-8 py-7 transition-colors duration-200 hover:bg-surface2"
          >
            <p
              className="font-extrabold mb-1.5 text-orange"
              style={{ fontSize: 32, letterSpacing: '-.02em', lineHeight: 1 }}
            >
              {value}
            </p>
            <p className="font-mono uppercase tracking-widest text-xs text-muted">{label}</p>
          </div>
        ))}
      </div>

      {/* ── How it works ────────────────────────────────────── */}
      <h2
        className="font-extrabold text-5xl tracking-tight text-orange text-center md:py-16 mb-2"
        style={{ letterSpacing: '-.02em' }}
      >
        How It Works
      </h2>

      <div className="grid md:grid-cols-3 gap-1 pb-20">
        {HOW_IT_WORKS.map(({ num, icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl p-8 relative overflow-hidden transition-all duration-250  border border-orange"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,107,26,.3)'
              e.currentTarget.style.transform   = 'translateY(-3px)'
              e.currentTarget.querySelector('.top-accent').style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1a2a45'
              e.currentTarget.style.transform   = ''
              e.currentTarget.querySelector('.top-accent').style.opacity = '0'
            }}
          >
            {/* Top accent line */}
            <div
              className="top-accent absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300 opacity-0"
              style={{ background: 'linear-gradient(90deg, #ff6b1a, transparent)' }}
            />
            <p className="font-mono text-lg text-orange mb-4 tracking-widest">{num}</p>
            <span className="text-3xl mb-4 block">{icon}</span>
            <h3 className="font-bold text-xl text-orange mb-2.5">{title}</h3>
            <p className="text-lg text-muted leading-7">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
